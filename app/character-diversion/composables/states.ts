import type { Discourse } from '~/types'
import { reactive } from 'vue'

export const discourse = reactive({
	all: [] as Discourse[],
	current: null as string
})