<template>
  <view class="edit-container">
    <view class="user-card" @click="edit(types.nickname)">
      <view class="user-avatar">
        <image src="/static/default.png" mode="aspectFit" class="image"></image>
        <view class="user-name">
          <text class="name">{{ user?.nickname }}</text>
          <text class="uid">uid:{{ user._id }}</text>
        </view>
      </view>
    </view>

    <view class="nav-content">
      <!-- 	<view class="nav-item">
				<view class="nav-icon">
					<image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
					<text>修改昵称</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view> -->
      <view class="nav-item" @click="edit(types.password)">
        <view class="nav-icon">
          <image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
          <text>修改密码</text>
        </view>
        <uni-icons type="right" size="20"></uni-icons>
      </view>
    </view>

    <edit-popup
      :show-pop="showPop"
      :current-type="currentType"
      :placeholder="placeholder"
      @leave="leave"
      @submit="submit"
    ></edit-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// model
import { IAppOption } from '@/model/IAppOption'
import { User } from '@/model/user'
import { EditInfo } from '@/model/EditInfo'

// components
import editPopup from '@/components/editPopup.vue'

const app = getApp<IAppOption>()

const placeholder = ref<string>('')
const showPop = ref<boolean>(false)
const currentType = ref<number>(-1) // 0 - nickname  1 - password
const types = {
  nickname: 0,
  password: 1,
}

const user = ref<User>({
  _id: '',
  nickname: '',
  phone: '',
  createdAt: '',
})

onShow(() => {
  initUser()
})

const initUser = () => {
  app.globalData.getUser()
  user.value = app.globalData.user
}

// 修改
// -
const edit = (type: number) => {
  showPop.value = true
  currentType.value = type
  type === types.nickname
    ? (placeholder.value = '请输入新昵称')
    : (placeholder.value = '请输入旧密码')
}

//关闭回调
// -
const leave = () => {
  showPop.value = false
}

// 保存
// -
const submit = async (info: EditInfo) => {
  // console.log(info);
  const { nickname, oldPwd, newPassword } = info

  const editData: EditInfo = {
    uid: app.globalData.user._id,
  }
  if (!nickname && !(oldPwd && newPassword)) {
    uni.showToast({
      title: '请输入要修改的信息',
      icon: 'none',
      duration: 3000,
    })
    return
  }
  if (nickname) {
    editData.nickname = nickname
  }
  // 验证旧密码是否匹配
  if (oldPwd && newPassword) {
    try {
      uni.showLoading({
        title: '校验中...',
      })
      const result = await uniCloud.callFunction({
        name: 'api_get_user_info',
        data: {
          uid: editData.uid,
          isEdit: true,
        },
      })
      if (result.result.data[0].password !== oldPwd) {
        uni.showToast({
          title: '旧密码错误，重新输入',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (result.result.data[0].password === newPassword) {
        uni.showToast({
          title: '新旧密码一致，无需更改！',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      editData.newPassword = newPassword
    } finally {
      uni.hideLoading()
    }
  }

  // 提交update
  try {
    uni.showLoading({
      title: '保存中...',
    })
    const result = await uniCloud.callFunction({
      name: 'api_edit_user_info',
      data: editData,
    })
    if (result.result.code === 200) {
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      })
      showPop.value = false
      app.globalData.updateUserInfo()
      user.value.nickname = nickname!
    }
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 20rpx;

  .user-card {
    // border: 1px solid;
    border-radius: 20rpx;
    box-shadow: 0 0 4rpx #000;
    padding: 20rpx;
    background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);

    .user-avatar {
      display: grid;
      align-items: center;
      gap: 10rpx;

      .image {
        width: 150rpx;
        height: 150rpx;
        margin: 0 auto;
      }
    }

    .user-name {
      display: grid;
      text-align: center;

      .uid {
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.4);
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
