<template>
  <div class="checkbox" role="checkbox">
    <input :id="`${_.uid}`" type="checkbox" :checked="selected" :value="value" @change="updateInput">

    <label
      :for="`${_.uid}`"
      :class="{
        active: selected,
      }"
      role="checkbox"
    >
      <div class="box flex items-center justify-center"><font-awesome-icon v-show="selected" :icon="['fa', 'check']"/></div>
    </label>
  </div>
</template>
<script lang="ts">
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
    },
    modelValue: {
      default: false
    },
  },
  computed: {
    selected() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === 1
    }
  },
  methods: {
    updateInput(event: { target: HTMLInputElement }) {
      let isChecked = event.target.checked as boolean | string[] | number[]
      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        isChecked = newValue
      }
      this.$emit('update:modelValue', isChecked)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.checkbox {
  --bg-color: var(--color-white);
  --color: var(--color-beige-300);
  display: flex;
  max-width: 100%;
  label {
    .box {
      font-size: var(--text-xs);
      position: relative;
      color: white;
      width: var(--w-4);
      height: var(--h-4);
      min-width: var(--w-4);
      box-shadow: inset 0 0 0 var(--border-default) var(--color);
      border-radius: var(--rounded-full);
      background-color: var(--color-white);
    }
    &.active {
      .box {
        --color: var(--color-hover);
        background-color: var(--bg-color);
      }
    }
  }

  $colors: primary,
  secondary,
  info,
  success,
  warning,
  alert;

  @each $color in $colors {
    &.#{$color} {
      --bg-color: var(--color-#{$color}-500);
      --color-hover: var(--color-#{$color}-600);
    }
  }

}
</style>
