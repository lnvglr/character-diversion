<template>
	<div class="flex flex-col h-screen w-screen overflow-hidden sm:flex-row-reverse">
		<slot name="body" class="flex-grow mb-30 sm:mb-auto"></slot>
		<div class="fixed bottom-0 w-full h-30 sm:w-auto sm:relative">
			<slot name="navigation" class="bg-transparent"></slot>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style>
</style>