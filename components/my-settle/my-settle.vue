<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio">
      <radio color="#C00000" :checked="isFullTotal" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计<text class="amount">￥123</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "my-settle",
    computed:{
      ...mapGetters('m_cart',['checkedCount','total']),
      isFullTotal() {
        return this.total === this.checkedCount
      }
    },
    data() {
      return {};
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    /* 底部固定定位 */
    bottom: 0;
    left: 0;
    width: 100%;
    /* 设置宽高和背景色 */
    height: 50px;
    background-color: white;
    font-size: 14px;
    padding-left: 5px;
  }

  .radio {
    display: flex;
    align-items: center;
  }

  .amount-box {
    .amount {
      color: #C00000;
      font-weight: bold;
    }
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
</style>
