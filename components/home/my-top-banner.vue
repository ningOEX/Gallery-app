<template>
  <uni-swiper-dot
    :dots-styles="dotsStyles"
    :info="info"
    :current="current"
    @clickItem="clickItem"
    field="content"
    :mode="mode"
  >
    <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
      <swiper-item v-for="(item, index) in info" :key="index">
        <view class="swiper-item">
          <image :src="item.content" class="image" mode="scaleToFill"></image>
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const info = [
  {
    content: 'https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/banner/pexels-photo-31832862.jpeg',
  },
  {
    content: 'https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/banner/pexels-photo-31962880.jpeg',
  },
]

const current = ref(0) // 滑动控制指示器
const swiperDotIndex = ref(0) // 当前下标
const mode = 'round'
const dotsStyles = {
  bottom: '16px',
}

//切换触发
const change = (event: { detail: { current: string } }) => {
  current.value = Number(event.detail.current)
}

// 点击指示器触发
const clickItem = (e: number) => {
  swiperDotIndex.value = e
}
</script>

<style scoped>
.swiper-box {
  margin: 10rpx;
  margin-top: 0;
  height: 400rpx;
  border-radius: 10rpx;
}
.image {
  width: 100%;
}
</style>
