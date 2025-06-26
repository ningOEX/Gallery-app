<template>
  <view class="search-content" :style="getStatusBarHeight()">
    <view class="input-view">
      <uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
      <input
        confirm-type="search"
        class="nav-bar-input"
        type="text"
        placeholder="输入搜索关键词"
        @confirm="confirmHandle"
      />
    </view>
    <view class="bar-title">推荐</view>
    <view>&nbsp;</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import {getStatusBarHeight} from "@/utils/index"

const emit = defineEmits(['search'])


/**
 * 搜索
 */
const confirmHandle = (value: { detail: { value: string } }) => {
  emit('search', value?.detail.value)
}

onShow(() => {
  getStatusBarHeight()
})
</script>

<style lang="scss">
.search-content {
  padding: 0 20rpx;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60rpx;
  padding-bottom: 8rpx;
  .input-view {
    display: flex;
    align-items: center;
    background-color: #eee;
    width: 128px;
    height: 32px;
    border-radius: 40rpx;
    padding: 0 10rpx;
    .nav-bar-input {
      font-size: 26rpx;
      padding-left: 10rpx;
    }
  }

  .bar-title {
    font-size: 28rpx;
    flex: 1;
  }
}
</style>
