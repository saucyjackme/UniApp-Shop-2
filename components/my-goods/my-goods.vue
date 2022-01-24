<template>
 <view class="goods-item">
   <!-- 商品左侧图片区域 -->
   <view class="goods-item-left">
     <radio :checked="goods.goods_state" color="#C00009" v-if="showRadio" @click="radioClickHandler"></radio>
     <img :src="goods.goods_small_logo || defaultPic" class="goods-pic">
   </view>
   <!-- 商品右侧区域 -->
   <view class="goods-item-right">
     <!-- 商品标题 -->
     <view class="goods-name">{{goods.goods_name}}</view>
     <view class="goods-info-box">
       <!-- 商品价格 -->
       <view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
       <!-- 商品数量 -->
       <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
     </view>
   </view>
 </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false //默认不显示勾选按钮
      },
      showNum: {
        type: Boolean,
        default: false //默认不显示购物车数字按钮
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters:{
      toFixed(price) {
        return Number(price).toFixed(2)
      }
    },
    methods:{
      radioClickHandler() {
        console.log(this.goods.goods_state); // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        this.$emit('radio-change',{ // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) { //获得本组件中的变化值
        console.log(val);
        this.$emit('num-change',{
          goods_id: this.goods.goods_id,
          goods_count: + val
        })
      }
    },
  }
</script>

<style lang="scss">
.goods-item {
   display: flex;
   padding: 10px 5px;
   border-bottom: 1px solid #F0F0F0;
   .goods-item-left {
     display: flex;
     align-items: center;
     justify-content: space-between;
     margin-right: 5px;
     .goods-pic {
       width: 100px;
       height: 100px;
       display: block;
     }
   }
   .goods-item-right {
     display: flex;
     flex: 1;
     flex-direction: column;
     justify-content: space-between;
     .goods-name {
       font-size: 13px;
     }
     .goods-info-box {
       display: flex;
       justify-content: space-between;
       align-items: center;
       .goods-price{
         font-size: 16px;
         color: #c00000;
       }
     }
   }
 }
</style>
