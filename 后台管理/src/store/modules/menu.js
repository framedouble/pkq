import {
  getMenuList
} from '../../util/axios'
const state = {
  menuList: []
}
const getters = {
  //封装一个state菜单列表

  getMenuList(state) {
    return state.menuList;
  }
}

const mutations = {
  //修改state列表
  reqcok(state, payload) {
    state.menuList = payload;
  }
}

const actions = {
  // 获取菜单列表
  getMenuListAction({commit}) {
    getMenuList({
      istree: true
    }).then((res) => {
      if (res.data.code == 200) {
        commit('reqcok', res.data.list)
      }
    }).catch(err => {
      {
        console.log(err);
      }
    })
  }
}
export default {
  state,
  mutations,
  actions,
  getters,

  namespaced: true
}
