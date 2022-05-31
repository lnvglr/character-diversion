import type { Discourse, SamsaGlyph, SamsaFont as SamsaFontType } from '~/types'
import { reactive, ComputedRef } from 'vue'
import { SamsaFont } from '@/assets/samsa-core'
import { utils, glyphMethods } from '~~/composables/methods'
import { GlyphsFrame } from '~~/.nuxt/components'

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
interface ConfigurationState {
  axes: {
    [tag: string]: number | string
  }
  glyphs: number[]
  opinion: string
  font: SamsaFontType
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
export const configuration = reactive<ConfigurationState>({
  axes: {},
  opinion: '',
  glyphs: [],
  font: null
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
    if (! (glyph.id in font.cmapReverse)) {
      glyph.openType = {
        is: null
      }
      const ligature = glyph.name.split('_')
      const alternate = glyph.name.split('.')
      if (ligature.length > 1) {
        glyph.openType.is = 'lig'
        glyph.openType['lig'] = glyph.name
      }
      if (alternate.length > 1) {
        const base = font.glyphs.find((e: SamsaGlyph) => e?.name === alternate[0])
        if (base) {
          glyph.openType.is = alternate[1]
          glyph.openType.base = base.id
          base.openType = {}
          base.openType[alternate[1]] = glyph.id
        }
      }
    }
    return glyph
  })
}