import electron from 'vite-plugin-electron/simple'

export function registerElectronPlugin() {
  return electron({
    main: {
      entry: 'src/electron/main/index.ts',
      vite: {
        build: {
          outDir: 'dist-electron',
        },
      },
    },
    preload: {
      input: 'src/electron/preload.ts',
    },
  })
}
