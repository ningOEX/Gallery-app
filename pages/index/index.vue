<template>
  <view class="content">
    <my-search-nav-bar @search="searchHandle"></my-search-nav-bar>
    <my-top-banner></my-top-banner>
    <my-nav-menu></my-nav-menu>
    <my-good-card></my-good-card>
    <!-- <my-tab-nav></my-tab-nav>
    <my-tab-content-view></my-tab-content-view> -->
	<view style="padding: 20rpx;font-size: 24rpx;">
		模块待开发...
	</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {onLaunch} from "@dcloudio/uni-app"
import mySearchNavBar from '@/components/home/my-search-nav-bar.vue'
import myTopBanner from '@/components/home/my-top-banner.vue'
import myNavMenu from '@/components/home/my-nav-menu.vue'
import myGoodCard from '@/components/home/my-good-card.vue'
import myTabNav from '@/components/home/my-tab-nav.vue'
import myTabContentView from '@/components/home/my-tab-content-view.vue'
import { IAppOption } from '@/model/IAppOption'

const tabList = ref([])

const app = getApp<IAppOption>()

// 搜索回调
const searchHandle = (value: string) => {
  console.log(value)
}

onLaunch(()=>{
	app.globalData.tokenValidity()
})

</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
