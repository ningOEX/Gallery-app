<template>
	<view class="publish-container">
		<view class="form-item">
			<text class="label need">标题</text>
			<input class="input" v-model="imagesForm.title" placeholder="请输入标题" maxlength="30" />
			<text class="count">{{ imagesForm.title.length }}/30</text>
		</view>

		<view class="form-item">
			<text class="label need">描述</text>
			<textarea class="textarea" v-model="imagesForm.description" placeholder="请输入内容简介"
				maxlength="200"></textarea>
			<text class="count">{{ imagesForm.description.length }}/200</text>
		</view>
		<view class="form-item">
			<text class="label">作品类型</text>
			<uni-data-checkbox v-model="imagesForm.type" :localdata="typeSort" @change="change"></uni-data-checkbox>
		</view>

		<view class="form-item">
			<text class="label need">图片上传</text>
			<view class="uploader">
				<view class="upload-item" v-for="(item, index) in imagesForm.images" :key="index">
					<image class="image" :src="item" mode="aspectFill"></image>
					<view class="delete-btn" @click="removeImage(index)">×</view>
				</view>
				<view class="upload-btn" @click="chooseImage" v-if="imagesForm.images.length < 9">
					<uni-icons type="plusempty" size="30" color="#999"></uni-icons>
					<text class="upload-text">添加图片</text>
				</view>
			</view>
			<text class="upload-tip">最多可上传9张图片</text>
		</view>

		<button class="submit-btn" :class="{disabled: !canSubmit}" @click="handleSubmit"
			:disabled="!canSubmit">发布</button>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { onShow } from "@dcloudio/uni-app"
	import { ImagesForm } from '@/model/ImagesForm'
	import { IAppOption } from "@/model/IAppOption"
	import { TypeSort } from "@/model/TypeSort"
	
	import {getCurrentDateTime} from "@/utils/index"

	const app = getApp<IAppOption>()

	const imagesForm = ref<ImagesForm>({
		title: '',
		description: '',
		images: [],
		dowlodURL: [],
		type: 'nature_type',
		typeName:"自然",
		views: 0,
		createdAt:getCurrentDateTime().formatted,
		timestamp: getCurrentDateTime().timestamp,
		token : null
	})

	const fileType = ref<string>('image') // 文件类型
	const typeSort = [
		{
			"text": "自然",
			"value": "nature_type"
		},
		{
			"text": "人物",
			"value": "figure_type"
		},
		{
			"text": "时尚",
			"value": "fashion_type"
		},
		{
			"text": "交通",
			"value": "traffic_type"
		},
		{
			"text": "建筑",
			"value": "build_type"
		},
		{
			"text": "游戏",
			"value": "food_type"
		}
	] // 类型
	
	
	onShow(()=>{
		imagesForm.value.token = uni.getStorageSync("token")
	})
	
	const canSubmit = computed(() => {
		return imagesForm.value.title! && imagesForm.value.description! && imagesForm.value.images!.length
	})

	// 类型选择
	const change = (e : any) => {
		imagesForm.value.type = e.detail.data.value
		imagesForm.value.typeName = e.detail.data.text
	}
	

	// 上传照片
	const chooseImage = () => {
		uni.chooseImage({
			count: 9 - imagesForm.value.images!.length,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				// 这里应该上传图片到服务器，这里只是本地预览
				imagesForm.value.images = [...imagesForm.value.images!, ...res.tempFilePaths]
			}
		})
	}

	// 删除照片
	const removeImage = (index : number) => {
		imagesForm.value.images!.splice(index, 1)
	}

	// 处理照片发布云存储
	const handleImageUpload = () => {
		// console.log(imagesForm.value.images);
		const promise = new Promise(async (resolve, reject) => {
			try {
				const uploadPromises = imagesForm.value.images!.map(async (filePath) => {
					return await uniCloud.uploadFile({
						filePath: filePath,
						cloudPath: `uploads/${Date.now()}_${filePath.split('/').pop()}`, // 动态生成文件名
						cloudPathAsRealPath: true, //云端文件绝对路径
						fileType: fileType.value!,
						onUploadProgress: function (progressEvent) {
							console.log(progressEvent);
						}
					});
				});

				// 等待所有上传完成
				const results = await Promise.all(uploadPromises);

				// 处理结果
				const fileIDs = results.map(result => result.fileID);
				imagesForm.value.images! = fileIDs
				// console.log('所有文件上传成功，文件 ID:', fileIDs);
				resolve(fileIDs);
			} catch (error) {
				console.error('上传过程中出错:', error);
				reject(error);
			}
		});

		promise
		    .then(fileIDs => {
		        // 上传成功，处理返回的文件 ID
		        console.log('上传的文件 ID:', fileIDs);
				getTempFileURLFunc()
		    })
		    .catch(error => {
		        // 处理上传错误
		        console.error('上传失败:', error);
		    });

	}

	// 获取下载地址
	const getTempFileURLFunc = async() => {
		const result = await uniCloud.getTempFileURL({fileList: imagesForm.value.images!})
		console.log('getTempFileURLFunc', result);
		imagesForm.value.dowlodURL = result.fileList
		await pushCloudFunc(imagesForm.value)
	}
	
	// 推送云函数
	const pushCloudFunc = async(imagesForm : ImagesForm)=>{
		try {
			const res = await uniCloud.callFunction({
				name:"api_upload_image",
				data:imagesForm
			})
			
			if (res.result && res.result.code === 200) {
				uni.showToast({
					title:'发布成功',
					icon:"success",
				})
				setTimeout(()=>{
					uni.navigateBack()
				},1000)
			} else {
				uni.showToast({
					title: res.result.message,
					icon:"none",
					duration:2000
				})
			}
		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title: error.message,
				icon:"none",
				duration:2000
			})
		} finally{
			uni.hideLoading()
		}
		
	}

	// 发布
	const handleSubmit = async() => {
		uni.showLoading({
			title:"发布中..."
		})
		try {
			handleImageUpload()
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
		
	}
</script>

<style lang="scss">
	.publish-container {
		padding: 30rpx;
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.form-item {
		margin-bottom: 20rpx;
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
		.need::before{
			content: "*";
			height: 100%;
			width: 10rpx;
			color: red;
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