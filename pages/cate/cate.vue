<template>
  <view>
    <view class="scroll-view-container">
		<!-- 左侧滚动视图区域 -->
		<scroll-view class="left-scroll-view" scroll-y="true">
			<block v-for="(item, i) in cateList" :key="i">
				<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
			</block>
		</scroll-view>
		<!-- 右侧滚动视图区域 -->
		<scroll-view class="right-scroll-view" scroll-y="true">
			
		</scroll-view>
	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		  wh: 0, //当前设备可用高度
        cateList: [],
		active: 0 //默认激活项
      };
    },
	onLoad() {
		//获取分类列表数据
		this.getCateList()
	},
	methods:{
	  //获取分类列表数据
	  async getCateList() {
	    // 发起请求
	    const { data: res } = await uni.$http.get('/api/public/v1/categories');
	  		console.log(res);
	    // 判断是否获取失败
	    if (res.meta.status !== 200) return uni.$showMsg()
	    // 转存数据
	    this.cateList = res.message;
	  		},
	  activeChanged(i) {
		  this.active = i;
	  }
	}
  }
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
          content: ' ';
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
</style>
