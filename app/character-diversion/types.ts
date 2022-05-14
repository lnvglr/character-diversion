import type { SamsaFont, SamsaGlyph } from "~~/assets/samsa-core";

export interface Discourse {
	id: string;
	attributes: {
		name: string;
		title: string;
		description: string;
		author: string;
		createdAt: Date;
		updatedAt: Date;
		opinions: {
			data: Opinion[];
		};
		fonts: SamsaFont[];
	}
}
export interface Comment {
	id: string;
	name: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
}
export interface Spectrum {
	id: string;
	axes: Array<number>[];
}
export interface Opinion {
	id: string;
	attributes: {
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
}