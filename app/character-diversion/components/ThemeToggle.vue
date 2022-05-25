<template>
  <ButtonDefault @click="next" :icon="icons[$colorMode?.preference]">Change Theme</ButtonDefault>
</template>

<script setup>
const colorMode = useColorMode()
const icons = {
  system: 'desktop',
  dark: 'moon',
  light: 'sun',
}
const next = () => {
  const themes = Object.keys(icons)
  const i = themes.indexOf(colorMode?.preference)
  colorMode.preference = themes[(i + 1) % themes.length]
}
</script>

<style>
</style>