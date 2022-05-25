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

export const removeDiscourse = (id: string) => {
	this.$strapi.delete('discourses', id).then(({ data }) => {
		discourse.all = discourse.all.filter((e) => e.id !== data.id)
	})
}