<template>
  <div class="flex flex-col h-screen">
    <Header><slot name="header"></slot></Header>
    <main class="grid grid-cols-12 grid-rows-1 grow">
      <div class="col-span-3 border-r">
        <slot name="sidebar" />
      </div>
      <div class="col-span-9">
        <slot />
      </div>
    </main>
    <NavBar />
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>