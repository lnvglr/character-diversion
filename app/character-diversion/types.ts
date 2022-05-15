import { SamsaFont, SamsaGlyph } from '~~/assets/samsa-core'

export interface Discourse {
  id: string
  attributes: {
    title: string
    content: string
    author?: string
    createdAt?: Date
    updatedAt?: Date
    opinions?: Opinion[]
    fonts: SamsaFont[]
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
    glyphSpectrum?: Array<GlyphSpectrum | string>
    tupleSpectrum?: TupleSpectrum[]
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
  samsaGlyph: SamsaGlyph
  tupleSpectrum?: TupleSpectrum[]
}
export interface TupleSpectrum {
  name: string
  min: number
  max: number
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
