<template>
  <view>
    GoodList
  </view>
</template>

<script>
  export default {
    data() {
      return {
         queryObj: {  // 请求参数对象
           query: '', // 查询关键词
           cid: '', // 商品分类Id
           pagenum: 1, // 页码值, 默认 请求第1页数据
           pagesize: 10 ,// 每页显示多少条数据
           },
        goodList: [],
        total: 0 //分页
      };
    },
    onLoad(options){
      console.log(options);
       // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || "";
      this.queryObj.cid = options.cid || "";
    },
    methods: {
      //获得商品列表数据
      getGoodsList() {
        console.log('...');
      }
    }
  }
</script>
  
<style lang="scss">

</style>
