<template>
  <component :is="is" ref="string">{{ truncated }}</component>
</template>

<script>
export default defineComponent({
  name: 'Truncate',
  props: {
    string: String,
    is: {
      type: String,
      default: 'span'
    }
  },
  data: () => ({ truncated: '' }),
  mounted() {
    this.truncated = this.string
    this.$nextTick(() => this.getWidth())
    window.addEventListener('resize', this.getWidth, true)
  },
  unmounted() {
    window.removeEventListener('resize', this.getWidth, true)
  },
  methods: {
    getWidth() {
      if (this.$refs.string) {
        const preserve = 3
        const width = this.$refs.string.clientWidth
        const charCount = this.string.length
        const scroll = this.measure(width, (el) => el.scrollWidth)
        const charWidth = ((scroll / 2) / charCount) + 5
        const cut = preserve + 2; // 2 for the ellipsis
        if (charWidth * charCount - 45 > width) {
          const availableChars = Math.floor(width / charWidth - cut)
          this.truncated =
            this.string.slice(0, availableChars) +
            '…' +
            this.string.slice(charCount - preserve, charCount)
        } else {
          this.truncated = this.string
        }
      }
    },
    measure(width, fn) {
      const el = document.createElement('span')
      el.innerHTML = this.string

      el.style.visibility = 'hidden';
      el.style.position = 'absolute';
      el.style.maxWidth = `${width}px`;
      
      document.body.appendChild(el);
      const result = fn(el);
      el.parentNode.removeChild(el);
      
      return result;
    }
  },
})
</script>


<style lang="scss" scoped>
span {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
</style>