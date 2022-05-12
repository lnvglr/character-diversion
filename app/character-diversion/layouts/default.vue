<template>
	<div>
		<Header><slot name="header"></slot></Header>
    <main class="p-5 m-10">
			<slot />
    </main>
		<NavBar />
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>