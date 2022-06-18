<template>
  <div
    class="range-container relative w-full"
    :class="{
      [color]: true,
      [`text-${color}-500/20`]: true,
      inline: inlineRange
    }"
    :style="`
      --hover-color: var(--color-${color}-600);
      --handle-color: var(--color-${color}-500);
      --track-fill: var(--color-${color}-400);
      --inline-template: ${['4ch', '1fr', (Array.isArray(modelValue) && value[1] !== null) && '3ch'].filter(e => e).join(' ')};
    `"
  :data-min="dataMin" :data-max="dataMax">
    <div class="track" :style="style">
      <input type="range" ref="min" :value="value[0]" @input="input($event.target, 0)" v-bind="$attrs" :step="step" />
      <input v-if="Array.isArray(modelValue) && value[1] !== null" type="range" ref="max" :value="value[1]"
        @input="input($event.target, 1)" v-bind="$attrs" :step="step" />
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
      default: 'primary',
    },
    gap: {
      type: Number,
    },
    inlineRange: {
      type: Boolean,
      default: false,
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
      const max = calc('max', this.value[1] !== null ? this.value[1] : this.value[0])
      const min = calc('min', this.value[1] !== null ? this.value[0] : this.$attrs.min)
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
      const gap = this.gap || Math.max(Math.abs(this.$attrs.max - this.$attrs.min) / 100, this.step)

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
input {
  position: absolute;
  top: 0;
  left: 0;
}
.range-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  --handle-size: 1em;
  --track-size: 0.5em;
  --outline-size: 0;
  --text-color: var(--color-beige-400);
  --handle-color: black;
  --track-bg: var(--color-beige-200);
  --track-fill: black;

  &:before,
  &:after {
    bottom: 0;
    color: var(--text-color);
  }

  &:before {
    content: attr(data-min);
  }

  &:after {
    position: absolute;
    pointer-events: none;
    content: attr(data-max);
    right: 0;
    top : 0;
    text-align: end;
  }

  &.inline {
    display: grid;
    width: 100%;
    grid-template-columns: var(--inline-template);
    grid-template-rows: 1fr;

    .track {
      width: 100%;
    }

    &:before,
    &:after {
      position: relative
    }
  }
}

:global(.dark .track) {
  --track-bg: var(--color-slate-700);
}

.track {
  --start: calc(var(--min) * 1%);
  --end: calc(var(--max) * 1%);
  position: relative;
  height: 0;
  top: 0.5em;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: var(--track-size);
    top: 0;
    bottom: 0;
    border-radius: var(--rounded-default);
    background: linear-gradient(to right,
        var(--track-bg) var(--start),
        var(--track-fill) var(--start),
        var(--track-fill) var(--end),
        var(--track-bg) var(--end));
  }
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

  &::-moz-range-thumb {
    cursor: pointer;
    pointer-events: auto;
    height: var(--handle-size);
    width: var(--handle-size);
    background-color: var(--handle-color);
    transform: translateY(25%);
    border-radius: var(--rounded-full);
    outline: var(--outline-size) solid currentColor;
    transition: outline var(--transition-duration-default);
    border: none;
    &:hover {
      --handle-color: var(--hover-color);
    }
    &:active,
    &:focus {
      --outline-size: var(--outline-width-8);
    }
  }
  &::-webkit-slider-thumb {
    cursor: pointer;
    pointer-events: auto;
    -webkit-appearance: none;
    height: var(--handle-size);
    width: var(--handle-size);
    background-color: var(--handle-color);
    margin-top: 0;
    border-radius: var(--rounded-full);
    outline: var(--outline-size) solid currentColor;
    transition: outline var(--transition-duration-default);

    &:hover {
      --handle-color: var(--hover-color);
    }
    &:active,
    &:focus {
      --outline-size: var(--outline-width-8);
    }
  }

  &[disabled]:not([disabled="false"]) {
    &::-moz-range-thumb {
      pointer-events: none;
    }
    &::-webkit-slider-thumb {
      pointer-events: none;
    }
  }
}
</style>