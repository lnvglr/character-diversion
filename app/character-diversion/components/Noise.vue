<template>
  <div>
    <div class="isolate" v-bind="$attrs"></div>
    <div class="relative text-white"><slot></slot></div>
  </div>
</template>
<style lang="scss" scoped>
.isolate {
  --degree: 40;
  --contrast: 170%;
	--offset-start: 0;
	--offset-end: 300;
  isolation: isolate;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: inherit;
    background: linear-gradient(calc(var(--degree) * 1deg), currentColor calc(var(--offset-start) * 1%), transparent calc(var(--offset-end) * 1%)),
      url(https://grainy-gradients.vercel.app/noise.svg);
    filter: contrast(var(--contrast)) brightness(1000%);
    @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
      --contrast: 290%;
    }
    mix-blend-mode: multiply;
  }
}
</style>