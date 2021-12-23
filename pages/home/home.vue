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
        <view class="nav-item" v-for="(item,j) in navList" :key="j" @click="navClickHandler(item)">
          <navigator url="">
            <img :src="item.image_src" alt="" class="nav-img">
          </navigator>
        </view>
    </view>
	<!-- 导航楼层区域 -->
	  <view class="floor-list">
		  <!-- 每个楼层内容 -->
	    <view class="floor-item" v-for="(item,i) in floorList" :key="i">
			<!-- 楼层标题 -->
	      <img :src="item.floor_title.image_src" alt="" class="floor-title">
		  <!-- 楼层图片区域 -->
		  <view class="floor-img-box">
			  <!-- 左侧大图盒子 -->
			  <view class="left-img-box">
				  <img :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" alt="" mode="widthFix">
			  </view>
			  <!-- 右侧4个小图片盒子 -->
			  <view class="right-img-box">
				  <view class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0">
					  <img :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix" alt="">
				  </view>
			  </view>
		  </view>
	    </view>
	  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [], //轮播图数据
        navList: [], //导航栏数据
        floorList: [], //楼层数据
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
		// console.log(this.floorList);
      },
	  //点击跳转不同的分类页面
	  navClickHandler(item) {
		  if(item.name === "分类") {
			  uni.switchTab({
			  	url:"/pages/cate/cate"
			  })
		  }
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
 .floor-title {
	height: 60rpx;
	width: 100%;
	display: flex;
 }
 
 .right-img-box {
	 display: flex;
	 flex-wrap: wrap;
	 justify-content: space-around;
 }
 
 .floor-img-box {
	 display: flex;
	 padding-left: 10rpx;
 }
</style>
