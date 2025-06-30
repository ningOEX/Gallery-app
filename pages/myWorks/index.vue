<template>
	<view class="">
		my works
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue"
	import {onLoad} from "@dcloudio/uni-app"
	
	const uid = ref<string>('')
	
	onLoad((target : any)=>{
		if(!target.id){
			return
		}
		uid.value = target.id
		fetchDataFunc()
	})
	
	const fetchDataFunc = async()=>{
		uni.showLoading({
			title:"加载中"
		})
		try {
			const res = await uniCloud.callFunction({
				name:"api_get_works_list",
				data:{
					uid:uid.value
				}
			})
			console.log(res);
		} catch (error) {
			//TODO handle the exception
		}finally{
			uni.hideLoading()
		}
	}
	
	
</script>

<style>
</style>