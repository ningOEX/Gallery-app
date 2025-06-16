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
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ImageCard from '../../components/home/image-card.vue'

interface ImageItem {
  src: string
  avatar: string
  username: string
  id: string
  views: number
}

const images = reactive<ImageItem[]>([
  {
    src: 'https://pic.616pic.com/photoone/00/01/28/618ced352f5335310.jpg',
    avatar: '../../static/banner/banner_1.jpg',
    username: '花无**歇',
    id: '123456',
    views: 686,
  },
  {
    src: '../../static/banner/banner_2.jpg',
    avatar: '../../static/banner/banner_2.jpg',
    username: '闻哥**',
    id: '123456',
    views: 232,
  },
  {
    src: '../../static/banner/banner_3.jpg',
    avatar: '../../static/banner/banner_3.jpg',
    username: '范**冰',
    id: '123456',
    views: 281,
  },
  {
    src: 'https://pic.616pic.com/photoone/00/01/28/618ced352f5335310.jpg',
    avatar: '../../static/banner/banner_1.jpg',
    username: 'V**',
    id: '123456',
    views: 109,
  },
  // 更多图片...
])
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
