<template>
  <button :title="title" :disabled="disabled" :class="[color]" class="flex gap-2">
    <slot></slot>
    <font-awesome-icon v-if="icon" :icon="['fa', icon]" />
  </button>
</template>
<script lang="ts">
export default {
  name: 'Button',
  props: {
    name: String,
    title: String,
    vertical: Boolean,
    disabled: Boolean,
    icon: {
      type: [String, Boolean]
    },
    color: {
      type: String,
      default: '',
      validator: (e: string) => [
        '',
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'alert',
      ].includes(e)
    }
  },
}
</script>

<style lang="scss" scoped>
button:hover {

  &> :deep(*),
  :deep(svg),
  :deep(path) {
    fill: currentColor !important;
  }
}

button {
  --size: 2rem;
  --font-size: inherit;
  --color: white;
  --background-color: black;
  --border-color: var(--background-color);
  --padding: var(--p-2) var(--p-3);
  height: var(--size);
  border-radius: var(--rounded-md);
  position: relative;
  padding: var(--padding);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size);
  line-height: 1.1;
  border: none;
  color: var(--color);
  background-color: var(--background-color);
  box-shadow: 0 0 0 var(--border-default) var(--border-color);
  text-align: center;
  margin: 0 calc(var(--border-default) * -2);
  transition: all var(--transition-duration-default) ease-in-out;

  &:hover {
    --border-color: currentColor;
    --color: var(--background-color);
    --background-color: var(--color);
    cursor: pointer;
  }

  &:focus {
    box-shadow: 0 0 0 3px var(--primary-focus);
  }

  &:active {
    --color: currentColor;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }

  &.fill {
    --color: var(--black);
    background: var(--color);
    color: var(--white);
    box-shadow: none;
  }

  &.clear {
    box-shadow: none;
  }

  &.round {
    --padding: 0;
    min-width: var(--size);
    max-width: var(--size);
  }

  &.center {
    margin-inline: auto;
  }

  &.initial-height {
    height: initial;
    min-height: var(--size);
  }

  &.small {
    --size: 1.5rem;
  }

  &.large {
    --size: var(--input-size);
    --font-size: var(--text-xl);
  }

  $colors: primary,
  secondary,
  success,
  warning,
  alert;

  @each $color in $colors {
    &.#{$color} {
      --background-color: var(--color-#{$color}-500);

      &:hover {
        --color: white;
        --background-color: var(--color-#{$color}-700);
        --border-color: var(--background-color);
      }
    }
  }
}
</style>