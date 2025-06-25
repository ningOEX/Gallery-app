<template>
  <view class="nav-menu-cotnainer">
    <view
      class="menu-item"
      v-for="(item, index) in menuList"
      :key="index"
      @click="clickMenuItem(item)"
    >
      <view class="menu-icon-content">
        <image class="menu-icon" :src="item.menuIcon" mode=""></image>
      </view>
      <text class="menu-text">{{ item.menuTitle }}</text>
    </view>
    <!-- <view class="menu-item" @click="goToUpload">
			<view class="menu-icon-content">
				<image class="menu-icon" src="@/static/iconNavMenu/icon_menu_5.png" mode=""></image>
			</view>
			<text class="menu-text">我要发布</text>
		</view> -->
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

interface MenuItem {
  menuTitle: string
  menuIcon: string
}

const menuList = reactive<MenuItem[]>([
  { menuTitle: '最新周更', menuIcon: '../../static/iconNavMenu/icon_menu_1.png' },
  { menuTitle: '精选壁纸', menuIcon: '../../static/iconNavMenu/icon_menu_2.png' },
  { menuTitle: '作品最佳', menuIcon: '../../static/iconNavMenu/icon_menu_3.png' },
  { menuTitle: '编辑发布', menuIcon: '../../static/iconNavMenu/icon_menu_4.png' },
  { menuTitle: '我要发布', menuIcon: '../../static/iconNavMenu/icon_menu_5.png' },
])
const clickMenuItem = (item: MenuItem) => {
  // console.log('点击了菜单栏：', item)
  switch (item.menuTitle) {
    case '最新周更':
      uni.navigateTo({ url: '/pages/hotWeekUpdate/index' })
      break
    case '精选壁纸':
      // uni.navigateTo({ url: '/pages/wallpaper/index' })
      uni.showToast({
        title: '敬请期待',
        icon: 'none',
      })
      break
    case '作品最佳':
      // uni.navigateTo({ url: '/pages/best/index' })
      uni.showToast({
        title: '敬请期待',
        icon: 'none',
      })
      break
    case '编辑发布':
      // uni.navigateTo({ url: '/pages/edit/index' })
      uni.showToast({
        title: '敬请期待',
        icon: 'none',
      })
      break
    case '我要发布':
      uni.navigateTo({ url: '/pages/upload/index' })
      break
  }
}
</script>

<style lang="scss" scoped>
.nav-menu-cotnainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;

  .menu-item {
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 2rpx;

    .menu-icon-content {
      text-align: center;
      border-radius: 50%;
      padding: 8rpx 0rpx;
      background-color: #eee;

      .menu-icon {
        width: 68rpx;
        height: 68rpx;
      }
    }

    .menu-text {
      font-size: 26rpx;
    }
  }
}
</style>
