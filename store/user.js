export default {
  namespaced: true,//开启命名空间
  state:() => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),//4.读取本地的收货地址数据，初始化 address 对象[或有本地数据或为空对象]
    token: '',//登录成功后的服务器下发的对应用户的token
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}') //用户基本信息
  }),
  //方法
  mutations: {
    updateAddress(state, address) {//1.更新用户地址
      state.address = address;
      this.commit('m_user/saveAddressToStorage');//2.通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
    },
    saveAddressToStorage(state) {//3.将 address 持久化存储到本地 mutations 方法
      uni.setStorageSync('address', JSON.stringify(state.address));//格式化右边存左边
    },
    updateUserInfo(state, userinfo) { //更新用户信息
      state.userinfo = userinfo;
      this.commit('m_user/saveUserInfoToStorage');
    },
    saveUserInfoToStorage(state) { //将userinfo持久化存储到本地 mutations方法
      uni.setStorageSync('useinfo', JSON.stringify(state.userinfo));
    }
  },
  getters: {
    addstr(state) { //目的：为了提高代码的复用性，可以把my-address组件中的addstr()地址抽离为 getters，多组件实现复用。
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}