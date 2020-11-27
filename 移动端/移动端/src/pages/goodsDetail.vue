<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-arrow class="nav">
      <template #right>
        <van-icon name="weapp-nav" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 商品详情渲染 -->
    <div class="goods" v-if="goodsInfo">
      <img class="goodsImg" :src="
          goodsInfo.img
            ? $imgUrl + goodsInfo.img
            : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2813350528,1657210790&fm=11&gp=0.jpg'
        " alt="" />
      <div class="one">
        <p class="goodsName">商品名称：{{ goodsInfo.goodsname }}</p>
        <p class="goodsPrice">￥{{ goodsInfo.price.toFixed(2) }}</p>
      </div>
      <p class="zhe">促销：<span>满减</span>满两件9折；三件8折</p>
      <p class="goodsNum">
        <!-- 计步器 -->
        购买数量：
        <van-stepper v-model="value" />
      </p>
      <p class="specs">商品属性
        <span style="display: block">{{ goodsInfo.specsname }}：</span>
        <van-tag v-for="item in specsAttr" :key="item" type="success">{{
          item
        }}</van-tag>
      </p>
      <div class="desc">
        <p>商品详情</p>
        <p v-html="goodsInfo.description"></p>
      </div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" @click="goCart" text="购物车" />
      <van-goods-action-button @click="goCart" type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" @click="goCart"/>
    </van-goods-action>

    <!--  -->
  </div>
</template>

<script>
import {Toast} from 'vant'
import { getGoodsInfo, cartAdd } from '../util/axios'
export default {
  data () {
    return {
      goodsInfo: "",
      value: 1,
      specsAttr: [],
    };
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    // 封装获取详情事件
    getInfo () {
      console.log(this.$route, 'this.$route');
      console.log(this.$router, 'this.$router');
      getGoodsInfo({
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.goodsInfo = res.list[0];
          this.specsAttr = this.goodsInfo.specsattr ? this.goodsInfo.specsattr.split(',') : [];
          console.log(this.goodsInfo, 'this.goodsInfo');
        }
      })
    },

    // 封装一个加入购物车事件
    goCart () {
      if (sessionStorage.getItem("userInfo")) {
        // 已登录，调取加入购物车接口，并跳转到购物车列表
        cartAdd({
          uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
          goodsid: this.goodsInfo.id,
          num: this.value
        }).then(res => {
          Toast.success(res,res.msg)
          this.$router.push({
            path: '/cart',
            query: {
              id: JSON.parse(sessionStorage.getItem('userInfo')).uid
            }
          })
        })
      } else {
        Toast.fail('当前未登录，请先登录')
        this.$router.push('/login')
      }
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
.goodsImg {
  width: 100%;
  height: 4rem;
}
.goods p {
  font-size: 18px;
  padding-left: 20px;
}
.van-stepper {
  display: inline;
}
.goodsName {
  font-size: 23px !important;
  line-height: 40px;
  height: 40px;
  font-weight: 500;
}
.goodsPrice {
  font-size: 25px !important;
  line-height: 30px;
  height: 30px;
  font-weight: 550;
  color: red;
}
.one {
  width: 100%;
  height: 70px;
  line-height: 200px;
  border-bottom: 12px solid #eee;
}
.zhe {
  border-bottom: 2px solid #eee;
  height: 50px;
  line-height: 50px;
}
.zhe span {
  border: 1px solid red;
  border-radius: 6px;
  color: red;
  margin: 0px 7px 0px 7px;
}
.goodsNum {
  line-height: 50px;
  height: 50px;
  border-bottom: 2px solid #eee;
}
.van-stepper {
  margin-left: 140px;
}
.van-tag {
  display: inline-block;
}
.specs {
  padding: 10px 0px 10px 0px;
  height: 85px;
  /* line-height: 100px; */
  font-size: 20px !important;
  border-bottom: 10px solid #eee;
}
.specs span {
  height: 30px;
  line-height: 30px;
}
.van-tag {
  /* height: 30px; */
  width: 60px;
  margin-right: 15px;
  text-align: center;
}
.desc {
  padding: 10px 0px;
  height: 200px;
  border: 1px solid #f26b11;
}
.desc p {
  font-size: 24px !important;
  color: greenyellow;
}
</style>
