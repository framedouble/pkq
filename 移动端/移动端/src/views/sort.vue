<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-arrow class="nav">
      <template #right>
        <van-icon name="weapp-nav" size="18" color="#fff" />
      </template>
    </van-nav-bar>

    <div class="cateInfo">
      <!-- 左侧导航栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for='item in firstList' :key='item.id' :title="item.catename" />
      </van-sidebar>

      <!-- 二级分类宫格 循环二级商品分类 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item :to="'/goodsList?id='+item.id" v-for='item in secondList' :key='item.id'>
          <van-image :src="item.img ? $imgUrl+item.img :'https://img.yzcdn.cn/vant/apple-1.jpg'" />
          <span class="title">{{item.catename}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCateTree } from '../util/axios'
export default {
  data () {
    return {
      firstList: [],
      secondList: [],
      activeKey: 0
    };
  },
  mounted () {
    // 调取分类接口
    this.getCateTreeList();
  },
  methods: {
    // 封装一个切换侧边边栏的监听事件
    onChange (e) {
      console.log(this.activeKey, '事件源');
      console.log(e, 'e');
      console.log(this.firstList[e]);
      this.secondList = this.firstList[e].children
    },
    // 封装一个调取分类树的接口
    getCateTreeList () {
      getCateTree().then(res => {
        console.log(res, '分类树结构');
        if (res.code == 200) {
          this.firstList = res.list;
          this.secondList = res.list[this.activeKey].children
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
.cateInfo {
  display: flex;
}
.van-grid {
  flex: 1;
}
.title {
  font-size: 14px;
  margin-top: 15px;
}
.van-image{
  width: 1rem;
  height: 1rem;
  /* padding: 0; */
}
.van-grid-item {
  height: 50% !important;
}
</style>
