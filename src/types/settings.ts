/** 应用设置 */
export interface Settings {
  /** 主题模式 */
  theme: 'light' | 'dark'
  /** 组件大小 */
  size: 'default' | 'small' | 'large'
}

/** 渲染进程调用 settings 的 API */
export interface SettingsAPI {
  load: () => Promise<Settings>
  save: (patch: Partial<Settings>) => Promise<Settings>
}
