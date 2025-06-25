<template>
  <scroll-view scroll-y>
    <view class="waterfall">
      <view class="column" v-for="(col, i) in 2" :key="i">
        <ImageCard
          v-for="(item, j) in images.filter((_, idx) => idx % 2 === i)"
          :key="j"
          :image="item"
        />
      </view>
    </view>
	<my-empty v-if="!images.length" title="暂无数据~"></my-empty>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {onLoad} from "@dcloudio/uni-app"
import ImageCard from '@/components/home/image-card.vue'
import {ImagesForm} from "@/model/ImagesForm"

import myEmpty from '@/components/my-empty.vue'


const images = ref<ImagesForm[]>([])

const fetchDataFunc = async()=>{
	uni.showLoading({
		title:"加载中..",
	})
	try{
		const result = await uniCloud.callFunction({
			name:"api_get_hot_week_list",
			data:{
				page:1,
				pageSize:10
			}
		})
		images.value = result.result.data
		
	}catch (err){
		uni.showToast({
			title:err.message,
			icon:"none"
		})
	}finally{
		uni.hideLoading()
	}
}

onLoad(()=>{
	fetchDataFunc()
})


</script>

<style scoped>
.waterfall {
  display: flex;
  justify-content: space-between;
  padding: 24rpx;
}
.column {
  width: 48%;
}
</style>
