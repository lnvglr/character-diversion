import { SamsaFont, SamsaGlyph } from "~~/assets/samsa-core";

interface Discourse {
	id: string;
	name: string;
	title: string;
	description: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
	opinions: Opinion[];
	fonts: SamsaFont[];
}
interface Comment {
	id: string;
	name: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
}
interface Spectrum {
	id: string;
	axes: Array<number>[];
}
interface Opinion {
	id: string;
	name: string;
	title: string;
	content: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
	comments: Comment[];
	fonts: SamsaFont[];
	glyphs: SamsaGlyph[];
	spectrum: Spectrum;
}
interface State {
	discourses: Discourse[];
	currentDiscourse: string;
}
export const currentTuple = () => useState<number>('tuple', () => 1)
export const globalState = () => useState<State>('state', () => ({
	discourses: [] as Discourse[],
	currentDiscourse: '1'
}))

import { reactive } from 'vue'
export const discourse = reactive({
	all: [],
	current: null
})