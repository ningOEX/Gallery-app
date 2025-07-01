<template>
	<z-paging ref="paging" auto-show-system-loading :refresher-enabled="false" v-model="dataList" use-virtual-list use-compatibility-mode cell-height-mode="dynamic" @query="queryList">
		<!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
		<!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
		<template #empty>
			<my-empty title="暂无数据~"></my-empty>
		</template>
		 <my-waterfall :list="dataList" @item-click="handleItemClick"></my-waterfall>
	</z-paging>
</template>

<script setup lang="ts">
	import { ref,nextTick } from 'vue'
	import { onLoad } from "@dcloudio/uni-app"
	import myWaterfall from '@/components/home/my-waterfall.vue'

	import myEmpty from '@/components/my-empty.vue'
	import { ImagesForm } from "@/model/ImagesForm"


	import userCardPopup from '@/components/userCardPopup.vue'
	import { User } from "@/model/user"

	let token : string

	const show = ref<boolean>() // 查看用户简单信息
	
	const isUpdating = ref<boolean>(false) // 防止多次点击

	const currentUser = ref<User>()

	const paging = ref(null)
	const dataList = ref<ImagesForm[]>([])
	
	
	// 头像详情回调
	const handleLeave = () => {
		show.value = false
	}
	
	// 图片预览详情
	const handleItemClick = (item : ImagesForm) => {
		uni.navigateTo({ url: `/pages/imageDetails/index?id=${item._id}&views=${item.views}` })
	}

	// 头像点击
	const handleAvatar = async (uid : string) => {
		uni.showLoading({
			title: "加载中..."
		})
		try {
			const res = await uniCloud.callFunction({
				name: "api_get_uid_user",
				data: {
					_id: uid
				}
			})
			if (res.result.code === 200) {
				currentUser.value = res.result.data[0]
				show.value = true
			}
		} catch (error) {
			// error
		} finally {
			uni.hideLoading()
		}
	}

	// 数据请求
	const queryList = async (pageNo : number, pageSize : number) => {
		await nextTick()
		try {
			const result = await uniCloud.callFunction({
				name: "api_get_hot_week_list",
				data: {
					page: pageNo,
					pageSize: pageSize
				}
			})
			paging.value.complete(result.result.data);
		} catch (err) {
			uni.showToast({
				title: err.message,
				icon: "none"
			})
			paging.value.complete(false);
		} 
	}

	onLoad(() => {
		token = uni.getStorageSync('token')
	})
</script>

<style lang="scss" scoped>
	.scroll-view {
		height: 100vh;
		/* 或其他固定高度 */
		overflow-y: auto;
		/* 确保可以垂直滚动 */

		.container {
			// padding-bottom: constant(safe-area-inset-bottom);
			// padding-bottom: env(safe-area-inset-bottom);
			background-color: #f7f7f7;
		}

		.loading {
			text-align: center;
			padding: 20rpx;
		}
	}
</style>