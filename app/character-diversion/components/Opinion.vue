<template>
  <div class="flex items-center p-5 hover:bg-slate-100 cursor-pointer border-b">
    {{ opinion.attributes.title }} ({{ opinion.id }})
    <div class="flex items-center justify-center w-6 h-6 -my-10 rounded-full ml-auto hover:bg-red-500 hover:text-white" @click="$emit('remove')">
      <font-awesome-icon
        :icon="['fas', 'times']"
        fixed-width
        class="fa-xs"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    opinion: {
      type: Object,
    },
  },
}
</script>

<style>
</style>