<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "my-settle",
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
      isFullChecked() {
        return this.total === this.checkedCount
      }
    },
    data() {
      return {};
    },
    methods:{
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      changeAllState() {//点击实现全选和反选
        // console.log(!this.isFullChecked);
        this.updateAllGoodsState(!this.isFullChecked);
      }
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
