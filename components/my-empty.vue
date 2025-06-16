<template>
  <view class="empty-container">
    <image src="/static/default.png" class="icon" mode=""></image>
    <text>{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
const { title } = defineProps<{ title: string }>()
</script>

<style lang="scss" scoped>
.empty-container {
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20rpx;
  color: rgba(0, 0, 0, 0.4);
  margin: 400rpx 0;

  .icon {
    width: 200rpx;
    height: 200rpx;
  }
}
</style>
