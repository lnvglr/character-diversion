<template>
  <Card class="shrink sticky top-0 z-20">
    <TabBar :items="tabs" @active="(e: string) => activeTab = e" />
  </Card>
  <NuxtLayout name="split">
    <template #title>{{ $t("about") }}</template>
    <Presentation />
    <article>
      <p>
        The world of typography lives on discussion and debate. Designers speak about type in conferences, creative studios, and online forums. And those discussions have advanced the typographic discourse for decades. So there is discourse in the world of typography but the platforms do not provide the appropriate environment and tools.
      </p>
      <p>Character Diversion is designed to help get a better picture of how people think about certain design decisions, show where people agree and disagree, and link those opinions with the character shapes they refer to. This way, Character Diversion, creates a better overview of the conversation and with visual referencing enables a more intuitive approach to typographic discourse. Character Diversion breaks with the conventional design of forums by breaking away from language-based discourse towards a glyph-based discourse. It also breaks with the style of contemporary forums on type, applying the design paradigms of progressive web apps. This means Character Diversion works asynchronously (i.e. no page reloads when users navigate the platform or submit data), shifting the user experience closer to the bliss of using native apps. This paradigm shift in the world of typographic discourse software is underlined with the contemporary muted aesthetics, paired with a beige and orange nostalgia.
      </p>
      <p>With a move away from language-based discourse to glyph-based discourse Character Diversion is a proposal that will hopefully be vividly and controversially discussed. Maybe it will be found worthy of its aspirations, maybe the prevailing opinion will be that it failed in what it set out to. Hopefully, it will inspire how we think about discourse in the realm of design.
      </p>
      <p>See the Git Repo: <NuxtLink to="https://github.com/lnvglr/character-diversion" target="_blank" class="text-info-500 hover:underline" color="info">https://github.com/lnvglr/character-diversion</NuxtLink></p>
      <!-- <div v-for="paper in papers" :key="paper.paper" v-html="paper.text" /> -->
      <div v-for="paper in papers" :key="paper.paper" v-html="$f.utils.renderMarkdown(paper.text)" class="markdown" />
    </article>
  </NuxtLayout>
</template>

<script lang="ts">
import TabBar from "@/components/Cells/TabBar.vue";
import Presentation from "@/components/Species/Presentation.vue";
import { NuxtSocket } from '~/types'
export default defineComponent({
  components: {
    TabBar,
    Presentation,
  },
  setup() {
    definePageMeta({
      name: "About",
    });
  },
  async mounted() {
    const papers = [] as string[]
    this.links.forEach(paper => {
      fetch(paper).then(res => res.text()).then(text => papers.push({paper, text}))
    })
    this.papers = papers
    console.log(this.papers)

  },
  data() {
    return {
      message: null,
      socket: null as NuxtSocket,
      messageRxd: '' as string,
      links: ['https://raw.githubusercontent.com/lnvglr/character-diversion/master/character-diversion.md'],
      papers: [] as string[],
      activeTab: "about",
      tabs: {
        presentation: {
          icon: "border-all",
          label: "Presentation",
        },
        about: {
          icon: "address-card",
          label: "About",
          active: true,
        },
        // opinions: {
        //   icon: "diagram-successor",
        //   label: "Opinions",
        // },
      }
    }
  }
})
</script>

<style></style>
