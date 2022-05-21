<template>
  <h1 class="headline font-bold uppercase" v-html="transformedHeadline"></h1>
</template>

<script setup lang="ts">
const props = defineProps({
  headline: {
    type: String,
    default: 'Character Diversion',
  },
  letter: {
    type: String,
    default: 'r',
  },
})
const transformedHeadline = computed(() =>
  props.headline
    .split(' ')
    .map(
      (e) =>
        `<span class='word'>${e
          .split('')
          .map((e) => (e.toLowerCase() == props.letter ? `<span class='letter'>${e}</span>` : e))
          .join('')}</span>`
    )
    .join(' ')
)
</script>

<style lang="scss">
.headline {
  --font-size: var(--text-8xl);
  font-size: var(--font-size);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.1;
  .word {
    white-space: nowrap;
  }
  .letter {
    --Y: 0;
    position: relative;
    height: var(--font-size);
    line-height: 0;
    &::before,
    &:after {
      --size: var(--font-size);
      content: '';
      width: var(--size);
      left: 50%;
      display: block;
      position: absolute;
      transform: translate(-50%, var(--Y));
    }
    &::before {
      border-bottom: 1px solid currentColor;
      bottom: 20px;
    }
    &::after {
      border-radius: var(--rounded-lg);
      border: 1px solid currentColor;
      height: var(--size);
      bottom: 0;
      bottom: calc(var(--size) / 16);
    }
    &:hover, & {
      cursor: pointer;
      &:first-child {
        --Y: 0.02em;
        font-family: Aldrich;
        font-size: 0.975em;
        vertical-align: 0.01em;
      }
      &:only-child {
        --Y: -0.02em;
        vertical-align: -0.001em;
        font-family: Inter;
        font-size: 0.962em;
      }
    }
  }
}
</style>e>