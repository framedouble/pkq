import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
export default new Vuex.Store({
  modules: {
    // state: {
    //   userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    // }
    // , getters: {
    //   getUserInfo(state) {
    //     return state.userInfo
    //   }
    // },
    // mutations: {
    //   Changeuser(state, payload) {
    //     state.userInfo = payload;
    //     if (payload) {
    //       sessionStorage.getItem('userInfo', JSON.stringify(payload));
    //     } else {
    //       sessionStorage.removeItem('userInfo')
    //     }
    //   }
    // },
    // actions: {
    //   changeUserInfo({ commit }, payload) {
    //     commit('Changeuser', payload);
    //   }
    // },
    menu,
    role,
    user,
    cate,
    specs,
    goods,
    member,
    banner,
    seck
  }
})
