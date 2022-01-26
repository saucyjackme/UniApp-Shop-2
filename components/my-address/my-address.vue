<template>
  <view>
    <!-- 选择收货地址的区域-->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 渲染收货信息区 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addStr}}</view>
      </view>
    </view>
    <!-- 底部边框线-->
    <img src="/static/cart_border@2x.png" class="address-border" alt="">
  </view>
</template>

<script>
  export default {
    name: "my-address",
    computed:{
      addStr() {
        if(!this.address.provinceName) return ''
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      }
    },
    data() {
      return {
        address: {
        }
      };
    },
    methods:{
      async chooseAddress() {// 选择收货地址
        const [err,succ] = await uni.chooseAddress().catch(err => err);//uni.chooseAddress返回值是一个Promise
        if(err === null && succ.errMsg === "chooseAddress:ok") {
          console.log(succ);
          this.address = succ;
        }
      }
    }
  }
</script>

<style lang="scss">
  .address-border {//收货区域底部边框分隔线
    display: block;
    width: 100%;
    height: 5px;
  }

  .address-choose-box {//选择收货地址
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .address-info-box {// 渲染收货信息的盒子
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;//纵向布局
    justify-content: center;//纵向居中对齐
    padding: 0 5px;//左右5px
      .row1 {
        display: flex;
        justify-content: space-between;
        .row1-left {
          .username {}
        }
        .row1-right {
          display: flex;
          justify-content: space-between;
          .phone {}
        }
      }
      .row2 {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .row2-left {
          white-space: nowrap;//文字不换行
        }
        .row2-right {}
      }
    }
</style>
