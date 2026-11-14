import { useSettingStore } from '@/store/modules/setting'

/**
 * 主题切换 hook（复刻 nestjs-admin-template/apps/admin 的圆形扩散动效）
 * - View Transition + 全局 CSS keyframes：JS 只注入圆心/半径变量与方向标记
 * - 不支持 View Transitions 或用户偏好减少动效时，自动降级为直接切换
 */
export function useTheme() {
  const settingStore = useSettingStore()

  // 防 FOUC：首次进入若已是 dark，确保 html 有 dark 类（幂等）
  if (settingStore.theme === 'dark') document.documentElement.classList.add('dark')

  /** 最近一次切换动效的序号：快速连续切换时仅让最后一次的清理生效 */
  let latestTransitionId = 0

  /**
   * 应用主题：同步切换 dark 类与数据层，并从触发点播放圆形扩散
   * @param theme 目标主题
   * @param event 触发切换的鼠标事件，用于确定扩散圆心；缺省时从屏幕中心扩散
   */
  function apply(theme: 'light' | 'dark', event?: MouseEvent) {
    const root = document.documentElement
    const nextDark = theme === 'dark'
    if (root.classList.contains('dark') === nextDark) return

    const isAppearanceTransition =
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      settingStore.theme = theme
      root.classList.toggle('dark', nextDark)
      return
    }

    const x = event?.clientX ?? window.innerWidth / 2
    const y = event?.clientY ?? window.innerHeight / 2
    const endRadius = Math.hypot(Math.max(x, 0, window.innerWidth - x), Math.max(y, 0, window.innerHeight - y))

    // 圆心与半径归一化为百分比，与 CSS circle() 的百分比参考框一致
    const ratioX = (100 * x) / window.innerWidth
    const ratioY = (100 * y) / window.innerHeight
    const ratioR = (100 * endRadius) / (Math.hypot(window.innerWidth, window.innerHeight) / Math.SQRT2)

    const transitionId = ++latestTransitionId
    root.dataset.themeTransition = nextDark ? 'to-dark' : 'to-light'
    root.style.setProperty('--theme-transition-x', `${ratioX}%`)
    root.style.setProperty('--theme-transition-y', `${ratioY}%`)
    root.style.setProperty('--theme-transition-radius', `${ratioR}%`)

    // store 的 watch 是异步 flush，必须在回调内同步切 dark 类，
    // 否则浏览器捕获的 new 快照仍是旧主题；持久化仍由 store watch 完成
    const transition = document.startViewTransition(() => {
      settingStore.theme = theme
      root.classList.toggle('dark', nextDark)
    })

    const cleanup = () => {
      if (transitionId !== latestTransitionId) return
      delete root.dataset.themeTransition
      root.style.removeProperty('--theme-transition-x')
      root.style.removeProperty('--theme-transition-y')
      root.style.removeProperty('--theme-transition-radius')
    }
    // 过渡被跳过时 finished 也可能 reject，双分支保证清理执行且不产生未处理的 rejection
    transition.finished.then(cleanup, cleanup)
  }

  /** 取反切换（传入鼠标事件可从点击点扩散） */
  function toggle(event?: MouseEvent) {
    apply(settingStore.theme === 'dark' ? 'light' : 'dark', event)
  }

  return { apply, toggle }
}
