<template>
  <div>
    <e-bread></e-bread>
    <el-button type="primary" round size="small" @click="add">添加</el-button>
    <v-list   @edit='edit'></v-list>
    <v-add ref="kkll" :addInfo='addInfo' @cancel='cancel'></v-add>
  </div>
</template>

<script>
import eBread from "../../components/el-bread";
import vList from "../role/list";
import vAdd from "../role/add";
export default {
  data() {
    return {
      addInfo: {
        isshow: false,
        isadd: true,
      } /* isshow控制弹框打开关闭   isadd控制编辑按钮是否为添加按钮 */,
    };
  },
  methods:{
    edit(e){
      this.addInfo.isshow=true;
      this.addInfo.isadd=false;
      this.$refs.kkll.look(e)
    },
    add(){
      this.addInfo.isshow=true;
        this.addInfo.isadd = true;
    },
    cancel(e){
      this.addInfo.isshow=e; 
    }
  },
  components: {
    eBread,
    vList,
    vAdd,
  },
};
</script>

<style  lang="" scoped>
.el-button {
  margin: 0 0 20px;
}
</style>
