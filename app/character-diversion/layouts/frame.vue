<template>
	<div class="flex flex-col h-screen w-screen overflow-hidden sm:flex-row-reverse">
		<div class="flex-grow mb-30 sm:mb-auto h-full"><slot name="body" class=""></slot></div>
		<div class="fixed bottom-0 w-full h-30 sm:w-auto sm:relative sm:h-screen z-50">
			<slot name="navigation" class="bg-transparent"></slot>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style>
</style>