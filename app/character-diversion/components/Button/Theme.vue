<template>
  <Button @click="next" :icon="icon && icons[$colorMode?.preference]"><template v-slot v-if="label">
      {{ label }}
    </template>
  </Button>
</template>

<script lang="ts">
export default {
  data() {
    return {
      icons: {
        system: 'desktop',
        dark: 'moon',
        light: 'sun',
      }

    }
  },
  props: {
    label: {
      type: [String, Boolean],
      default: "Change Theme"
    },
    icon: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    next() {
      const themes = Object.keys(this.icons)
      const i = themes.indexOf(this.$colorMode.preference)
      this.$colorMode.preference = themes[(i + 1) % themes.length]
    }
  }
}
</script>

<style>
</style>