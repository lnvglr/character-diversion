<template>
  <ButtonDefault @click="next">
    <span class="mr-1">Change Theme</span>
    <font-awesome-icon :icon="['fas', icons[$colorMode.preference]]" fixed-width class="fa-l" />
  </ButtonDefault>
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
  const i = themes.indexOf(colorMode.preference)
  colorMode.preference = themes[(i + 1) % themes.length]
}
</script>

<style>
</style>