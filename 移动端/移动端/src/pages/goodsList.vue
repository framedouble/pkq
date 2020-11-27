<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-arrow class="nav">
      <template #right>
        <van-icon name="weapp-nav" size="18" color="#fff" />
      </template></van-nav-bar>
      <!-- 列表渲染 -->
      <van-list>
        <van-card tag="热卖" :price="item.price.toFixed(2)" desc="爆品" :title="item.goodsname" :thumb="item.img?$imgUrl+item.img:'https://img.yzcdn.cn/vant/ipad.jpeg'" :origin-price="item.market_price.toFixed(2)" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)"/>
      </van-list>

    
  </div>
</template>

<script>
import { getGoods } from '../util/axios'
export default {
  data () {
    return {
      goodsList: []
    };
  },
  mounted () {
    // 封装获取商品列表的接口
    this.getGoodsList();
  },
  methods: {
    // 封装获取商品列表的接口
    getGoodsList () {
      console.log(this.$route, 'this.$route');
      console.log(this.$router, 'this.$router');
      getGoods({
        fid: this.$route.query.id
      }).then(res => {
        console.log(res, '商品列表');
        if (res.code == 200) {
          this.goodsList = res.list;
        }
      })
    },
    //封装一个跳转详情事件
    goDetail (id) {
      console.log(111);
      this.$router.push({
        path: '/goodsDetail',
        query: {
          id
        }
      })
    }
  },
};
</script>

<style  lang="" scoped>
.nav {
  padding-top: 0.19rem;
  background-color: #f26b11;
}
.van-nav-bar__title {
  color: #fff !important;
}
.van-nav-bar .van-icon {
  color: #fff !important;
}
</style>
