<template>
  <view>
    <!-- 搜索框 -->
    <view class="my-search-box">
      <uni-search-bar placeholder="请输入搜索内容" :radius="100" @confirm="search" @input="input" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表-->
    <view class="suggest-list">
      <view class="suggest-item" v-for="(item,i) in searchResults" :key="i" @click="goToGoodsDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史区域 -->
    <view class="history">
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icon type="trash" size="17"></uni-icon>
      </view>
      <!-- 列表区域 -->
      <view v-for="(item,i) in historyList" :key="i">
        {{item}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        keyword: "", //搜索关键词
        searchResults: [], //推荐搜索
        historyList: ['a', 'app', 'apple'], //自定义搜索历史关键词
      };
    },
    methods:{
      //处理搜索栏输入
      input(e) {
        //input框防抖处理搜索框输入
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.keyword = e;
          this.getSearchResult();
          console.log(this.keyword);
        },800)
      },
      //获取搜索建议
     async getSearchResult() {
        //判断关键词是否为空
        if(this.keyword.length === 0) {
          //如果关键词为空也要将搜索结果置空
          this.searchResults = [];
           return
        }else {
         const {data : res} = await uni.$http.get('/api/public/v1/goods/qsearch',{
            query: this.keyword
          });
          if(res.meta.status !== 200) return uni.$showMsg();
          this.searchResults = res.message;
        }
      },
      //跳转至搜索建议的商品页
      goToGoodsDetail(item) {
        console.log(item.goods_id);
        uni.navigateTo({
          //跳转至分包的界面再渲染
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    }, //methods
  }
</script>

<style lang="scss">
 .my-search-box {
   position: sticky; // 设置定位效果为“吸顶”
   top: 0;
   z-index: 999; // 提高层级，防止被轮播图覆盖
 }
 
 .suggest-list {
   padding: 0 5px;
   .suggest-item {
     display: flex;
     align-items: center;
     justify-content: space-between;
     font-size: 12;
     padding: 13px 0;
     border: 1px solid #efefef;
     .goods-name {
       white-space: nowrap; //不允许文字换行（单行文本）
       overflow: hidden; //溢出部分内容隐藏
       text-overflow: ellipsis; // 文本溢出后，使用 ... 代替
       margin-right: 3px;
     }
   }
 }
 
</style>
