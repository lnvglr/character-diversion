<template>
	<ButtonDefault @click="logout" class="" color="red" v-if="$strapi.user" :icon="icon && 'arrow-right-from-bracket'">
		<template v-slot v-if="label">
			{{label}}
		</template></ButtonDefault>
</template>
<script lang="ts">
export default {
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
			this.$router.push('/profile')
		},
	},
}
</script>