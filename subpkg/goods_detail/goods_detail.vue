<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_Info.pics" :key="i">
        <img :src="item.pics_big" alt="">
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
  export default {
    onLoad(options) {
      const goods_id = options.goods_id;
      //调用获取商品详情函数
      this.getGoodsInfo(goods_id);
    },
    data() {
      return {
        goods_Info:{ //商品详情对象
        }
      };
    },
    methods:{
      async getGoodsInfo(goods_id) {
        const {data : res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        console.log(res);
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goods_Info = res.message // 为 data 中的数据赋值
      }
    },//methods
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>
