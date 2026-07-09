import { contextBridge, ipcRenderer } from 'electron'
import type { Settings } from '../../types/settings'

contextBridge.exposeInMainWorld('setting', {
  /** 加载设置 */
  load() {
    return ipcRenderer.invoke('settings:load')
  },
  /** 保存设置 */
  save(patch: Partial<Settings>) {
    return ipcRenderer.invoke('settings:save', patch)
  },
})
