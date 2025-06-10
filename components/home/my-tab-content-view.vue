<template>
	<view class="container">
		<view class="item-content" v-for="(item,index) in imgList" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onShow } from "@dcloudio/uni-app"

	const initWidth = ref(0);

	const imgList = ref([1, 2, 3, 4, 5, 6, 7, 8])

	onShow(() => {
		// const systemInfo = uni.getSystemInfoSync(); // 获取系统信息
		// initWidth.value = systemInfo.safeArea.width
		// console.log(systemInfo.safeArea.width);
	})
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		padding: 10rpx 0;
		overflow-x: hidden;
		box-sizing: border-box;
		width: 100%;
		display: grid;
		grid-auto-rows: auto;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		gap: 20rpx;

		.item-content {
			width: 230rpx;
			min-height: 300rpx;
			background-color: #eee;
		}

	}
</style>