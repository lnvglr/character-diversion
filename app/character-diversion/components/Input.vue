<template>
  <div class="input-container relative w-full">
    <label v-if="label" :for="_.uid">{{ label }}</label>
    <component
      :is="'range' === type ? InputRange : InputDefault"
      :type="type"
      :id="_.uid"
      v-model="modelValue"
      v-bind="$attrs"
      :empty="empty || null"
      class="rounded-md w-full focus:outline-blue-500"
      :class="{ border: 'range' !== type }"
    />
    <label class="placeholder" v-if="placeholder" :for="_.uid">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  setup() {
    const InputRange = resolveComponent('InputRange')
    const InputDefault = resolveComponent('InputDefault')
    return {
      InputRange,
      InputDefault,
    }
  },
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
  },
  inheritAttrs: false,
  computed: {
    empty() {
      return (!this.modelValue || String(this.modelValue) === '') && 0 !== this.modelValue
    },
  },
  methods: {
    updateValue(val) {
      const value = val.length !== 0 ? ('number' === this.type ? Number(val) : String(val)) : null
      this.$emit('update:modelValue', value)
    },
  },
}
</script>

<style lang="scss" scoped>
:global(form input) {
  width: 100%;
}
:is(input, textarea):not([type=range]) {
  padding: var(--p-5) var(--padding-x) var(--p-1);
  &,
  &:active,
  &:focus {
    &,
    & ~ .placeholder {
      --padding-x: var(--p-3);
      --padding-y: var(--p-2);
    }
  }
}
.placeholder,
:is(input, textarea):not([type=range]):focus ~ .placeholder,
:is(input, textarea):not([type=range]):active ~ .placeholder {
  position: absolute;
  z-index: 100;
  top: var(--padding-y);
  left: calc(var(--padding-x) + var(--border-default));
  transform: translateZ(0);
  pointer-events: none;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-function-default);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  will-change: transform;
  color: var(--color-slate-400);
}

.placeholder,
:is(input, textarea):not([type=range]):not(:disabled):focus ~ .placeholder,
:is(input, textarea):not([type=range]):not(:disabled):active ~ .placeholder {
  font-size: var(--text-xs);
  color: var(--color-slate-700);
}
:is(input, textarea):not([type=range])[empty]:not(:focus) ~ .placeholder {
  --padding-y: var(--p-3);
  --padding-x: var(--p-4);
  font-size: 1em;
  transform: scale(1);
  color: var(--color-slate-400);
}
</style>