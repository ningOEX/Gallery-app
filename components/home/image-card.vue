<template>
	<view class="card">
		<image @click="toImageDetails" :src="image.src" mode="widthFix" class="main-image" />
		<view class="card-footer">
			<image :src="image.avatar" class="avatar" />
			<text class="username">{{ image.username }}</text>
			<uni-icons type="fire" size="18" color="#999" />
			<text class="views">{{ image.views }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps<{
		image : {
			src : string
			avatar : string
			username : string
			id : string
			views : number
		}
	}>()

	const toImageDetails = () => {
		uni.navigateTo({ url: `/pages/imageDetails/index?id=${props.image.id}` })
	}
</script>

<style scoped>
	.card {
		margin-bottom: 16rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #fff;
	}

	.main-image {
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
	}

	.card-footer {
		display: flex;
		align-items: center;
		padding: 12rpx;
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