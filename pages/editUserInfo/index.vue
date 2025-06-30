<template>
	<view class="edit-container">
		<view class="user-card" @click="edit(types.nickname)">
			<view class="user-avatar">
				<image :src="user.avatar ? user.avatar[0].tempFileURL : '/static/default.png'" mode="aspectFill" class="image"></image>
				<view class="user-name">
					<text class="name">{{ user?.nickname }}</text>
					<text class="uid">uid:{{ user._id }}</text>
				</view>
			</view>
		</view>

		<view class="nav-content">
			<view class="nav-item" @click="edit(types.password)">
				<view class="nav-icon">
					<image src="/static/login/icon_change_pwd.png" mode="aspectFit" class="icon"></image>
					<text>修改密码</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="nav-item" @click="logout">
				<view class="nav-icon">
					<image src="/static/login/icon_user_cancel.png" mode="aspectFit" class="icon"></image>
					<text>注销账号</text>
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>

		<edit-popup :show-pop="showPop" :current-type="currentType" :placeholder="placeholder" @leave="leave"
			@submit="submit"></edit-popup>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	// model
	import { IAppOption } from '@/model/IAppOption'
	import { User } from '@/model/user'
	import { EditInfo } from '@/model/EditInfo'

	// components
	import editPopup from '@/components/editPopup.vue'

	// utils


	const app = getApp<IAppOption>()

	let token : string;

	const placeholder = ref<string>('')
	const showPop = ref<boolean>(false)
	const currentType = ref<number>(-1) // 0 - nickname  1 - password
	const types = {
		nickname: 0,
		password: 1,
	}

	const user = ref<User>({
		_id: '',
		nickname: '',
		phone: '',
		createdAt: '',
	})

	onShow(() => {
		token = uni.getStorageSync('token'); // 获取保存的 token
		initUser()
	})

	const initUser = () => {
		app.globalData.getUser()
		user.value = app.globalData.user
	}
	
	// 注销账户
	const logout = async()=>{
		try{
			uni.showModal({
				title: '提示',
				content: '您正在使用注销功能，所有相关数据将永久丢失，是否注销？',
				success: async function (res) {
					if (res.confirm) {
						uni.showLoading({
							title:"正在注销...",
							icon:"none"
						})
						const res = await uniCloud.callFunction({
							name:"api_logout",
							data:{
								token
							}
						})
						if (res.result && res.result.code === 200) {
							uni.showToast({
								title: '成功注销',
								icon:"none",
								duration:1000
							})
							uni.removeStorageSync("token")
							uni.removeStorageSync('userInfo')
							setTimeout(()=>{
								uni.reLaunch({
									url: "/pages/login/index"
								})
							},1000)
						} else {
							uni.showToast({
								title: res.result.message,
								icon:"none",
								duration:2000
							})
						}
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			
			
			
			
		}catch (error){
			uni.showToast({
				title:error.message,
				icon:"none"
			})
		}finally{
			uni.hideLoading()
		}
	}

	// 修改
	// -
	const edit = (type : number) => {
		showPop.value = true
		currentType.value = type
		type === types.nickname
			? (placeholder.value = '请输入新昵称')
			: (placeholder.value = '请输入旧密码')
	}

	//关闭回调
	// -
	const leave = () => {
		showPop.value = false
	}

	// 保存
	// -
	const submit = async (info : EditInfo) => {
		console.log(info);
		const { nickname, oldPwd, newPassword } = info

		if (!nickname && !(oldPwd && newPassword)) {
			uni.showToast({
				title: '请输入要修改的信息',
				icon: 'none',
				duration: 3000,
			})
			return
		}
		uni.showLoading({
			title:"正在执行..."
		})
		try {
			currentType.value === 1 ? changePassword(oldPwd, newPassword) : changeNickname(nickname)
		} catch (error) {
			//TODO handle the exception
		} finally{
			uni.hideLoading()
		}
	}

	// 修改昵称
	const changeNickname = async(nickname?: string) => {
		app.globalData.tokenValidity()
		try {
			const res = await uniCloud.callFunction({
				name: 'api_edit_user_info',
				data: {
					token,
					nickname,
				}
			});
			await uniCloud.callFunction({
				name:"api_update_nickname_iamges",
				data:{
					nickname,
					uid:user.value._id
				}
			})
			user.value.nickname = nickname
			showToastFunc(res)
		} catch (error) {
			console.error('请求修改密昵称失败:', error);
			uni.showToast({
				title: error.message,
				icon:"none",
				duration:2000
			})
		}
	}

	// 修改密码函数
	const changePassword = async (oldPwd ?: string, newPassword ?: string) => {
		app.globalData.tokenValidity()
		try {
			const res = await uniCloud.callFunction({
				name: 'api_edit_user_info',
				data: {
					token,
					oldPwd,
					newPassword
				}
			});
			showToastFunc(res)
			
		} catch (error) {
			console.error('请求修改密码失败:', error);
			uni.showToast({
				title: error.message,
				icon:"none",
				duration:2000
			})
		}
	}
	
	// Toast 提示
	const showToastFunc = (res : any)=>{
		if (res.result && res.result.code === 200) {
			console.log('修改成功:', res.result.message);
			uni.showToast({
				title: res.result.message,
				icon:"none",
				duration:2000
			})
			showPop.value = false
			app.globalData.updateUserInfo()
		} else {
			console.error('修改失败:', res.result.message);
			uni.showToast({
				title: res.result.message,
				icon:"none",
				duration:2000
			})
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.edit-container {
		padding: 20rpx;

		.user-card {
			// border: 1px solid;
			border-radius: 20rpx;
			box-shadow: 0 0 4rpx #9e95ff;
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
					border-radius: 50%;
				}
			}

			.user-name {
				display: grid;
				text-align: center;

				.uid {
					font-size: 26rpx;
					color: rgba(0, 0, 0, 0.4);
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