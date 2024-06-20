interface WindowIpcRenderer {
  /** 渲染进程向主进程发送消息 单向 */
  send: (channel: IpcChannelKey, data?: any) => void

  /** 进行主进程与渲染进程之间的双向通信 */
  invoke: <T = any>(channel: IpcChannelKey, data?: any) => Promise<T>
}

interface Window {
  ipcRenderer: WindowIpcRenderer
}
