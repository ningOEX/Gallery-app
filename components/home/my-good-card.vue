<template>
  <view class="container">
    <view class="title">
      <text>Sort</text>
      <image :src="dayImgList[currentDay - 1]" mode="aspectFill" class="image"></image>
    </view>
    <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
      <my-item-card></my-item-card>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import myItemCard from '@/components/home/my-item-card.vue'
import {IAppOption} from "@/model/IAppOption"

const app = getApp<IAppOption>()

const currentDay = ref(-1)

const dayImgList = [
  '/static/home/icon_monday.png',
  '/static/home/icon_tuesday.png',
  '/static/home/icon_ednesday.png',
  '/static/home/icon_thursday.png',
  '/static/home/icon_friday.png',
  '/static/home/icon_saturday.png',
  '/static/home/icon_sunday.png',
]

onShow(() => {
  currentDay.value = app.globalData.currentDay
})
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20rpx;
  box-shadow: 0px 0px 6px #ccc;
  border-radius: 10rpx;
  margin: 40rpx 10rpx 20rpx 10rpx;

  .title {
    font-size: 26rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    text {
      font-size: 38rpx;
      transform: translateY(-50%);
      background-color: #fff;
      color: #42a5f5;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      letter-spacing: 4rpx;
    }

    .image {
      width: 60rpx;
      height: 60rpx;
      margin-top: -10rpx;
      margin-bottom: 10rpx;
    }
  }

  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    margin-bottom: 10rpx;
  }
}
</style>
