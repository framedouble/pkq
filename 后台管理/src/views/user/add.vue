<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isadd?'添加管理员':'修改管理员'"
      :visible.sync="addInfo.isshow"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item prop="roleid" label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 下拉框循环菜单列表 -->
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button type="primary" v-if="addInfo.isadd" @click="add">添加</el-button>
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
import { mapGetters, mapActions } from "vuex";
import { getUseradd, getUserinfo, getUseredit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        roleid: "", //角色编号
        username: "", // 管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },

      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      rolelist: "role/getRolelist",
    }),
  },
  mounted() {
    if (this.rolelist.length == 0) {
      this.getRoleList();
      this.getCountAction();
    }
  },
  methods: {
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    look(uid) {
      getUserinfo({
        uid
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },

    add() {
      // console.log(this.form);
      getUseradd(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserLlist();
          this.cancel();
          // console.log(this.form);
          this.getCountAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    updata() {
      //編輯
      // console.log(this.form.menus);
      getUseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserLlist();
          this.getCountAction(), this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getRoleList: "role/getRolelistAction",
      getUserLlist: "user/getUserlistAction",
      getCountAction: "user/getCountAction",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
