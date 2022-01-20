<template>
  <view>
    <!-- 购物车标题区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 购物车商品信息 -->
    <view>
      <!-- 循环渲染购物车中的商品信息 -->
      <block v-for="(goods,i) in cart" :key="i">
        <my-goods :goods="goods" :show-radio="true"></my-goods>
      </block>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed:{
      ...mapState('m_cart',['cart']) // 将路径m_cart模块中的cart数组映射到当前页面
    },
    data() {
      return {  
      };
    },
  }
</script>

<style lang="scss">
  .cart-title{
    height: 40px;
    align-items: center;
    font-size: 14px;
    padding-left: 15px;
    display: flex;
    border-bottom: 1px solid #efefef;
    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
