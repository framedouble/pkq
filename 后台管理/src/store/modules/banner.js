import {
  getBannerList
} from '../../util/axios'

const state = {
  bannerList: []
}
const getters = {
  getBannerList(state) {
    return state.bannerList
  }
}
const mutations = {
  REQ_BANNERLIST(state, payload) {
    state.bannerList = payload
  }
}
const actions = {
  getBannerListAction({
    commit
  }) {
    getBannerList().then(res => {
      if (res.data.code == 200) {
        //提交一个mutation以及携带参数，参数就是返回的数据
        commit("REQ_BANNERLIST", res.data.list)
      }
    }).catch(err => {
      console.log(err, '错误响应')
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}
