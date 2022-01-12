<template>
  <view v-if="goods_Info.goods_name" class="goods-detail-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_Info.pics" :key="i" @click="imagePreview(i)">
        <img :src="item.pics_big" alt="">
      </swiper-item>
    </swiper>
    <!-- 信息商品区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="goods-price" v-if="goods_Info.goods_price">￥{{goods_Info.goods_price}}</view>
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_Info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="fav">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="express-fee">运费 : 免运费</view>
    </view>
    <rich-text :nodes="goods_Info.goods_introduce"></rich-text>
    <!-- 商品导航组件区域 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
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
        goods_Info: { //商品详情对象
        },
        options: [
          {
          icon: 'shop',
          text: '店铺',
          info: 2,
          infoBackgroundColor: '#ff0000',
          infoColor: "#fff"
          }, 
          {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      async getGoodsInfo(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        console.log(res);
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goods_Info = res.message // 为 data 中的数据赋值
      },
      imagePreview(i) {
        console.log('大图预览');
        uni.previewImage({
          current: i, //预览时默认显示当前图片索引
          loop: true, //是否循环预览
          urls: this.goods_Info.pics.map(x => x.pics_big) //map返回一个新数组
        })
      },
      // 点击事件处理
      onClick(e) {
        console.log(e);
        if(e.content.text === "购物车"){
          uni.switchTab({ // 注意跳转到tabbar页面 只能用switchTab
            url:'/pages/cart/cart'
          })
        }
      }
    }, //methods
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

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .goods-price {
      color: #C00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .fav {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: 3px solid #efefef;
        color: gray;
      }
    }

    .express-fee {
      font-size: 12px;
      margin: 10px 0;
      border-bottom: 2px solid #efefef;
    }
  }
  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .goods-detail-container {
    padding-bottom: 50px;
  }
</style>
