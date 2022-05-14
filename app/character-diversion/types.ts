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
export interface Opinion {
	id: string;
	attributes: {
		title: string;
		content: string;
		author: string;
		createdAt: Date;
		updatedAt: Date;
		comments?: Comment[];
		fonts?: SamsaFont[];
		glyphs?: SamsaGlyph[];
		tuple?: number[];
		spectrum?: FontSpectrum[];
	}
}
export interface FontSpectrum {
	font?: SamsaFont;
	glyphSpectrum?: GlyphSpectrum[];
	tupleSpectrum?: TupleSpectrum[];
}
export interface GlyphSpectrum {
	glyphs?: string[];
	tupleSpectrum?: TupleSpectrum[];
}
export interface TupleSpectrum {
	name: string;
	min: number[];
	max: number[];
}