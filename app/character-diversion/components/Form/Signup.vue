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
    <!-- <Input
      type="text"
      name="username"
      placeholder="Username"
      v-model="formData.username"
      autocomplete="username"
      class="lg"
    /> -->
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
    <p v-show="error" class="text-sm text-alert-500">{{ errorMsg }}</p>
    <hr />
    <p>
      {{ $t("have.account") }}
      <Button to="/login" class="clear inline">{{ $t("login") }}</Button>
    </p>
  </form>
</template>

<script lang="ts">
type FormData = { name: string; username: string, email: string; password: string; }
export default defineComponent({
  data() {
    return {
      formData: {} as FormData,
      avatar: [] as File[],
      error: false,
      errorMsg: `An error occurred, please try again`,
    };
  },
  methods: {
    async signUp(e: Event) {
      try {
        this.formData.username = this.formData.username || this.slugify(this.formData.name);
        this.$strapi.register(this.formData).then(({ user }) => {
          this.$strapi
            .uploadFile(this.avatar[0], "user", user?.id || this.$strapi.user?.id, "avatar")
            .then(({ avatar }: any) => {
              this.$strapi.user.avatar = avatar
              this.formData = {
                name: "",
                username: "",
                email: "",
                password: "",
              };
            });
            this.$router.push("/profile");
        });
      } catch (e: any) {
        console.error(e);
        this.error = true
        this.errorMsg = e.error?.message
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
