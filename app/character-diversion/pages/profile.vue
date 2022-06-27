<template>
  <NuxtLayout name="split">
    <div class="flex flex-col items-start gap-5">
      <div v-if="$strapi.user?.name" class="w-full">
        <h1 class="font-bold text-4xl inline">
          {{ $t("greeting", { name: $strapi.user?.name.split(" ")[0] }) }}
        </h1>
        <div class="flex gap-5 mt-10 mb-5 items-center justify-between">
          <h3 class="font-bold text-2xl">{{ $t("profile") }}</h3>
          <Button class="clear" @click="editing = !editing">{{
            $t(editing ? "done" : "edit")
          }}</Button>
        </div>
        <div class="flex gap-5 items-center">
          <Image
            :src="$strapi.user.avatar"
            :placeholder="$strapi.user.name[0]"
            size="small"
            class="w-20 h-20 border border-beige-200 rounded-full"
          />
          <div class="flex flex-col">
            <span class="font-bold">{{ $strapi.user.name }}</span>
            <span class="text-neutral-500">{{ $strapi.user.email }}</span>
          </div>
        </div>
        <TransitionExpand>
          <div v-if="editing">
            <Input
              type="file"
              v-model="avatar"
              @update:modelValue="update"
              :accept="['jpg', 'png']"
              class="mt-5"
              :filelist="false"
            />
          </div>
        </TransitionExpand>
        <h3 class="font-bold text-2xl mt-10 mb-5">{{ $t("appearence") }}</h3>
        <ButtonTheme class="mb-5" />
        <h3 class="font-bold text-2xl mt-10 mb-5">
          {{ $t("language", $i18n.availableLocales.length) }}
        </h3>
        <LanguageSwitcher class="mb-5" />
        <hr />
        <ButtonLogout color="alert" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      name: "Profile",
      icon: "user",
      order: 4,
    });
  },
  data() {
    return {
      avatar: null,
      editing: false,
    };
  },
  async mounted() {},
  methods: {
    update() {
      if (this.$strapi.user.avatar) {
        return this.remove().then((e) => {
          console.log(e)
          return this.upload();
        });
      }
      this.upload();
    },
    upload() {
      this.$strapi
        .uploadFile(this.avatar[0], "user", this.$strapi.user.id, "avatar")
        .then(({ avatar }) => {
          this.editing = false;
          this.$strapi.user.avatar = avatar;
        });
    },
    async remove() {
      await this.$strapi
        .removeFile(this.$strapi.user.avatar.id)
        .then(() => (this.$strapi.user.avatar = null));
    },
  },
  watch: {
    "$strapi.user": {
      handler() {
        if (this.$strapi.user?.id && !this.$strapi.user.avatar) {
          this.$strapi
            .findOne("users", this.$strapi.user.id, { populate: ["avatar"] })
            .then((res) => {
              this.$strapi.user.avatar = res.avatar;
            });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid #eaeaea;
  margin: 1.5rem 0;
}
</style>
