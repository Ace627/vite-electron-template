import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('app', {
  /** 应用版本信息 */
  versions: process.versions,
  /** 应用平台 */
  platform: process.platform,
  /** 应用架构 */
  arch: process.arch,
})
