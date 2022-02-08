<template>
  <view class="cart-contatiner" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 购物车标题区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <!-- uni-swipe-action 是最外层包裹性质的容器 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"
            @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 商品价格数量结算区域 -->
    <my-settle class="my-settle"></my-settle>
  </view>
  <!-- 购物车为空时，显示页面 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart']) // 将路径m_cart模块中的cart数组映射到当前页面
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) { // 自定义事件默认不会被触发，所以需要radioClickHandler传递参数
        console.log(e); //这里获得商品信息，
        this.updateGoodsState(e);
      },
      numberChangeHandler(e) {
        console.log(e);
        this.updateGoodsCount(e);
      },
      swipeActionClickHandler(goods) { // 点击了滑动操作按钮,传入商品goods
        console.log(goods);
        this.removeGoodsById(goods.goods_id);
      }
    }
  }
</script>

<style lang="scss">
  .cart-contatiner {
    padding-bottom: 50px;
  }

  .cart-title {
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

  .my-settle {
    // z-index: 999;
  }
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img {
      width: 90px;
      height: 90px;
    }
    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
