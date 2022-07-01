<template>
  <div class="flex flex-col overflow-auto w-full">
    <!-- <Header class="border-0" iconClass="text-black">Character Diversion</Header> -->
    <main class="text-black grow gap-0.5 flex flex-col">
      <Card class="text-white w-full bg-primary-500 dark:bg-neutral-800">
        <div class="py-16 sm:py-32 px-10 max-w-4xl mx-auto">
          <!-- <Input v-model="headine" class="text-black" />
				<Input v-model="letter" class="text-black" /> -->
          <LandingHeadline :headline="headine" :letter="letter" class="mb-12" />
          <div
            class="max-w-4xl mx-auto flex gap-6 flex-col items-start md:gap-24 md:flex-row md:items-center"
          >
            <div class="text-md md:text-lg">
              Designers and foundries explore, discuss, and work on their typefaces on
              Character Diversion—the most adequate platform for typographic discourse in
              the world.
            </div>
            <div>
              <Button
                to="/discourse"
                icon="arrow-right"
                class="lg fill text-primary-500"
                style="--border-color: white"
                >{{ $t("explore") }}</Button
              >
            </div>
          </div>
        </div>
      </Card>

      <Card v-if="!$strapi.user">
        <div class="py-24 max-w-2xl mx-auto gap-5 flex flex-col items-center">
          <h2 class="text-xl font-bold">Join the Community</h2>
          <div class="flex items-center gap-5 ml-auto">
            <Button to="/login" v-if="$route.name !== 'login'" class="clear lg"
              >Login</Button
            >
            <Button to="/register" v-if="$route.name !== 'register'" class="lg"
              >Sign Up</Button
            >
          </div>
        </div>
      </Card>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-0.5 w-full">
        <DiscourseCard
          v-for="(discourseItem, i) in discourses"
          :key="discourseItem.id"
          :discourse="discourseItem"
        />
      </div>
      <Card>
        <div class="py-24 max-w-2xl mx-auto">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center px-5 gap-y-5 gap-x-24"
          >
            <div class="">
              <h2 class="text-4xl font-bold">{{ $t("discover") }}</h2>
              <p class="mt-2">
                Explore discourses type and discover a new way to delve into the world of
                typography, one character at a time.
              </p>
            </div>
            <Button to="/discourse" icon="arrow-right" class="lg">{{
              $t("discover.discourses")
            }}</Button>
          </div>
        </div>
      </Card>
      <Card class="bg-beige-300">
        <div class="py-24 max-w-4xl mx-auto">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center px-5 gap-y-5 gap-x-12"
          >
          <div class="flex flex-row sm:flex-col md:flex-row gap-6">
            <div
              class="relative w-36 h-36 bg-white dark:text-neutral-800 rounded-sm flex items-center justify-center min-w-[6rem]"
            >
              <span class="font-display font-bold text-[8rem] leading-none pt-6"
                >C</span
              >
              <OpinionLink
                v-if="glyphs"
                :glyph="glyphs[0]"
                :opinions="glyphs[0].opinions"
                :size="'lg'"
                class="m-2 z-10 absolute bottom-0 left-0"
              />
            </div>
            <div
              class="relative w-36 h-36 bg-white dark:text-neutral-800 rounded-sm flex items-center justify-center min-w-[6rem]"
            >
              <span class="font-display font-bold text-[8rem] leading-none pt-6"
                >R</span
              >
              <OpinionLink
                v-if="glyphs"
                :glyph="glyphs[1]"
                :opinions="glyphs[1].opinions"
                :size="'lg'"
                class="m-2 z-10 absolute bottom-0 left-0"
              />
            </div>
            </div>
            <div class="flex flex-col items-start gap-5">
              <h2 class="text-4xl font-bold">{{ $t("discuss") }}</h2>
              <p>
                On Character Diversion discourse is based on the things you actually talk
                about: characters. You can attache your opinions to certain characters,
                parts of characters and spectra in the design space of variable fonts.
              </p>
              <Button to="/discourse" icon="arrow-right" class="lg">{{
                $t("share.thoughts")
              }}</Button>
            </div>
          </div>
        </div>
      </Card>
      <Card class="landing-section">
        <div class="max-w-2xl mx-auto py-24">
          <LandingSection>
            <template #image><img src="/images/diverge.svg" /></template>
            <template #description
              ><div class="flex flex-col gap-3">
                <div>
                  <span
                    class="text-primary-500 border border-primary-500 dark:border-none dark:bg-primary-500 dark:text-white rounded-md mb-5 px-2 py-1 text-xs"
                    >coming soon</span
                  >
                </div>
                <h2 class="text-4xl font-bold">{{ $t("diverge") }}</h2>
                <p>
                  Users will be able to contribute to a type design discourse by actually
                  proposing a diverting letter shape, posting it, and then giving users
                  the ability to view the different options.
                </p>
              </div></template
            >
          </LandingSection>
        </div>
      </Card>

      <Card class="landing-section">
        <div class="max-w-2xl mx-auto py-24">
          <Button class="lg" to="/about" color="primary" icon="arrow-right"
            >About this Project</Button
          >
        </div>
      </Card>
    </main>
  </div>
</template>

<script lang="ts">
import { Discourse, Opinion, SamsaFont } from "~/types";
import MiniGlyph from "~~/components/Glyphs/MiniGlyph.vue";

export default defineComponent({
  setup() {
    definePageMeta({
      name: "Home",
      icon: "home",
      order: 1,
    });
  },
  data() {
    return {
      headine: "Everyone has an opinion on type. It's time to share yours.",
      letter: "S",
      glyphs: [{
        id: 1,
        character: 'C',
        opinions: [
        {
          id: 2,
          attributes: {
            content: "This /C has a particularly beautiful curvature.",
            author: {
              data: this.$strapi.user || {
                id: 1,
                attributes: {
                  name: "Leon Vogler",
                },
              },
            },
          },
        },
      ] as Opinion[],
      },
      {
        id: 1,
        character: 'R',
        opinions: [
        {
          id: 1,
          attributes: {
            content: "This one is fabulous.",
            author: {
              data: {
                id: 1,
                attributes: {
                  name: "Franko",
                },
              },
            },
            votes: [
              {
                author: this.$strapi.user?.id || 2,
                value: 1,
              },
            ],
          },
        },
        {
          id: 2,
          attributes: {
            content: "Beautiful inktrap!",
            author: {
              data: this.$strapi.user || {
                id: 1,
                attributes: {
                  name: "Leon Vogler",
                },
              },
            },
            votes: [
              {
                author: this.$strapi.user?.id || 2,
                value: 1,
              },
              {
                author: 1,
                value: 1,
              },
              {
                author: 3,
                value: 1,
              },
              {
                author: 4,
                value: 1,
              },
              {
                author: 5,
                value: 1,
              },
              {
                author: 6,
                value: 1,
              },
              {
                author: 7,
                value: 1,
              },
            ],
          },
        },
      ] as Opinion[],
      }],
     
    };
  },
  async mounted() {
    this.$state.discourse.fetch()
  },
  computed: {
    discourses(): Discourse[] {
      const n = 3;
      const d = Object.values<Discourse>(this.$state.discourse.all).sort(
        (a: Discourse, b: Discourse) => {
          return (
            Number(new Date(String(a.attributes.publishedAt))) -
            Number(new Date(String(b.attributes.publishedAt)))
          );
        }
      );
      return d.slice(-n);
    },
  },
  components: { MiniGlyph },
});
</script>

<style lang="scss" scoped>
.stack {
  &:hover .d {
    --rx: 20deg;
    --ry: -40deg;
  }
}

.d {
  &:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  --f: calc(1 / var(--length));
  --g: calc(200 / var(--length) * 1px);
  --o: calc(var(--i) * var(--f) + var(--f));
  --tz: calc(var(--g) * -1 * var(--i) + var(--g));
  --ty: 0;
  --rx: 10deg;
  --ry: -15deg;
  border-radius: var(--rounded-md);
  transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(var(--tz))
    translateY(var(--ty));
  background-color: var(--color-beige-200);
  transition: var(--transition-duration-300) var(--transition-timing-function-default);

  & > * {
    opacity: var(--o);
  }

  &:hover {
    --ty: -50px;
  }
}
</style>
