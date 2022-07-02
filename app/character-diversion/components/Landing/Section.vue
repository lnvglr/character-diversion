<template>
  <div class="container gap-x-20 gap-y-10 flex flex-col items-start sm:items-center sm:flex-row p-5">
    <div class="">
      <slot name="image"></slot>
    </div>
    <div class="">
      <h1 class="text-4xl font-bold"><slot name="title"></slot></h1>
      <div><slot name="description"></slot></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  & > * {
    flex-basis: 50%;
  }
}
</style>