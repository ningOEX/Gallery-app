<template>
	<page-container class="container" :show="show" position="center" :close-on-slide-down="true" @leave="leaveHandle">
		<view v-if="porps.user" class="user-card">
			<view class="card-content">
				<view class="user-avatar">
					<image :src="porps.user && porps.user.avatar ? porps.user.avatar[0]?.tempFileURL : '/static/default.png'" mode="aspectFill"
						class="image"></image>
					<view class="user-name">
						<text class="name">{{ validatePhoneNumber(porps.user.nickname) ? maskPhoneNumber(porps.user.nickname) : maskName(porps.user.nickname) }}</text>
						<text class="uid">uid:{{ porps.user?._id }}</text>
					</view>
				</view>
				<view class="user-uid-text-content">
					<text class="text_content">{{porps.user?.introduction ? porps.user?.introduction : '这个人很懒，什么都没有留下~ '}} </text>
				</view>
			</view>
		</view>
	</page-container>
</template>

<script lang="ts" setup>
	import { User } from "../model/user"
	import {validatePhoneNumber,maskPhoneNumber,maskName} from "@/utils/index"

	const show = defineModel<{ show : boolean }>()

	const porps = defineProps<{ user : User }>()

	const emits = defineEmits(['leave'])

	// 离开中
	const leaveHandle = () => {
		emits('leave')
	}
</script>


<style lang="scss" scoped>
	.user-card {
		margin:20rpx 0;
		box-sizing: border-box;
		width: 100%;
		height: 300rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
		background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);
		padding: 0 20rpx;

		.card-content {
			// transform: translateY(-50rpx);

			.user-avatar {
				display: flex;
				gap: 10rpx;

				.image {
					width: 100rpx;
					height: 100rpx;
					isolation: isolate;
					border-radius: 50rpx;
				}

				.user-name {
					display: grid;
					margin-top: 6rpx;
					.name {
						font-size: var(--text-size-32);
						font-weight: bold;
					}
					.uid {
						font-size: 28rpx;
						color: rgba(0, 0, 0, 0.5);
					}
				}
			}

			.user-uid-text-content {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				margin-top: 10rpx;
				min-height: 130rpx;
				line-height: 1.5em;
				color: #000;
				overflow: hidden;
				/* 隐藏溢出内容 */
				text-overflow: ellipsis;
				/* 溢出部分显示省略号 */
				display: -webkit-box;
				/* 使用 Flexbox */
				-webkit-box-orient: vertical;
				/* 垂直方向排列 */
				-webkit-line-clamp: 3;
				/* 限制行数为 3 行 */

				.text_content {
					padding-left: 10rpx;
					color: rgba(0, 0, 0, 0.6);
				}

				.icon {
					width: 32rpx;
					height: 32rpx;
					padding-left: 2rpx;
					margin-top: 8rpx;
					display: inline-block;
				}
			}
		}
	}
</style>