<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']), //购物车组件
      ...mapGetters('m_user', ['addstr', 'updateRedirectInfo']), //用户信息组件
      ...mapState('m_user', ['token']), //登录成功后服务下发的对应用户token
      isFullChecked() {
        return this.total === this.checkedCount
      }
    },
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      changeAllState() { //点击实现全选和反选
        // console.log(!this.isFullChecked);
        this.updateAllGoodsState(!this.isFullChecked);
      },
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！') // 1. 先判断是否勾选了要结算的商品
        if (!this.addstr) return uni.$showMsg('请选择收货地址！') // 2. 再判断用户是否选择了收货地址
        if (!this.token) return this.delayNavigate() // 3. 最后判断用户是否登录了，未登录跳转至登录界面【并添加倒计时弹窗效果】
        this.payOrder(); //4.调用微信支付
      },
     async payOrder() { //组织订单对象并调用支付
        //1.1组织订单信息对象
        const orderInfo = { 
          // 开发期间，注释掉真实的订单价格，
          // order_price: this.checkedGoodsAmount,
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
              goods_id: x.goods_id,
              goods_number: x.goods_count,
              goods_price: x.goods_price}))
        };
          // 1.2 发起请求创建订单
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败!')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number;
         // 2. 订单预支付
          // 2.1 发起请求获取订单的支付信息
        const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber });
        // 2.2 预付订单生成失败
        if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
        // 2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay;
        // 3. 发起微信支付
        // 3.1 调用 uni.requestPayment() 发起微信支付
        const [err, succ] = await uni.requestPayment(payInfo);
        // 3.2 未完成支付
        if (err) return uni.$showMsg('订单未支付!')
        // 3.3 完成了支付，进一步查询支付的结果
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber });
        // 3.4 检测到订单未支付
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付!')
        // 3.5 检测到订单支付完成
        uni.showToast({
             title: '支付完成!',
             icon: 'success',
             });
      },
      showTips(n) {
        uni.showToast({ //调用uni.showToast方法展示提示消息
          icon: 'none',
          title: '请登录后再结算！' + n + '秒后自动跳转至登录界面',
          mask: true, //为页面添加透明遮罩，防止点击穿透
          duration: 1500
        })
      },
      delayNavigate() { //延迟跳转至my页面
        this.seconds = 3; //重置seconds为3，解决跳转页面返回后不能重置秒数问题
        this.showTips(this.seconds); //展示弹窗
        this.timer = setInterval(() => {
          this.seconds--; //秒数自减
          if (this.seconds <= 0) { //秒数为0时清除定时器，并跳转，然后返回函数
            clearInterval(this.timer)
            uni.switchTab({ //跳转至my页面
              url: '/pages/my/my',
              success: () => { //跳转成功后的回调函数
                this.updateRedirectInfo({ //调用updateRedirectInfo存储到Store中
                  openType: 'switchTab', //跳转的方式
                  from: '/pages/cart/cart' //从哪个页面跳转过去的
                })
              }
            });
            return
          };
          this.showTips(this.seconds); //未归0时展示倒计时
        }, 1000);
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    /* 底部固定定位 */
    bottom: 0;
    left: 0;
    width: 100%;
    /* 设置宽高和背景色 */
    height: 50px;
    background-color: white;
    font-size: 14px;
    padding-left: 5px;
  }

  .radio {
    display: flex;
    align-items: center;
  }

  .amount-box {
    .amount {
      color: #C00000;
      font-weight: bold;
    }
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
</style>
