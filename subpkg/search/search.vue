<template>
  <view>
    <view class="my-search-box">
      <uni-search-bar placeholder="请输入搜索内容" :radius="100" @confirm="search" @input="input" cancelButton="none"></uni-search-bar>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
 .my-search-box {
   position: sticky; // 设置定位效果为“吸顶”
   top: 0;
   z-index: 999; // 提高层级，防止被轮播图覆盖
 }
</style>
