<template>
	<view class="container">
		<view class="login-box">
			<text class="title">登录</text>

			<view class="input-item">
				<image src="/static/login/icon_phone.png" mode="aspectFill" class="icon"></image>
				<uni-easyinput type="number" placeholder-style="font-size:30rpx;" maxlength="11" v-model="username"
					:input-border="false" placeholder="请输入手机号"></uni-easyinput>
			</view>
			<view class="input-item">
				<image src="/static/login/icon_passwrod.png" mode="aspectFill" class="icon"></image>
				<uni-easyinput type="password" placeholder-style="font-size:30rpx;" maxlength="18" v-model="password"
					:input-border="false" placeholder="请输入密码"></uni-easyinput>
			</view>

			<text class="forgot-password">忘记密码？</text>
			<button class="login-button" @click="handleLogin">登录</button>
			<view class="register-link">
				<text>还没有登录账号？<text @click="goToRegister" class="register">立即注册</text></text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"

	const username = ref('')
	const password = ref('')

	// 登录
	const handleLogin = async () => {
		if(!username.value || !password.value) {
			uni.showToast({
				title:'请输入账号密码',
				icon:"none"
			})
			return
		}
		uni.showLoading({
			title: '登录中...'
		})
		const res = await uniCloud.callFunction({
			name: 'api_login',
			data: {
				username: username.value,
				password: password.value
			}
		});

		if (res.result.code === 200) {
			console.log('登录成功:', res.result.user);
			uni.showToast({
				title:res.result.message,
				icon:"none"
			})
			// 处理成功逻辑
			uni.setStorageSync('user',res.result.user);
			uni.switchTab({
				url:'/pages/index/index'
			})
			
		} else {
			// console.error('登录失败:', res.result.message);
			uni.showToast({
				title:res.result.message,
				icon:"none"
			})
		}
		uni.hideLoading()
	}

	const goToRegister = () => {
		uni.redirectTo({
			url: '/pages/register/index' // 注册页面路径
		});
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: linear-gradient(45deg, #eff4fb, #eff4fb, #abceff);
		box-sizing: border-box;
		z-index: 999;

		.login-box {
			position: relative;
			z-index: 999;
			background-color: white;
			border-radius: 20px;
			padding: 20px;
			width: 90%;
			max-width: 400px;
			box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);
			margin: 0 20rpx;

			.title {
				font-size: 24px;
				margin-bottom: 20px;
				text-align: center;
				color: #ff6b81;
			}

			.input-item {
				display: flex;
				align-items: center;
				border: 1px solid #abceff;
				margin-top: 20rpx;
				padding: 0 30rpx 0 18rpx;
				border-radius: 50rpx;

				.icon {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.forgot-password {
				color: rgba(0, 0, 0, 0.4);
				text-align: right;
				display: inline-block;
				padding: 10rpx 0;
				width: 100%;
			}

			.login-button {
				background-color: #ff6b81;
				color: white;
				border: none;
				border-radius: 50px;
				width: 100%;
			}

			.register-link {
				position: absolute;
				width: 80%;
				text-align: center;
				z-index: -1;
				bottom: -84rpx;
				padding: 20rpx 0;
				left: 50%;
				transform: translateX(-50%);
				background-color: #fbfcff;
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);

				text {
					color: rgba(0, 0, 0, 0.4);
				}

				.register {
					color: #ed61ff;
				}
			}
		}
	}
</style>