//导入vue与vuex
import Vue from 'vue'
import Vuex from 'vuex'
//用moduleCart变量来接收导出的cart对象
import moduleCart from './cart.js'
//用moduleUser变量来接收导出的user对象
import moduleUser from './user.js'

//安装Vuex插件
Vue.use(Vuex);
//创建Store实例对象
const store = new Vuex.Store({
  //指定挂载的模块
  modules: {
    'm_cart': moduleCart, //声明节点m_cart 指向购物车模块moduleCart
    'm_user': moduleUser, //声明节点m_user 指向购物车模块moduleUser
  }
});
//向外共享store对象
export default store