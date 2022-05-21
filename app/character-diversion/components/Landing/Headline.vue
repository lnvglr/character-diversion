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
  comments: {
    type: Array,
    default: ['Too boxy', 'This is the original shape', 'This is just right'],
  },
})
const transformedHeadline = computed(() => {
  let letter = -1
  return props.headline
    .split(' ')
    .map(
      (e) =>
        `<span class='word'>${e
          .split('')
          .map((f) => {
            if (f === props.letter) {
              letter++
              return `<span class='letter' data-count='${letter}'>${f}<span class='comment'>${props.comments[letter]}</span></span>`
            } else {
              return f
            }
          })
          .join('')}</span>`
    )
    .join(' ')
})
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
    .comment {
      position: absolute;
      display: inline-block;
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      font-weight: normal;
      text-transform: none;
      background-color: var(--color-amber-500);
      color: white;
      padding: var(--p-3);
      border-radius: var(--rounded-full);
      z-index: 10;
      left: 0;
      margin-top: -2em;
      margin-left: -9em;
    }
    & {
      &[data-count='0'] {
        --Y: 0.02em;
        font-family: Aldrich;
        font-size: 0.975em;
        vertical-align: 0.01em;
        .comment {
          background-color: var(--color-blue-600);
        margin-left: -1em;
        }
      }
      &[data-count='2'] {
        --Y: -0.02em;
        vertical-align: -0.001em;
        font-family: Inter;
        font-size: 0.962em;
        .comment {
          background-color: var(--color-emerald-500);
          margin-top: 9em;
        }
      }
    }

  }
}
</style>