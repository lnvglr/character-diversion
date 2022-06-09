import type { Opinion, Discourse, SamsaGlyph, SamsaFont as SamsaFontType, GlyphMap } from '~/types'
import { reactive, ComputedRef } from 'vue'
import { SamsaFont } from '@/assets/samsa-core'
import { utils, glyphMethods } from '~~/composables/methods'
import unicodeTable from '~~/composables/unicode-table'

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
    activeAxes: [],
    glyphs: [],
    annotations: {},
  }
} as Opinion
export const opinion = reactive<OpinionState>({
  form: JSON.parse(JSON.stringify(defaultOpinion)),
  active: JSON.parse(JSON.stringify(defaultOpinion)),
  annotationTool: {
    id: null,
    x: 0,
    y: 0
  },
  font: null,
  reset: (area: string = 'form') => {
    // opinion[area].id = defaultOpinion.id
    opinion[area] = JSON.parse(JSON.stringify(defaultOpinion))
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
            console.log(e)
            e.cmapReverse = utils.invertObject(e.cmap)
            const map = mapGlyphs(e)
            e.glyphMap = map.glyphMap
            e.literalMap = map.literalMap
            e.postScriptMap = map.postScriptMap
            e.nameMap = map.nameMap
            e.glyphs = openTypeGlyphs(e)
            resolve(e)
          }
        },
      })
    }
  )
const mapGlyphs = (font: SamsaFontType) => {
  // const newMap = {}
  // unicodeTable.split('\n').map((e: string) => e.split(';')).forEach((e: string[], i: number) => {
  //   const codes = e[1].split(' ')
  //   if (!e[0].includes('afii')) {
  //   codes.forEach((code: string, k: number) => {
  //     if (!newMap[code]) newMap[code] = e[0]
  //   })
  // }
    // newMap[e[1]] = e[0]
    // if (!(e[1] in newMap)) {
    // }
  // })
  // console.log(JSON.stringify(newMap))
  const glyphMap = {}
  const postScriptMap = {}
  const literalMap = {}
  const nameMap = {}
  font.glyphs.forEach((glyph: SamsaGlyph) => {
    const alternate = glyph.name?.split('.') || []
    const baseId = font.cmapReverse[glyph.id] ? glyph.id : font.glyphs.find((e: SamsaGlyph) => e?.name === alternate[0])?.id
    const unicode = font.cmapReverse[baseId]
    const unicodeHex = unicode && String(Number(unicode).toString(16)).padStart(4, '0').toLocaleUpperCase()
    const map = {
      glyph,
      unicode,
      unicodeHex,
      name: glyph.name,
      literal: unicode && String.fromCharCode(unicode),
      postScript: unicodeHex && [unicodeTable[unicodeHex], ...alternate.slice(1)].filter(e => e).join('.'),
    }

    glyphMap[glyph.id] = map
    postScriptMap[map.postScript] = map
    literalMap[map.literal] = map
    nameMap[map.name] = map
  })

  console.timeEnd('test')
  return {
    glyphMap,
    postScriptMap,
    literalMap,
    nameMap
  }
}
// @todo use samsafont feature lookup table
const openTypeGlyphs = (font: SamsaFontType) => {
  return font.glyphs.map((glyph: SamsaGlyph) => {
    if (! glyph.name) {
      const character = font.glyphMap[glyph.id].literal
      glyph.name = (!['\x00'].includes(character) && glyph.name) && character
      glyph.value = character
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
    if (! (glyph.id in font.cmapReverse) && base && alternate?.[1]) {
      glyph.openType.is = alternate[1]
      // base.openType[String(alternate[1])] = glyph.id
    }
    return glyph
  })
}