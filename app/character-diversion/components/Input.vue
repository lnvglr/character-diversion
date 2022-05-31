<template>
  <div class="input-container" :class="containerClass">
    <label v-if="label" :for="_.uid">{{ label }}</label>
    <component
      :is="is"
      :type="type"
      :id="_.uid"
      v-model="modelValue"
      @update:modelValue="updateValue"
      v-bind="$attrs"
      :empty="empty || null"
      class="rounded-md border-beige-300 w-full focus:outline-info-500"
      :class="{ border }"
    />
    <label class="placeholder" v-if="placeholder" :for="_.uid">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  setup() {
    const InputDefault = resolveComponent('InputDefault')
    const InputRange = resolveComponent('InputRange')
    const InputCheckbox = resolveComponent('InputCheckbox')
    const InputFile = resolveComponent('InputFile')
    return {
      InputDefault,
      InputRange,
      InputCheckbox,
      InputFile,
    }
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, Array],
    },
    validation: {
      type: String,
    },
    type: {
      type: String,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    'containerClass': {
      type: String,
    },
  },
  inheritAttrs: false,
  computed: {
    empty() {
      return (!this.modelValue || String(this.modelValue) === '') && 0 !== this.modelValue
    },
    border() {
      switch(this.type) {
        case 'range':
        case 'checkbox':
        // case 'file':
          return false
        default:
          return true
      }
    },
    is() {
      switch(this.type) {
        case 'range':
          return this.InputRange
        case 'checkbox':
          return this.InputCheckbox
        case 'file':
          return this.InputFile
        default:
          return this.InputDefault
      }
    }
  },
  methods: {
    updateValue(val) {
      const type = typeof val
      let value = val
      switch(type) {
        case 'number':
          value = Number(val)
          break;
        case 'string':
          value = val.length !== 0 ? val : null
          break;
      }
      this.$emit('update:modelValue', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-container {
  --padding-x: var(--p-3);
  --padding-y: var(--p-2);
}
:global(:where(.input-container)) {
  position: relative;
  width: var(--w-full);
}
input {
  height: var(--h-12);
}
:global(:where(input, textarea)) {
  display: block;
}
:global(form :is(input, textarea, .dropzone)) {
  margin-bottom: var(--m-2);
}
:global(form input) {
  width: 100%;
}
:is(input, textarea):not([type=range]) {
  padding: calc(var(--padding-y) + 0.625em) var(--padding-x) 0;
}
:is(textarea) {
  padding-top: calc(var(--padding-y) + 0.75em);
}
.placeholder {
  position: absolute;
  z-index: 10;
  pointer-events: none;
  max-width: 100%;
  font-size: var(--text-md);
  color: var(--color-beige-400);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  will-change: transform;
  transform: translateZ(0);
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-function-default);
  top: var(--padding-y);
  left: calc(var(--padding-x) + var(--border-default));
}

:is(input, textarea):not([type=range])[empty]:not(:focus) ~ .placeholder {
  --padding-y: var(--p-3);
}
// all input types except range, which are not disabled:
// where the input is not :focus, :active or filled (:not([empty]))
// select the .placeholder
:is(input, textarea):not([type=range]):not(:disabled):where(:focus, :active, :not([empty])) ~ .placeholder {
  font-size: var(--text-xs);
  color: var(--color-beige-700);
}
</style>