<template>
  <view class="user-container">
    <view class="user-card">
      <view class="card-content">
        <view class="user-avatar">
          <image src="/static/default.png" mode="aspectFit" class="image"></image>
          <view class="user-name">
            <text class="name">{{ user.nickname }}</text>
            <text class="uid">uid:{{ user._id }}</text>
          </view>
        </view>
        <view class="user-uid-text-content"> 简介：这个人很懒，什么都没有留下~ </view>
        <view class="tab-content">
          <view class="tab-item" v-for="(item, index) in tabList" :key="index">
            <text class="tab-total">0</text>
            <text class="tab-name">{{ item.text }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="nav-content">
      <view class="nav-item" @click="ToEdit">
        <view class="nav-icon">
          <image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
          <text>账号管理</text>
        </view>
        <uni-icons type="right" size="20"></uni-icons>
      </view>
      <view class="nav-item">
        <view class="nav-icon">
          <image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
          <text>客服帮助</text>
        </view>
        <uni-icons type="right" size="20"></uni-icons>
      </view>
      <view class="nav-item" @click="exitHandle">
        <view class="nav-icon">
          <image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
          <text>退出登录</text>
        </view>
        <uni-icons type="right" size="20"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/model/user'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { IAppOption } from '@/model/IAppOption'
const app = getApp<IAppOption>()

const tabList = [
  {
    text: '作品',
    path: '',
    link: '',
  },
  {
    text: '收藏',
    path: '',
    link: '',
  },
  {
    text: '足迹',
    path: '',
    link: '',
  },
  {
    text: '点赞',
    path: '',
    link: '',
  },
]

const user = ref<User>({
  _id: '',
  nickname: '',
  phone: '',
  createdAt: '',
})

onShow(() => {
  console.log('user onShow!')
  app.globalData.getUser()
  user.value = app.globalData.user
})

const ToEdit = () => {
  uni.navigateTo({
    url: '/pages/editUserInfo/index',
  })
}

/**
 * 退出登录
 */
const exitHandle = () => {
  uni.showModal({
    title: '提示',
    content: '是否退出登录？',
    success: function (res) {
      if (res.confirm) {
        uni.removeStorageSync('userInfo')
        uni.reLaunch({
          url: '/pages/login/index',
        })
      }
    },
  })
}
</script>

<style lang="scss" scoped>
:root {
  --text-size-32: 32rpx;
}

.user-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 0 20rpx;
  box-sizing: border-box;
  background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);

  .user-card {
    margin-top: 220rpx;
    box-sizing: border-box;
    width: 100%;
    height: 300rpx;
    border-radius: 20rpx;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 0 20rpx;

    .card-content {
      transform: translateY(-50rpx);

      .user-avatar {
        display: flex;
        gap: 10rpx;

        .image {
          width: 100rpx;
          height: 100rpx;
          isolation: isolate;
        }

        .user-name {
          display: grid;

          .name {
            font-size: var(--text-size-32);
            font-weight: bold;
          }

          .uid {
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }

      .user-uid-text-content {
        font-size: 30rpx;
        margin-top: 10rpx;
        min-height: 130rpx;
        line-height: 1.5em;
        color: #000;
        overflow: hidden;
        /* 隐藏溢出内容 */
        text-overflow: ellipsis;
        /* 溢出部分显示省略号 */
        display: -webkit-box;
        /* 使用 Flexbox */
        -webkit-box-orient: vertical;
        /* 垂直方向排列 */
        -webkit-line-clamp: 3;
        /* 限制行数为 3 行 */
      }
    }
  }

  .tab-content {
    display: flex;
    justify-content: space-evenly;
    gap: 20rpx;
    align-items: center;
    padding-top: 14rpx;
    text-align: center;

    .tab-item {
      display: grid;

      .tab-total {
        font-size: 26rpx;
      }

      .tab-name {
        font-size: 28rpx;
      }
    }
  }

  .nav-content {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    margin: 40rpx 0;
    border-radius: 20rpx;

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 20rpx;
      font-size: 30rpx;

      .nav-icon {
        display: flex;
        align-items: center;
        gap: 20rpx;
        .icon {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
}
</style>
