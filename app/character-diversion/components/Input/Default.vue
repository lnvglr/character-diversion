<template>
	<component
		:is="'textarea' === type ? 'textarea' : 'input'"
		:value="modelValue"
		@input="updateValue($event.target.value)"
		v-bind="$attrs"
	/>
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
  methods: {
    updateValue(val) {
      const value = val.length !== 0 ? ('number' === this.type ? Number(val) : String(val)) : null
      this.$emit('update:modelValue', value)
    },
  },
}
</script>