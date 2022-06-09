<template>
  <div class="checkbox" role="checkbox"
    :style="`
      --bg-color: var(--color-${color}-500);
      --color-hover: var(--color-${color}-600);
    `"
    >
    <input :id="`${_.uid}`" type="checkbox" :checked="selected" :value="value" @change="updateInput">

    <label :for="`${_.uid}`" class="box flex items-center justify-center cursor-pointer" :class="{
      active: selected,
    }" role="checkbox">
      <font-awesome-icon v-show="selected" :icon="['fa', 'check']" />
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
    color: {
      type: String,
      default: () => 'info',
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

:global(.dark .checkbox) {
  --bg-color: var(--color-neutral-900);
}

.checkbox {
  --bg-color: var(--color-white);
  --color: var(--color-beige-300);
  display: flex;
  max-width: 100%;

  label {
    &.box {
      font-size: var(--text-xs);
      position: relative;
      color: white;
      width: var(--w-4);
      height: var(--h-4);
      min-width: var(--w-4);
      box-shadow: inset 0 0 0 var(--border-default) var(--color);
      border-radius: var(--rounded-full);
      background-color: var(--color-white);
      &:hover {
        background-color: var(--color-beige-100);
      }
    }

    &.active {
      &.box {
        --color: var(--color-hover);
        background-color: var(--bg-color);
        &:hover {
          background-color: var(--color-hover);
        }
      }
    }
  }
  &.lg {
    label {
      &.box {
        font-size: var(--text-sm);
        width: var(--w-6);
        height: var(--h-6);
        min-width: var(--w-6);
      }
    }
  }
}
</style>
