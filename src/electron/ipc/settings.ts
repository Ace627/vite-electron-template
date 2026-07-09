import { ipcMain } from 'electron'
import type { Settings } from '@/types'
import { loadSettings, saveSettings } from '../setting'

/** 装配设置读写相关的 IPC 监听 */
export function initSettingsIpc(): void {
  ipcMain.handle('settings:load', () => loadSettings())

  ipcMain.handle('settings:save', (_event, patch: Partial<Settings>) => saveSettings(patch))
}
