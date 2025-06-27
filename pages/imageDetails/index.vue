<template>
  <view class="page-container" :style="bgStyle" @click="previewImage">
    <!-- 半透明遮罩，确保文字可读 -->
    <view class="overlay"></view>
    
    <!-- 页面内容 -->
    <view class="content">
      <text>这里是页面内容</text>
      <text>当前图片是: {{ isLandscape ? '横图' : '竖图' }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // bgImage: 'https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/uploads/1750843901823_pwNkJK0l2vAdc411b449c508f6ac40a4cf1fddd9f317.jpg',
      bgImage: 'https://mp-051db2f0-3127-4e50-bacf-ac94f022bbd7.cdn.bspapp.com/uploads/1750991603642_tmp_7ed1b828313b914532c421d5265acc8b227e0245728508a7.jpg',
      isLandscape: false,
      bgStyle: {}
    }
  },
  async onLoad() {
    await this.setBackground(this.bgImage);
  },
  methods: {
    async checkImageOrientation(imagePath) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: imagePath,
          success: (res) => {
            const orientation = res.width > res.height ? 'landscape' : 'portrait';
            resolve({ orientation });
          },
          fail: reject
        });
      });
    },
    
    async setBackground(imageUrl) {
      try {
        const info = await this.checkImageOrientation(imageUrl);
        this.isLandscape = info.orientation === 'landscape';
        
        this.bgStyle = {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: this.isLandscape ? '100% auto' : 'auto 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        };
      } catch (error) {
        console.error('设置背景失败:', error);
      }
    },
    
    previewImage() {
      uni.previewImage({
        urls: [this.bgImage],
        current: 0
      });
    }
  }
}
</script>

<style>
.page-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.content {
  position: relative;
  z-index: 1;
  color: #ffffff;
  padding: 20px;
}
</style>