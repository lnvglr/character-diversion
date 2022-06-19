<template>
  <transition
    name="expand"
    class="container"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    :style="[
      { ['--duration']: duration + 'ms' },
      { ['--timing']: timing },
      { ['--scale']: scale },
      { ['--opacity']: opacity },
    ]"
  >
    <slot></slot>
  </transition>
</template>
<script lang="ts">
export default defineComponent({
  name: "TransitionExpand",
  props: {
    opacity: {
      type: Number,
      default: 0,
    },
    scale: {
      type: Number,
      default: 0.9,
    },
    duration: {
      type: Number,
      default: 300,
    },
    timing: {
      type: String,
      default: "ease-in-out",
    },
  },
  data() {
    return {
      margin: null,
      padding: null,
    };
  },
  methods: {
    afterEnter(element: HTMLElement) {
      // eslint-disable-next-line no-param-reassign
      element.style.height = "auto";
    },
    beforeEnter(element: HTMLElement) {
      this.margin = getComputedStyle(element).getPropertyValue("margin");
      this.margin = getComputedStyle(element).getPropertyValue("padding");

      element.style.margin = 0;
      element.style.marginBottom = 0;
      element.style.marginLeft = this.margin;
      element.style.marginRight = this.margin;

      element.style.padding = 0;
      element.style.paddingBottom = 0;
      element.style.paddingLeft = this.padding;
      element.style.paddingRight = this.padding;

      element.style.opacity = this.opacity;
      element.style.transform = `scale(${this.scale})`;
    },
    enter(element: HTMLElement) {
      const { width } = getComputedStyle(element);
      /* eslint-disable no-param-reassign */
      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";
      /* eslint-enable */
      const { height } = getComputedStyle(element);
      /* eslint-disable no-param-reassign */
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      element.style.marginTop = this.margin;
      element.style.marginBottom = this.margin;
      element.style.marginLeft = this.margin;
      element.style.marginRight = this.margin;

      element.style.paddingTop = this.padding;
      element.style.paddingBottom = this.padding;
      element.style.paddingLeft = this.padding;
      element.style.paddingRight = this.padding;

      element.style.opacity = 1;
      element.style.transform = "scale(1)";
      /* eslint-enable */
      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height;
      requestAnimationFrame(() => {
        // eslint-disable-next-line no-param-reassign
        element.style.height = height;
      });
    },
    leave(element: HTMLElement) {
      const { height } = getComputedStyle(element);
      // eslint-disable-next-line no-param-reassign
      element.style.height = height;

      element.style.marginTop = this.margin;
      element.style.marginBottom = this.margin;
      element.style.marginLeft = this.margin;
      element.style.marginRight = this.margin;

      element.style.paddingTop = this.padding;
      element.style.paddingBottom = this.padding;
      element.style.paddingLeft = this.padding;
      element.style.paddingRight = this.padding;

      element.style.opacity = this.opacity;
      element.style.transform = `scale(${this.scale})`;
      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height;
      requestAnimationFrame(() => {
        // eslint-disable-next-line no-param-reassign
        element.style.height = 0;

        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        element.style.marginLeft = this.margin;
        element.style.marginRight = this.margin;

        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.paddingLeft = this.padding;
        element.style.paddingRight = this.padding;

        element.style.opacity = this.opacity;
        element.style.transform = `scale(${this.scale})`;
      });
    },
  },
})
</script>

<style scoped>
* {
  will-change: height, margin, padding, transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.expand-enter-active,
.expand-leave-active {
  transition: all var(--duration) var(--timing);
  overflow: hidden;
}
.expand-enter,
.expand-leave-to {
  height: 0;
  opacity: var(--opacity);
  transform: scale(var(--scale));
  padding: 0;
  margin: 0;
}
</style>
