<template>
	<view class="content">
		<my-search-nav-bar @search="searchHandle"></my-search-nav-bar>
		<my-top-banner></my-top-banner>
		<my-nav-menu></my-nav-menu>
		<my-good-card></my-good-card>
		<my-tab-nav></my-tab-nav>
		<my-tab-content-view></my-tab-content-view>
	</view>
</template>

<script setup lang="ts">
	import mySearchNavBar from "@/components/home/my-search-nav-bar.vue"
	import myTopBanner from "@/components/home/my-top-banner.vue";
	import myNavMenu from "@/components/home/my-nav-menu.vue";
	import myGoodCard from "@/components/home/my-good-card.vue";
	import myTabNav from "@/components/home/my-tab-nav.vue";
	import myTabContentView from "@/components/home/my-tab-content-view.vue";

	const searchHandle = (value : string) => {
		console.log(value);
	}


</script>

<style lang="scss" scoped>
	.content {
		box-sizing: border-box;
		overflow-x: hidden;
	}
</style>