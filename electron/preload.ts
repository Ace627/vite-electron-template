import { contextBridge, ipcRenderer } from 'electron'

console.log(111, `preload.mjs 文件已被成功加载`)

function sendChannel() {
  ipcRenderer.send(`show-modal`)
}

contextBridge.exposeInMainWorld('electron', {
  sendChannel,
})
