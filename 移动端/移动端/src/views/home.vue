<template>
  <div>
    <header class="headCon">
      <!-- logo -->
      <a href="#" class="logo"><img src="../assets/images/logo.jpg" alt="logo"></a>
      <!-- 搜索框 -->
      <input type="search" class="search" placeholder="寻找商品">
      <!-- 菜单··· -->
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- 顶部导航区 -->
    <van-tabs v-model="active" style="position:relative">
      <van-tab title="推荐"></van-tab>
      <van-tab title="女装"></van-tab>
      <van-tab title="鞋包"></van-tab>
      <van-tab title="居家"></van-tab>
      <van-tab title="儿童母婴"></van-tab>
      <van-tab title="美食"></van-tab>
      <van-tab title="水果"></van-tab>
    </van-tabs>
    <!-- 
        轮播图 
    autoplay	自动轮播间隔，单位为 ms  
    indicator-color	指示器颜色 
    vertical	是否为纵向滚动 
    -->
    <!-- 轮播图区 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="$imgUrl+item.img" alt="" class="img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格展示 -->
    <van-grid :border="false" :column-num="4">
      <van-grid-item :text="item.name" v-for="item in imgList" :key="item.id">
        <van-image :src="item.imgUrl" class="imgL" @click="goGoodsList(item.id==4)"/>
        <span class="gridTitle">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 限时秒杀 -->
    <div class="limitBuy">
      <div class="limitBuy-left">
        <img src="../assets/images/timer.jpg" alt="timer" class="timer">
        <span class="quickBuy">限时秒杀</span>
        <p>每天零点场&nbsp;，好货秒不断</p>
        <!-- 倒计时 -->
        <span>02</span><i>:</i>
        <span>16</span><i>:</i>
        <span>45</span>
        <span class="arrow">秒杀</span>

        <div class="posi">
          <img src="../assets/images/shop_5.jpg" alt="pic" class="pic">
          <span>&yen;14.8</span>
        </div>

      </div>
      <div class="limitBuy-right">
        <div class="right-top">
          <div class="topL">
            <span>品牌上新</span>
            <i>折</i>
            <p>每日9点&nbsp;&nbsp;抢大牌</p>
            <img src="../assets/images/brand.jpg" alt="">
          </div>
          <div class="topR">
            <img src="../assets/images/indexshop.jpg" alt="">
          </div>
        </div>
        <div class="right-bottom">
          <div class="bottom-left">
            <span>每日十件</span>
            <p>只为你选好货</p>
            <div class="img"><img src="../assets/images/indexship2.jpg" alt=""></div>
          </div>
          <div class="bottom-right">
            <span>拼啊</span>
            <p>超级好货拼团</p>
            <div class="img"><img src="../assets/images/shop_3.jpg" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 大图 -->
    <div class="bar">
      <img src="../assets/images/bar.jpg" alt="bar">
    </div>
    <!-- tab标签页 -->
    <van-tabs  type='card' class="tabs">
      <van-tab title="热门推荐">
        <van-card v-for="item in newsList" :key="item.id" :price="item.price.toFixed(2)" desc="描述信息" :title="item.goodsname" :thumb="item.img?$imgUrl+item.img:'https://img.yzcdn.cn/vant/ipad.jpeg'" @click="goDetail(item.id)"/>
      </van-tab>
      <van-tab title="发现新品"><van-card v-for="item in hotsList" :key="item.id" :price="item.price.toFixed(2)" desc="描述信息" :title="item.goodsname" :thumb="item.img?$imgUrl+item.img:'https://img.yzcdn.cn/vant/ipad.jpeg'" @click="goDetail(item.id)"/></van-tab>
      <van-tab title="全部商品"><van-card v-for="item in goodsList" :key="item.id" :price="item.price.toFixed(2)" desc="描述信息" :title="item.goodsname" :thumb="item.img?$imgUrl+item.img:'https://img.yzcdn.cn/vant/ipad.jpeg'" @click="goDetail(item.id)"/></van-tab>

    </van-tabs>

  </div>

</template>

<script>
import { getBanner, getIndexGoods } from '../util/axios'
import axios from "axios";

//调用轻提示
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { Toast } from "vant";
export default {
  data () {
    return {
      active: 0,
      bannerList: [],
      newsList: [],
      hotsList: [],
      goodsList: [],
      imgList: [
        {
          id: 1,
          name: "限时抢购",
          imgUrl: require('../assets/images/indexicon1.jpg')
        },
        {
          id: 2,
          name: "积分商城",
          imgUrl: require('../assets/images/indexicon2.jpg')
        },
        {
          id: 3,
          name: "联系我们",
          imgUrl: require('../assets/images/indexicon3.jpg')
        },
        {
          id: 4,
          name: "商品分类",
          imgUrl: require('../assets/images/indexicon4.jpg')
        },
      ],
    };
  },
  mounted () {
    // 组件一加载获取轮播图接口
    // 组件加载获取商品信息
    // 并发处理
    // import axios from 'axios'
    // axios.all([接口1，接口2...])
    // .then(axios.spread((响应1,响应2)=>{

    // }))
    // 并发处理
    axios.all([getBanner(), getIndexGoods()])
      .then(
        axios.spread((bannerList, indexGoods) => {
          console.log(bannerList, 'bannerList');
          console.log(indexGoods, 'indexGoods');
          if (bannerList.code == 200) {
            this.bannerList = bannerList.list;
          } else {
            Toast.fail(bannerList.msg)
          }
          if (indexGoods.code == 200) {
            this.newsList = indexGoods.list[0].content;
            console.log(this.newsList);
            this.hotsList = indexGoods.list[1].content;
            this.goodsList = indexGoods.list[2].content;
          } else {
            Toast.fail(indexGoods.msg)
          }
        })
      )
  },
  methods: {
    //封装一个跳转列表事件
    goGoodsList (id) {
      console.log(111);
      this.$router.push({
        path: '/sort',
        query: {
          id
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
/* 头部 */
.headCon .menu {
  width: 0.55rem;
  display: flex;
  justify-content: space-between;
}
.headCon .menu span {
  display: block;
  width: 0.12rem;
  height: 0.12rem;
  background-color: #000;
  border-radius: 50%;
}
.headCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.88rem;
  padding: 0 0.23rem;
  border-bottom: 1px solid #e4cad3;
  background-color: #fff;
  padding-top: 0.4rem;
}
.headCon .logo img {
  width: 1.5rem;
  height: auto;
}
.headCon .search {
  width: 3.04rem;
  height: 0.39rem;
  border-radius: 0.06rem;
  text-align: center;
  font: 0.18rem/0.39rem / "微软雅黑";
  background-color: #eee;
}
/* 轮播图 */
.img {
  width: 100%;
  /* 200px */
  height: 3.5rem;
}
/* 宫格区域 */
.gridTitle {
  margin-top: 10px;
  font-size: 15px;
}
.imgL {
  width: 65%;
  height: 65%;
}
.limitBuy {
  border-top: 0.27rem solid #ccc;
  border-bottom: 0.27rem solid #ccc;
  width: 100%;
  background-color: #fff;
  display: flex;
}
.limitBuy .limitBuy-left {
  padding: 0.2rem;
  height: 100%;
  width: 50%;
}
.limitBuy .limitBuy-left .timer {
  height: 0.31rem;
  width: auto;
  margin-right: 0.14rem;
}
.limitBuy .limitBuy-left .quickBuy {
  font-weight: 800;
  font-size: 0.3rem;
  color: #ff3179;
}
.limitBuy .limitBuy-left p {
  color: #656565;
  font-size: 0.22rem;
  margin: 0.1rem 0;
}
.limitBuy .limitBuy-left span:nth-of-type(2) {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background-color: #24242c;
  border-radius: 5px;
  color: #fff;
  line-height: 0.4rem;
  text-align: center;
}
.limitBuy .limitBuy-left span:nth-of-type(3) {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background-color: #24242c;
  border-radius: 5px;
  color: #fff;
  line-height: 0.4rem;
  text-align: center;
}
.limitBuy .limitBuy-left span:nth-of-type(4) {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background-color: #24242c;
  border-radius: 5px;
  color: #fff;
  line-height: 0.4rem;
  text-align: center;
}
.limitBuy .limitBuy-left i {
  display: inline-block;
  width: 0.1rem;
  height: 0.1rem;
  text-align: center;
  line-height: 0.4rem;
  vertical-align: top;
}
.limitBuy .limitBuy-left .arrow {
  position: relative;
  display: inline-block;
  width: 0.8rem;
  height: 0.4rem;
  background: url("../assets/images/bg.jpg") no-repeat right center;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.24rem;
  margin-left: 0.24rem;
  color: #000;
}
.limitBuy .limitBuy-left .posi {
  padding: 0.29rem 0.28rem 0 0.39rem;
  position: relative;
}
.limitBuy .limitBuy-left .posi .pic {
  width: 2.36rem;
  height: 2rem;
}
.limitBuy .limitBuy-left .posi span {
  line-height: 0.85rem;
  text-align: center;
  width: 0.85rem;
  height: 0.85rem;
  position: absolute;
  right: 0;
  bottom: -0.12rem;
  border-radius: 50%;
  font-size: 0.22rem;
  background-color: #ff3179;
  color: #fff;
}
.limitBuy .limitBuy-right {
  border-left: 1px solid #878787;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.limitBuy .limitBuy-right .right-top {
  height: 50%;
  width: 100%;
  display: flex;
  padding: 0.1rem;
  flex-direction: row;
}
.limitBuy .limitBuy-right .right-top .topL {
  width: 100%;
  height: 50%;
}
.limitBuy .limitBuy-right .right-top .topL span {
  padding-right: 0.1rem;
  font-size: 0.3rem;
  color: #fc5ba9;
  font-weight: 800;
}
.limitBuy .limitBuy-right .right-top .topL i {
  width: 0.33rem;
  height: 0.2rem;
  font-size: 0.17rem;
  vertical-align: middle;
  background-image: linear-gradient(to right, #ff0000 50%, #ff0080);
  color: #fff;
}
.limitBuy .limitBuy-right .right-top .topL p {
  font-size: 0.2rem;
  color: #b4b4b4;
  margin: 0.1rem 0;
}
.limitBuy .limitBuy-right .right-top .topL img {
  width: auto;
  height: 0.32rem;
  margin-top: 0.28rem;
}
.limitBuy .limitBuy-right .right-top .topR {
  width: 50%;
  height: 100%;
}
.limitBuy .limitBuy-right .right-top .topR img {
  width: auto;
  height: 1.78rem;
}
.limitBuy .limitBuy-right .right-bottom {
  height: 50%;
  width: 100%;
  display: flex;
  border-top: 1px solid #878787;
}
.limitBuy .limitBuy-right .right-bottom .bottom-left {
  padding: 0.15rem;
  height: 100%;
  width: 50%;
  border-right: 1px solid #878787;
}
.limitBuy .limitBuy-right .right-bottom .bottom-left span {
  font-weight: 800;
  font-size: 0.28rem;
  color: #fc5ba9;
}
.limitBuy .limitBuy-right .right-bottom .bottom-left p {
  font-size: 0.2rem;
  color: #b4b4b4;
  margin: 0.01rem 0;
}
.limitBuy .limitBuy-right .right-bottom .bottom-left .img {
  width: 100%;
  height: 100%;
  text-align: center;
}
.limitBuy .limitBuy-right .right-bottom .bottom-left img {
  padding-top: 0.1rem;
  width: 0.64rem;
  height: 1.02rem;
}
.limitBuy .limitBuy-right .right-bottom .bottom-right {
  padding: 0.15rem;
  width: 50%;
  height: 100%;
}
.limitBuy .limitBuy-right .right-bottom .bottom-right span {
  font-weight: 800;
  font-size: 0.28rem;
  color: #fc5ba9;
}
.limitBuy .limitBuy-right .right-bottom .bottom-right p {
  font-size: 0.2rem;
  color: #b4b4b4;
  margin: 0.01rem 0;
}
.limitBuy .limitBuy-right .right-bottom .bottom-right .img {
  width: 100%;
  height: 100%;
  text-align: center;
}
.limitBuy .limitBuy-right .right-bottom .bottom-right img {
  padding-top: 0.1rem;
  width: 0.88rem;
  height: 1.04rem;
}
.bar {
  width: 100%;
  height: 1.9rem;
  border-bottom: 0.27rem solid #ccc;
}
.bar img {
  width: 100%;
  height: 100%;
}
.tabs {
  width: 100%;
  padding-top: 0.27rem;
}
</style>