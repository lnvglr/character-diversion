<template>
  <VDropdown>
    <button class="hover:underline">{{ $t("markdown.is.allowed") }}</button>
    <template #popper>
      <div class="p-4 text-sm leading-relaxed">
        <h2 class="text-lg font-bold mb-3 w-full flex justify-between"><span>Get started with markdown!</span><Button v-close-popper icon="close" class="clear xs"
          :title="$t('close')" /></h2>
        <div
          class="grid grid-cols-12 gap-3 items-center markdown w-80"
          v-for="def in definitions"
          :key="def.icon"
        >
          <font-awesome-icon :icon="['fa', def.icon]" class="col-span-1 mx-auto" fixed-width />
          <div class="col-span-11">
            <component :is="def.tag || 'span'">{{ def.md }}</component>
          </div>
        </div>
        <p class="mt-2">
          Check out
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            class="text-info-500 hover:underline"
            >this cheat-sheet</a
          >
          for more!
        </p>
      </div>
    </template>
  </VDropdown>
</template>
<script lang="ts">
export default defineComponent({
  data() {
    return {
      definitions: [
        {
          icon: "bold",
          md: "**bold**",
        },
        {
          icon: "italic",
          md: "*italic*",
        },
        {
          icon: "strikethrough",
          md: "~~strikethrough~~",
        },
        {
          icon: "code",
          md: "`code`",
        },
        {
          icon: "link",
          md: "[title](https://www.example.com/)",
        },
        {
          icon: "image",
          md: "![alt text](www.example.com/image.jpg)",
        },
      ],
    };
  },
});
</script>
