import { mapGetters } from "vuex"
export default {
  computed:{
    ...mapGetters('m_cart',['total']),
  },
  watch:{
    total() {//解决徽标数字状态不实时刷新
      this.setBadge();
    }
  },
  onShow() {
    this.setBadge(); // 在页面刚展示的时候，调用此函数【设置数字徽标】
  },
  methods:{
    setBadge() { // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({ //badge：徽标
        index: 2, // tabbar的索引
        text: this.total + '' // 注意：text 的值必须是字符串，不能是数字【这里强制转换成字符串】
      })
    }
  }
}