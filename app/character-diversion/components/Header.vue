<template>
	<header class="flex items-center py-5 px-10 border-b border-b-slate-200">
		<NuxtLink to="/" class="flex items-center"><Icon name="characterDiversion" class="fill-blue-500 w-12 mr-5" />
		<h1 class="text-2xl font-display"><slot></slot></h1></NuxtLink>
		<div class="ml-auto"><ThemeToggle /></div>
		<!-- <div class="ml-auto"><G /></div> -->
	</header>
</template>