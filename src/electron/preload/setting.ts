import { contextBridge, ipcRenderer } from 'electron'
import type { Settings } from '../../types/settings'

contextBridge.exposeInMainWorld('setting', {
  load: function () { return ipcRenderer.invoke('settings:load'); },
  save: function (patch: Partial<Settings>) { return ipcRenderer.invoke('settings:save', patch); },
})
