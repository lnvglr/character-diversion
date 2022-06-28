<template>
  <div class="container gap-x-20 gap-y-10 flex items-start md:items-center flex-col md:flex-row p-5">
    <div class="">
      <!-- <Noise class="text-amber-900 bg-yellow-600" style="--offset-start: -150;"><div class="p-5"><slot name="image"></slot></div></Noise> -->
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
<style lang="scss">
.landing-section:nth-child(odd) {
  .container {
    flex-direction: row-reverse;
  }
}

</style>