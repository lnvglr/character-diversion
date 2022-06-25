<template>
  <component :is="to ? NuxtLink : ButtonDefault" :to="to" :title="title" :disabled="disabled" :class="color" class="button items-center justify-center gap-2">
    <slot></slot>
    <Icon v-if="iconName" :name="iconName || icon" />
  </component>
</template>
<script lang="ts">
export default defineComponent({
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
      // validator: (e: string) => [
      //   '',
      //   'primary',
      //   'secondary',
      //   'info',
      //   'success',
      //   'warning',
      //   'alert',
      // ].includes(e)
    }
  },
  computed: {
    iconName() {
      switch(this.$i18n.locale) {
        case 'he':
          if (this.icon === 'arrow-left') {
            return 'arrow-right'
          }
          if (this.icon === 'arrow-right') {
            return 'arrow-left'
          }
          break
      }
      return this.icon
    },
  },
})
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
  display: flex;
  margin: 0 calc(var(--border-default) * -2);
  --border-color: transparent;
  --background-color: var(--color-neutral-800);
  border: none;
  font-size: 1em;
}
:global(:is(.dark .button)) {
  --color:  var(--color-neutral-800);
  --background-color:  var(--color-neutral-200);
  margin: 0 calc(var(--border-default) * -2);
}
:where(.button) {
  --size: var(--h-8);
  --color: white;
  --padding: var(--p-2) var(--p-3);
  --bg-opacity: 1;
  --border-radius: var(--rounded-md);
  height: var(--size);
  border-radius: var(--border-radius);
  position: relative;
  padding: var(--padding);
  text-align: center;
  line-height: 1.1;
  color: var(--color);
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

  &:focus, &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-info-200);
    outline: none;
    z-index: 10;
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

  &[disabled]:not([disabled=false]) {
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
    &:hover, &.active {
      --background-color: var(--color-info-500);
      --bg-opacity: 0.1;
    }
  }

  &.round {
    --padding: 0;
    min-width: var(--size);
    max-width: var(--size);
  }
  &.xxs {
    font-size: var(--text-xs);
    --size: var(--h-5);
    --padding: var(--p-0) var(--p-1);
  }
  &.xs {
    font-size: var(--text-xs);
    --size: var(--h-6);
    --padding: var(--p-0) var(--p-1);
  }
  &.sm {
    --size: var(--h-8);
    --padding: var(--p-1) var(--p-2);
  }
  &.lg {
    --size: var(--h-12);
    --padding: var(--p-4) var(--p-5);
  }
  &.xl {
    font-size: var(--text-lg);
    --size: var(--h-16);
    --padding: var(--p-6) var(--p-7);
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
  info,
  beige,
  success,
  warning,
  alert;

  @each $color in $colors {
    &.#{"" + $color} {
      &, &.clear:hover {
        --background-color: var(--color-#{$color}-500);
      }
      &:not(.clear):hover {
        --color: white;
				--bg-opacity: 1;
        --background-color: var(--color-#{$color}-600);
        --border-color: var(--background-color);
      }
    }
  }
}
// :global(.input-group > :is(.input, .button)) {
//   &:first-child {
//     border-top-right-radius: 0 !important;
//     border-bottom-right-radius: 0 !important;
//   }
//   &:last-child {
//     border-top-left-radius: 0 !important;
//     border-bottom-left-radius: 0 !important;
//   }
// }
</style>
<style lang="scss">
.input-group {
  display: flex;
  :is(input, .button) {
    &:first-child {
      &, &:before {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &:last-child {
      &, &:before {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>