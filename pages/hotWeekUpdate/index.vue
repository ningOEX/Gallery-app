<template>
	<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
		<view class="container">
			<ImageCard v-for="(item, index) in images" :key="index" :image="item" :is-confine="isConfine" />
		</view>
		<view v-if="loading" class="loading">加载更多...</view>
		<view v-if="end" class="loading">没有更多~</view>
		<my-empty v-if="!images.length" title="暂无数据~"></my-empty>
	</scroll-view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onLoad } from "@dcloudio/uni-app"
	import ImageCard from '@/components/home/image-card.vue'
	import { ImagesForm } from "@/model/ImagesForm"

	import myEmpty from '@/components/my-empty.vue'


	const images = ref<ImagesForm[]>([])

	const page = ref<number>(1)
	const pageSize = ref<number>(10)
	const loading = ref<boolean>(false)
	const total = ref<number>(-1)
	const end = ref<boolean>(false) // 没有更多了

	const isConfine = true;

	const fetchDataFunc = async () => {
		uni.showLoading({
			title: "加载中..",
		})
		try {
			const result = await uniCloud.callFunction({
				name: "api_get_hot_week_list",
				data: {
					page: page.value,
					pageSize: pageSize.value
				}
			})
			total.value = result.result.total // 总数
			images.value = [...images.value, ...result.result.data].reverse() // 倒序
		} catch (err) {
			uni.showToast({
				title: err.message,
				icon: "none"
			})
		} finally {
			uni.hideLoading()
			loading.value = false
		}
	}

	onLoad(() => {
		fetchDataFunc()
	})


	// 底部
	const scrolltolower = (e : any) => {
		if (total.value === images.value.length) {
			end.value = true
			return
		}
		loading.value = true
		page.value++
		fetchDataFunc()
	}
</script>

<style lang="scss" scoped>
	.scroll-view {
		min-height: 100vh;
		/* 或其他固定高度 */
		overflow-y: auto;
		/* 确保可以垂直滚动 */

		.container {
			column-count: 2;
			column-gap: 10px;
			padding: 10px;
		}

		.loading {
			text-align: center;
			padding: 20rpx;
		}
	}
</style>