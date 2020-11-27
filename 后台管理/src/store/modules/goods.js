//引入角色接口
import {
  getGoodsList,
  getGoodsCount
} from "../../util/axios";

//state
const state = {
  goodsList: [],
  size: 2, //每个组件渲染的条数
  page: 1, //页码
  total: 0 //总条数
};
//getters
const getters = {
  //导出用户列表
  getGoodsList() {
    return state.goodsList;
  },
  //导出总条数
  getGoodsCount() {
    return state.total;
  },
  //导出总条数
  getGoodsSize() {
    return state.size;
  }
};

//mutations
const mutations = {
  //修改state的SpecsList
  REQ_SPECSLIST(state, payload) {
    state.goodsList = payload;
  },
  //修改state中的total总条数
  REQ_SPECSCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state, payload) {
    state.page = payload
  }
};

//actions
const actions = {
  //封装一个获取管理员列表的行动
  getGoodsAction(context) {
    console.log(context, "context");
    //调取列表接口
    getGoodsList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      if (res.data.code == 200) {
        console.log(res, "响应数据");
        //提交一个mutations
        context.commit("REQ_SPECSLIST", res.data.list);
      }
    });
  },
  //封装一个获取总条数事件
  getGoodsCountAction({
    commit
  }) {
    getGoodsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_SPECSCOUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page的action
  changePageAction(context, payload) {
    context.commit('REQ_PAGE', payload)
    //重新调取列表
    context.dispatch('getGoodsAction')
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
