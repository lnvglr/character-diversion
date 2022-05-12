<template>
  <FormKit type="select" v-model="discourse.current" :options="discourseSelection" />
</template>


<script setup>
import { discourse } from '@/composables/states'
const discourseSelection = computed(() =>
  Object.values(discourse.all).map(({ id, attributes }) => ({ value: id, label: attributes.title }))
)
</script>
<style>
.formkit-outer {
	margin-bottom: 0;
}
</style>