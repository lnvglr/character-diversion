<template>
  <NuxtLayout>
    <template #header>Profile</template>
		<div class="m-5"><ThemeToggle /></div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  name: 'Profile',
	icon: 'user',
	order: 4
})
</script>

<style>

</style>