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
      class="rounded-md w-full focus:outline-info-500"
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
.input-container {
  --padding-x: var(--p-3);
  --padding-y: var(--p-2);
}
input {
  height: var(--h-12)
}
:global(form :is(input, textarea)) {
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
  color: var(--color-slate-400);
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
  color: var(--color-slate-700);
}
</style>