<template>
  <Button @click="next">
		<font-awesome-icon
			:icon="['fas', icons[$colorMode.preference]]"
			fixed-width
			class="fa-l"
		/>
  </Button>
</template>

<script setup>
import Button from '@/components/atoms/Button.vue'
const colorMode = useColorMode()
const icons = {
	'system': 'desktop',
	'dark': 'moon',
	'light': 'sun',
}
const next = () => {
	const i = Object.keys(icons).indexOf(colorMode.preference)
	colorMode.preference = Object.keys(icons)[(i + 1) % Object.keys(icons).length]
}
</script>

<style>
</style>