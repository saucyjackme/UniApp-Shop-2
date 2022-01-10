<template>
  <view>
    <view class="goods-list">
      <block v-for="(item, i) in goodsList" :key="i">
        <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
        <my-goods :goods="item"></my-goods>
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
        total: 0, //分页
        isLoading: false // 当前是否正在请求数据
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
        //打开节流阀
        this.isLoading = true;
        const result = uni.$http.get('/api/public/v1/goods/search', this.queryObj);
        console.log(result);
        //解构data属性重命名为res
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
        //关闭节流阀
        this.isLoading = false;
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods];
        this.total = res.message.total;
   
      }
    },
    onReachBottom() {
      //判断节流阀是否开启来确定上拉加载更多事件,判断是否正在请求其它数据，如果是，则不发起额外的请求，直接返回；如果不是【即没有正在请求数据】则开始自增
      if (this.isloading) return
      //触发时，让页码自增加1
      this.queryObj.pagenum += 1;
      // 重新获取列表数据
      this.getGoodsList()
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
        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  }
</style>
