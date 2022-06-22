import { reactive } from 'vue'
import { useNuxtApp, useRoute } from '#app'
import type { Opinion, Discourse, SamsaGlyph, SamsaFont as SamsaFontType, GlyphMap, DiscourseState, OpinionState } from '@/types'

import { SamsaFont } from '@/assets/samsa-core'
import { utils, glyphMethods } from '@/composables/methods'
import unicodeTable from '@/composables/unicode-table'

export const discourse: DiscourseState = reactive<DiscourseState>({
  all: {},
  current: null,
  font: null,
  search: '',
  filter: {},
  new: {
    title: '',
    content: '',
    files: {}
  },
  setCurrent: (id: string) => {
    const current = discourse.all[id as keyof typeof discourse.all]
    if (!current) return discourse.current = null
    useSamsaFont(current.attributes.font?.data?.attributes.url)
      .then((font: SamsaFont) => {
        discourse.font = font
        current.font = font
      })
      .catch(e => console.error(e))
      .finally(() => discourse.current = current)
  },
  fetch: () => {
    new Promise(
      (resolve, reject) => {
        useNuxtApp().$strapi.find('discourses', {
          // @todo: pull opinions only for current discourse
          // then remove data key and spread opinions.data to opinions
          populate: [
            'featuredImage',
            'font',
            'author',
            'author.avatar',
            'opinions.author',
            'opinions.author.avatar',
            'opinions.comments.author',
            'opinions.comments.author.avatar'
          ],
          sort: ['publishedAt:desc'],
        })
          .then(({ data }) => {
            discourse.all = data.reduce((acc: Object, curr: Discourse) => ({ ...acc, [curr.id]: curr }), {})
            discourse.setCurrent(useRoute().params.id)
            resolve(discourse.all)
          })
          .catch((err: Error) => {
            reject(err)
          })
      }
    )
  }
})
const defaultOpinion = {
  id: null,
  attributes: {
    content: null,
    axes: {},
    glyphs: [],
    annotations: {},
  }
} as Opinion
export const opinion = reactive<OpinionState>({
  form: JSON.parse(JSON.stringify(defaultOpinion)),
  formActive: false,
  active: JSON.parse(JSON.stringify(defaultOpinion)),
  selectedGlyphs: [],
  invariableGlyphs: [],
  annotationTool: {
    id: null,
    x: 0,
    y: 0
  },
  reset: (area: string = 'form'): void => {
    // opinion[area].id = defaultOpinion.id
    opinion[area] = JSON.parse(JSON.stringify(defaultOpinion))
    if (area === 'form') opinion.formActive = false
    glyphMethods.setAxesPosition()
  }
})

export const useSamsaFont = (fontName: string): Promise<SamsaFont> => {
  const app = useNuxtApp()
  return new Promise(
    (resolve, reject) => {
      if (!fontName) return reject({ errors: 'Error: fontName is null.' })
      try {
        new SamsaFont({
          url: app.$strapi.api.url + fontName,
          callback: (font: SamsaFont) => {
            if (font.errors.length > 0) {
              reject(font)
            } else {
              font.cmapReverse = utils.invertObject(font.cmap)
              font.config.unicodeTable = unicodeTable
              const { glyphMap, literalMap, postScriptMap, nameMap } = mapGlyphs(font)
              font.glyphMap = glyphMap
              font.literalMap = literalMap
              font.postScriptMap = postScriptMap
              font.nameMap = nameMap
              font.name = font.names[1]
              font.glyphs = openTypeGlyphs(font)
              font.version = formatVersion(font)
              console.log(font)
              resolve(font)
            }
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  )
}

const formatVersion = (font: SamsaFont): string => {
  const v = font.names[5].split(";")[0]
  const convert = (e: number) => (e % 1 == 0) ? e + ".0" : e;
  return v.split(' ').map((e: string, i: number) => i === 1 ? convert(parseFloat(e)) : e ).join(' ')
}
const mapGlyphs = (font: SamsaFontType) => {
  const glyphMap = {}
  const postScriptMap = {}
  const literalMap = {}
  const nameMap = {}
  font.glyphs.forEach((glyph: SamsaGlyph) => {
    const alternate = glyph.name?.split('.') || []
    const baseId = font.cmapReverse[glyph.id] ? glyph.id : font.glyphs.find((e: SamsaGlyph) => e?.name === alternate[0])?.id
    const unicode = font.cmapReverse[baseId]
    const unicodeHex = unicode && String(Number(unicode).toString(16)).padStart(4, '0').toLocaleUpperCase()
    const suffix = alternate.slice(1)
    const map = {
      glyph,
      unicode,
      unicodeHex,
      name: glyph.name,
      literal: unicode && String.fromCharCode(unicode),
      postScript: unicodeHex && [unicodeTable[unicodeHex] || ' ', ...suffix].filter(e => e).join('.').trim(),
    } as GlyphMap

    glyphMap[glyph.id] = map
    postScriptMap[map.postScript] = map
    if (!literalMap[map.literal]) literalMap[map.literal] = map
    nameMap[map.name] = map
  })
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
    if (!glyph.name) {
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
    if (!(glyph.id in font.cmapReverse) && base && alternate?.[1]) {
      glyph.openType.is = alternate[1]
      // base.openType[String(alternate[1])] = glyph.id
    }
    return glyph
  })
}