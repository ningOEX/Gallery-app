<template>
	<page-container class="container" :show="show" position="center" :close-on-slide-down="true" @leave="leaveHandle">
		<view  :style="getStatusBarHeight()">
			<text class="title">{{title}}</text>
			<view class="avatar-content">
				<view class="avatar-item" v-for="(item,index) in porps.list" :key="index">
					<image  class="avatar" :src="item.avatar[0].tempFileURL" mode="aspectFill"></image>
					<text class="text">使用头像</text>
				</view>
			</view>
		</view>
	</page-container>
</template>

<script lang="ts" setup>
	import { User } from "@/model/user"
	import {validatePhoneNumber,maskPhoneNumber,maskName} from "@/utils/index"
	import { getStatusBarHeight } from "@/utils/index"
	import {OldAvatarInfo} from "@/model/OldAvatarInfo"
	
	const title = "陈旧画像"
	
	const show = defineModel<{ show : boolean }>()
	
	const porps = defineProps<{list : OldAvatarInfo}>()
	
	const emits = defineEmits(['leave'])
	
	// 离开中
	const leaveHandle = () => {
		emits('leave')
	}
</script>

<style lang="scss" scoped>
	
	.title{
		width: 100%;
		display: inline-block;
		padding: 20rpx 0;
		text-align: center;
		font-weight: bold;
	}
	
	.avatar-content{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
		justify-content: center;
		gap: 20rpx;
		
		.avatar-item{
			display: grid;
			align-items: center;
			justify-content: center;
			gap: 2rpx;
			box-shadow: 0 0 4rpx #000;
			padding: 10rpx;
			border-radius: 10rpx;
			
			.avatar{
				width: 110rpx;
				height: 110rpx;
				isolation: isolate;
				border-radius: 50%;
			}
			
			.text{
				font-size: 22rpx;
				color: #4184ff;
			}
		}
	}
</style>