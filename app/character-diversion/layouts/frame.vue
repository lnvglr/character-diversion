<template>
	<div class="flex flex-col h-screen sm:flex-row-reverse">
		<div class="overflow-auto flex-grow">
			<slot name="header"></slot>
			<slot name="body"></slot>
		</div>
		<div class="h-30">
			<slot name="navigation"></slot>
		</div>
	</div>
</template>

<script>
export default defineComponent({})
</script>

<style>
</style>