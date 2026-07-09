import { defaultSettings } from '@/common'
import type { Settings } from '@/types'

export const useSettingStore = defineStore('setting', () => {
  const state = reactive<Settings>(defaultSettings)

  /** 从文件加载设置并应用 */
  async function load() {
    const settings = await window.setting.load()
    Object.assign(state, settings)
  }

  watch(
    () => ({ ...state }),
    (value) => {
      // 监听 theme 变化，应用到 html
      document.documentElement.classList.toggle('dark', value.theme === 'dark')
      window.setting.save(value)
    },
  )

  return { load, ...toRefs(state) }
})
