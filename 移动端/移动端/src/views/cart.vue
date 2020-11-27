<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-arrow class="nav">
      <template #right>
        <van-icon name="weapp-nav" size="18" color="#fff" />
      </template>
    </van-nav-bar>

    <div class="cart" v-if="cartList.length > 0 && userInfo">
      <van-checkbox-group v-model="result">
        <div v-for="(item,index) in cartList" :key="index" class="cartInfo">
          <!-- 单个item的选中 -->
          <van-checkbox :name="item.id" ref="checkboxes" @click="toggle(index, item.id)"></van-checkbox>
         
          <van-swipe-cell>
            <van-card :num="item.num" :price="item.price.toFixed(2)" desc="描述信息" :title="item.goodsname" class="goods-card" :thumb="item.img? $imgUrl + item.img: 'https://img.yzcdn.cn/vant/cat.jpeg'">
              <template #footer>
                <div>
                  <van-stepper v-model="value[item.id]" theme="round" button-size="22" disable-input  ref='num' integer @change='countChange(item.id, index)' />
                </div>
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="shiftIt(item.id,index)" />
            </template>
          </van-swipe-cell>
        </div>
        </van-checkbox-group>
      

      <van-submit-bar :price="$store.getters.getAllSum" button-text="提交订单" @submit="goOrder" v-if="cartList.length>0&& userInfo">
        <van-checkbox v-model="allCheck" @change="onAllselect">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <div v-else-if="cartList.length == 0 && userInfo">
      <van-empty description="购物车空空如也，快去买买买！！！" />
    </div>
    <div v-else>
      <van-button @click="$router.push('/login')" type="warning">请先登录，再查看</van-button>
    </div>
  </div>

</template>



       


     
    
    

<script>
import { cartList, cartDelete } from '../util/axios'
export default {
  data () {
    return {
      id: this.$store.getters.getAllId,
      value: this.$store.getters.getIdCount,
      // checkboxGroup: [],
       result: [],
      goodsNum: 1,
      cartList: [],
      userInfo:'',
      allCheck: false,
    };
  },
   created() {
     this.userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : "";
    // 组件加载调取购物车
    this.cartListInfo();
    // 先遍历选择状态
    this.selected()
  },

  watch: {
    cartList(val){
      this.selected(val)
    },
    result(val) {
      console.log(val);
      if (val.length === this.cartList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    
  },

  methods: {
     // 商品列表复选框切换状态函数
    toggle(i,id) {
      console.log(i,'i');
      // console.log(this.$refs.checkboxes[i],'this.$refs.checkboxes[id]');
      console.log(11111);

      this.$refs.checkboxes[i].toggle();
      console.log(11111);
      let obj = {
        id,
        flag: !this.$store.getters.getAllFlag[id]
      };
      this.$store.commit("updateFlag", obj);
      console.log(this.$store.commit("updateFlag", obj),'this.$store.commit("updateFlag")');
    },
    // 删除商品函数
    shiftIt(id, i) {
      this.cartList.splice(i, 1)
      this.$store.commit("shiftgoods", id);
      if (this.cartList.length === 0) {
        this.checked = false
      }
    },

    // 封装获取列表接口
    cartListInfo () {
      cartList({
        uid: this.$route.query.id
      }).then(res => {
        console.log(res, '购物车列表');
        if (res.code == 200) {
          this.cartList = res.list;
        }
      })
    },
   
    // 点击全选
    onAllselect() {
      if (this.allCheck && this.cartList.length) {
        this.cartList.forEach(item => {
          this.result.push(item.id)
          console.log(this.result);
        });
      } else {
        this.result = [];
      }
    },
    // 遍历购物车商品是否为选中状态
    selected(){
      let obj = this.$store.getters.getAllFlag;
      this.result = [];
      for (const key in obj) {
        if (obj[key] ) {
          this.result.push(key * 1)
        }
      }
    },
    // 当数值发生改变时触发
    countChange(id, i){
      let obj = {
        id,
        count: this.$refs.num[i].value
      };
      this.$store.commit('updateCount', obj)
    },

    // 提交订单页
    goOrder () { },

    // delCar (id) {
    //   cartDelete(id).then(res => {
    //     console.log(res, '购物车列表');
    //     if (res.code == 200) {
    //       this.cartList()
    //     }
    //   })
    // },



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
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
.cartInfo {
  display: flex;
  /* position: relativ;; */
}
.van-swipe-cell {
  flex: 1;
}
.van-checkbox {
  /* padding-left: 15px; */
  width: 20px;
}
.van-stepper {
  width: 80px;
  display: inline-block !important;
  position: absolute;
  bottom: 10px;
  left: 240px;
}
.van-card {
  position: relative;
}
</style>
