<template>
  <div
    :class="`
      range-container
      relative
      mt-2
      h-10
      w-full
      text-amber-500/20
    `"
    :style="`
      --handle-color: var(--color-${color}-500);
      --track-fill: var(--color-${color}-300);
    `"
    :data-min="dataMin"
    :data-max="dataMax"
  >
    <div :style="style" class="slider-track absolute"></div>
    <div class="relative">
      <input
        type="range"
        ref="min"
        :value="value[0]"
        @input="input($event.target, 0)"
        v-bind="$attrs"
        :step="step"
        class="absolute l-0 t-0"
      />
      <input
        v-if="Array.isArray(modelValue)"
        type="range"
        ref="max"
        :value="value[1]"
        @input="input($event.target, 1)"
        v-bind="$attrs"
        :step="step"
        class="absolute l-0 t-0"
      />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    type: {
      type: String,
    },
    modelValue: {
      type: [Array, Number],
    },
    step: {
      type: Number,
      default: 0.01,
    },
    decimal: {
      type: Number,
    },
    color: {
      type: String,
      default: 'amber',
    },
    gap: {
      type: Number,
    },
  },
  computed: {
    value() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue
      }
      return [this.modelValue]
    },
    style() {
      const calc = (name: string, val: number) =>
        `--${name}: ${(
          (100 / (this.$attrs.max - this.$attrs.min)) *
          (val - this.$attrs.min)
        ).toFixed(this.decimalPlaces)};`
      const max = calc('max', this.value[1] ? this.value[1] : this.value[0])
      const min = calc('min', this.value[1] ? this.value[0] : '0')
      return `${min} ${max}`
    },
    decimalPlaces() {
      return String(this.decimal || this.step)?.split('.')[1]?.length || 0
    },
    dataMin() {
      return this.value[0]?.toFixed(this.decimalPlaces)
    },
    dataMax() {
      if (!Array.isArray(this.modelValue)) return ''
      return this.value[1]?.toFixed(this.decimalPlaces)
    },
  },
  methods: {
    input(eventTarget: HTMLInputElement, index: number) {
      let value = eventTarget.valueAsNumber
      const newValues = this.modelValue
      const gap = this.gap || Math.max((this.$attrs.max - this.$attrs.min) / 100, this.step)

      if (!Array.isArray(newValues)) {
        return this.$emit('update:modelValue', value)
      }
      if (index === 0 && newValues[1] - value <= gap) {
        value = newValues[1] - gap
        this.$refs.min.value = value
      } else if (index === 1 && value - newValues[0] <= gap) {
        value = newValues[0] + gap
        this.$refs.max.value = value
      }
      newValues[index] = value
      this.$emit('update:modelValue', newValues)
    },
  },
}
</script>
<style lang="scss" scoped>
.range-container {
  --handle-size: 1em;
  --track-size: 0.5em;
  --track-bg: var(--color-slate-200);
  --outline-size: 0;
  &:before,
  &:after {
    bottom: 0;
    position: absolute;
    color: var(--color-slate-400);
  }
  &:before {
    content: attr(data-min);
  }
  &:after {
    content: attr(data-max);
    right: 0;
  }
}

:global(.dark .slider-track) {
  --track-bg: var(--color-slate-700);
}
.slider-track {
  --start: calc(var(--min) * 1%);
  --end: calc(var(--max) * 1%);
  width: 100%;
  height: var(--track-size);
  top: 0;
  bottom: 0;
  border-radius: var(--rounded-default);
  background: linear-gradient(
    to right,
    var(--track-bg) var(--start),
    var(--track-fill) var(--start),
    var(--track-fill) var(--end),
    var(--track-bg) var(--end)
  );
}

input[type='range'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: var(--track-size);
  }
  &::-moz-range-track {
    -moz-appearance: none;
    height: var(--track-size);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    pointer-events: auto;
    height: var(--handle-size);
    width: var(--handle-size);
    background-color: var(--handle-color);
    margin-top: 0;
    border-radius: var(--rounded-full);
    outline: var(--outline-size) solid currentColor;
    transition: outline var(--transition-duration-default);
    &:active,
    &:focus {
      --outline-size: var(--outline-width-8);
    }
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    pointer-events: auto;
    height: var(--handle-size);
    width: var(--handle-size);
    background-color: var(--handle-color);
    border-radius: var(--border-full);
  }
}
</style>