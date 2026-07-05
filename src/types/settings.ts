/** 主题模式 */
export type ThemeMode = 'light' | 'dark'

/** 应用设置 */
export interface Settings {
  theme: ThemeMode
}

/** 渲染进程调用 settings 的 API */
export interface SettingsAPI {
  load: () => Promise<Settings>
  save: (patch: Partial<Settings>) => Promise<Settings>
}
