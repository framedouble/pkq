<template>
  <div>
    <e-bread></e-bread>
    <v-list @edit="edit"></v-list>
    <v-add ref="dialog" @cancel="cancel" :addInfo="addInfo"></v-add>
  </div>
</template>

<script>
import eBread from "../../components/el-bread";
import vList from "../member/list";
import vAdd from "../member/add";
export default {
  data() {
    return {
      addInfo: {
        isshow: false,
        // isadd: true,
      } /* isshow控制弹框打开关闭   isadd控制编辑按钮是否为添加按钮 */,
    };
  },
  methods: {
    edit(e) {
      this.addInfo.isshow = true;
      this.$refs.kkll.look(e);
    },
    cancel(e) {
      this.addInfo.isshow = e;
    },
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
