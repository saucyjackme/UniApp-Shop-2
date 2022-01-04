<template>
  <view class="my-search-container" :style="{'background-color':bgColor}" @click="searchBoxHandler">
    <!-- 使用view组件模拟input输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius':radius + 'px'}">
      <!-- 使用uni提供的组件图标来制作搜索栏 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      //搜索栏背景颜色 
      bgColor:{
        type: String,
        default:"#C00000"
      },
      //搜索栏圆角
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchBoxHandler() {
        console.log('1111');
        this.$emit('myClick')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.my-search-box {
  height: 36px;
  background-color: #ffffff;
  border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>
