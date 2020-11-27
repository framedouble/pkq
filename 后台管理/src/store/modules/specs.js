
import { getSpecsList, getSpecsCount } from "../../util/axios";
const state = {
  specsList: [],
  size: 2, //每个组件渲染的条数
  page: 1, //页码
  total: 0 //总条数
};
//getters
const getters = {
  //导出用户列表
  getSpecsList() {
    return state.specsList;
  },
  //导出总条数
  getSpecsCount() {
    return state.total;
  },
  //导出总条数
  getSpecsSize() {
    return state.size;
  }
};
const mutations = {
  REQ_SPECSLIST(state, payload) {
    state.specsList = payload;
  },
  REQ_SPECSCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state,payload){
    state.page = payload
  }
};
const actions = {

  getSpecsAction(context) {
    console.log(context, "context");
    getSpecsList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      if (res.data.code == 200) {
        console.log(res, "响应数据");
        context.commit("REQ_SPECSLIST", res.data.list);
      }
    });
  },
  getCountAction({ commit }) {
    getSpecsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_SPECSCOUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page的action
  changePageAction(context,payload){
    
    context.commit('REQ_PAGE',payload)
    //重新调取列表
    context.dispatch('getSpecsAction')
  }
};

//导出
export default {
  state,
  getters,
  mutations,
  actions,
  //命名空间
  namespaced: true
};
