<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.getTodayWeekDay()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		globalData:{
			currentDay:-1,
			
			// 获取当前星期几
			getTodayWeekDay(){
				 const date = new Date();
				 this.currentDay = date.getDay()
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
