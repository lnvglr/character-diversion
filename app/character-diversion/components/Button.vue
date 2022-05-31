<template>
  <component :is="to ? NuxtLink : ButtonDefault" :to="to" :title="title" :disabled="disabled" :class="color" class="button flex items-center justify-center gap-2">
    <slot></slot>
    <font-awesome-icon v-if="icon" :icon="['fa', icon]" fixed-width />
  </component>
</template>
<script lang="ts">
export default {
  name: 'Button',
  setup() {
		const NuxtLink = resolveComponent('NuxtLink')
    const ButtonDefault = resolveComponent('ButtonDefault')
    return {
			NuxtLink,
			ButtonDefault,
    }
  },
  props: {
    name: String,
    title: String,
    vertical: Boolean,
    disabled: Boolean,
    to: {
      type: String,
      default: '',
    },
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
.button:hover {

  &> :deep(*),
  :deep(svg),
  :deep(path) {
    fill: currentColor !important;
  }
}
:global(:where(.button)) {
  margin: 0 calc(var(--border-default) * -2);
}
:where(.button) {
  --size: var(--h-8);
  --font-size: inherit;
  --color: white;
  --background-color: black;
  --border-color: transparent;
  --padding: var(--p-2) var(--p-3);
  --bg-opacity: 1;
  --border-radius: var(--rounded-md);
  height: var(--size);
  border-radius: var(--border-radius);
  position: relative;
  padding: var(--padding);
  text-align: center;
  font-size: var(--font-size);
  line-height: 1.1;
  border: none;
  color: var(--color);
  // background-color: var(--background-color);
  box-shadow: inset 0 0 0 var(--border-default) var(--border-color);
  text-align: center;
  transition: all var(--transition-duration-default) ease-in-out;
  z-index: 1;
  white-space: nowrap;

  &:before {
    transition: all var(--transition-duration-default) ease-in-out;
    border-radius: var(--border-radius);
    opacity: var(--bg-opacity);
    background-color: var(--background-color);
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &:hover {
    --border-color: currentColor;
    --color: var(--background-color);
    --bg-opacity: 0;
    cursor: pointer;
  }

  &:focus {
    box-shadow: 0 0 0 3px var(--color-info-500);
  }

  &:active, &.active {
    --color: var(--color-white);
    --background-color: var(--color-info-500);
    // --color: currentColor;
    &:hover {
      --background-color: var(--color-info-600);
      --bg-opacity: 1;
    }
  }

  &[disabled=true] {
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
    --color: var(--background-color);
    // background-color: transparent;
    box-shadow: none;
    --bg-opacity: 0;
    &:hover {
      --background-color: var(--color-info-500);
      --bg-opacity: 0.1;
    }
  }

  &.round {
    --padding: 0;
    min-width: var(--size);
    max-width: var(--size);
  }
  &.small {
    --size: var(--h-6);
    --padding: var(--p-1) var(--p-2);
  }
  &.large {
    --size: var(--h-12);
    --padding: var(--p-4) var(--p-5);
  }

  &.center {
    margin-inline: auto;
  }

  &.initial-height {
    height: initial;
    min-height: var(--size);
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
				--bg-opacity: 1;
        --background-color: var(--color-#{$color}-700);
        --border-color: var(--background-color);
      }
    }
  }
}
</style>