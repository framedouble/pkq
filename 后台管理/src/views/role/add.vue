<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isadd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isshow"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :props="{
              children: 'children',
              label: 'title',
            }"
            show-checkbox
            :data="menulist"
            default-expand-all
            node-key="id"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="addInfo.isadd" @click="add"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoleadd, getRoleinfo, getRoleedit } from "../../util/axios";
export default {
  data() {
    return {
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menulist: "menu/getMenuList",
    }),
  },
  mounted() {
    if (this.menulist.length == 0) {
      this.getMenuList();
    }
  },
  methods: {
    look(id) {
      getRoleinfo({
        id,
      }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.menus = this.form.menus
            ? this.$refs.tree.setCheckedKeys(this.form.menus.split(","))
            : [];
          this.form.id = id;
        }
      });
    },

    add() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(this.form.menus);
      getRoleadd(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    updata() {
      //編輯
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(this.form.menus);
      getRoleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    reset() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRolelistAction",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
