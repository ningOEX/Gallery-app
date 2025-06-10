<template>
	<view class="container">
		<view class="scroll-view-item_H">
			<view v-for="(item,index) in cardList" class="item" :key="index">
				<text class="name">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"

	const cardList = [{
		name: '我是标题',
		path: '#',
	}, {
		name: '我是标题',
		path: '#',
	}, {
		name: '我是标题',
		path: '#',
	}, {
		name: '我是标题',
		path: '#',
	}, {
		name: '我是标题',
		path: '#',
	}, {
		name: '我是标题',
		path: '#',
	},]

</script>

<style lang="scss" scoped>
	.container {
		display: inline-block;

		.scroll-view-item_H {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 20rpx;
			padding-bottom: 20rpx;

			.item {
				width: 210rpx;
				height: 150rpx;
				box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.2);
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.name{
					font-weight: bold;
					font-size: 28rpx;
					padding: 6rpx 0;
					background-color: rgba(255,255,255,0.2);
					width: 100%;
					text-align: center;
					backdrop-filter: blur(10px);
				}
			}
		}
		
		.item:nth-child(1){
			background-image: url('/static/default.png');
			background-size: cover;
		}
		.item:nth-child(2){
			background-image: url('/static/default.png');
			background-size: cover;
		}
		.item:nth-child(3){
			background-image: url('/static/default.png');
			background-size: cover;
		}
		.item:nth-child(4){
			background-image: url('/static/default.png');
			background-size: cover;
		}
		.item:nth-child(5){
			background-image: url('/static/default.png');
			background-size: cover;
		}
		.item:nth-child(6){
			background-image: url('/static/default.png');
			background-size: cover;
		}
	}
</style>