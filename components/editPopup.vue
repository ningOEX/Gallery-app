<template>
  <page-container :show="porps.showPop" @leave="leave" position="center" close-on-slide-down="true">
    <view class="edit-container">
      <text class="title">{{ currentType === 0 ? '修改昵称!' : '修改密码!' }}</text>

      <view v-if="porps.currentType === 0" class="edit-input">
        <uni-easyinput
          type="number"
          placeholder-style="font-size:30rpx;"
          maxlength="11"
          v-model="submitInfo.nickname"
          :input-border="false"
          :placeholder="porps.placeholder"
        ></uni-easyinput>
      </view>
      <view v-if="currentType === 1" class="edit-input">
        <uni-easyinput
          type="password"
          placeholder-style="font-size:30rpx;"
          maxlength="18"
          v-model="submitInfo.oldPwd"
          :input-border="false"
          :placeholder="porps.placeholder"
        ></uni-easyinput>
      </view>
      <view v-if="currentType === 1" class="edit-input">
        <uni-easyinput
          type="password"
          placeholder-style="font-size:30rpx;"
          maxlength="18"
          v-model="submitInfo.newPassword"
          :input-border="false"
          placeholder="请输入新密码"
        ></uni-easyinput>
      </view>
      <view class="btn-item" @click="submit"> 保存 </view>
    </view>
  </page-container>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { EditInfo } from '@/model/EditInfo'
const porps = defineProps<{ showPop: boolean; placeholder: string; currentType: number }>()
const emit = defineEmits(['leave', 'submit'])

const submitInfo = ref<EditInfo>({
  nickname: '', // 昵称
  oldPwd: '',
  newPassword: '', // 新密码
})

watch(
  () => porps.showPop,
  () => {
    submitInfo.value = {
      nickname: '', // 昵称
      oldPwd: '', // 旧密码
      newPassword: '', // 新密码
    }
    console.log('清空完毕！')
  }
)

// 关闭中回调
const leave = () => {
  emit('leave')
}

// 保存
const submit = () => {
  emit('submit', submitInfo.value)
  // submitInfo.value = {
  // 	nickname: "", // 昵称
  // 	oldPwd:"", // 旧密码
  // 	newPwd: "" // 新密码
  // }
}
</script>

<style lang="scss" scoped>
.edit-container {
  margin: 20rpx;
  padding: 20rpx;
  display: grid;
  gap: 20rpx;
  box-shadow: 0 0 10rpx #eee;
  border-radius: 20rpx;

  .title {
    font-size: 24px;
    // text-align: center;
    color: #ff6b81;
  }

  .edit-input {
    border-bottom: 1px solid #eee;
    border-radius: 10rpx;
  }

  .btn-item {
    padding: 16rpx 40rpx;
    text-align: center;
    font-size: 28rpx;
    border-radius: 50rpx;
    background-color: #ff6b81;
    color: #fff;
  }
}
</style>
