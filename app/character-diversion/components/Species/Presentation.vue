<template>
  <div>
    <Button @click="sendMessage">send message</Button>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { NuxtSocket } from "~/types";
export default defineComponent({
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/index",
			// reconnectionDelay: 1000,
			// reconnection: true,
			// reconnectionAttemps: 10,
			transports: ['websocket'],
			// agent: false,
			// upgrade: false,
			// rejectUnauthorized: false
    });
    this.socket?.on("sendMessage", (msg, cb) => {
      this.message = msg;
      /* Handle event */
      console.log(msg, cb);
    });
  },
  data() {
    return {
      socket: null as NuxtSocket | null,
			message: null
    };
  },

  methods: {
    async sendMessage() {
      console.log("sendMessage");
      const res = await this.socket?.emit("sendMessage", {
        id: "abc123",
        message: "Hello World!",
      });
      console.log(res);
    },
  },
});
</script>

<style scoped></style>
