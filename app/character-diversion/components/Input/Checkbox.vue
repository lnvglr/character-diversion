<template>
  <div class="checkbox" role="checkbox"
    :style="`
      --bg-color: var(--color-${color}-500);
      --color-hover: var(--color-${color}-600);
    `"
    >
    <input :id="`${uid}`" type="checkbox" :checked="checked" :value="modelValue" @change="change" />

    <label :for="`${uid}`" class="box flex items-center justify-center cursor-pointer" :class="{
      active: checked,
    }" role="checkbox">
      <font-awesome-icon v-show="checked" :icon="['fa', 'check']" />
    </label>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    itemValue: {
      type: [String, Number],
    },
    color: {
      type: String,
      default: () => 'info',
    },
  },
  mounted() {
    this.uid = (Math.random().toString(36)).substring(2, 15)
  },
  data() {
    return {
      uid: '',
      checked: false,
    }
  },
  watch: {
    "$attrs.value": {
      handler(val) {
        console.log(val)
        if (val instanceof Array) {
          this.checked = val.includes(this.itemValue)
        } else {
          this.checked = val === this.itemValue
        }
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    change() {
      this.checked = !this.checked
      let value: boolean | any[] = this.checked
      if (this.$attrs.value instanceof Array) {
        value = this.checked ? [...this.$attrs.value, this.itemValue] : this.$attrs.value.filter(item => item !== this.itemValue)
      }
      this.$emit('update:modelValue', value)
    },
  }
})
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
