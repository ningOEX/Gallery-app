<template>
	<view class="nav-menu-cotnainer">
		<view class="menu-item">
			<view class="menu-icon-content">
				<image class="menu-icon" src="@/static/iconNavMenu/icon_menu_1.png" mode=""></image>
			</view>
			<text class="menu-text">菜单选项</text>
		</view>
		<view class="menu-item">
			<view class="menu-icon-content">
				<image class="menu-icon" src="@/static/iconNavMenu/icon_menu_2.png" mode=""></image>
			</view>
			<text class="menu-text">菜单选项</text>
		</view>
		<view class="menu-item">
			<view class="menu-icon-content">
				<image class="menu-icon" src="@/static/iconNavMenu/icon_menu_3.png" mode=""></image>
			</view>
			<text class="menu-text">菜单选项</text>
		</view>
		<view class="menu-item">
			<view class="menu-icon-content">
				<image class="menu-icon" src="@/static/iconNavMenu/icon_menu_4.png" mode=""></image>
			</view>
			<text class="menu-text">菜单选项</text>
		</view>
		<view class="menu-item">
			<view class="menu-icon-content">
				<image class="menu-icon" src="@/static/iconNavMenu/icon_menu_5.png" mode=""></image>
			</view>
			<text class="menu-text">菜单选项</text>
		</view>
	
	</view>
</template>

<script lang="ts" setup>
	import {ref} from "vue" 
	
</script>

<style lang="scss" scoped>
	.nav-menu-cotnainer{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		
		.menu-item{
			display: grid;
			justify-content: center;
			align-items: center;
			gap: 2rpx;
			
			.menu-icon-content{
				text-align: center;
				border-radius:50%;
				padding: 8rpx 0rpx;
				background-color: #eee;
				
				.menu-icon{
					width: 68rpx;
					height: 68rpx;
				}
			}
			
			.menu-text{
				font-size: 26rpx;
			}
		}
	}
</style>