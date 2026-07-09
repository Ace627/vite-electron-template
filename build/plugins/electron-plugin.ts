import electron from 'vite-plugin-electron/simple'

export function registerElectronPlugin() {
  return electron({
    main: {
      entry: 'src/electron/main.ts',
      vite: {
        build: {
          outDir: 'dist-electron',
        },
      },
    },
    preload: {
      input: 'src/electron/preload/index.ts',
      vite: {
        build: {
          outDir: 'dist-electron',
          rollupOptions: {
            output: {
              entryFileNames: 'preload.mjs',
            },
          },
        },
      },
    },
  })
}
