<template>
  <component :is="tag" class="file">
    <transition name="fade">
      <div v-if="preview" class="clipped">
        <img :src="preview" />
      </div>
    </transition>
    <span>
      <Truncate :string="file.name" />
      <span class="tag">{{ size(file.size) }}</span>
      <Button class="xs round text-lg" @click.prevent="remove" color="alert">×</Button>
    </span>
  </component>
</template>

<script>
import Truncate from '~/components/UI/Truncate.vue'
export default {
  name: 'File',
  components: { Truncate },
  props: {
    file: Object,
    preview: String,
    index: Number,
    tag: {
      type: String,
      default: 'div'
    }
  },
  methods: {
    size(value) {
      if (value < 1000) return value + ' Byte'
      value = Math.floor(value / 1000)
      if (value < 1000) return value + ' KB'
      return (value / 1000).toFixed(2) + ' MB'
    },
    remove() {
      this.$emit('remove', this.index)
    }
  },
}
</script>

<style lang="scss" scoped>
.file {
  background: var(--color-beige-100);
  box-shadow: var(--input-border) var(--grey-light-03);
  border-radius: var(--rounded-lg);
  margin-bottom: 10px;
  display: flex;
  overflow: hidden;
  font-size: 0.875rem;
  // color: var(--grey-light-05);
  width: 100%;
  .clipped {
    min-width: 50px;
    width: 50px;
    height: 50px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  & > span {
    display: flex;
    flex: 1;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
    padding: 10px 15px;
    width: calc(100% - 50px);
  }
}
.tag {
  border-radius: var(--border-radius);
  font-size: 0.75em;
  background: var(--grey-light-03);
  padding: 2px 5px;
  display: inline-flex;
  flex: initial;
  white-space: nowrap;
  margin-left: auto;
}
</style>