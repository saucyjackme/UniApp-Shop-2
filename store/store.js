//导入vue与vuex
import Vue from 'vue'
import Vuex from 'vuex'
//安装Vuex插件
Vue.use(Vuex);
//创建Store实例对象
const store = new Vuex.Store({
  //指定挂载的模块
  modules: {}
});
//向外共享store对象
export default store