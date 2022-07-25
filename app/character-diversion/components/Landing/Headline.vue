<template>
  <!-- <h1 class="headline font-bold uppercase" v-html="headline"></h1> -->
  <h1 class="headline font-bold uppercase">
    <span v-for="s in type" :key="s">
      <VDropdown
        :distance="12"
        class="inline-block -my-3 rounded-md bg-info-500 hover:bg-info-600 border border-info-700"
        style="padding: 0.25em 0.375em 0;"
        v-if="s === key"
      >
        <button class="text-inherit uppercase">{{s}}</button>
        <template #popper>
          <div class="px-5 py-3 max-w-md">It doesn't matter if you're a designer, a writer, or just a lover of fonts. Share what you think about the way that text is presented to you in the world around you—and how it can be better.</div>
        </template>
      </VDropdown>
      <template v-else>{{s}}</template>
    </span>
  </h1>
  <!-- <h1 class="headline font-bold uppercase">
    <template v-for="word in transformedHeadline" :key="word">
      <span v-if="word.length === 1" class="nowrap inline-block">{{ word[0] }}</span>
      <span v-else class="inline-block">
        <template v-for="(part, i) in word">
          <span v-if="part === ''" class="relative z-0">
            <VDropdown
              :distance="12"
              :skidding="-8"
              placement="bottom-start"
              class="letter absolute left-0 top-0"
            >
              <button class="text-inherit uppercase"></button>
              <template #popper>
                <ListOpinions
                  :opinions="$f.glyphMethods.glyphHasOpinion(3, 57)"
                  class="w-[360px] min-w-[360px]"
                />
              </template>
            </VDropdown>
            <span class="relative pointer-events-none" :data-count="increment() % 3">{{ letter }}</span>
          </span>
          <span v-else class="relative z-10 pointer-events-none">{{ part }}</span>
        </template>
      </span>
    </template>
  </h1> -->
</template>

<script lang="ts">
export default defineComponent({
  props: {
    headline: {
      type: String,
      default: "Character Diversion",
    },
    letter: {
      type: String,
      default: "r",
    },
  },
  data() {
    return {
      letterIndex: 0,
    };
  },
  computed: {
    key() {
      return this.$t("hero.copy.key");
    },
    type() {
      return [this.headline.split(this.key)[0], this.key, this.headline.split(this.key)[1]]
    },
    transformedHeadline() {
      return this.headline.split(" ").map((word) => {
        return word.split(this.letter.toLowerCase());
      });
    },
  },
  methods: {
    reset() {
      this.letterIndex = 0
    },
    increment() {
      return this.letterIndex++
    },
  }
});
</script>

<style lang="scss">
.headline {
  --font-size: var(--text-7xl);
  @media screen and (max-width: 1024px) {
    --font-size: var(--text-5xl);
  }
  @media screen and (max-width: 768px) {
    --font-size: var(--text-4xl);
  }
  @media screen and (max-width: 480px) {
    --font-size: var(--text-3xl);
  }
  & > div {
    margin-right: 0.5ex;
  }
  font-family: "Neue Machina", "Gramatika", var(--font-sans);
  font-size: var(--font-size);
  font-weight: bold;
  text-transform: uppercase;
  // text-align: center;
  line-height: 1.1;
  .word {
    white-space: nowrap;
  }
  .letter {
    --Y: 0.05em;
    --size: var(--font-size);
    position: absolute;
    // transform: translateX(-0.17em);
    transform: translate(-0.15em, -0.37em);
    // top: 0;
    // left: 0;
    button {
      // background: #ffaaaa80;
      width: 1em;
      height: 1em;
      position: relative;
      top: calc(1em / 6);
      border-radius: var(--rounded-lg);
    }

    &::before,
    &:after {
      pointer-events: none;
      content: "";
      width: 1em;
      left: 50%;
      display: block;
      position: absolute;
      transform: translate(-50%, var(--Y));
    }
    &::before {
      border-bottom: 1px solid currentColor;
      bottom: 0.24em;
    }
    &::after {
      border-radius: var(--rounded-lg);
      border: 1px solid currentColor;
      height: 1em;
      bottom: calc(1em / 16);
    }
    .comment {
      position: absolute;
      display: inline-block;
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      font-weight: normal;
      text-transform: none;
      background-color: var(--color-warning-500);
      color: white;
      padding: var(--p-3);
      border-radius: var(--rounded-full);
      z-index: 10;
      left: 0;
      margin-top: -2em;
      margin-left: calc(var(--font-size) * -1);

      @media screen and (max-width: 480px) {
        display: none;
      }
    }
    & ~ [data-count="1"] {
      --Y: 0.02em;
      font-family: Aldrich, var(--font-sans);
      font-size: 0.975em;
      vertical-align: 0.01em;
      .comment {
        background-color: var(--color-info-600);
        margin-left: -1em;
      }
    }
    & ~ [data-count="2"] {
      --Y: -0.02em;
      vertical-align: -0.001em;
      font-family: Inter, var(--font-sans);
      font-size: 0.962em;
      .comment {
        background-color: var(--color-emerald-500);
        margin-top: var(--font-size);
        transform: translateX(50%);
      }
    }
  }
}
</style>
