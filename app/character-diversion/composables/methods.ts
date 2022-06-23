// import { useStrapiClient } from '@nuxtjs/strapi/dist/runtime/composables/useStrapiClient'
import { Opinion, SamsaFont, SamsaGlyph, SamsaFontAxis, Discourse } from '@/types'
import { opinion } from '@/composables/states'
import { useRelativeTime } from '@/composables/relativeTime'
import md from '@/composables/markdown'
import { content } from '~~/tailwind.config'

const nameToUnicode = (string: string): number => {
  if (string.length === 1) return string.charCodeAt(0)
  const matchedGlyph = discourse.font?.glyphs.find(
    (g: SamsaGlyph) => g.name === string
  )
  if (matchedGlyph) return discourse.font?.cmapReverse[matchedGlyph.id]
  return 0
}

export const glyphMethods = {
  getFontVariations: (index: number) =>
    opinion.form.attributes.axes
      ? Object.entries(opinion.form.attributes.axes).map(
        (e) => `'${e[0]}' ${e[1][index]}`
      )
      : [],
  getTupleValue: (index: number): number[] => {
    return opinion.form.attributes.axes && discourse.font?.axes
      ? Object.values(opinion.form.attributes.axes).map(
        (e, i) => e[index] / discourse.font.axes[i]?.max
      ) as number[]
      : []
  },
  toggleGlyph: (id: number, value: boolean | null = null) => {
    if (!opinion.formActive) return
    const add = !!value || !opinion.selectedGlyphs.includes(id)
    if (add) {
      opinion.selectedGlyphs.push(id)
    } else {
      opinion.selectedGlyphs = opinion.selectedGlyphs.filter(
        (e: number) => e !== id
      )
    }
  },
  getGlyphsById: (
    glyphs: number | number[],
    font?: SamsaFont
  ): string => {
    if (!font) font = discourse.font
    const map = font?.cmapReverse
    if (!glyphs || glyphs === 1 || !map) return ''
    if (typeof glyphs === 'number') glyphs = [glyphs]
    return glyphs
      .map((id): string => {
        if (!(id in map)) {
          const SamsaGlyph = font?.glyphs[id]
          const lig = SamsaGlyph?.openType?.lig
          if (lig) return lig
          id = SamsaGlyph?.openType.base
        }
        return String.fromCharCode(map[id])
      })
      .join('')
  },
  glyphToUnicode: (string: string | string[]): number | number[] => {
    if (typeof string === 'string') {
      return discourse.font?.cmap[nameToUnicode(string)]
    }
    return string.map((e) => discourse.font?.cmap[nameToUnicode(e)])
  },
  nameToUnicode,

  setAxesPosition: () => {
    const closest = (arr: number[], target: number) => arr.reduce(function (prev, curr) {
      return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    });
    opinion.form.attributes.axes = discourse.font?.axes.reduce(
      (acc: Object, curr: SamsaFontAxis) => {
        const min = closest([curr.min, curr.max], curr.default) === curr.default ? curr.min : curr.default
        const max = closest([curr.min, curr.max], curr.default) === curr.default ? curr.default : curr.max
        return {
          ...acc,
          [curr.tag]: [min, max],
        }
      },
      {}
    )
  },
  // positive look behind                  (?<=\/) <=== not working in safari
  // match 1 or more none white characters [\S]+?
  // until positive look ahead             (?=
  // - end of word                         $
  // - period space                        \.\s
  // - no non-word characters space        [[^\w.\s]]
  // - space                               \s
  //                                       )
  // regexPattern: /(?<=\/)[\S]+?(?=$|\.\s|[^\w.\s]|\s|\/)/ig,
  regexPattern: /\/([\S]+?)(?=$|\.\s|[^\w.\s]|\s|\/)/gi,
  match: (string: string) => {
    if (!string) return []
    const match = (string.trim().match(glyphMethods.regexPattern) || []).map((e: string) => e.slice(1))
    return match
      .map(e => {
        return (
          discourse.font.literalMap[e] ||
          discourse.font.postScriptMap[e] ||
          discourse.font.nameMap[e]
        )?.glyph.id
      })
      .filter(e => e)
  },
  glyphHasOpinion(id: number, discourseId: number = null): Opinion[] | undefined {
    let d: Discourse
    if (!discourseId && !discourse.current) return
    if (discourseId && discourseId in discourse.all) {
      d = discourse.all[discourseId]
    } else if (discourse.current) {
      d = discourse.current
    } else {
      return
    }
    if (!d.attributes.opinions) return []
    return d.attributes.opinions?.data.filter((opinion: Opinion) => opinion.attributes.glyphs.includes(id))
  },
}

export const utils = {
  invertObject: (object: object) => {
    if (!object) return {}
    return Object.keys(object).reduce((ret, key) => {
      ret[object[key]] = key
      return ret
    }, {})
  },
  arrayContainsObject: (array: object[], object: { [key: string]: any }) => {
    const objectInArray = array.find((item: { [key: string]: any }) =>
      Object.keys(item).every((key: string) => item[key] === object[key])
    )
    return objectInArray && array.indexOf(objectInArray)
  },
  relativeTime: (time: string) => {
    return useRelativeTime(time)
  },
  renderMarkdown: (markdown: string): string => {
    return md.render(markdown)
  },
  convertToBase: (value: number): number => {
    return parseFloat(
      String(value / 100)
        .split('.')
        .map((e: string, i: number, arr) => {
          return i === 0 ? (arr.length > 1 ? 0 : String(1).padEnd(e.length, '0')) : String(1).padStart(e.length, '0')
          })
        .join('.')
    )
  }
}
export const strapiHelpers = {
  client: <T>(contentType: string, data?: Partial<T>, method: string = "POST") =>
      useStrapiClient()(contentType, { method, body: data }) as Promise<T>,

  uploadFile(file: File, contentType: string, id: number, field: string) {
    let ref: string = ''
    switch(contentType) {
      case 'discourse':
        ref = 'api::discourse.discourse'
      case 'opinion':
        ref = 'api::opinion.opinion'
      case 'user':
        ref = 'plugin::users-permissions.user'
    }

    const formData = new FormData()
    formData.append('files', file, file.name)
    formData.append('ref', ref)
    formData.append('refId', id.toString())
    formData.append('field', field)
    return new Promise((resolve, reject) => {
      if (!file || ref === '') reject
      strapiHelpers.client(`upload`, formData)
        .then(resolve)
        .catch(reject)
    })
  },
  removeFile(id: number) {
    return new Promise((resolve, reject) => {
      strapiHelpers.client(`upload/files/${id}`, {}, 'DELETE')
        .then(resolve)
        .catch(reject)
    })
  }
}