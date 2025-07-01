<template>
	<view class="page-container" :style="bgStyle" @click="previewImage(details.dowlodURL)">
		<!-- 半透明遮罩，确保文字可读 -->
		<view class="overlay"></view>
		<!-- 页面内容 -->
		<view class="content">
			<view class="top-info">
				<image v-if="details?.typeName" class="avatar" src="/static/default.png" />
				<view class="username" v-if="details!">
					{{validatePhoneNumber(details?.nickname) ? maskPhoneNumber(details?.nickname) : details?.nickname }}
				</view>
			</view>
			<view class="info-box">
				<view class="text"><text class="label">风格：</text>{{ details?.typeName }}</view>
				<view class="text"><text class="label">标题：</text>{{ details?.title }}</view>
				<view class="text"><text class="label">作品数：</text>{{ details?.dowlodURL.length }}张</view>
				<view class="desc">{{ details?.description }}</view>
			</view>
		</view>

		<drag-button :isDock="true" :existTabBar="true" @btnClick="goBack" />
	</view>

</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { getStatusBarHeight } from "@/utils/index"
	import dragButton from "@/components/drag-button/drag-button.vue";

	const bgStyle = ref({})

	const isLandscape = ref(false)

	import { ImagesForm, DowlodURL } from "@/model/ImagesForm";
	import { IAppOption } from "@/model/IAppOption";
	import { validatePhoneNumber, maskPhoneNumber } from "@/utils/index"
	const app = getApp<IAppOption>()

	let token : string;

	const details = ref<ImagesForm>()
	
	
	onLoad((target : any) => {
		uni.showLoading({
			title: "加载中..."
		})
		console.log(target);
		app.globalData.tokenValidity() // 检查token是否过期
		token = uni.getStorageSync("token")
		updateIncreaseViews(target.id,Number(target.views))
		fetchDataDetails(target.id)
	})

	const goBack = () => {
		uni.navigateBack()
	}
	
	// 更新查看++
	const updateIncreaseViews = async (id : string, count : number) => {
		let views = count + 1
		try {
			await uniCloud.callFunction({
				name: "api_increase_views",
				data: {
					_id: id,
					token,
					views,
				}
			})
		} catch (error) {
			//TODO handle the exception
		}
	}

	const fetchDataDetails = async (id : string) => {
		try {
			const result = await uniCloud.callFunction({
				name: "api_get_image_details",
				data: {
					_id: id,
					token
				}
			})
			if (result.result && result.result.code === 200) {
				details.value = result.result.data[0]
				setBackground(result.result.data[0].dowlodURL[0].tempFileURL)
			}
		} catch (error) {
			uni.showToast({
				title: error.message,
				icon: "none"
			})
		} finally {
			uni.hideLoading()
		}

	}

	// 检查方向
	const checkImageOrientation = (imagePath : string) => {
		return new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: imagePath,
				success: (res) => {
					const orientation = res.width > res.height ? 'landscape' : 'portrait';
					resolve({ orientation });
				},
				fail: reject
			});
		});
	}

	// 设置背景图
	const setBackground = async (imageUrl : string) => {
		try {
			const info : any = await checkImageOrientation(imageUrl);
			isLandscape.value = info.orientation === 'landscape';

			bgStyle.value = {
				backgroundImage: `url(${imageUrl})`,
				backgroundSize: isLandscape.value ? '100% auto' : 'auto 100%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center'
			};
		} catch (error) {
			console.error('设置背景失败:', error);
		}
	}

	// 图片预览
	const previewImage = (dowlodURL : DowlodURL[]) => {
		const urls = dowlodURL.map(url => url.tempFileURL)
		uni.previewImage({
			urls,
			current: 0
		});
	}
</script>

<style lang="scss" scoped>
	.page-container {
		width: 100vw;
		height: 100vh;
		position: relative;
		z-index: 99;

		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.2);
		}

		.content {
			position: relative;
			z-index: 999;
			color: #ffffff;
			padding: 20px;

			.top-info {
				margin-top: 70vh;
				padding-left: 40rpx;
				display: flex;
				align-items: center;
				color: #fff;

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
			}

			.info-box {
				padding: 40rpx;
				color: #fff;

				.text {
					font-size: 26rpx;
					margin-bottom: 10rpx;
				}

				.desc {
					font-size: 24rpx;
					line-height: 36rpx;
					opacity: 0.9;
				}
			}
		}

		.back-btn {
			position: fixed;
			left: 20rpx;
			z-index: 999;
			display: inline-block;
		}

	}
</style>