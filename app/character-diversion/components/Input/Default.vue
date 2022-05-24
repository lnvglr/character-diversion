<template>
    <component
      :is="'textarea' === type ? 'textarea' : 'input'"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      v-bind="$attrs"
      :type="clearPassword ? 'text' : type"
    />
    <!-- <span class="absolute" v-if="type === 'password'" @click="clearPassword = !clearPassword"
      ><font-awesome-icon :icon="['fas', 'eye']" fixed-width class="fa-sm"
    /></span> -->
</template>
<script>
export default {
  props: {
    type: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  data() {
    return {
      clearPassword: false,
    }
  },
  methods: {
    updateValue(val) {
      const value = 'number' === this.type ? Number(val) : String(val)
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
<style scoped>
</style>