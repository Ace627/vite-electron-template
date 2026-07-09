import { app } from 'electron'
import type { Settings } from '@/types'
import { join, dirname } from 'node:path'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { defaultSettings } from '@/common'

/** 数据目录：exe 同级 data/ */
function dataDir(): string {
  return join(dirname(app.getPath('exe')), 'data')
}

/** settings.json 路径 */
function settingsPath(): string {
  return join(dataDir(), 'settings.json')
}

/** 读取设置（首次启动自动生成默认配置文件） */
export function loadSettings(): Settings {
  const path = settingsPath()
  ensureDataDir()

  if (!existsSync(path)) {
    // 首次启动，生成默认配置文件
    writeFileSync(path, JSON.stringify(defaultSettings, null, 2), 'utf-8')
    return { ...defaultSettings }
  }

  try {
    return { ...defaultSettings, ...JSON.parse(readFileSync(path, 'utf-8')) }
  } catch {
    // 文件损坏，重置为默认
    writeFileSync(path, JSON.stringify(defaultSettings, null, 2), 'utf-8')
    return { ...defaultSettings }
  }
}

/** 保存设置 */
export function saveSettings(patch: Partial<Settings>): Settings {
  const current = loadSettings()
  const merged = { ...current, ...patch }
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(settingsPath(), JSON.stringify(merged, null, 2), 'utf-8')
  return merged
}

/** 确保数据目录存在 */
export function ensureDataDir(): void {
  mkdirSync(dataDir(), { recursive: true })
}
