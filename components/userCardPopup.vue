<template>
	<page-container :show="show" position="center" :close-on-slide-down="true">
		test
	</page-container>
</template>

<script  lang="ts" setup>
	import {User} from "../model/user"
	
	const show = defineModel<{show : boolean}>()
	
	const porps = defineProps<{user : User}>()
	
</script>
