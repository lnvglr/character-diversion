export { Strapi4Response, Strapi4RequestParams } from '@nuxtjs/strapi/dist/runtime/types'

import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core'
export { SamsaFont, SamsaGlyph } from '@/assets/samsa-core'
// add cmap property to SamsaFont ts type
declare module '@/assets/samsa-core' {
  interface SamsaFont {
    cmap: {
      [unicode: number]: number
    },
    cmapReverse: {
      [glyphId: number]: number
    }
    glyphMap: {
      [glyphId: number]: GlyphMap
    }
    literalMap: {
      [glyph: string]: GlyphMap
    }
    postScriptMap: {
      [postScriptName: string]: GlyphMap
    }
    nameMap: {
      [glyphName: string]: GlyphMap
    }
    axes: SamsaFontAxes
  }
  interface SamsaGlyph {
    value: string
    openType: {
      is?: string;
      lig?: string;
      base?: string;
      [stylisticSet: string]: string
    }
  }
}
export interface SamsaFontAxes {
  axisNameID: number
  default: number
  flags: number
  id: number
  max: number
  min: number
  name: string
  tag: string
}
export interface GlyphMap {
  glyph: SamsaGlyph
  literal: string
  unicode: number,
  unicodeHex: string,
  postScript: string
}
// import { Strapi4RequestParams } from '@nuxtjs/strapi/dist/runtime/types'
// export interface Strapi4RequestParamsObject extends Omit<Strapi4RequestParams, 'populate'> {
//   populate: string | Array<string> | { [key: string]: Strapi4RequestParamsObject };
// }
export interface Discourse {
  id: string;
  attributes: {
    title: string;
    content: string;
    author?: string;
    createdAt?: Date;
    publishedAt?: Date;
    updatedAt?: Date;
    opinions?: Opinion[];
    SamsaFont: SamsaFont;
    fonts: SamsaFont[];
    font: string;
  }
}
export interface Opinion {
  id: string
  attributes: {
    title?: string
    content?: string
    author?: string
    createdAt?: Date
    publishedAt?: Date
    updatedAt?: Date
    comments?: Comment[]
    fontSpectrum?: FontSpectrum[]
    glyphs?: Array<GlyphSpectrum | string | number>
    parsedGlyphs?: Array<number>
    tuple?: TupleSpectrum
    votes: Vote[]
    annotations?: {
      [id: number]: {
        x: number
        y: number
        type?: string
      }[]
    }
    axes?: {
      [tag: string]: number[]
    }
    activeAxes?: string[]
  }
}
export interface Vote {
  user: string
  value: 1 | -1
  date: Date
}
export interface Comment {
  id: string
  name: string
  author: string
  createdAt: Date
  updatedAt: Date
}
export interface FontSpectrum {
  font: SamsaFont
  glyphSpectrum?: Array<GlyphSpectrum | string>
  tupleSpectrum?: TupleSpectrum[]
}
export interface GlyphSpectrum {
  glyph: string
  samsaGlyph?: SamsaGlyph
  tupleSpectrum?: TupleSpectrum[]
}
export interface TupleSpectrum {
  [name: string]: [min: number, max: number]
}