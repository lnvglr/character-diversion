<template>
  <Card class="h-full flex-col p-10 rounded-sm overflow-hidden">
  <div class="absolute top-2 right-2 flex items-center gap-5 opacity-50 z-50">
    <input v-model="autoRun" type="checkbox" class="z-50" />
    <Input
      v-model="currentSlide"
      type="number"
      :min="0"
      :max="slides.length - 1"
      placeholder="slide"
      class="z-50"
    />
    </div>
    <Slide
      v-if="currentSlide === 2"
      header="UITAG"
      :page="currentSlide + 1"
      :totalPages="slides.length"
      @next="currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++"
    >
      <UITag>Tag</UITag>
    </Slide>
    <Slide
      v-else-if="currentSlide === 1"
      header="unsplash"
      :page="currentSlide + 1"
      :totalPages="slides.length"
      @next="currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++"
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
      @next="currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++"
    >
      <p v-html="slides[currentSlide].content" />
    </Slide>
  </Card>
</template>

<script lang="ts">
import Slide from "~/components/Species/Slide.vue";
import { io } from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  components: {
    Slide,
  },
  mounted() {
    // this.init()

    // this.socket.addEventListener('message', (message) => {
    //   const msg = JSON.parse(message.data)

    //   switch (msg.type) {
    //     case 'drag-init':
    //       Object.keys(msg.payload).map((key) => {
    //         console.log(msg.payload[key])
    //         app.position(msg.payload[key], true)
    //       })
    //       break
    //     case 'drag':
    //       this.position(msg.payload)
    //       break
    //   }
    // })
    // this.socket = io();

    // this.socket.on('connect', () => {
    //   this.connected = this.socket.connected
    //   console.log(this.connected)
    // });
    // this.socket.on('slide', (slide: number) => {
    //   console.log(slide)
    //   this.currentSlide = slide
    // })

    // this.socket.on('disconnect', () => {
    //   this.connected = this.socket.connected
    // });
    // this.run();
  },
  watch: {
    currentSlide(slide: number) {
      // console.log(slide, this.socket)
      // this.socket.broadcast.emit('slide', slide);
      // this.socket.emit('slide', slide);
    },
  },
  copmuted: {
    // ...mapGetters({
    //   socket: 'socket/socket',
    //   stats: 'stats/all'
    // }),
  },
  methods: {
    init() {
      const url = window.location.hostname === 'localhost' ? 'wss://localhost:8080' : 'wss://www.character-diversion.com/ws'
      this.socket = new WebSocket(url)
    },
    run() {
      const that = this
      const interval = setInterval(() => { {
        if (this.autoRun) that.next()
     } }, 5000);
    },
    next() {
      this.currentSlide === this.slides.length - 1
        ? (this.currentSlide = 0)
        : this.currentSlide++;
    }
  },
  data() {
    return {
      autoRun: false,
      socket: null as Socket | null,
      currentSlide: 0,
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
          header: "Slide 2",
          content: `<b>Slide 2</b> content<br /> <ol><li>hey</li><li>asd</li></ol>`,
          bg:
            "https://images.unsplash.com/photo-1656586587084-02b6fc7be06c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        },
        {
          header: "Slide 3",
          content: "Slide 4 content",
          img: [false, "https://images.unsplash.com/photo-1656591674454-c5a06ccf4fff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"],
        },
        {
          header: "Slide 2",
          content: "Slide 2 content",
          img: ['https://images.unsplash.com/photo-1656586587084-02b6fc7be06c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', "https://images.unsplash.com/photo-1656591674454-c5a06ccf4fff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"],
        },
        {
          header: "Slide 2",
          content: "Slide 2 content",
        },
      ],
    };
  },
});
</script>

<style scoped></style>
