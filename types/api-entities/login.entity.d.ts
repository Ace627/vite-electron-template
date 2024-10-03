/**
 * @description 登录所需的数据的结构定义
 */
namespace LoginEntity {
  /** 用户登录所需要的数据 */
  interface LoginForm {
    username: string
    password: string
    rememberMe: boolean
    captcha: string
  }
}
