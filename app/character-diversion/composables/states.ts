import type { Discourse } from '~/types'
import { reactive } from 'vue'

interface State {
	all: Discourse[];
	current: string;
}

export const discourse = reactive<State>({
	all: [],
	current: null as string
})