import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('clipboard', {
  /** 从剪贴板读取文本 */
  readText() {
    return ipcRenderer.invoke('clipboard:read-text')
  },
  /** 写入文本到剪贴板 */
  writeText(text: string) {
    return ipcRenderer.invoke('clipboard:write-text', text)
  },
})
