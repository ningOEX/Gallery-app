<template>
	<uni-swiper-dot :dots-styles="dotsStyles" :info="info" :current="current" @clickItem=clickItem field="content" :mode="mode">
		<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
			<swiper-item v-for="(item ,index) in info" :key="index">
				<view class="swiper-item">
					<image :src="item.content" class="image"></image>
				</view>
			</swiper-item>
		</swiper>
	</uni-swiper-dot>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const info = [{
		content: 'https://picsum.photos/500?id=0'
	}, {
		content: 'https://picsum.photos/500?id=1'
	}, {
		content: 'https://picsum.photos/500?id=2'
	}]

	const current = ref(0) // 滑动控制指示器
	const swiperDotIndex = ref(0) // 当前下标
	const mode = 'round'
	const dotsStyles = {
		bottom:'16px'
	}
	
	//切换触发
	const change = (event : { detail : { current : string } }) => {
		current.value = Number(event.detail.current)
	}
	
	// 点击指示器触发
	const clickItem = (e : number) => {
		swiperDotIndex.value = e
	}
</script>

<style scoped>
	.swiper-box {
		margin: 10rpx;
		margin-top: 0;
	}
	.image {
		width: 100%;
	}
</style>