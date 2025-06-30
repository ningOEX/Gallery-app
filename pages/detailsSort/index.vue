<template>
	<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
		<view class="container">
			<ImageCard v-for="(item, index) in images" :key="index" :image="item" :is-confine="isConfine" @click-avatar="handleAvatar"  />
		</view>
		<view v-if="loading" class="loading">加载更多...</view>
		<view v-if="end" class="loading">没有更多~</view>
		<my-empty v-if="!images.length" title="空空如也~"></my-empty>
		
		<user-card-popup v-model="show" :user="currentUser" @leave="handleLeave"></user-card-popup>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad } from "@dcloudio/uni-app"
	import ImageCard from '@/components/home/image-card.vue'
	import { ImagesForm } from "@/model/ImagesForm"

	import myEmpty from '@/components/my-empty.vue'
	import userCardPopup from '@/components/userCardPopup.vue'
	import {User} from "@/model/user"
	const images = ref<ImagesForm[]>([])

	const page = ref<number>(1)
	const pageSize = ref<number>(10)
	const loading = ref<boolean>(false)
	const total = ref<number>(-1)
	const end = ref<boolean>(false) // 没有更多了

	const isConfine = ref(false) // 是否限制近七天显示
	
	const show = ref<boolean>() // 查看用户简单信息
	
	
	const currentUser = ref<User>()
	
	const type = ref<string>('') // 

	onLoad((target : any) => {
		if (!target.type) return
		type.value = target.type
		fetchData(type.value)
	})
	
	// 头像详情回调
	const handleLeave = ()=>{
		show.value = false
	}
	
	const handleAvatar = async(uid : string)=>{
		uni.showLoading({
			title:"加载中..."
		})
		try{
			const res = await uniCloud.callFunction({
				name:"api_get_uid_user",
				data:{
					_id :uid
				}
			})
			if(res.result.code === 200){
				currentUser.value = res.result.data[0]
				show.value = true
			}
		} catch (error){
			// error
		}finally{
			uni.hideLoading()
		}
	}

	// 获取list
	const fetchData = async (type : string) => {
		uni.showLoading({
			title: "加载ing..."
		})
		try {
			const res = await uniCloud.callFunction({
				name: "api_get_sort_list",
				data: {
					type,
					page: page.value,
					pageSize: pageSize.value
				}
			})
			total.value = res.result.total
			images.value = res.result.data
		} catch (error) {
			uni.showToast({
				title: error.message,
				icon: "none"
			})
		} finally {
			uni.hideLoading()
		}
	}

	// 滚动到底部
	const scrolltolower = async () => {
		if (total.value === images.value.length) {
			end.value = true
			return
		}
		loading.value = true
		page.value++
		fetchData(type.value)
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
		}

		.loading {
			text-align: center;
			padding: 20rpx;
		}
	}
</style>