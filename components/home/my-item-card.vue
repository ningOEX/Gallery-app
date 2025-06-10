<template>
	<view class="container">
		<view class="scroll-view-item_H">
			<view v-for="item in 6" class="item" :key="item">{{item}}</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.container{
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
				border: 1px solid;
			}

		}
	}
	
	
</style>