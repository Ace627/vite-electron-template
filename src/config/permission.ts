import router from '@/router'

const title = '三无工具箱'

router.afterEach(() => {
  document.title = title
})
