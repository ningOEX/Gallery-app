<template>
	<view class="container" style="padding-top: env(safe-area-inset-top)">
		<!-- 背景图全屏 -->
		<image class="bg-image" :src="details?.dowlodURL[0].tempFileURL" mode="aspectFill" @load="loadImag" />

		<!-- 返回按钮 -->
		<view class="back-btn" :style="getStatusBarHeight()" @click="goBack">
			<uni-icons type="back" size="24" color="#fff" />
		</view>

		<!-- 顶部用户信息 -->
		<view class="top-info">
			<image v-if="details?.typeName" class="avatar" src="/static/default.png" />
			<view class="username" v-if="details!">{{validatePhoneNumber(details?.nickname) ? maskPhoneNumber(details?.nickname) : maskName(details?.nickname) }}</view>
		</view>

		<!-- 图片详情描述 -->
		<view class="info-box">
			<view class="text"><text class="label">风格：</text>{{ details?.typeName }}</view>
			<view class="text"><text class="label">标题：</text>{{ details?.title }}</view>
			<view class="desc">{{ details?.description }}</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="bar-item">
				<uni-icons type="eye" size="22" color="#fff" />
				<text class="bar-text">{{details?.views}}</text>
			</view>
			<view class="bar-item">
				<uni-icons type="heart" size="22" color="#fff" />
				<text class="bar-text">收藏</text>
			</view>
			<view class="bar-item">
				<uni-icons type="refreshempty" size="22" color="#fff" />
				<text class="bar-text">旋转</text>
			</view>
			<view class="bar-item">
				<uni-icons type="download" size="22" color="#fff" />
				<text class="bar-text">下载</text>
			</view>
			<view class="bar-item">
				<uni-icons type="redo" size="22" color="#fff" />
				<text class="bar-text">分享</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue"
	import {onLoad} from "@dcloudio/uni-app"
	import { getStatusBarHeight } from "@/utils/index"
	import { ImagesForm } from "@/model/ImagesForm";
	import { IAppOption } from "@/model/IAppOption";
	import {validatePhoneNumber,maskPhoneNumber,maskName} from "@/utils/index"
	const app = getApp<IAppOption>()
	
	let token:string;
	
	const details = ref<ImagesForm>()
	
	const isPortrait = ref<boolean>(true) 
	
	onLoad((target : any)=>{
		app.globalData.tokenValidity() // 检查token是否过期
		token = uni.getStorageSync("token")
		uni.showLoading({
			title:"加载中..."
		})
		fetchDataDetails(target.id)
	})
	
	
	
	const fetchDataDetails = async (id: string)=>{
		try{
			const result = await uniCloud.callFunction({
				name:"api_get_image_details",
				data:{
					_id:id,
					token
				}
			})
			if(result.result && result.result.code === 200){
				details.value = result.result.data[0]
			}
		}catch (error){
			uni.showToast({
				title:error.message,
				icon:"none"
			})
		}finally{
			uni.hideLoading()
		}
		
	}
	
	const loadImag = (event : {detail:{height:string, width:string}})=>{
		 const { width, height } = event.detail; // 获取图片的宽高
		isPortrait.value = height > width; // 判断竖屏或横屏
	}
	
	
	const goBack = () => {
		uni.navigateBack()
	}
</script>

<style scoped>
	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.bg-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
	}

	.top-info {
		margin-top: 50vh;
		padding-left: 40rpx;
		display: flex;
		align-items: center;
		color: #fff;
	}

	.avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.username {
		font-size: 28rpx;
		font-weight: bold;
	}

	.info-box {
		padding: 40rpx;
		color: #fff;
	}

	.label {
		font-weight: bold;
		margin-right: 10rpx;
	}

	.text {
		font-size: 26rpx;
		margin-bottom: 10rpx;
	}

	.desc {
		font-size: 24rpx;
		line-height: 36rpx;
		opacity: 0.9;
	}

	.center-btn {
		position: absolute;
		left: 50%;
		bottom: 200rpx;
		transform: translateX(-50%);
	}

	.icon-wrapper {
		width: 80rpx;
		height: 80rpx;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bottom-bar {
		position: absolute;
		bottom: 30rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		color: #fff;
	}

	.bar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 22rpx;
	}

	.bar-text {
		margin-top: 6rpx;
	}

	.back-btn {
		position: fixed;
		left: 30rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		/* background-color: rgba(0, 0, 0, 0.4); */
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
</style>