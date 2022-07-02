<template>
  <div class="fixed top-0 left-0 z-50">
    <Card class="h-full flex-col p-10 rounded-sm overflow-hidden">
      <div class="absolute top-10 right-10 flex items-center gap-2 z-50">
        <Button
          :icon="autoRun ? 'pause' : 'play'"
          class="clear xs"
          :class="{ active: autoRun }"
          @click="autoRun = !autoRun"
        />
        <Button
          icon="arrow-rotate-left"
          class="clear xs"
          @click="(currentSlide = 0), (autoRun = false)"
        />
        <Button to="/about" icon="times" class="clear xs" />
      </div>
      <Slide
        v-if="currentSlide === 2"
        header="UITAG"
        :page="currentSlide + 1"
        :totalPages="slides.length"
        @next="next"
      >
        <UITag>Tag</UITag>
      </Slide>
      <Slide
        v-else-if="currentSlide === 1"
        header="unsplash"
        :page="currentSlide + 1"
        :totalPages="slides.length"
        @next="next"
      >
        <a target="_blank" href="http://www.unsplash.com">unsplash</a>
      </Slide>

      <Slide
        v-else-if="slides[currentSlide]"
        :header="slides[currentSlide].header"
        :preHeader="slides[currentSlide].preHeader"
        :headerSize="slides[currentSlide].headerSize"
        :page="currentSlide + 1"
        :totalPages="slides.length"
        :bg="slides[currentSlide].bg"
        :img="slides[currentSlide].img"
        @next="next"
      >
        <p v-html="slides[currentSlide].content" />
      </Slide>
    </Card>
  <div class="bg-info-500 absolute left-0 top-0 h-1 duration-75" :style="`width: ${progress}%; z-index: 100`"></div>
  </div>
</template>

<script lang="ts">
import Slide from "~/components/Species/Slide.vue";

export default defineComponent({
  components: {
    Slide,
  },
  mounted() {
    this.run();
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          this.prev();
          break;
        case "ArrowRight":
        case "ArrowDown":
          this.next();
          break;
        case "Escape":
          this.$router.push("/about");
          break;
      }
    });
  },
  computed: {
    currentSlide() {
      return this.$state.presentation.currentSlide;
    },
  },
  methods: {
    init() {},
    run() {
      const that = this;
      const interval = setInterval(() => {
        if (this.autoRun) that.next();
      }, this.interval);
      const progress = setInterval(() => {
        if (this.autoRun) that.progress++;
      }, this.interval / 100);
    },
    prev() {
      this.progress = 0
      this.$state.presentation.currentSlide === 0
        ? (this.$state.presentation.currentSlide = this.slides.length - 1)
        : this.$state.presentation.currentSlide--;
    },
    next() {
      this.progress = 0
      this.$state.presentation.currentSlide === this.slides.length - 1
        ? (this.$state.presentation.currentSlide = 0)
        : this.$state.presentation.currentSlide++;
    },
  },
  data() {
    return {
      interval: 5000,
      progress: 0,
      autoRun: false,
      connected: false,
      slides: [
        {
          header: "Character Diversion",
          preHeader: "Presentation Final Thesis (BA)",
          headerSize: "h1",
        },
        {},
        {},
        {
          img: [
            "https://images.unsplash.com/photo-1548544422-49064705b9e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
            "https://character-diversion.s3.eu-central-1.amazonaws.com/greeting-japan.jpg",
          ],
        },
        {
          header: "Challenging Conventions",
          content: `<b>Slide 2</b> content<br /> <ol><li>hey</li><li>asd</li></ol>`,
          img: [
            "https://images.unsplash.com/photo-1656591674454-c5a06ccf4fff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          ],
        },
        {
          header: "Slide 3",
          content: "Slide 4 content",
          img: [
            false,
            "https://images.unsplash.com/photo-1656591674454-c5a06ccf4fff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          ],
        },
        {
          header: "Slide 4",
          content: "Slide 2 content",
          img: [
            "https://images.unsplash.com/photo-1656586587084-02b6fc7be06c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1656591674454-c5a06ccf4fff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          ],
        },
        {
          header: "Slide 2",
          content: "Slide 2 content",
          bg:
            "https://images.unsplash.com/photo-1656586587084-02b6fc7be06c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        },
      ],
    };
  },
});
</script>

<style scoped></style>
