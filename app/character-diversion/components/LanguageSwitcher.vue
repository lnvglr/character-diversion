<template>
<div class="ml-auto flex gap-2">
  <span
    v-for="locale in $i18n.availableLocales"
    :key="locale"
    @click="$i18n.locale = locale"
    class="block rounded-xl bg-slate-200 hover:bg-slate-300 p-2"
  >
    <span class="text-s">{{ locales[locale] }}</span>
  </span>
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