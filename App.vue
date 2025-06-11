<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.getTodayWeekDay()
			this.globalData.getUser()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

		globalData: {
			currentDay: -1,

			// 获取当前星期几
			getTodayWeekDay() {
				const date = new Date();
				this.currentDay = date.getDay()
			},

			getUser() {
				const user = uni.getStorageSync('user');

				if (!user) {
					uni.reLaunch({
						url: '/pages/login/index'
					})
					return
				}
				this.user = user
			},

			update() {
				const updateManager = wx.getUpdateManager()
				console.log('[updateManager]: ', updateManager);
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
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>