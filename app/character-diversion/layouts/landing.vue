<template>
  <div class="flex flex-col min-h-screen">
    <Header class="bg-mint-300 text-black" iconClass="text-black"
      ><slot name="header"></slot
    ></Header>
    <main class="p-10 pb-80 bg-mint-300 text-black grow">
      <div class="max-w-4xl mx-auto">
				<!-- <Input v-model="headine" class="text-black" />
				<Input v-model="letter" class="text-black" /> -->
        <LandingHeadline :headline="headine" :letter="letter" class="mt-24 mb-12" />
				<div class="max-w-xl items-center mx-auto mb-48 flex gap-5"><div>Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.</div><div><ButtonDefault>check it out</ButtonDefault></div></div>
				<LandingSection>
					<template #image><img src="/images/sushi.png" /></template>
					<template #title>Discover</template>
					<template #description>New discourses on type are uploaded on a daily basis, discover them!</template>
				</LandingSection>
				<LandingSection>
					<template #image></template>
					<template #title>Discuss</template>
					<template #description>New discourses on type are uploaded on a daily basis, discover them!</template>
				</LandingSection>
				<LandingSection>
					<template #image></template>
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