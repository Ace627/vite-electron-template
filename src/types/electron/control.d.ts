declare global {
  interface Window {
    control: {
      minimize: () => void
      maximize: () => Promise<void>
      isMaximized: () => Promise<boolean>
      close: () => void
      openDevTools: () => void
      quitApp: () => void
      onMaximizeChange: (callback: (maximized: boolean) => void) => void
    }
  }
}

export {}
