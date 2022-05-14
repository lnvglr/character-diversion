<template>
	<div>
		<Header><slot name="header"></slot></Header>
    <main class="p-10">
			<slot />
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>