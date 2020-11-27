<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" round size="small" @click="isAdd">添加</el-button>
    <v-table @edit="edit"></v-table>
    <v-dialog ref="dialog" @cancel="cancel" :addInfo="addInfo"></v-dialog>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import vTable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        //用于打开弹框（控制弹框）
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    elBread,
    vTable,
    vDialog,
  },
  methods: {
    isAdd() {
      this.addInfo.isAdd = true;
      this.addInfo.isShow = true;
    },

    cancel(e) {//改变属性弹框
      this.addInfo.isShow = e;
    },
    edit(e) {
      this.addInfo.isAdd = false;
      this.addInfo.isShow = true;
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>
