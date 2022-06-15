export { Strapi4Response, Strapi4RequestParams } from '@nuxtjs/strapi/dist/runtime/types'

import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core'
export { SamsaFont, SamsaGlyph } from '@/assets/samsa-core'

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
      is?: string
      lig?: string
      base?: string
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
  valueMin?: number
  valueMax?: number
}
export interface GlyphMap {
  glyph: SamsaGlyph
  name: string
  literal: string
  unicode: number,
  unicodeHex: string,
  postScript: string
}

//==============================================================

export interface Discourse {
  id: string
  attributes: {
    title: string
    content: string
    author?: Author
    createdAt?: string
    publishedAt?: string
    updatedAt?: string
    opinions?: Opinion[]
    font: string
  }
}
export interface Opinion {
  id: string
  attributes: {
    content: string
    author?: Author
    createdAt?: string
    publishedAt?: string
    updatedAt?: string
    comments?: Comment[]
    responseTo?: number
    responses?: number[]
    glyphs?: number[]
    votes?: Vote[]
    annotations?: {
      [id: number]: Annotation[]
    }
    axes?: {
      [tag: string]: number[]
    }
    activeAxes?: string[]
  }
}
export interface Author {
  id: number
  createdAt: string
  email: string
  name: string
  username: string
  role: object
  avatar: object
}

export interface Vote {
  author: string
  value: number
  createdAt: string
}
export interface Annotation {
  x: number
  y: number
  type?: string
  opinionId?: string
}
export interface Comment {
  id: string
  name: string
  author: string
  createdAt: string
  updatedAt: string
}