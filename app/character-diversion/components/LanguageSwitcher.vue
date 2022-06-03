<template>
<div class="flex gap-2">
  <Button
    v-for="locale in $i18n.availableLocales"
    :key="locale"
    @click="$i18n.locale = locale"
    class="sm"
    :class="{active: $i18n.locale === locale, secondary: $i18n.locale !== locale}"
  >{{ locales[locale] }}
  </Button>
	</div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$i18n)
  },
	data() {
		return {
			locales: {
				de: 'Deutsch',
				en: 'English',
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