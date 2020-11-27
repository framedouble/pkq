<template>
  <div>
    <e-bread></e-bread>
    <el-button type="primary" round size="small" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add ref="kkll" :addInfo="addInfo" @cancel="cancel"></v-add>
  </div>
</template>

<script>
import eBread from "../../components/el-bread";
import vList from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      addInfo: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    edit(e) {
      this.addInfo.isshow = true;
      this.addInfo.isadd = false;
      this.$refs.kkll.look(e);
    },
    add() {
      this.addInfo.isshow = true;
      this.addInfo.isadd = true;
    },
    cancel(e) {
      this.addInfo.isshow = e;
    },
  },
  components: {
    eBread,
    vAdd,
    vList,
  },
};
</script>

<style  lang="" scoped>
.el-button {
  margin: 0 0 20px;
}
</style>
