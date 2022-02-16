<template>
    <view class="my-userinfo-container">
      <!-- 头像昵称区域 -->
      <view class="top-box">
        <image src="" class="avatar"></image>
        <view class="nickname">xxx</view>
      </view>
    </view>
</template>

<script>
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;
    .top-box {
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      .avatar {
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid white;
        box-shadow: 0 1px 5px black;
      }
  
      .nickname {
        color: white;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
</style>
