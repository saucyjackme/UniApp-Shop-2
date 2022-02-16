<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  export default {
    name: "my-login",
    data() {
      return {};
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updateToken']),
      getUserProfile() { //用户授权之后，获取用户基本信息
        console.log('获取用户信息');
        uni.getUserProfile({
          desc: '获取用户信息',
          success: res => {
            console.log(res);
            this.updateUserInfo(res); //存储用户信息
            this.getToken(res); // 获取登录成功后的 Token 字符串
          },
          fail: err => {
            console.log(err);
            if (err.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('登录失败!')
          }
        });
      },
      getToken(info) { //调用接口，换取永久的token
        uni.login({
          provider: 'weixin',
          success:async res => {
            console.log('调用接口1');
            console.log(info);
            console.log('调用接口2');
            console.log(res);
            console.log(res.code);
            const query = { //准备参数对象
              code: res.code,//
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            };
            console.log(query);
            const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
            console.log(loginResult);
            this.updateToken(loginResult.message.token);//更新token到vuex
            uni.$showMsg('登录成功');
          },
          fail(err) {
            return uni.$showMsg('登录失败')
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
