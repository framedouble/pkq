import {
  getRolelist
} from '../../util/axios'
const state = {
  rolelist: []
}
const getters = {
  getRolelist() {
    return state.rolelist
  }
}
const mutations = {
  Reqlist(state, payload) {
    state.rolelist = payload;
  }
}
const actions = {
  getRolelistAction({
    commit
  }) {
    getRolelist().then(res => {
      //   console.log(res, '角色列表');
      if (res.data.code == 200) {
        commit('Reqlist', res.data.list);
      }
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
