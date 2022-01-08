<template>
  <view>
    <!-- 自定义搜索区域 -->
    <my-search :bgColor="'pink'" @myClick="goToSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滚动视图区域 -->
      <scroll-view
        class="left-scroll-view"
        scroll-y="true"
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, i) in cateList" :key="i">
          <view
            :class="['left-scroll-view-item', i === active ? 'active' : '']"
            @click="activeChanged(i)"
            >{{ item.cat_name }}</view
          >
        </block>
      </scroll-view>
      <!-- 右侧滚动视图区域 -->
      <scroll-view
        class="right-scroll-view"
        scroll-y="true"
        :style="{ height: wh + 'px' }"
      >
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-title">/{{ item2.cat_name }}/</view>
          <!-- 动态渲染三级分类 -->
          <view class="cate-lv3-list">
            <!-- 三级分类item项 -->
            <view
              class="cate-lv3-item"
              v-for="(item3, i3) in item2.children" 
              :key="i3"
              @click="goToGoodsItem(item3)"
            >
              <!-- 图片 -->
              <img :src="item3.cat_icon" alt="" />
              <!-- 文本 -->
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0, //窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
      cateList: [], //一级分类
      cateLevel2: [], //二级分类
      active: 0, //默认激活项
    };
  },
  onLoad() {
    //获取当前设备接口信息
    const systemInfo = uni.getSystemInfoSync();
    console.log(systemInfo);
    // this.wh = systemInfo.screenHeight;
    this.wh = systemInfo.windowHeight;
    //获取分类列表数据
    this.getCateList();
  },
  methods: {
    //获取分类列表数据
    async getCateList() {
      // 发起请求
      const { data: res } = await uni.$http.get("/api/public/v1/categories");
      console.log(res);
      // 判断是否获取失败
      if (res.meta.status !== 200) return uni.$showMsg();
      // 转存数据
      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
    },
    //给二级菜单赋值
    activeChanged(i) {
      this.active = i;
      //为二级菜单分类赋值
      this.cateLevel2 = this.cateList[i].children;
    },
    //在三级菜单中跳转至每个商品页
    goToGoodsItem(item) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?cid=' + item.catid
      })
    },
    //搜索栏跳转
    goToSearch() {
      console.log('ssssssss');
      uni.navigateTo({
        url:'/subpkg/search/search'
      })
    }
  },
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}

.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>