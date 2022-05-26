import type { Discourse } from '~/types'
// import type { SamsaFont as SamsaFontType, Discourse } from '~/types'
import { reactive, ComputedRef } from 'vue'
import { SamsaFont } from '@/assets/samsa-core'

interface DiscourseState {
  id: {
    [id: string]: Discourse
  }
  current: ComputedRef<Discourse>
  tuple: {
    current: Object
  }
}

export const discourse = reactive<DiscourseState>({
  id: {},
  current: null,
  tuple: {
    current: {}
  }
})

export const useSamsaFont = (fontName: string) =>
  new Promise((resolve, reject) => {
    new SamsaFont({
      url: '../assets/fonts/' + fontName,
      callback: (e: SamsaFont) => {
        if (e.errors.length > 0) {
          reject(e)
        } else {
          resolve(e)
        }
      },
    })
  })
