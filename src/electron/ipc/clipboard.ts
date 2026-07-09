import { clipboard, ipcMain } from 'electron'

/** 装配剪贴板相关的 IPC 监听 */
export function initClipboardIpc(): void {
  ipcMain.handle('clipboard:read-text', () => {
    const text = clipboard.readText()
    return text || null
  })

  ipcMain.handle('clipboard:write-text', (_event, text: string) => {
    if (!text) throw new Error('写入剪贴板的文本不能为空')
    clipboard.writeText(text)
  })
}
