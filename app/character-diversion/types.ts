import publicRuntimeConfig from '@nuxtjs/strapi/dist/module'
export { Strapi4Response, Strapi4ResponseData, Strapi4RequestParams } from '@nuxtjs/strapi/dist/runtime/types'
import { useStrapi4 } from '@nuxtjs/strapi/dist/runtime/composables/useStrapi4'
import { useStrapiAuth } from '@nuxtjs/strapi/dist/runtime/composables/useStrapiAuth'
import { glyphMethods, utils, strapiHelpers } from "~/composables/methods";

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
    widths: number[]
    tables: {
      glyf: any
    }
    axes: SamsaFontAxis[]
    config: {
      unicodeTable: {
        [unicodeHex: string]: string
      }
    }
  }
  interface SamsaGlyph {
    value: string
    openType: {
      is: string
      lig: string
      base: string
      [stylisticSet: string]: string
    }
  }
}
export interface SamsaFontAxis {
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
  id: string | null
  attributes: {
    content: string | null
    author?: Author
    createdAt?: string
    publishedAt?: string
    updatedAt?: string
    responseTo?: Opinion
    responses?: Opinion[]
    glyphs?: number[]
    votes?: Vote[]
    annotations?: {
      [id: number]: Annotation[]
    }
    axes?: {
      [tag: string]: number[]
    }
  }
}
export interface Author {
  id: number
  attributes: {
    createdAt: string
    email: string
    name: string
    username: string
    role: object
    avatar: any
  }
}

export interface Vote {
  author: number
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








export interface DiscourseState {
  all: {
    [id: string]: Discourse
  }
  current: Discourse
  font: SamsaFont
  search: string
  filter: {
    [key: string]: boolean
  }
  new: {
    title: string,
    content: string,
    files: object
  },
  setCurrent: (id: string) => void
  fetch: () => void
}
interface annotationTool extends Annotation {
  id: number | null
}
export interface OpinionState {
  form: Opinion
  active: Opinion
  formActive: Boolean
  selectedGlyphs: number[]
  invariableGlyphs: number[]
  annotationTool: annotationTool
  reset: (key: string) => void
}

interface User {
  id: number,
  attributes: object
}
type Strapi4 = typeof useStrapi4
type StrapiAuth = typeof useStrapiAuth
type StrapiUser = typeof useStrapiUser
type Strapi = {
  client: typeof strapiHelpers.client
  uploadFile: typeof strapiHelpers.uploadFile
  removeFile: typeof strapiHelpers.removeFile
  register: typeof useStrapiAuth.register
  api: typeof publicRuntimeConfig
  user: typeof User
}


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $state: {
      discourse: DiscourseState
      opinion: OpinionState
    },
    $strapi: Strapi
    $f: any
  }
}
