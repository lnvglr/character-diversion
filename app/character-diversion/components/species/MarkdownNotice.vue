<template>
  <VDropdown>
    <button class="hover:underline">{{ $t("markdown.is.allowed") }}</button>
    <template #popper>
      <div class="p-4 text-sm leading-relaxed">
        <h2 class="text-lg font-bold mb-3">You can use the following syntax</h2>
        <pre
          class=""
          v-html="$f.utils.renderMarkdown(this.definitions.join('<br />'))"
        ></pre>
        <p>
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
        // '# &#35; Headline 1',
        // '## Headline 2',
        "Italic: &#42;*emphasized*&#42;",
        "Bold: &#42;&#42;**bold**&#42;&#42;",
        'Image: &#33;&#91;alt text&#93;(https://example.com/image.jpg "Optional title")',
        "Link: &#91;alt text&#93;(https://example.com/)",
      ],
    };
  },
});
</script>
