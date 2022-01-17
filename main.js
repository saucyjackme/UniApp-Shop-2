
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器：请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 响应拦截器：请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
//封装$uni.showMsg方法
uni.$showMsg = function(title = "数据请求失败", duration = 2500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
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
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif