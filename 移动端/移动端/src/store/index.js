import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import {Checkbox,CheckboxGroup} from 'vant';
import {SubmitBar} from 'vant';
let userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]')
export default new Vuex.Store({
  state: {
    userInfo
  },
  getters: {
    // 获取总数量
    getAllCount (state) {
      let sum = 0;
      state.userInfo.forEach(item => {
        sum += item.count
      });
      return sum
    },
    // 获取id字符串
    getAllId (state) {
      let id = [];
      state.userInfo.forEach(item => {
        id.push(item.id)
      });
      return id.join(',')
    },
    // 获取每个id对应的数量
    getIdCount (state) {
      let obj = {};
      state.userInfo.forEach(item => {
        obj[item.id] = item.count
      });
      return obj
    },
    // 获取每个id对应的状态
    getAllFlag (state) {
      let obj = {};
      state.userInfo.forEach(item => {
        obj[item.id] = item.flag
      });
      return obj
    },
    // 获取总价格
    getAllSum (state) {
      let price = 0;
      state.userInfo.forEach(item => {
        if (item.flag) {
          price += (item.count * item.price);
        }
      });
      return price * 100
    }
  },
  mutations: {
    addTocart (state, shopinfo) {
      // 先设定一个开关，判断传过来的商品是否在car存在
      let flag = false;

      // 用一个some函数来判断
      state.userInfo.some(item => {
        if (item.id == shopinfo.id) {
          item.count += shopinfo.count;
          item.count = Math.min(item.count, item.maxCount);
          flag = true;
          return true;
        }
      })
      if (!flag) {
        state.userInfo.push(shopinfo)
      }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 删除商品
    shiftgoods (state, id) {
      state.userInfo.some((item, index) => {
        if (item.id == id) {
          state.userInfo.splice(index, 1);
          return true
        }
      });
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新数量
    updateCount (state, obj) {
      state.userInfo.some(item => {
        if (item.id == obj.id) {
          item.count = obj.count
          return true
        }
      })
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新选中的状态
    updateFlag (state, obj) {
      state.userInfo.some(item => {
        if (item.id == obj.id) {
          item.flag = obj.flag
          return true
        }
      })
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  actions: {},
  modules: {}
})
