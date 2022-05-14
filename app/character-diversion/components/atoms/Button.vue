<template>
  <button
    class="
      flex
      items-center
      justify-center
      w-12
      h-12
      rounded-md
      hover:bg-slate-100
      dark:hover:bg-slate-700
      duration-100
    "
  >
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
button {
}
</style>