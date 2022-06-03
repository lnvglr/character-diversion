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
    axes: SamsaFontAxes
  }
  interface SamsaGlyph {
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
    updatedAt?: Date
    comments?: Comment[]
    fontSpectrum?: FontSpectrum[]
    glyphs?: Array<GlyphSpectrum | string | number>
    tuple?: TupleSpectrum
    axes?: {
      [tag: string]: number[]
    }
  }
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