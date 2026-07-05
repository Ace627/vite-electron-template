import type { ThemeMode } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<ThemeMode>('light')

  /** 切换 html 的 dark class */
  function applyTheme(val: ThemeMode) {
    document.documentElement.classList.toggle('dark', val === 'dark')
  }

  /** 从文件加载设置并应用 */
  async function load() {
    const settings = await window.settingsAPI.load()
    theme.value = settings.theme
    applyTheme(settings.theme)
  }

  /** 切换主题（保存到文件并应用） */
  async function setTheme(val: ThemeMode) {
    theme.value = val
    applyTheme(val)
    await window.settingsAPI.save({ theme: val })
  }

  return { theme, load, setTheme }
})
