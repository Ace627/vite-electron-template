interface WindowElectron {
  /** 渲染进程向主进程发送消息 单向 */
  send: (channel: string, data?: any) => void
}
