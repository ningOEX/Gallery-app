<template>
	<view class="publish-container">
		<view class="form-item">
			<text class="label">标题</text>
			<input class="input" v-model="imagesForm.title" placeholder="请输入标题" maxlength="30" />
			<text class="count">{{ imagesForm.title.length }}/30</text>
		</view>

		<view class="form-item">
			<text class="label">简介</text>
			<textarea class="textarea" v-model="imagesForm.description" placeholder="请输入内容简介" maxlength="200"></textarea>
			<text class="count">{{ imagesForm.description.length }}/200</text>
		</view>

		<view class="form-item">
			<text class="label">时间</text>
			<picker mode="date" :value="imagesForm.date" @change="onDateChange" class="picker">
				<view class="picker-text">{{ imagesForm.date || '请选择日期' }}</view>
			</picker>
		</view>

		<view class="form-item">
			<text class="label">图片上传</text>
			<view class="uploader">
				<view class="upload-item" v-for="(item, index) in imagesForm.images" :key="index">
					<image class="image" :src="item" mode="aspectFill"></image>
					<view class="delete-btn" >×</view>
				</view>
				<view class="upload-btn"  v-if="imagesForm.images.length < 9">
					<uni-icons type="plusempty" size="30" color="#999"></uni-icons>
					<text class="upload-text">添加图片</text>
				</view>
			</view>
			<text class="upload-tip">最多可上传9张图片</text>
		</view>

		<button class="submit-btn" >发布</button>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import {ImagesForm} from "@/model/ImagesForm"
	
	const imagesForm = ref<ImagesForm>({
		title: '',
		description: '',
		date: '',
		images: ''
	})
	
	const onDateChange = ()=>{
		
	}
	
	

</script>

<style lang="scss">
	.publish-container {
		padding: 30rpx;
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.form-item {
		margin-bottom: 40rpx;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.label {
			display: block;
			font-size: 30rpx;
			color: #333;
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.input {
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;
			border-bottom: 1rpx solid #eee;
			padding: 10rpx 0;
		}

		.textarea {
			width: 100%;
			height: 200rpx;
			font-size: 28rpx;
			border: 1rpx solid #eee;
			border-radius: 8rpx;
			padding: 20rpx;
			box-sizing: border-box;
		}

		.count {
			display: block;
			text-align: right;
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;
		}

		.picker {
			width: 100%;

			.picker-text {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				color: #333;
				border-bottom: 1rpx solid #eee;
			}
		}
	}

	.uploader {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;

		.upload-item {
			width: 200rpx;
			height: 200rpx;
			position: relative;
			border-radius: 8rpx;
			overflow: hidden;

			.image {
				width: 100%;
				height: 100%;
			}

			.delete-btn {
				position: absolute;
				right: 0;
				top: 0;
				width: 40rpx;
				height: 40rpx;
				background-color: rgba(0, 0, 0, 0.5);
				color: #fff;
				text-align: center;
				line-height: 40rpx;
				border-radius: 0 0 0 8rpx;
				font-size: 30rpx;
			}
		}

		.upload-btn {
			width: 200rpx;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border: 1rpx dashed #ccc;
			border-radius: 8rpx;
			background-color: #f9f9f9;

			.upload-text {
				font-size: 24rpx;
				color: #999;
				margin-top: 10rpx;
			}
		}
	}

	.upload-tip {
		display: block;
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.submit-btn {
		margin-top: 60rpx;
		background-color: #007aff;
		color: #fff;
		border-radius: 50rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;

		&.disabled {
			background-color: #ccc;
			opacity: 0.7;
		}
	}
</style>