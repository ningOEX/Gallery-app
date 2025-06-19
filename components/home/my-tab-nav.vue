<template>
  <view class="container">
    <scroll-view
      class="scroll-view_H"
      @scroll="onScroll"
      @scrolltoupper="scrolltoupper"
      enhanced
      :enable-flex="true"
      :show-scrollbar="false"
      :scroll-with-animation="true"
      scroll-x
      :scroll-left="scrollLeft"
    >
      <view class="tab-content">
        <view
          class="scroll-tab-nav"
          :class="current === index ? 'active' : ''"
          v-for="(item, index) in 15"
          :key="index"
          @click="changeTab(index)"
          >标签{{ item }}</view
        >
      </view>
    </scroll-view>
    <view class="tab-more" @click="more">»</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['change'])

const scrollLeft = ref(0)
const current = ref(0)
const isMove = ref(false)

const scrollLeftView = ref(0)

// 滑到左边
const scrolltoupper = () => {
  scrollLeft.value = 0
  isMove.value = false
  scrollLeftView.value = 0
}

// 点击标签
const changeTab = (index: number) => {
  if ((index !== 0 && index % 6 === 0) || index % 7 === 0) {
    isMove.value = true
  }
  if (isMove.value) {
    if (index >= current.value) {
      scrollLeft.value = scrollLeft.value + 50
    }
    if (index < current.value) {
      scrollLeft.value = scrollLeft.value - 50
    }
  }
  current.value = index
  emit('change', `标签${index}`)
}

const onScroll = (e: { detail: { scrollLeft: number } }) => {
  scrollLeftView.value = e.detail.scrollLeft
}

// 用户右边滚动
const more = () => {
  console.log('more')
  isMove.value = true
  scrollLeft.value = scrollLeftView.value + 100
}
</script>

<style lang="scss" scoped>
:root {
  --tab-height: 80rpx;
  --tab-size: 28rpx;
  --tab-active: #f40;
}

.container {
  display: flex;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;

  .scroll-view_H {
    flex: 1;
    white-space: nowrap;
    overflow-x: hidden;
    width: 100%;
    height: var(--tab-height);
    line-height: var(--tab-height);
    border-bottom: 1px solid #eee;

    .tab-content {
      display: flex;
      align-items: center;
      gap: 20rpx;
      margin: 0 20rpx;
      font-size: var(--tab-size);

      .scroll-tab-nav:last-child {
        margin-right: 40rpx;
      }

      .active {
        position: relative;
        font-weight: bold;
        color: black;

        &::after {
          position: absolute;
          content: '';
          left: 0%;
          bottom: 0;
          width: 100%; /* 初始宽度为 0 */
          height: 1rpx;
          background-color: var(--tab-active);
          animation: tabMove 0.35s linear; /* 添加动画 */
        }
      }
    }
  }

  .tab-more {
    width: 60rpx;
    height: var(--tab-height);
    line-height: var(--tab-height);
    text-align: center;
    backdrop-filter: saturate(50%) blur(4px);
    z-index: 99;
  }
}

::-webkit-scrollbar {
  display: none;
}

@keyframes tabMove {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}
</style>
