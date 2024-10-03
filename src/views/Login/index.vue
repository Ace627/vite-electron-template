<template>
  <div class="login-container flex-center">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <h3 class="title">{{ viteEnv.VITE_APP_TITLE }}</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号">
          <template #prefix> <IconFont name="User" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" show-password placeholder="密码">
          <template #prefix> <IconFont name="Lock" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" v-if="captchaEnabled">
        <div class="flex items-center w-full">
          <el-input v-model="loginForm.captcha" placeholder="请输入验证码">
            <template #prefix> <IconFont name="Guard" /> </template>
          </el-input>
          <img :src="captchaURL ?? defaultCaptcha" alt="captcha" class="cursor-pointer ml-10px" draggable="false" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading type="primary" class="w-full" size="large" @click.prevent="handleLogin">
          <span>{{ loading ? `登录中...` : `登录` }}</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--  底部  -->
    <div class="login-footer text-center">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LoginTemplate01' })
import type { FormInstance, FormRules } from 'element-plus'
import Cookies from 'js-cookie'
import defaultCaptcha from '@/assets/images/no-captcha.png'

const userStore = useUserStore()
const viteEnv = useEnv()
/** 登录表单实例 */
const loginFormRef = useTemplateRef<FormInstance>('loginFormRef')
/** 登录按钮 Loading */
const loading = ref<boolean>(false)
/** 验证码开关 */
const captchaEnabled = ref<boolean>(true)
/** 验证码图片地址 */
const captchaURL = ref<string>()
/** 登录表单数据 */
const loginForm = ref<LoginEntity.LoginForm>({} as LoginEntity.LoginForm)
/** 登录表单数据的校验规则 */
const loginRules: FormRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
}

/** 处理登录按钮的回调 */
async function handleLogin() {
  try {
    loading.value = true
    await loginFormRef.value?.validate()
    // await userStore.login(loginForm.value)
    handleRememberMe()
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log('error: ', error)
  }
}

/** 处理记住登录数据的操作 */
function handleRememberMe() {
  if (loginForm.value.rememberMe) {
    Cookies.set('username', loginForm.value.username)
    Cookies.set('password', loginForm.value.password)
    Cookies.set('rememberMe', loginForm.value.rememberMe ? '1' : '0')
  } else {
    Cookies.remove('username')
    Cookies.remove('password')
    Cookies.remove('rememberMe')
  }
}
function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe') === '1' ? true : false
  loginForm.value.username = username === undefined ? loginForm.value.username : username
  loginForm.value.password = password === undefined ? loginForm.value.password : password
  loginForm.value.rememberMe = rememberMe
}

getCookie()
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  background-image: url('@/assets/images/bg-image-01.png');
  background-size: cover;
  .el-form {
    width: 400px;
    padding: 25px 25px 5px 25px;
    border-radius: 6px;
    background-color: #fff;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
    }
    .el-input {
      --el-input-height: 38px;
    }
  }
  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: var(--el-color-white);
    font-size: var(--el-font-size-extra-small);
    letter-spacing: 1px;
  }
}
</style>
