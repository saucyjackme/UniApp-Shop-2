<template>
 <view class="goods-item">
   <!-- 商品左侧图片区域 -->
   <view class="goods-item-left">
     <img :src="goods.goods_small_logo || defaultPic" class="goods-pic">
   </view>
   <!-- 商品右侧区域 -->
   <view class="goods-item-right">
     <!-- 商品标题 -->
     <view class="goods-name">{{goods.goods_name}}</view>
     <view class="goods-info-box">
       <!-- 商品价格 -->
       <view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
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
    }
  }
</script>

<style lang="scss">
.goods-item {
   display: flex;
   padding: 10px 5px;
   border-bottom: 1px solid #F0F0F0;
   .goods-item-left {
     margin-right: 5px;
     .goods-pic {
       width: 100px;
       height: 100px;
       display: block;
     }
   }
   .goods-item-right {
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     .goods-name {
       font-size: 13px;
     }
     .goods-info-box {
       .goods-price{
         font-size: 16px;
         color: #c00000;
       }
     }
   }
 }
</style>
