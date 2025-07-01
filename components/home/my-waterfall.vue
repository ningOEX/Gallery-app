<template>
	<view class="waterfall-container">
		<view class="waterfall-column" v-for="(column, index) in filteredColumns" :key="index">
			<view class="waterfall-item" :key="item._id" v-for="item in column"  @click="handleItemClick(item)"
				:class="{ 'fade-in': loadedItems[item.uid] }" @appear="handleItemAppear(item.uid)">
				<view class="item-content">
					<image v-if="item.images && item.images.length > 0" class="item-image" :src="item.images[0]"
						mode="widthFix" @load="onImageLoad(item.uid)" />
					<view class="item-info">
						<view class="user-info">
							<image v-if="item.avatar && item.avatar.length > 0 && item.avatar[0].tempFileURL"
								class="avatar" :src="item.avatar[0].tempFileURL" mode="aspectFill" />
							<text
								class="nickname">{{ validatePhoneNumber(item.nickname) ? maskPhoneNumber(item.nickname) : item.nickname }}</text>
						</view>
						<text class="title">{{ item.title }}</text>
						<text class="description">{{ item.description }}</text>
						<view class="meta">
							<text class="type">{{ item.typeName }}</text>
							<text class="views">浏览: {{ item.views }}</text>
							<text class="time">{{ formatTime(item.timestamp) }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'

	import {
		validatePhoneNumber,
		maskPhoneNumber
	} from "@/utils/index"

	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		},
		columnCount: {
			type: Number,
			default: 2
		}
	})

	const emits = defineEmits(['itemClick'])

	// 记录已加载的项
	const loadedItems = ref({})

	// 计算属性：过滤超过7天的数据
	const filteredData = computed(() => {
		const now = Date.now()
		const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

		return props.list.filter(item => {
			return item.timestamp >= sevenDaysAgo
		})
	})

	// 计算属性：将过滤后的数据分配到各列
	const filteredColumns = computed(() => {
		const cols = Array.from({
			length: props.columnCount
		}, () => [])
		filteredData.value.forEach((item, index) => {
			cols[index % props.columnCount].push(item)
		})
		return cols
	})

	// 格式化时间显示
	const formatTime = (timestamp) => {
		const date = new Date(timestamp)
		const now = new Date()
		const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

		if (diffDays === 0) {
			return '今天'
		} else if (diffDays === 1) {
			return '昨天'
		} else {
			return `${diffDays}天前`
		}
	}

	// 图片加载完成回调
	const onImageLoad = (uid) => {
		loadedItems.value[uid] = true
	}

	// 项出现在屏幕时回调
	const handleItemAppear = (uid) => {
		loadedItems.value[uid] = true
	}

	// 点击项目回调
	const handleItemClick = (item) => {
		emits('itemClick', item)
	}
</script>

<style lang="scss">
	.waterfall-container {
		display: flex;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.waterfall-column {
		flex: 1;
		margin: 0 5rpx;
		display: flex;
		flex-direction: column;
	}

	.waterfall-item {
		margin-bottom: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		transition: all 3s ease-out;
		transform: scale(0);
		// transform-origin: center center; 

		&.fade-in {
			transform: scale(1);
			transition: opacity 0.5s ease, transform 0.5s ease;
		}
		&:active {
			transform: scale(0.98) !important;
		}
	}

	.item-content {
		display: flex;
		flex-direction: column;
	}

	.item-image {
		width: 100%;
		display: block;
	}

	.item-info {
		padding: 20rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 15rpx;
	}

	.nickname {
		font-size: 26rpx;
		color: #333;
		font-weight: bold;
	}

	.title {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
		margin-bottom: 10rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.description {
		font-size: 26rpx;
		color: #666;
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.meta {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;

		.time {
			color: #ccc;
		}
	}
</style>