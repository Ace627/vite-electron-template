import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('clipboard', {
  readText() {
    return ipcRenderer.invoke('clipboard:read-text')
  },
  writeText(text: string) {
    return ipcRenderer.invoke('clipboard:write-text', text)
  },
})
