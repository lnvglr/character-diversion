<template>
  <div class="input-container" :class="containerClass">
    <label class="placeholder" v-if="label && type === 'range'">{{ label }}</label>
    <component
      :is="is"
      :type="type"
      v-model="modelValue"
      @update:modelValue="updateValue"
      v-bind="$attrs"
      :empty="empty || null"
      class="rounded-md border-beige-300 w-full focus:outline-info-500"
      :class="{ border, hasLabel: label }"
      :placeholder="!label ? placeholder : null"
      :maxlength="maxlength"
      @keydown.enter.exact="enter"
    />
    <div v-if="maxlength || submitOnEnter || $attrs.onCancel" class="absolute bottom-2 left-3 w-full pr-4 flex gap-2 items-center -mb-1">
      <CharacterCounter v-if="maxlength" :value="modelValue" :maxlength="maxlength" />
      <small v-if="submitOnEnter" class="text-beige-400">{{$t('submit.with.enter')}}</small>
      <small v-if="allowMarkdown" class="text-beige-400">{{$t('markdown.is.allowed')}}</small>
      <div class="ml-auto"><Button v-if="$attrs.onCancel" @click.prevent="cancel" icon="close" class="clear xs" color="beige" :title="$t('cancel')" /></div>
    </div>
    <label class="placeholder absolute" v-if="label && type !== 'range'">{{ label }}</label>
  </div>
</template>

<script lang="ts">
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
    maxlength: {
      type: Number,
    },
    submitOnEnter: {
      type: Boolean,
      default: false,
    },
    allowMarkdown: {
      type: Boolean,
      default: false,
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
    enter(e: Event) {
      if (this.submitOnEnter) {
        e.preventDefault()
        this.$emit('enter')
      }
    },
    cancel() {
      if (this.$attrs.onCancel) {
        this.$emit('cancel')
      }
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
:global(form :is(.input-container)) {
  margin-bottom: var(--m-2);
}
:global(form input) {
  width: 100%;
}
:is(input, textarea):not([type=range]) {

  padding: var(--padding-y) var(--padding-x);
  &.hasLabel {
    padding-top: calc(var(--padding-y) + 0.625em);
    padding-bottom: 0;
    &:is(textarea) {
      padding-top: calc(var(--padding-y) + 0.875em);
    }
  }
  &::placeholder {
    color: var(--color-beige-400)
  }
}
.input-container > :not(label) {
  &[disabled=true] {
    opacity: 0.5;
    :is(input, textarea) {
      pointer-events: none;
      cursor: default;
    }
  }
}
.placeholder {
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