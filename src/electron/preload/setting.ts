import { contextBridge, ipcRenderer } from 'electron'
import type { Settings } from '../../types/settings'

contextBridge.exposeInMainWorld('setting', {
  load() {
    return ipcRenderer.invoke('settings:load')
  },
  save(patch: Partial<Settings>) {
    return ipcRenderer.invoke('settings:save', patch)
  },
})
