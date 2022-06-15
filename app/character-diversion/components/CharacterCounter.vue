<template>
	<small v-if="characterCountdown !== null" class="font-bold leading-tight" :class="danger ? 'text-alert-500' : 'text-success-500'">{{characterCountdown}}</small>
</template>

<script lang="ts">

export default defineComponent({
	props: {
		value: {
			type: String,
		},
		maxlength: {
			type: Number,
			default: 500
		},
	},
	computed: {
    characterCountdown() {
			const left = this.maxlength && typeof this.value === 'string' && this.maxlength - this.value.length
			if (left === 0) return 0
      return left || this.maxlength
    },
		danger() {
			return this.characterCountdown < (this.maxlength / 10)
		},
	}
})
</script>

<style scoped>
</style>