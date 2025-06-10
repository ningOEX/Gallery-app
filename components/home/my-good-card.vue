<template>
	<view class="container">
		<view class="title">
			<text>Card</text>
			<view>更多>></view>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
			<my-item-card></my-item-card>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import myItemCard from '@/components/home/my-item-card.vue';
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 20rpx;
		box-shadow: 0px 0px 6px #ccc;
		border-radius: 10rpx;
		margin:40rpx 10rpx 20rpx 10rpx;
		.title {
			font-size: 26rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				font-size: 38rpx;
				transform: translateY(-50%);
				background-color: #fff;
				color: #42a5f5;
				font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
				letter-spacing: 4rpx;
			}
			
			view{
				color: rgba(0,0,0,0.5);
			}
		}

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			margin-bottom: 10rpx;
		}

	}
</style>