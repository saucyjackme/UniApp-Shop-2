<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods,i) in goodsList" :key="i">
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
              <view class="goods-price">￥{{goods.goods_price}}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: { // 请求参数对象
          query: '', // 查询关键词
          cid: '', // 商品分类Id
          pagenum: 1, // 页码值, 默认 请求第1页数据
          pagesize: 10, // 每页显示多少条数据
        },
        goodsList: [],
        total: 0 ,//分页
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'// 默认的空图片
      };
    },
    onLoad(options) {
      // console.log(options);
      //  // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || "";
      this.queryObj.cid = options.cid || "";
      this.getGoodsList();
    },
    methods: {
      //获得商品列表数据
      async getGoodsList() {
        const result = uni.$http.get('/api/public/v1/goods/search', this.queryObj);
        console.log(result);
        //解构data属性重命名为res
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = res.message.goods;
        this.total = res.message.total;
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
