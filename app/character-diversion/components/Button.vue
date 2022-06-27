<template>
  <component
    :is="to ? NuxtLink : ButtonDefault"
    :to="to"
    :title="title"
    :disabled="disabled"
    :class="{ [color]: color, [`active-${activeColor}`]: activeColor, inv: invert }"
    class="button items-center justify-center"
  >
    <span class="flex items-center justify-center gap-2">
      <slot></slot>
      <Icon v-if="iconName" :name="iconName || icon" />
    </span>
  </component>
</template>
<script lang="ts">
export default defineComponent({
  name: "Button",
  setup() {
    const NuxtLink = resolveComponent("NuxtLink");
    const ButtonDefault = resolveComponent("ButtonDefault");
    return {
      NuxtLink,
      ButtonDefault,
    };
  },
  data() {
    return {
      invert: false,
    };
  },
  props: {
    name: String,
    title: String,
    vertical: Boolean,
    disabled: Boolean,
    to: {
      type: String,
    },
    icon: {
      type: [String, Boolean],
    },
    color: {
      type: String,
      default: "",
    },
    activeColor: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$nextTick(() => {
      const color = window.getComputedStyle(this.$el).color;
      const rgb = color.match(/\d+/g);
      if (this.$f.utils.getRelativeLuminance(rgb) > 50) {
        this.invert = this.color === "" && true;
      }
    });
  },
  computed: {
    iconName() {
      switch (this.$i18n.locale) {
        case "he":
          if (this.icon === "arrow-left") {
            return "arrow-right";
          }
          if (this.icon === "arrow-right") {
            return "arrow-left";
          }
          break;
      }
      return this.icon;
    },
  },
});
</script>

<style lang="scss" scoped>
.button:hover {
  & > :deep(*),
  :deep(svg),
  :deep(path) {
    fill: currentColor !important;
  }
}
$colors: primary, secondary, info, beige, success, warning, alert;
:global(:where(.button)) {
  display: flex;
  margin: 0 calc(var(--border-default) * -2);
  border: none;
  font-size: 1em;
}
// :global(:where(.button.inv span)) {
//   color: black;
//   fill: black;
// }
// :global(:is(.dark .button)) {
//   --color: var(--color-neutral-800);
//   --background-color: var(--color-neutral-200);
//   margin: 0 calc(var(--border-default) * -2);
// }
.button {
  --size: var(--h-8);
  --padding: var(--p-2) var(--p-3);
  --bg-opacity: 1;
  --border-radius: var(--rounded-md);
  --color: white;
  --background: currentColor;
  --hover: transparent;
  height: var(--size);
  border-radius: var(--border-radius);
  position: relative;
  padding: var(--padding);
  text-align: center;
  line-height: 1.1;
  box-shadow: inset 0 0 0 var(--border-default) var(--border-color);
  text-align: center;
  transition: all var(--transition-duration-default) ease-in-out;
  z-index: 1;
  white-space: nowrap;
  span {
    color: var(--color);
  }

  @each $color in $colors {
    &.#{"" + $color} {
      --background: var(--color-#{$color}-500);
      --hover: var(--color-#{$color}-600);
      color: white;
      &:hover {
        color: white
      }
      &.clear {
        --color: var(--color-#{$color}-500);
        &:hover {
          --color: var(--color-#{$color}-500);
          --bg-opacity: 0.1;
        }
      }
      &.inv {
        color: var(--color-#{$color}-700);
      }
    }
    &.router-link-active {
      &.clear, & {
        --color: var(--color-primary-500);
      }
    }
  }
  &.clear {
    --bg-opacity: 0;
    --color: black;
    --hover: var(--color);
    box-shadow: none;
    &:hover {
      --bg-opacity: 0.1;
    }
  }

  &:hover {
    --background: var(--hover);
    --border-color: currentColor;
    cursor: pointer;
    --color: currentColor;
  }

  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 1px var(--color);
    outline: none;
    z-index: 10;
  }

  // &:active,
  // &.active {
  //   --color: var(--color-white);
  //   --background-color: var(--color-info-500);
  //   &:hover {
  //     --bg-opacity: 1;
  //   }
  // }

  &[disabled]:not([disabled="false"]) {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }

  &.round {
    --padding: 0;
    min-width: var(--size);
    max-width: var(--size);
    &,
    &:before {
      border-radius: var(--rounded-full);
    }
  }
  &.fill {
    --background: white;
    --color: currentColor;
    &:hover {
      --background: currentColor;
      --color: white;
      // --border-color: white;
      box-shadow: inset 0 0 0 var(--border-default) var(--border-color);
    }
  }
  &.xxs {
    font-size: var(--text-xs);
    --size: var(--h-5);
    --padding: var(--p-0) var(--p-1);
  }
  &.xs {
    // font-size: var(--text-lg);
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


  &:before {
    transition: all var(--transition-duration-default) ease-in-out;
    border-radius: var(--border-radius);
    opacity: var(--bg-opacity);
    background-color: var(--background);
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
<style lang="scss">
.input-group {
  display: flex;
  .button {
    &:first-child {
      &,
      &:before {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &:last-child {
      &,
      &:before {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .input-container {
    input {
      height: var(--h-12);
    }
    &:first-child {
     input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &:last-child {
      input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

  }
}
</style>
