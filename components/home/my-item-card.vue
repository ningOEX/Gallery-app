<template>
  <view class="container">
    <view class="scroll-view-item_H">
      <view v-for="(item, index) in cardList" class="item" :key="index" @click="changeCard(item)">
        <text class="name">{{ item.text }}</text>
      </view>
	  <view v-if="!cardList.length">加载中...</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {onShow,onLoad} from "@dcloudio/uni-app"
import {TypeSort} from "@/model/TypeSort"

const cardList = ref<TypeSort[]>([])

const getTypesFunc = async()=>{
	try {
		const result = await uniCloud.callFunction({
			name:"api_get_types"
		})
		// console.log(result.result.data[0].types);
		if(result.result.code === 200){
			cardList.value = result.result.data[0].types
		}
	} catch (error) {
		//TODO handle the exception
	}
}

const changeCard = (item: TypeSort)=>{
	console.log(item);
	uni.showToast({
		title:"开发中",
		icon:'none'
	})
}

onLoad(()=>{
	getTypesFunc()
})


</script>

<style lang="scss" scoped>
.container {
  display: inline-block;

  .scroll-view-item_H {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20rpx;
	min-height: 268rpx;
    padding-bottom: 20rpx;

    .item {
	  position: relative;
      width: 210rpx;
      height: 150rpx;
      box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.2);
	  background-color: rgba(0, 0, 0, 0.1);;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
	  z-index: 999;

      .name {
		  position: absolute;
		  bottom: 0;
		  left: 0;
        font-weight: bold;
        font-size: 28rpx;
        padding: 6rpx 0;
        background-color: rgba(255, 255, 255, 0.1);
        width: 100%;
        text-align: center;
        backdrop-filter: blur(10px);
		
      }
    }
  }

  .item:nth-child(1) {
    background-image: url('https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/cloudstorage/icon_GULULU-1.png');
    background-size: cover;
  }
  .item:nth-child(2) {
    background-image: url('https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/cloudstorage/icon_GULULU-2.png');
    background-size: cover;
  }
  .item:nth-child(3) {
    background-image: url('https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/cloudstorage/icon_GULULU-3.png');
    background-size: cover;
  }
  .item:nth-child(4) {
    background-image: url('https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/cloudstorage/icon_GULULU-4.png');
    background-size: cover;
  }
  .item:nth-child(5) {
    background-image: url('https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/cloudstorage/icon_GULULU-5.png');
    background-size: cover;
  }
  .item:nth-child(6) {
    background-image: url('https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/cloudstorage/icon_GULULU-6.png');
    background-size: cover;
  }
}
</style>
