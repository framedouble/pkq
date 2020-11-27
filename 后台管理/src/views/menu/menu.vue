<template>
  <div>
    <e-bread></e-bread>
    <el-button type="primary" round size="small" @click="isadd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <dilog @cancel="cancel" ref="sd" :addInfo="addInfo"></dilog>
  </div>
</template>
<script>
import eBread from "../../components/el-bread";
import vList from "./list";
import dilog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isshow: false, //是否显示
        isadd: true, //true就是添加
      },
    };
  },
  components: {
    eBread,
    vList,
    dilog,
  },
  methods: {
    edit(e) {
      // console.log(e);
      this.addInfo.isshow = true;
      this.addInfo.isadd = false;
      // console.log( this.$refs.sd);
      this.$refs.sd.look(e);
    },
    isadd() { this.addInfo.isshow = true;
      this.addInfo.isadd = true;
    },
    cancel(e) {
      this.addInfo.isshow = e;
    },
  },
};
</script>

<style  lang="" scoped>
</style>
