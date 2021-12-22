<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <img :src="item.image_src" alt="">
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
        <view class="nav-item" v-for="(item,j) in navList" :key="j" >
          <navigator url="">
            <img :src="item.image_src" alt="" class="nav-img">
          </navigator>
        </view>
    </view>
  </view>
  <!-- 导航楼层区域 -->
    <view class="floor-list">
      <view class="floor-item">
        <img src="" alt="">
      </view>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      //调用方法，获取轮播图数据
      this.getSwiperList()
      //获取首页分类模块信息
      this.getNavList()
      //获取产品楼层信息
      this.getFloorList()
    },
    methods:{
      async getSwiperList() {
        const {data : res} = await uni.$http.get("/api/public/v1/home/swiperdata")
        // console.log(res);
        //请求失败处理
        if(res.meta.status !== 200) return uni.$showMsg();
        this.swiperList = res.message;
      },
     async getNavList() {
        const {data : res} = await uni.$http.get("/api/public/v1/home/catitems")
        // console.log(res);
        if(res.meta.status !== 200) return uni.$showMsg();
        this.navList = res.message;
      },
      async getFloorList() {
        const {data : res} = await uni.$http.get("/api/public/v1/home/floordata");
        console.log(res);
        if(res.meta.status !== 200) return uni.$showMsg();
        this.floorList = res.message;
      }
    }
  }
</script>

<style lang="scss">
 swiper {
   height: 330rpx;
   .swiper-item,
   image {
     width: 100%;
     height: 100%;
   }
 }
 
 .nav-list {
   display: flex;
   justify-content: space-around;
   margin: 15rpx 0;
   .nav-img {
     width: 128rpx;
     height: 140rpx;
   }
 }
</style>
