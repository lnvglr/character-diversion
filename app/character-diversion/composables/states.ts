import type { Discourse } from '~/types'
import { reactive, computed, ComputedRef } from 'vue'
import { SamsaFont } from '@/assets/samsa-core.js'

interface State {
  all: Discourse[]
  id: {
    [id: string]: Discourse
  }
  current: ComputedRef<Discourse>
}

export const discourse = reactive<State>({
  all: [],
  id: {},
  current: null,
})
// watch(
//   () => useRoute().params.id,
//   () => {
//     const current =
//       discourse.id[useRoute().params.id as keyof typeof discourse.id]
//     useSamsaFont(discourse.current.attributes.font).then((font: SamsaFont) => {
//       current.attributes.SamsaFont = font
//       discourse.current = current
//     })
//   }
// )

export const useSamsaFont = (fontName: string) =>
  new Promise((resolve, reject) => {
    new SamsaFont({
      url: '../assets/fonts/' + fontName,
      callback: (e: SamsaFont) => resolve(e),
    })
  })
