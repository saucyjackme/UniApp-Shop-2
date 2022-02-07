<template>
  <view class="my-settle-container">
    结算组件
  </view>
</template>

<script>
  export default {
    name:"my-settle",
    data() {
      return {
      };
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;/* 底部固定定位 */
    bottom: 0;
    left: 0;
    width: 100%;     /* 设置宽高和背景色 */
    height: 50px;
    background-color: cyan;
  }
</style>
