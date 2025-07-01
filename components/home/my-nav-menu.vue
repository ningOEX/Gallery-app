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
  path:string
}

const menuList = reactive<MenuItem[]>([
  { menuTitle: '创作神韵', menuIcon: '../../static/iconNavMenu/icon_menu_1.png',path:'/pages/hotWeekUpdate/index' },
  { menuTitle: '虚位以待', menuIcon: '../../static/iconNavMenu/icon_menu_2.png' ,path:''},
  { menuTitle: '虚位以待', menuIcon: '../../static/iconNavMenu/icon_menu_3.png' ,path:''},
  { menuTitle: '虚位以待', menuIcon: '../../static/iconNavMenu/icon_menu_4.png',path:'' },
  { menuTitle: '我要发布', menuIcon: '../../static/iconNavMenu/icon_menu_5.png',path:'/pages/upload/index' },
])
const clickMenuItem = (item: MenuItem) => {
	if(!item.path){
		uni.showToast({
		  title: '敬请期待',
		  icon: 'none',
		})
		return
	}
	uni.navigateTo({ url: item.path })
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
