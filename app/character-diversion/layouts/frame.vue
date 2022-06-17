<template>
	<div class="flex flex-col h-screen sm:flex-row-reverse">
		<div class="flex-grow">
			<slot name="body"></slot>
		</div>
		<div class="h-30">
			<slot name="navigation"></slot>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style>
</style>