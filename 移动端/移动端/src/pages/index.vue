<template>
  <div class="info">
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 
        底部导航 
      active-color 被选中的颜色  
      inactive-color 默认颜色
      route	是否开启路由模式
      replace	是否在跳转时替换当前页面历史	
      不加replace默认是push
        -->
    <van-tabbar route v-model="active" active-color="#f26b11" inactive-color="#aaa">
      <van-tabbar-item to='/home' icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/sort' icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to='/cart' icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to='/mine' icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      active:0
    };
  },
};
</script>

<style  lang="" scoped>
.info{
  margin-bottom: 60px !important;
}
</style>
