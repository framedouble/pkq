import {
  getUserlist,
  getUsercount
} from '../../util/axios'
const state = {
  Userlist: [],
  size: 2,
  page: 1,
  total: 0,
}
const getters = {
  getUserlist() {
    return state.Userlist
  },
  getUsercount() {
    return state.total
  },
  getUsersize() {
    return state.size
  }

}
const mutations = {
  Reqlist(state, payload) {
    state.Userlist = payload;
  },
  reqcount(state, payload) {
    state.total = payload
  },
  reqpage(state, payload) {
    state.page = payload
  }
}
const actions = {
  //封装一个修改page的行动
  getPageAction(
    context,
    payload
  ) {

    context.commit('reqpage', payload), context.dispatch('getUserlistAction')
  },
  getUserlistAction(
    context
  ) {
    getUserlist({
      size: context.state.size,
      page: context.state.page
    }).then((res) => {
      console.log(context, '角色列表');
      if (res.data.code == 200) {
        context.commit('Reqlist', res.data.list);

      }
    })
  },
  getCountAction({
    commit
  }) {
    getUsercount().then(res => {
        console.log(res);
        commit('reqcount', res.data.list[0].total)
      })
  }
}
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
