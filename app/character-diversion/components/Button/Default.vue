<template>
  <button
    class="flex items-center justify-center duration-100 py-3 px-4 hover:bg-opacity-50"
    :style="`--color-default: var(--color-${color}-500); --color-dark: var(--color-${color}-600); --color-light: var(--color-${color}-100); --radius: var(${borderRadius})`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    radius: {
      type: String,
      default: 'rounded',
    },
    color: {
      type: String,
      default: 'blue',
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
  background-color: var(--color-default);
  border-radius: var(--radius);
  line-height: 1;
  white-space: nowrap;
  &.arrow:after {
    content: '→';
    margin-left: var(--p-2);
    transition: 200ms;
  }
  &:hover {
    --color-default: var(--color-dark) !important;
    &.arrow:after {
      transform: translateX(var(--p-1));
    }
  }
  &.clear {
    color: var(--color-default);
    background-color: transparent;
    &:hover {
      background-color: var(--color-light);
    }
  }
}
:global(button.clear:hover) {
  // background-color: var(--color-light) !important;
  // color: var(--color-dark) !important;
  // opacity: 0.5;
  // color: var(--color-light);
  // background-color: var(--color-default) !important;
}
</style>