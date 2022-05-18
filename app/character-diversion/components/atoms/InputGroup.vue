<template>
  <div
    class=""
    :class="{
      prepend,
      append,
      submit: $slots.submit,
      list: options,
      required: promptRequired,
      valid: Boolean(isValid),
      invalid: Boolean(!isValid && isValid !== null),
    }"
    :title="placeholder"
  >
    <input
      :type="type"
      :id="!options ? _.uid : false"
      :list="options ? _.uid : false"
      :ref="name"
      :value="modelValue"
      :pattern="pattern"
      :inputmode="inputmode"
      :disabled="disabled"
      :required="required"
      class="border border-gray-300 rounded-lg"
      :class="{ empty }"
      :min="min ? (Math.ceil(min) > modelValue ? min : Math.ceil(min)) : 0"
      :max="max ? max : null"
      :step="shiftPressed ? step * 10 : step"
      :spellcheck="spellcheck"
      :autocomplete="autocomplete"
      @input="updateValue($event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
      @keyup="keyup"
      @keydown="keydown"
    />
  </div>
</template>

<script>
export default {
  name: 'Input Group',
  props: {
    modelValue: [Number, String],
    name: String,
    placeholder: String,
    type: {
      type: String,
      default: 'number',
    },
    options: Array,
    width: null,
    minWidth: null,
    maxWidth: null,
    min: Number,
    max: Number,
    step: Number,
    prepend: String,
    append: String,
    submit: String,
    autocomplete: {
      type: String,
      default: 'off',
    },
    spellcheck: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    required: Boolean,
    hideOptional: Boolean,
  },
  emits: ['update:modelValue'],
  computed: {
    pattern() {
      switch (this.type) {
        case 'number':
          return '[0-9]*'
        default:
          return null
      }
    },
    isValid() {
      let regex = false
      switch (this.type) {
        case 'email':
          regex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
          )
          break
        case 'tel':
          regex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{6,14}$/i)
          break
      }
      return this.modelValue && regex ? regex.test(this.modelValue) : null
    },
    inputmode() {
      switch (this.type) {
        case 'number':
          return 'decimal'

        default:
          return ''
      }
    },
    empty() {
      return (!this.modelValue || String(this.modelValue) === '') && 0 !== this.modelValue
    },
  },
  methods: {
    updateValue(val) {
      const value = val.length === 0 ? null : 'number' === this.type ? Number(val) : String(val)
      return this.$emit('update:modelValue', value)
    },
    focus() {
      if (this.name) {
        this.$inputEvents.mouse.focus = this.name
        setTimeout(() => this.$refs[this.name].focus(), 0)
      }
    },
    onFocus() {
      this.$inputEvents.mouse.focus = this.name
    },
    onBlur() {
      this.$inputEvents.mouse.focus = this.$inputEvents.mouse.hover
      this.promptRequired = this.required && this.empty
    },
    keydown(e) {
      if (e.key === 'Shift') this.shiftPressed = true
    },
    keyup(e) {
      if (e.key === 'Enter') this.$emit('enter', this.modelValue)
      if (e.key === 'Shift') this.shiftPressed = false
    },
    calculateTextarea() {
      if (this.type === 'textarea') {
        const textarea = this.$refs[this.name]
        textarea.setAttribute('style', `height: auto;`)
        textarea.setAttribute('style', `height: ${textarea.scrollHeight}px;`)
      }
    },
    computeOffset(e) {
      this.placeholderOffset = e
    },
  },
  data() {
    return {
      shiftPressed: false,
      promptRequired: false,
      placeholderOffset: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>