//购物车store模块
//初始化vue模块
export default {
  //为当前模块开启命名空间
  namespaced: true,
  //模块的state的数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: [],
  }),
  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods) { //传入购物车和当前商品对象
      //判断是否是已有商品，将购物车state.cart中的每个item与goods中的商品id对比，如果相等，即数量+1；如不等，即push添加入购物车
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      // console.log(goods);
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id); //find找不到即返回undefined
      // console.log(findResult); //如果这里是新商品的话，则为undefined
      if (!findResult) { // !findResult = true findeResult = undefined
        state.cart.push(goods);
      } else {
        findResult.goods_count ++; //这里的findResult是旧的，即原state对象，但是需要count+1
      }
      // console.log(state.cart);
    },
    saveToStorage(state) {//将购物车中的数据持久化存储到本地
      uni.setStorageSync('cart', JSON.stringify(state.cart));//将对象存储化保存到本地
    }
  },
  // 模块的 getters 属性
  getters: {
    total(state) { //统计购物车中商品的总数
      let goodsCount = 0;
      state.cart.forEach(goods => goodsCount += goods.goods_count) // 循环统计商品的数量，累加到变量 goodsCount 中
      return goodsCount
    }
  },
}
