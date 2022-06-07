import { SamsaFont, SamsaGlyph, SamsaFontAxes } from '@/types'
import { opinion } from '@/composables/states'
import { useRelativeTime } from '@/composables/relativeTime'

const nameToUnicode = (string: string): number => {
  if (string.length === 1) return string.charCodeAt(0)
  const matchedGlyph = opinion.font.glyphs.find((g: SamsaGlyph) => g.name === string)
  if (matchedGlyph) return opinion.font.cmapReverse[matchedGlyph.id]
}

export const glyphMethods = {
  getAxisByIndex: (index: number) => {
    const tag = opinion.font.axes[index]?.tag
    opinion.form.attributes.axes[tag]
  },
  getAxis: (tag: string) => opinion.form.attributes.axes[tag],
  getFontVariations: (index: number) =>
    opinion.form.attributes.axes
      ? Object.entries(opinion.form.attributes.axes).map(
          (e) => `'${e[0]}' ${e[1][index]}`
        )
      : [],
  getTupleValue: (index: number) =>
    opinion.form.attributes.axes
      ? Object.values(opinion.form.attributes.axes).map(
          (e, i) => e[index] / opinion.font.axes[i]?.max
        )
      : [],
  toggleGlyph: (id: number, value: boolean = null) => {
    const add = !!value || !opinion.form.attributes.glyphs.includes(id)
    add
      ? opinion.form.attributes.glyphs.push(id)
      : (opinion.form.attributes.glyphs = opinion.form.attributes.glyphs.filter(
          (e: number) => e !== id
        ))
  },
  getGlyphsById: (
    glyphs: number | number[],
    font: SamsaFont = null
  ): string => {
    if (!font) font = opinion.font
    const map = font?.cmapReverse
    if (!glyphs || glyphs === 1 || !map) return ''
    if (typeof glyphs === 'number') glyphs = [glyphs]
    return glyphs
      .map((id): string => {
        if (!(id in map)) {
          const SamsaGlyph = font.glyphs[id]
          const lig = SamsaGlyph?.openType.lig
          if (lig) return lig
          id = SamsaGlyph?.openType.base
        }
        return String.fromCharCode(map[id])
      })
      .join('')
  },
  glyphToUnicode: (string: string | string[]): number | number[] => {
    if (typeof string === 'string') {
      return opinion.font.cmap[nameToUnicode(string)]
    }
    return string.map((e) => opinion.font.cmap[nameToUnicode(e)])
  },
  nameToUnicode,

  setPosition: () => {
    opinion.form.attributes.axes = opinion.font?.axes.reduce(
      (acc: Object, curr: SamsaFontAxes) => ({
        ...acc,
        [curr.tag]: [curr.min, curr.max],
      }),
      {}
    )
  },
  
}

export const utils = {
  invertObject: (object: Object) => {
    if (!object) return
    return Object.keys(object).reduce((ret, key) => {
      ret[object[key]] = key
      return ret
    }, {})
  },
  arrayContainsObject: (array: object[], object: object) => {
    const objectInArray = array.find(item => Object.keys(item).every(key => item[key] === object[key]))
    return objectInArray && array.indexOf(objectInArray)
  },
  relativeTime(time: string) {
    return useRelativeTime(time)
  },
}
