<template>
	<view class="edit-container">
		<view class="user-card">
			<view class="user-avatar">
				<image src="/static/default.png" mode="aspectFit" class="image"></image>
				<view class="user-name">
					<text class="name">{{user?.nickname}}</text>
					<text class="uid">uid:{{user._id}}</text>
				</view>
			</view>
		</view>
		
		<view class="nav-content">
			<view class="nav-item">
				<view class="nav-icon">
					<image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
					<text>修改昵称</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="nav-item">
				<view class="nav-icon">
					<image src="/static/iconTabBar/icon_my.png" mode="aspectFit" class="icon"></image>
					<text>修改密码</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { IAppOption } from "../../model/IAppOption"
	import { User } from "../../model/user"
	import { onShow } from "@dcloudio/uni-app"
	const app = getApp<IAppOption>();

	const user = ref<User>({
		_id: "",
		nickname: "",
		phone: "",
		createdAt: ""
	})

	onShow(() => {
		app.globalData.getUser();
		user.value = app.globalData.user;
	})
</script>

<style lang="scss" scoped>
	.edit-container {
		padding: 20rpx;
		.user-card {
			// border: 1px solid;
			border-radius: 20rpx;
			box-shadow: 0 0 4rpx #000;
			padding: 20rpx;
			background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);

			.user-avatar {
				display: grid;
				align-items: center;
				gap: 10rpx;
				.image {
					width: 150rpx;
					height: 150rpx;
					margin: 0 auto;
				}
			}
			
			.user-name{
				display: grid;
				text-align: center;
				
				.uid{
					font-size: 26rpx;
					color: rgba(0,0,0,0.4);
				}
			}
		}
		.nav-content {
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
			margin:40rpx 0;
			border-radius: 20rpx;
			
			.nav-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 20rpx;
				font-size: 30rpx;
				
				.nav-icon{
					display: flex;
					align-items: center;
					gap: 20rpx;
					.icon {
						width: 40rpx;
						height: 40rpx;
					}
				}
				
			}
		}
	}
</style>