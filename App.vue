<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.getTodayWeekDay()
			this.globalData.getUser()
			this.globalData.updateUserInfo()
			this.globalData.tokenValidity()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

		globalData: {
			currentDay: -1,
			user: null,
			vaild:null,
			// 获取当前星期几
			getTodayWeekDay() {
				const date = new Date()
				this.currentDay = date.getDay()
			},

			getUser() {
				const user = uni.getStorageSync('userInfo')
				if (!user) {
					uni.reLaunch({
						url: '/pages/login/index',
					})
					return
				}
				this.user = user
			},
			async updateUserInfo() {
				try {
					const token = uni.getStorageSync('token')
					if(!token) return;
					const result = await uniCloud.callFunction({
						name: 'api_get_user_info',
						data: {
							token,
						},
					})
					if(result.result.code === 200){
						console.log('update 200');
						uni.setStorageSync('userInfo',result.result.user)
					}else{
						uni.showToast({
							title:result.result.message,
							icon:"none"
						})
					}
				} catch (error) {
					//TODO handle the exception
				}
			},
			
			// 检查 token 
			async tokenValidity(){
				const token = uni.getStorageSync('token')
				const vaild = await uniCloud.callFunction({
					name:"check_token_Validity",
					data:{
						token
					}
				})
				if(!vaild.result.valid){
					uni.showModal({
						title: '提示',
						content: '过期 token 请重新登录！',
						success: function (res) {
							if (res.confirm) {
								uni.removeStorageSync("token")
								uni.removeStorageSync('userInfo')
								uni.reLaunch({
									url:"/pages/login/index"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
			},

			update() {
				const updateManager = wx.getUpdateManager()
				console.log('[updateManager]: ', updateManager)
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log('是否有新版本：', res.hasUpdate)
				})

				updateManager.onUpdateReady(function() {
					updateManager.applyUpdate()
				})

				updateManager.onUpdateFailed(function() {
					// 新版本下载失败
				})
			},
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>