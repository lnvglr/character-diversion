<template>
  <div class="container mb-40 gap-10">
    <div class="bg-white text-black rounded-lg overflow-hidden relative outline outline-1 outline-black shadow-[5px_5px_0_0_black]">
      <!-- <Noise class="text-amber-900 bg-yellow-600" style="--offset-start: -150;"><div class="p-5"><slot name="image"></slot></div></Noise> -->
      <slot name="image"></slot>
    </div>
    <div>
      <h1 class="text-2xl font-bold"><slot name="title"></slot></h1>
      <div><slot name="description"></slot></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  & > * {
    flex-basis: 50%;
  }
}
</style>