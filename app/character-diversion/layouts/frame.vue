<template>
  <div
    class="frame grid h-screen w-screen overflow-hidden bg-beige-500 p-0.5 gap-0.5"
		 :class="{ nav: showNav }"
  >
    <div class="flex" style="grid-area: nav">
			<NavBar v-if="showNav" />
			<Header v-else>{{ $route.meta.name }}</Header>
		</div>
    <div class="overflow-hidden w-full" style="grid-area: body">
      <slot name="body" class=""></slot>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  computed: {
    showNav() {
      return this.$strapi.user;
    },
  },
});
</script>

<style lang="scss" scoped>
.frame {
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: 1fr;
  grid-template-areas: "nav" "body";
	&.nav {
		grid-template-rows: 1fr;
		grid-template-columns: min-content 1fr;
		grid-template-areas: "nav body";
  	@media screen and (max-width: 640px) {
			grid-template-rows: 1fr min-content;
			grid-template-columns: 1fr;
			grid-template-areas: "body" "nav";
		}
  }
}
</style>
