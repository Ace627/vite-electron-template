interface ClipboardAPI {
  readText: () => Promise<string | null>
  writeText: (text: string) => Promise<void>
}

declare global {
  interface Window {
    clipboard: ClipboardAPI
  }
}

export {}
