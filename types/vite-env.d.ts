/// <reference types="vite/client" />

// 解决找不到 .vue 文件的声明的报错
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
