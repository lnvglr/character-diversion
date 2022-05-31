import { configuration } from '@/composables/states'
import { useRelativeTime } from '@/composables/relativeTime'

export const glyphMethods = {
  getAxisByIndex: (index: number) =>
    configuration.axes[configuration.font.axes[index]?.tag],
  getAxis: (tag: string) => configuration.axes[tag],
  getFontVariations: (index: number) =>
    configuration.axes
      ? Object.entries(configuration.axes).map(
          (e) => `'${e[0]}' ${e[1][index]}`
        )
      : [],
  getTupleValue: (index: number) =>
    configuration.axes
      ? Object.values(configuration.axes).map(
          (e, i) => e[index] / configuration.font.axes[i]?.max
        )
      : [],
  toggleGlyph: (id: number, value: boolean = null) => {
    const add = !!value || !configuration.glyphs.includes(id)
    add
      ? configuration.glyphs.push(id)
      : (configuration.glyphs = configuration.glyphs.filter(
          (e: number) => e !== id
        ))
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
  relativeTime(time: string) {
    return useRelativeTime(time)
  },
}
