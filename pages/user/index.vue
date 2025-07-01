<template>
	<view class="user-container">
		<view class="user-card">
			<view class="card-content">
				<view class="user-avatar">
					<image :src="user.avatar ? user.avatar[0]?.tempFileURL : '/static/default.png'" @click="uploadAavatar" mode="aspectFill" class="image"></image>
					<view class="user-name">
						<text class="name">{{ user.nickname }}</text>
						<text class="uid">uid:{{ user._id }}</text>
					</view>
				</view>
				<view class="user-uid-text-content">
					<text class="text_content">{{user?.introduction ? user.introduction : '这个人很懒，什么都没有留下~ '}} </text>
					<image class="icon" src="/static/icon_write.png" mode="aspectFit" @click="changeIntroduction">
					</image>
				</view>
				<view class="tab-content">
					<view class="tab-item" v-for="(item, index) in tabList" :key="index" @click="toGo(item)">
						<text class="tab-total">0</text>
						<text class="tab-name">{{ item.text }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="nav-content">
			<view class="nav-item" @click="ToEdit">
				<view class="nav-icon">
					<image src="/static/login/icon_user_change.png" mode="aspectFit" class="icon"></image>
					<text>账号管理</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="nav-item" >
				<view class="nav-icon">
					<image src="/static/login/icon_manual.png" mode="aspectFit" class="icon"></image>
					<view class="about">
						<view>联系我们</view>
					</view>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="nav-item" @click="exitHandle">
				<view class="nav-icon">
					<image src="/static/login/icon_exit_login.png" mode="aspectFit" class="icon"></image>
					<text>退出登录</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>

		<!-- 弹框 -->
		<uni-popup ref="refDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="个人签墙" v-model="introduction" placeholder="说点什么吧~"
				@confirm="dialogInputConfirm" @close="introduction = ''"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import type { User } from '@/model/user'
	import {DowlodURL} from "@/model/ImagesForm"
	import { onShow, onLoad } from '@dcloudio/uni-app'
	import { IAppOption } from '@/model/IAppOption'
	import {getCurrentDateTime} from "@/utils/index"
	
	const app = getApp<IAppOption>()

	let token : string;

	const tabList = [
		{
			text: '作品',
			path: '/pages/myWorks/index',
			link: '',
		},
		{
			text: '收藏',
			path: '',
			link: '',
		},
		{
			text: '足迹',
			path: '',
			link: '',
		},
		{
			text: '历史头像',
			path: '',
			link: '',
		},
	]

	const user = ref<User>({
		_id: '',
		nickname: '',
		phone: '',
		createdAt: '',
		introduction: '',
		avatar:[],
	})
	
	const oldVvatar = ref<DowlodURL[]>([]) // 临时保存上一次头像

	const introduction = ref<string>('')

	const refDialog = ref() // Ref弹框

	onLoad(() => {
		token = uni.getStorageSync("token")
	})

	onShow(() => {
		app.globalData.getUser()
		user.value = app.globalData.user
		introduction.value = user.value.introduction
	})

	const ToEdit = () => {
		uni.navigateTo({
			url: '/pages/editUserInfo/index',
		})
	}

	// 编辑个人简介
	const changeIntroduction = () => {
		refDialog.value.open()
	}

	// 弹框保存
	const dialogInputConfirm = async () => {
		uni.showLoading({
			title: "正在保存"
		})
		try {
			const result = await uniCloud.callFunction({
				name: "api_update_user_info",
				data: {
					token,
					introduction: introduction.value
				}
			})
			if (result.result?.code === 200) {
				uni.showToast({
					title: "保存成功",
					icon: "none"
				})
				app.globalData.updateUserInfo()
				app.globalData.getUser()
				user.value = app.globalData.user
				user.value.introduction = introduction.value
			}

		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title: error.message
			})
		} finally {
			uni.hideLoading()
		}
		console.log(introduction.value);
	}
	
	// 头像上传
	const uploadAavatar = ()=>{
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				// 上传图片到服务器
				pushCloudFunc(res.tempFilePaths[0])
			}
		})
	}
	
	// 推送至云存储
	const pushCloudFunc = async(avatar : string)=>{
		uni.showLoading({
			title:"更新中..."
		})
		try {
			const result = await uniCloud.uploadFile({
				filePath:avatar,
				cloudPath: `uploadAvatar/${Date.now()}_${avatar.split('/').pop()}`, // 动态生成文件名
				cloudPathAsRealPath: true, //云端文件绝对路径
				fileType: 'image',
			})
			getTempFileURLFunc(result.fileID)
		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title:error.message,
				icon:"none"
			})
			uni.hideLoading()
		} 
	}
	
	// 获取下载地址
	const getTempFileURLFunc = async(fileID : string) => {
		try {
			const result = await uniCloud.getTempFileURL({fileList: [fileID]})
			// 原始头像临时存储
			if(user.value && user.value.avatar){
				oldVvatar.value = user.value.avatar
			}
			user.value.avatar = result.fileList
			saveAvatar() // 保存
		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title:error.message,
				icon:"none"
			})
			uni.hideLoading()
		}
	}
	
	// 保存更新avatar
	const saveAvatar = async()=>{
		try{
			const res = await uniCloud.callFunction({
				name:"api_update_avatar",
				data:{
					_id: user.value._id,
					avatar: user.value.avatar,
				}
			})
			if(res.result.code === 200){
				// 保存成功
				uni.showToast({
					title:'更新成功',
					icon:"none"
				})
				app.globalData.updateUserInfo()
				app.globalData.getUser()
				user.value = app.globalData.user
				saveHistoryAvatar()
			}else{
				// 保存失败
				uni.showToast({
					title:res.result.message,
					icon:"none"
				})
				uni.hideLoading()
			}
		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title:error.message,
				icon:"none"
			})
			uni.hideLoading()
		} 
	}

	// 存储历史头像
	const saveHistoryAvatar = async()=>{
		try {
			uniCloud.callFunction({
				name:"api_add_abandon_avatar",
				data:{
					_id:user.value._id,
					avatar:oldVvatar.value,
					timestamp:getCurrentDateTime().timestamp
				}
			})
		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title:error.message,
				icon:"none"
			})
		}
		
	}

	/**
	 * 退出登录
	 */
	const exitHandle = () => {
		uni.showModal({
			title: '提示',
			content: '是否退出登录？',
			success: function (res) {
				if (res.confirm) {
					uni.removeStorageSync("token")
					uni.removeStorageSync('userInfo')
					uni.reLaunch({
						url: '/pages/login/index',
					})
				}
			},
		})
	}

	// 
	const toGo = (item : { text : string, path : string, link : string }) => {
		if (!item.path) {
			uni.showToast({
				title: "敬请期待",
				icon: "none"
			})
			return
		}
		uni.navigateTo({
			url:`${item.path}?id=${user.value._id}`
		})
	}
</script>

<style lang="scss" scoped>
	:root {
		--text-size-32: 32rpx;
	}

	.user-container {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		padding: 0 20rpx;
		box-sizing: border-box;
		background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);

		.user-card {
			margin-top: 220rpx;
			box-sizing: border-box;
			width: 100%;
			height: 300rpx;
			border-radius: 20rpx;
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
			padding: 0 20rpx;

			.card-content {
				transform: translateY(-50rpx);

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
					
					.text_content{
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

		.tab-content {
			display: flex;
			justify-content: space-evenly;
			gap: 20rpx;
			align-items: center;
			padding-top: 14rpx;
			text-align: center;

			.tab-item {
				display: grid;

				.tab-total {
					font-size: 26rpx;
				}

				.tab-name {
					font-size: 28rpx;
				}
			}
		}

		.nav-content {
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
			margin: 40rpx 0;
			border-radius: 20rpx;

			.nav-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 20rpx;
				font-size: 30rpx;

				.nav-icon {
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