<template>
  <div class="icon" v-if="icons[name]" v-html="icons[name]"></div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    size: String,
  },
  data() {
    return {
      icons: {
        characterDiversion: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='9 0 60 72'><rect x='13.5' y='9' width='13.5' height='54'/><circle cx='45' cy='22.5' r='14'/><path d='M54,63c-12.43,0-22.5-10.07-22.5-22.5h13.5c0,4.97,4.03,9,9,9h4.5v13.5h-4.5Z'/></svg>`,
        // characterDiversion: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'><rect x='13.5' y='9' width='13.5' height='54'/><circle cx='45' cy='22.5' r='14'/><path d='M54,63c-12.43,0-22.5-10.07-22.5-22.5h13.5c0,4.97,4.03,9,9,9h4.5v13.5h-4.5Z'/></svg>`,
      }
    }
  },
}
</script>