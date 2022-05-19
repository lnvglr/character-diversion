<template>
  <div class="input-container relative w-full mb-5">
    <label v-if="label" :for="_.uid">{{ label }}</label>
    <InputRange
      v-if="'range' === type"
      :type="type"
      :id="_.uid"
      v-model="modelValue"
      v-bind="$attrs"
      :class="{ empty }"
      class="rounded-md w-full focus:outline-blue-500"
    />
    <InputDefault
      v-else
      :type="type"
      :id="_.uid"
      v-model="modelValue"
      v-bind="$attrs"

      :class="{ empty }"
      class="input border rounded-md w-full focus:outline-blue-500"
    />
    <label class="placeholder" v-if="placeholder" :for="_.uid">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
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
.input {
  padding: var(--p-5) var(--padding-x) var(--p-1);
  &, &:active, &:focus {
    &, & ~ .placeholder {
      --padding-x: var(--p-3);
      --padding-y: var(--p-2);
    }
  }
}
.placeholder,
.input:focus ~ .placeholder,
.input:active ~ .placeholder {
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
.input:not(:disabled):focus ~ .placeholder,
.input:not(:disabled):active ~ .placeholder {
  font-size: var(--text-xs);
  color: var(--color-slate-700);
}
.input.empty:not(:focus) ~ .placeholder {
  --padding-y: var(--p-3);
  --padding-x: var(--p-4);
  font-size: 1em;
  transform: scale(1);
  color: var(--color-slate-400);
}
</style>