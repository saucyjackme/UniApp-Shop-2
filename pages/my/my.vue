<template>
  <view>
    <my-login v-if="!token"></my-login> <!-- 用户未登录时，显示登录组件 -->
    <my-userinfo v-else></my-userinfo><!-- 用户登录后，显示用户信息组件 -->
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_user', ['token'])
    },
    data() {
      return {};
    }
  }
</script>

<style lang="scss">
  page,
  .my-container { //小程序都有page根标签
    height: 100%;
  }
</style>
