<template>
	<view v-if="!isPublishedMoreThanSevenDaysAgo(props.image.timestamp,props?.isConfine)" class="card">
		<image @click="toImageDetails" :src="props.image.dowlodURL[0].tempFileURL" mode="widthFix" class="main-image" />
		<view class="card-footer" @click="handleUserInfo(image)">
			<image :src="props.image?.avatar ? props.image.avatar[0].tempFileURL : '/static/default.png'" class="avatar" />
			<text class="username">{{ validatePhoneNumber(props.image.nickname) ? maskPhoneNumber(props.image.nickname) : maskName(props.image.nickname) }}</text>
			<uni-icons type="fire" size="18" color="#999" />
			<text class="views">{{ props.image.views }}</text>
		</view>
		<text class="time">{{props.image.createdAt}}</text>
	</view>
</template>

<script setup lang="ts">
	// import {onShow,onLoad} from "@dcloudio/uni-app"
	import {ref} from "vue"
	import { ImagesForm } from "@/model/ImagesForm"
	import {isPublishedMoreThanSevenDaysAgo,validatePhoneNumber,maskPhoneNumber,maskName} from "@/utils/index"
	
	const props = defineProps<{image : ImagesForm,isConfine : boolean}>()
	
	const emits = defineEmits(['clickAvatar'])
	
	let token:string

	const toImageDetails = async() => {
		token = uni.getStorageSync("token")
		await updateIncreaseViews(props.image._id)
		uni.navigateTo({ url: `/pages/imageDetails/index?id=${props.image._id}` })
	}
	
	// 更细点击查看
	const updateIncreaseViews = async(id : string | undefined)=>{
		uni.showLoading()
		try {
			props.image.views++
			await uniCloud.callFunction({
				name:"api_increase_views",
				data:{
					_id: id,
					token,
					views: props.image.views
				}
			})
		} catch (error) {
			//TODO handle the exception
		} finally{
			uni.hideLoading()
		}
	}
	
	const handleUserInfo = (image : ImagesForm)=>{
		emits('clickAvatar',props.image.uid)
	}
	
</script>

<style lang="scss" scoped>
	.card {
		margin-bottom: 16rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 0 6rpx #eee;
	}

	.time {
		font-size: 16rpx;
		color: #999;
		padding: 0 16rpx;
	}

	.main-image {
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
	}

	.card-footer {
		display: flex;
		align-items: center;
		padding: 0 16rpx;
	}

	.avatar {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin-right: 12rpx;
	}

	.username {
		flex: 1;
		font-size: 24rpx;
		color: #333;
	}

	.views {
		font-size: 22rpx;
		color: #999;
		margin-left: 6rpx;
	}
</style>