import type { SettingsAPI } from './settings'

/** Electron 预加载脚本暴露的窗口控制 API */
interface WindowControls {
  minimize: () => void
  maximize: () => Promise<void>
  isMaximized: () => Promise<boolean>
  close: () => void
  openDevTools: () => void
  quitApp: () => void
  onMaximizeChange: (callback: (maximized: boolean) => void) => void
}

/** Electron 应用版本信息 */
interface AppInfo {
  versions: Record<string, string>
  platform: string
  arch: string
}

declare global {
  interface Window {
    windowControls: WindowControls
    appInfo: AppInfo
    settingsAPI: SettingsAPI
  }
}

export {}
