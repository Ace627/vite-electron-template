declare global {
  interface Window {
    app: {
      versions: Record<string, string>
      platform: string
      arch: string
    }
  }
}

export {}
