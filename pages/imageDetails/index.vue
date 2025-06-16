<template>
  <view class="container" style="padding-top: env(safe-area-inset-top);">
    <!-- 背景图全屏 -->
    <image class="bg-image" :src="imageData.src" mode="aspectFill" />

    <!-- 返回按钮 -->
    <view class="back-btn" @click="goBack">
      <uni-icons type="back" size="24" color="#fff" />
    </view>

    <!-- 顶部用户信息 -->
    <view class="top-info">
      <image class="avatar" :src="imageData.avatar" />
      <view class="username">{{ imageData.username }}</view>
    </view>

    <!-- 图片详情描述 -->
    <view class="info-box">
      <view class="text"><text class="label">风格：</text>{{ imageData.style }}</view>
      <view class="text"><text class="label">尺寸：</text>{{ imageData.size }}</view>
      <view class="desc">{{ imageData.desc }}</view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="bar-item" v-for="(item, i) in actions" :key="i">
        <uni-icons :type="item.icon" size="22" color="#fff" />
        <text class="bar-text">{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const goBack = () => {
  uni.navigateBack()
}

const imageData = {
  src: 'https://pic.616pic.com/photoone/00/01/28/618ced352f5335310.jpg',
  avatar: '../../static/banner/banner_1.jpg',
  username: '靓**仔',
  style: '科技',
  size: '750x1024',
  desc: '可爱的小猫头鹰，动感的姿势，阳光洒入的森林背景，超细节，复杂的细节，立体照明，写实，逆光，摄影，数字艺术，8k',
}

const actions = [
  { icon: 'eye', text: '726' },
  { icon: 'heart', text: '收藏' },
  { icon: 'download', text: '下载' },
  { icon: 'redo', text: '分享' },
]
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.top-info {
  margin-top: 50vh;
  padding-left: 40rpx;
  display: flex;
  align-items: center;
  color: #fff;
}
.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.username {
  font-size: 28rpx;
  font-weight: bold;
}
.info-box {
  padding: 40rpx;
  color: #fff;
}
.label {
  font-weight: bold;
  margin-right: 10rpx;
}
.text {
  font-size: 26rpx;
  margin-bottom: 10rpx;
}
.desc {
  font-size: 24rpx;
  line-height: 36rpx;
  opacity: 0.9;
}
.center-btn {
  position: absolute;
  left: 50%;
  bottom: 200rpx;
  transform: translateX(-50%);
}
.icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-bar {
  position: absolute;
  bottom: 30rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #fff;
}
.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22rpx;
}
.bar-text {
  margin-top: 6rpx;
}
.back-btn {
  position: fixed;
  top: 40rpx;
  left: 30rpx;
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
</style>
