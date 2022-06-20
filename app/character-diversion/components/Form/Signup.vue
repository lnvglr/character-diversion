<template>
  <form class="flex flex-col gap-2" @submit.prevent="signUp">
    <Input
      type="text"
      name="name"
      placeholder="Name"
      v-model="formData.name"
      autocomplete="name"
      class="lg"
    />
    <Input
      type="email"
      name="email"
      placeholder="Email"
      v-model="formData.email"
      autocomplete="email"
      class="lg"
    />
    <Input
      type="password"
      name="password"
      placeholder="Password"
      v-model="formData.password"
      autocomplete="new-password"
      class="lg"
    />
    <Input type="file" v-model="avatar" :accept="['jpg', 'png']" />
    <Button type="submit" class="lg">Sign up</Button>
    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
    <hr />
    <p>
      {{ $t("have.account") }}
      <Button to="/login" class="clear inline">{{ $t("login") }}</Button>
    </p>
  </form>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      formData: {} as { name: string; email: string; password: string; username: string },
      avatar: [] as File[],
      error: false,
      errorMsg: `An error occurred, please try again`,
    };
  },
  computed: {
    name() {
      return this.formData.name;
    },
  },
  watch: {
    name(value: string) {
      this.formData.username = this.slugify(value);
    },
  },
  methods: {
    async signUp(e: Event) {
      try {
        this.$strapi.register(this.formData).then(({ user }) => {
          this.$strapi
            .uploadFile(this.avatar[0], "user", user?.id || this.$strapi.user?.id, "avatar")
            .then(({ avatar }: any) => {
              this.$strapi.user.avatar = avatar
              this.formData = {};
            });
            this.$router.push("/profile");
        });
      } catch (e) {
        console.error(e);
      }
    },
    slugify(string: string) {
      if (string == null) return string;
      return string
        .toString()
        .normalize("NFKD")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
    },
  },
});
</script>

<style></style>
