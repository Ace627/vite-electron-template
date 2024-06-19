import vitePluginElectron from 'vite-plugin-electron/simple'

export function registerElectronPlugin() {
  return vitePluginElectron({
    main: {
      // Shortcut of `build.lib.entry`
      entry: 'electron/main.ts', // 这个是 electron 主进程的入口文件
      vite: { build: { outDir: 'dist-electron' } },
    },
    preload: {
      // Shortcut of `build.rollupOptions.input`
      input: 'electron/preload.ts',
    },
    // Optional: Use Node.js API in the Renderer process
    // renderer: {},
  })
}
