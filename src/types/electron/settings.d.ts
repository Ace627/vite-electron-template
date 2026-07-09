import type { SettingsAPI } from '../settings'

declare global {
  interface Window {
    setting: SettingsAPI
  }
}

export {}
