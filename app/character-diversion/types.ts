import publicRuntimeConfig from '@nuxtjs/strapi/dist/module'
import { Ref } from 'vue'
import { useStrapi4 } from '@nuxtjs/strapi/dist/runtime/composables/useStrapi4'
import { useStrapiAuth } from '@nuxtjs/strapi/dist/runtime/composables/useStrapiAuth'
import { StrapiAuthenticationData, StrapiAuthenticationResponse, StrapiAuthProvider, StrapiEmailConfirmationData, StrapiForgotPasswordData, StrapiRegistrationData, StrapiResetPasswordData, StrapiUser } from '@nuxtjs/strapi/dist/runtime/types'
// export { Strapi4Response, Strapi4ResponseData, Strapi4RequestParams } from '@nuxtjs/strapi/dist/runtime/types'
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
    },
    version: string
    name: string
  }
  interface SamsaGlyph {
    value: string
    dummy: boolean
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
  id: number
  attributes: {
    title: string
    content: string
    author?: Author
    createdAt?: string
    publishedAt?: string
    updatedAt?: string
    opinions?: Opinion[]
    font: File
  }
}

export interface Opinion {
  id: number
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
  current: Discourse | null
  font: SamsaFont | null
  search: string
  filter: {
    [key: string]: boolean
  }
  new: {
    title: string,
    content: string,
    files: object
  },
  setCurrent: (id: string | string[]) => void
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
type StrapiExtended = {
  api: typeof publicRuntimeConfig
}
// type Strapi = typeof useStrapi4 & typeof useStrapiAuth & typeof useStrapiUser & typeof strapiHelpers & StrapiExtended
export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string
  email: string
  id: number
  name: string
  provider: string
  updatedAt: string
  username: string
  role: string
  avatar: any
}
interface Strapi {
  login(params?:object) : Promise<any>;
  find(collection:string, params?:object) : Promise<any>;
  findOne(contentType: string, id: string | number, params?: Strapi4RequestParams) : Promise<any>;
  create(collection:string, data:object) : Promise<any>;
  count(collection:string, params?:object) : Promise<any>;
  update(collection:string, id:number, data:object) : Promise<any>;
  delete(collection:string, id:number) : Promise<any>;
  setToken: (value: string | null) => void;
  setUser: (value: StrapiUser) => void;
  fetchUser: () => Promise<Ref<StrapiUser>>;
  login: (data: StrapiAuthenticationData) => Promise<StrapiAuthenticationResponse>;
  logout: () => void;
  register: (data: StrapiRegistrationData) => Promise<StrapiAuthenticationResponse>;
  forgotPassword: (data: StrapiForgotPasswordData) => Promise<void>;
  resetPassword: (data: StrapiResetPasswordData) => Promise<StrapiAuthenticationResponse>;
  sendEmailConfirmation: (data: StrapiEmailConfirmationData) => Promise<void>;
  getProviderAuthenticationUrl: (provider: StrapiAuthProvider) => string;
  authenticateProvider: (provider: StrapiAuthProvider, access_token: string) => Promise<StrapiAuthenticationResponse>;
  client: typeof strapiHelpers.client;
  user: typeof User;
  uploadFile: typeof strapiHelpers.uploadFile;
  removeFile: typeof strapiHelpers.removeFile;
  api: typeof publicRuntimeConfig & { media: string };
}


declare module '@vue/runtime-core' {
  interface StrapiUser extends User {
  }
  interface ComponentCustomProperties {
    $state: {
      discourse: DiscourseState
      opinion: OpinionState
    },
    $strapi: Strapi
    $f: any
  }
}
