<template>
	<div class="flex flex-col min-h-screen">
		<main class="p-10 pb-40 bg-mint-300 text-black grow">
			<div class="max-w-4xl mx-auto">
				<!-- <Input v-model="headine" class="text-black" />
				<Input v-model="letter" class="text-black" /> -->
				<LandingHeadline :headline="headine" :letter="letter" class="mt-24 mb-12" />
				<div class="max-w-xl items-center mx-auto mb-48 flex gap-5">
					<div>Thousands of designers and foundries explore, discuss, and work on their typefaces on Character
						Diversion—the most adequate platform for typographic discourse in the world.</div>
					<div>
						<NuxtLink to="/discourse">
							<Button class="arrow" radius="pill" color="primary">Discover</Button>
						</NuxtLink>
					</div>
				</div>
				<LandingSection>
					<template #image><img src="/images/sushi.png" /></template>
					<template #title>Discover</template>
					<template #description>New discourses on type are uploaded on a daily basis, discover them!</template>
				</LandingSection>
				<LandingSection>
					<template #image><img src="/images/sushi.png" /></template>
					<template #title>Discuss</template>
					<template #description>New discourses on type are uploaded on a daily basis, discover them!</template>
				</LandingSection>
				<LandingSection>
					<template #image><img src="/images/sushi.png" /></template>
					<template #title>Diverge</template>
					<template #description>New discourses on type are uploaded on a daily basis, discover them!</template>
				</LandingSection>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
const headine = ref('Character Diversion')
const letter = ref('r')
</script>

<style lang="scss">
</style>