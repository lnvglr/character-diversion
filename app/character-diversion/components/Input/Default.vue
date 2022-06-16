<template>
  <component
    :is="'textarea' === type ? 'textarea' : 'input'"
    :value="modelValue"
    @input="updateValue($event.target.value)"
    v-bind="$attrs"
    :type="clearPassword ? 'text' : type"
    :ref="uid"
    rows="3"
  />
</template>
<script lang="ts">
export default {
  props: {
    type: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  mounted() {
    this.uid = (Math.random().toString(36)).substring(2, 15)
    this.$nextTick(() => {
      // this.calculateTextarea()
    })
  },
  data() {
    return {
      uid: null,
      clearPassword: false,
    }
  },
  watch: {
    modelValue: {
      handler(newValue: string) {
        this.calculateTextarea(newValue)
      },
    },
  },
  computed: {
    element() {
      return this.$refs[this.uid]
    }
  },
  methods: {
    updateValue(val) {
      const value = 'number' === this.type ? Number(val) : String(val)
      this.$emit('update:modelValue', value)
    },
    calculateTextarea(content: string = null) {
      setTimeout(() => {
        if (this.type === 'textarea' && this.element) {
          this.element.setAttribute('style', `height: auto;`)
          this.element.setAttribute('style', `height: ${this.element.scrollHeight + 2}px;`)
        }
      }, 0)
    },
  },
}
</script>
<style scoped>
textarea {
  padding-bottom: var(--p-7) !important;
  resize: none;
}
</style>