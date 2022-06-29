<template>
  <component
    :is="'textarea' === type ? 'textarea' : 'input'"
    :value="value"
    @input="updateValue(($event.target as HTMLInputElement).value)"
    v-bind="$attrs"
    :type="clearPassword ? 'text' : type"
    :ref="uid"
    rows="3"
  />
</template>
<script lang="ts">
export default defineComponent({
  props: {
    type: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
  },
  mounted() {
    this.uid = (Math.random().toString(36)).substring(2, 15)
  },
  data() {
    return {
      uid: '',
      clearPassword: false,
    }
  },
  watch: {
    value: {
      handler(newValue: string) {
        this.calculateTextarea(newValue)
      },
    },
  },
  computed: {
    element(): HTMLElement {
      return this.$refs[this.uid] as HTMLElement
    }
  },
  methods: {
    updateValue(val: string | number) {
      const value = 'number' === this.type ? Number(val) : String(val)
      this.$emit('update:modelValue', value)
    },
    calculateTextarea(content: string) {
      setTimeout(() => {
        if (this.type === 'textarea' && this.element) {
          this.element.setAttribute('style', `height: auto;`)
          this.element.setAttribute('style', `height: ${this.element.scrollHeight + 2}px;`)
        }
      }, 0)
    },
  },
})
</script>
<style scoped>
textarea {
  padding-bottom: var(--p-7) !important;
  resize: none;
}
</style>