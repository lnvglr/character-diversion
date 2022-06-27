<template>
<div class="flex gap-2">
  <Button
    v-for="locale in $i18n.availableLocales"
    :key="locale"
    @click="$i18n.locale = locale"
    class="sm"
    :class="{primary: $i18n.locale === locale, clear: $i18n.locale !== locale}"
  >{{ short ? locale.toLocaleUpperCase() : locales[locale] }}
  </Button>
	</div>
</template>

<script>
export default {
  props: {
    short: {
      type: Boolean,
      default: false,
    },
  },
	data() {
		return {
			locales: {
				de: 'Deutsch',
				en: 'English',
				// he: 'עברית',
			}
		}
	},
  computed: {
    // availableLocales() {
    //   return this.$i18n.availableLocales?.filter((i) => i.code !== this.$i18n.locale)
    // },
  },
}
</script>