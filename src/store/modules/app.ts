export const useAppStore = defineStore('app', () => {
  /** 应用标题 */
  const title = import.meta.env.VITE_APP_TITLE

  return { title }
})
