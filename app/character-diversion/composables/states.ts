import type { Opinion, Discourse, SamsaGlyph, SamsaFont as SamsaFontType } from '~/types'
import { reactive, ComputedRef } from 'vue'
import { SamsaFont } from '@/assets/samsa-core'
import { utils, glyphMethods } from '~~/composables/methods'

interface DiscourseState {
  id: {
    [id: string]: Discourse
  }
  current: ComputedRef<Discourse>
  new: {
    title: string,
    content: string,
    files: object
  },
}
interface OpinionState {
  form: Opinion
  active: Opinion
  annotationTool: {
    id: number,
    x: number,
    y: number
  },
  font: SamsaFont
  reset: () => void
}
export const discourse = reactive<DiscourseState>({
  id: {},
  current: null,
  new: {
    title: null,
    content: null,
    files: null
  },
})
const defaultOpinion = {
  id: null,
  attributes: {
    title: null,
    axes: {},
    glyphs: [],
    annotations: {},
  }
} as Opinion
export const opinion = reactive<OpinionState>({
  form: defaultOpinion,
  active: defaultOpinion,
  annotationTool: {
    id: null,
    x: 0,
    y: 0
  },
  font: null,
  reset: (area: string = 'form') => {
    Object.assign(opinion[area], defaultOpinion)
    glyphMethods.setPosition()
  }
})

export const useSamsaFont = (fontName: string) =>
  new Promise(
    (resolve, reject) => {
      if (!fontName) return reject({ errors: 'Error: fontName is null.' })
      new SamsaFont({
        url: 'http://localhost:1337' + fontName,
        // url: '../assets/fonts/' + fontName,
        callback: (e: SamsaFont) => {
          if (e.errors.length > 0) {
            reject(e)
          } else {
            e.cmapReverse = utils.invertObject(e.cmap)
            e.glyphs = openTypeGlyphs(e)
            resolve(e)
          }
        },
      })
    }
  )

const openTypeGlyphs = (font: SamsaFontType) => {
  return font.glyphs.map((glyph: SamsaGlyph) => {
    if (! glyph.name) {
      const character = String.fromCharCode(Number(font.cmapReverse[glyph.id]))
      glyph.name = (!['\x00'].includes(character) && glyph.name) && character
      return glyph
    }
    const ligature = glyph.name.split('_')
    const alternate = glyph.name.split('.')
    const base = font.glyphs.find((e: SamsaGlyph) => e?.name === alternate[0])
    glyph.openType = {
      base: base?.id
    }
    if (ligature.length > 1) {
      glyph.openType.is = 'lig'
      glyph.openType['lig'] = glyph.name
    }
    if (! (glyph.id in font.cmapReverse) && base && alternate.length > 1) {
      glyph.openType.is = alternate[1]
      base.openType[alternate[1]] = glyph.id
    }
    return glyph
  })
}