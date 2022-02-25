// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器：请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  });
  if (options.url.indexOf('/my/') !== -1) {  // 判断请求的是否为有权限的 API 接口
    options.header = { // 为请求头添加身份认证字段
      Authorization: store.state.m_user.token, // 字段的值可以直接从 vuex 中进行获取
    }
  }
}

// 响应拦截器：请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}
//封装$uni.showMsg方法
uni.$showMsg = function(title = "数据请求失败", duration = 2500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store //挂载store对象
})
app.$mount()
// #endif

// #ifdef VUE3 
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
