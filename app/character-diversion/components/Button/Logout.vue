<template>
	<Button @click="logout" v-if="$strapi.user" title="Logout" :icon="icon && 'arrow-right-from-bracket'">
		<template v-slot v-if="label">
			{{ label }}
		</template>
	</Button>
</template>
<script lang="ts">
export default defineComponent({
	setup() {
	},
	props: {
		label: {
			type: [String, Boolean],
			default: "Logout"
		},
		icon: {
			type: Boolean,
			default: false
		},
	},
	methods: {
		logout() {
			this.$strapi.logout()
			this.$strapi.user = undefined
			this.$router.push('/login')
		},
	},
})
</script>