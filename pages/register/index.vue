<template>
  <view class="container">
    <view class="login-box">
      <text class="title">账号注册！</text>
      <view class="input-item">
        <image src="/static/login/icon_phone.png" mode="aspectFill" class="icon"></image>
        <uni-easyinput
          type="number"
          @blur="blurUsername"
          placeholder-style="font-size:30rpx;"
          maxlength="11"
          v-model="phone"
          :input-border="false"
          placeholder="请输入手机号"
        ></uni-easyinput>
      </view>
      <view class="input-item">
        <image src="/static/login/icon_passwrod.png" mode="aspectFill" class="icon"></image>
        <uni-easyinput
          type="password"
          @blur="blurPassword"
          placeholder-style="font-size:30rpx;"
          maxlength="18"
          v-model="password"
          :input-border="false"
          placeholder="请输入密码"
        ></uni-easyinput>
      </view>
      <view class="input-item">
        <image src="/static/login/icon_pwd.png" mode="aspectFill" class="icon"></image>
        <uni-easyinput
          type="password"
          placeholder-style="font-size:30rpx;"
          maxlength="18"
          v-model="once_passwrod"
          :input-border="false"
          placeholder="再次输入密码"
        ></uni-easyinput>
      </view>
      <!-- <text class="forgot-password">忘记密码？</text> -->
      <button class="login-button" @click="registerUser">立即注册</button>
      <view class="register-link">
        <text>已有账号！<text @click="goToLogin" class="register">前往登录</text></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validatePhoneNumber, validatePassword } from '@/utils/index'

const phone = ref('')
const password = ref('')
const once_passwrod = ref('')

/**
 * 手机输入框失去焦点校验
 */
const blurUsername = () => {
  if (!validatePhoneNumber(phone.value)) {
    uni.showToast({
      title: '请输入正确手机号',
      icon: 'none',
    })
    return false
  }
  return true
}

/**
 * 密码失去焦点验证
 */
const blurPassword = () => {
  if (!validatePassword(password.value)) {
    uni.showToast({
      title: '输入密码长度过短！',
      icon: 'none',
    })
    return false
  }
  return true
}

// 注册
const registerUser = async () => {
  if (!phone.value || !password.value) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'none',
    })
    return
  }

  if (password.value !== once_passwrod.value) {
    uni.showToast({
      title: '密码不一致，重新输入！',
      icon: 'none',
    })
    return
  }

  if (validatePhoneNumber(phone.value) && validatePassword(password.value)) {
    uni.showLoading({
      title: '注册中...',
    })
    const res = await uniCloud.callFunction({
      name: 'api_register',
      data: {
        phone: phone.value,
        password: password.value,
      },
    })
    console.log('res', res)
    if (res.result.code === 200) {
      uni.hideLoading()
      uni.showToast({
        title: '成功注册，正在为您自动登录...',
        icon: 'none',
      })
      getUserInfoFunc(res.result.uid)
    } else {
      uni.showToast({
        title: res.result.message,
        icon: 'none',
      })
    }
  }
}

/**
 * 获取当前用户信息
 * @param uid 用户id
 */
const getUserInfoFunc = async (uid: string) => {
  try {
    const res = await uniCloud.callFunction({
      name: 'api_get_user_info',
      data: {
        uid,
      },
    })

    const userInfo = { ...res.result.data[0] }
    console.log('api_get_user_info', userInfo)
    uni.setStorageSync('userInfo', userInfo)
    uni.switchTab({
      url: '/pages/index/index',
    })
  } catch (error) {
    //TODO handle the exception
  }
}

// 前往登录
const goToLogin = () => {
  uni.redirectTo({
    url: '/pages/login/index',
  })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);
  box-sizing: border-box;
  z-index: 999;

  .login-box {
    position: relative;
    z-index: 999;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);
    margin: 0 20rpx;

    .title {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
      color: #ff6b81;
    }

    .input-item {
      display: flex;
      align-items: center;
      border: 1px solid #abceff;
      margin-top: 20rpx;
      padding: 0 30rpx 0 18rpx;
      border-radius: 50rpx;
      .icon {
        width: 50rpx;
        height: 50rpx;
      }
    }

    .forgot-password {
      color: rgba(0, 0, 0, 0.4);
      text-align: right;
      display: inline-block;
      padding: 10rpx 0;
      width: 100%;
    }

    .login-button {
      background-color: #ff6b81;
      color: white;
      border: none;
      border-radius: 50px;
      width: 100%;
      margin-top: 20rpx;
    }

    .register-link {
      position: absolute;
      width: 80%;
      text-align: center;
      z-index: -1;
      bottom: -84rpx;
      padding: 20rpx 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fbfcff;
      border-bottom-left-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
      box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);

      text {
        color: rgba(0, 0, 0, 0.4);
      }

      .register {
        color: #ed61ff;
      }
    }
  }
}
</style>
