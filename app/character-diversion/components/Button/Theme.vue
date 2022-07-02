<template>
  <div class="button-group">
    <Button
      v-for="(item, name) in icons"
      @click="setActive(name)"
      :class="{ active: $colorMode.preference === name }"
      :icon="item"
      :title="name"
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
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
  computed: {
    themes() {
      return Object.keys(this.icons)
    }
  },
  methods: {
    next() {
      const i = this.themes.indexOf(this.$colorMode.preference)
      this.$colorMode.preference = this.themes[(i + 1) % this.themes.length]
    },
    setActive(key: string) {
      this.$colorMode.preference = key
    }
  }
})
</script>

<style>
</style>