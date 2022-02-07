export default {
  namespaced: true,//开启命名空间
  state:() => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),//4.读取本地的收货地址数据，初始化 address 对象[或有本地数据或为空对象]
  }),
  //方法
  mutations: {
    updateAddress(state, address) {//1.更新用户地址
      state.address = address;
      this.commit('m_user/saveAddressToStorage');//2.通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
    },
    saveAddressToStorage() {//3.将 address 持久化存储到本地 mutations 方法
      uni.setStorageSync('address', JSON.stringify(state.address));
    }
  },
  getters: {}
}