<template>
	<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolowerHandle">
		<view class="container">
			<ImageCard v-for="(item, index) in images" :key="index" :image="item" :is-confine="isConfine" @click-avatar="handleAvatar" />
		</view>
		<view v-if="loading" class="loading">加载更多...</view>
		<view v-if="end" class="loading">没有更多~</view>
		<my-empty v-if="!images.length" title="暂无数据~"></my-empty>
		
		<user-card-popup v-model="show"></user-card-popup>
	</scroll-view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onLoad } from "@dcloudio/uni-app"
	import ImageCard from '@/components/home/image-card.vue'
	import { ImagesForm } from "@/model/ImagesForm"

	import myEmpty from '@/components/my-empty.vue'
	
	import userCardPopup from '@/components/userCardPopup.vue'


	const images = ref<ImagesForm[]>([])

	const page = ref<number>(1)
	const pageSize = ref<number>(10)
	const loading = ref<boolean>(false)
	const total = ref<number>(-1)
	const end = ref<boolean>(false) // 没有更多了

	const isConfine = true; //是否限制近七天展示
	const show = ref<boolean>() // 查看用户简单信息
	// 头像点击
	const handleAvatar = async(uid : string)=>{
		show.value = true
		console.log('click',uid);
		const res = await uniCloud.callFunction({
			name:"api_get_uid_user",
			data:{
				_id :uid
			}
		})
	}
	
	// 数据请求
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
			images.value = [...images.value, ...result.result.data]
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
	const scrolltolowerHandle = () => {
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
		height: 100vh;
		/* 或其他固定高度 */
		overflow-y: auto;
		/* 确保可以垂直滚动 */

		.container {
			column-count: 2;
			column-gap: 10px;
			padding: 10px;
			animation: 1s;
		}

		.loading {
			text-align: center;
			padding: 20rpx;
		}
	}
</style>