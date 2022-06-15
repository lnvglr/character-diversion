<template>
  <div class="flex flex-col h-screen">
    <main class="grid grid-cols-12 grid-rows-1 grow">
      <div class="col-span-9">
        <slot />
      </div>
      <div class="col-span-3 border-l">
        <slot name="sidebar" />
      </div>
    </main>
  </div>
</template>

<script>
export default defineComponent({})
</script>

<style>
</style>