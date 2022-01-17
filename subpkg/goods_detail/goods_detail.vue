<template>
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i" @click="imagePreview(i)">
        <img :src="item.pics_big" alt="">
      </swiper-item>
    </swiper>
    <!-- 信息商品区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="goods-price" v-if="goods_info.goods_price">￥{{goods_Info.goods_price}}</view>
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="fav">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="express-fee">运费 : 免运费</view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航组件区域 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>
<script>
  //导入vuex中的store
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    onLoad(options) {
      const goods_id = options.goods_id;
      //调用获取商品详情函数
      this.getGoodsInfo(goods_id);
    },
    watch: {
      total(newVal) { //1.监听属性值的变化
        const findResult = this.options.find(x => x.text === "购物车"); //2.找到相应属性
        if (findResult) {
          findResult.info = newVal; // 3. 动态为购物车按钮的 info 属性赋值
        }
      }
    },
    computed: {
      ...mapState('m_cart', []), //访问m_cart模块中的成员，以数组形式声明
      ...mapGetters('m_cart', ['total']), //把 m_cart 模块中的 total 方法映射到当前页面使用
    },
    data() {
      return {
        goods_info: {},//商品详情对象
        options: [{
            icon: 'shop',
            text: '店铺',
            info: 0,
            infoBackgroundColor: '#ff0000',
            infoColor: "#fff"
          },
          {
            icon: 'cart',
            text: '购物车',
            info: 0
          }
        ],
        buttonGroup: [{
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
      ...mapMutations('m_cart', ['addToCart']),//把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      async getGoodsInfo(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        console.log(res);
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goods_info = res.message // 为 data 中的数据赋值
      },
      imagePreview(i) {
        console.log('大图预览');
        uni.previewImage({
          current: i, //预览时默认显示当前图片索引
          loop: true, //是否循环预览
          urls: this.goods_info.pics.map(x => x.pics_big) //map返回一个新数组
        })
      },
      onClick(e) { //点击进入购物车界面
        if (e.content.text === "购物车") { //购物车页面跳转
          uni.switchTab({ // 注意跳转到tabbar页面 只能用switchTab
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) { //加入购物车功能
        if (e.content.text === '加入购物车') { //// 1. 判断是否点击了 加入购物车 按钮
          const goods = { // 2. 组织一个商品的信息对象
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          };
          console.log(goods);
          // this.test();
          this.addToCart(goods); // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
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
