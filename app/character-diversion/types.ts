export { Strapi4Response, Strapi4RequestParams } from '@nuxtjs/strapi/dist/runtime/types'


import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core'
export { SamsaFont, SamsaGlyph } from '@/assets/samsa-core'
// add cmap property to SamsaFont ts type
declare module '@/assets/samsa-core' {
  interface SamsaFont {
    cmap: {
      [unicode: string]: number
    },
    cmapReverse: {
      [glyphId: number]: string
    }
    axes: SamsaFontAxes
  }
  interface SamsaGlyph {
    openType: {
      is: string;
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
    glyphs?: Array<GlyphSpectrum | string>
    tuple?: TupleSpectrum
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
/**
const discourse: Discourse = {
  id: '2341',
  attributes: {
    title: 'new discourse',
    content: 'new discourse',
    fonts: [new SamsaFont()],
    opinions: [
      {
        id: '2418',
        attributes: {
          title: 'i disagree',
          spectrum: [
            {
              font: new SamsaFont(),
              tupleSpectrum: [
                {
                  name: 'wdth',
                  min: 0,
                  max: 0.3,
                },
              ],
              glyphSpectrum: [
                'a',
                {
                  glyph: 'b',
                  tupleSpectrum: [
                    {
                      name: 'wdth',
                      min: 0,
                      max: 0.6,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
}
 */
