<template>
  <VDropdown :triggers="['hover']">
    <button class="hover:underline">{{ $t("markdown.is.allowed") }}</button>
    <template #popper>
      <div class="py-2 px-4 text-sm leading-relaxed">
        <div v-html="$f.utils.renderMarkdown(this.definitions.join('<br />'))"></div>
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
				'Italic: &#42;*emphasized*&#42;',
				'Bold: &#42;&#42;**bold**&#42;&#42;',
				'Image: &#33;&#91;alt text&#93;(https://example.com/image.jpg "Optional title")',
				'Link: &#91;alt text&#93;(https://example.com/)',
			]
		}
	},
})
</script>