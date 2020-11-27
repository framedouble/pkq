//引入封装好的接口
import {
  getMemberList
} from '../../util/axios'


const state = {
  memberList: []
}

const getters = {
  getMemberList(state) { //类似于计算属性
    return state.memberList
  }
}
const mutations = {
  REQ_MEMBERLIST(state, payload) {
    state.memberList = payload;
  }
}

const actions = {
  getMemberListAction({
    commit
  }) {
    getMemberList().then(res => {
      if (res.data.code == 200) {
        commit("REQ_MEMBERLIST", res.data.list)
      } //提交一个mutation以及携带参数，参数就是返回的数据
    }).catch(err => {
      console.log(err);
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
