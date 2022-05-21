<template>
  <button
    class="flex items-center justify-center duration-100 py-3 px-4"
    :style="`--color: var(--color-${color}-500); --hover: var(--color-${color}-600);--radius: var(${borderRadius})`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    radius: {
      type: String,
      default: 'pill',
    },
    color: {
      type: String,
      default: 'orange',
    },
  },
  computed: {
    borderRadius() {
      switch (this.radius) {
        case 'rounded':
          return '--rounded-md'
        case 'pill':
          return '--rounded-full'
        case 'sharp':
          return '--rounded-0'
        default:
          return '--rounded-md'
      }
    },
    bgColor() {
      return `--color-${this.color}-500`
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  color: white;
  background-color: var(--color);
  border-radius: var(--radius);
  line-height: 1;
white-space: nowrap;
  &:after {
    content: '→';
    margin-left: var(--p-2);
    transition: 200ms;
  }
  &:hover {
    &:after {
      transform: translateX(var(--p-1));
    }
    background-color: var(--hover);
  }
}
</style>