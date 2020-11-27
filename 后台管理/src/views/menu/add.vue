<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isadd?'添加菜单':'编辑菜单' "
      :visible.sync="addInfo.isshow"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="title" label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择" @change="changpid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 下拉框循环菜单列表 -->
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择">
            <!-- 下拉框循环菜单列表 -->
            <el-option v-for="item in indexicon" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 下拉框循环菜单列表 -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.path"
              :value="item.path"
            ></el-option>
          </el-select>
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
        <el-button v-if="addInfo.isadd" type="primary" @click="add('formDialog')">添加</el-button>
        <el-button v-else type="primary" @click="updata('formDialog')">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuAdd, getMenuInfo, getMenuedit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexRoutes } from "../../router";
export default {
  data() {
    return {
      form: {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      indexicon: [
        "el-icon-platform-eleme",
        "el-icon-s-custom",
        "el-icon-s-grid",
        "el-icon-user-solid",
      ],
      routes: indexRoutes,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isshow", "addInfo"],
  methods: {
    look(id) {
      // console.log(id);
      getMenuInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    reset() {
      this.form = {
        title: "",
        pid: 0,
        icon: "",
        type: 1, 
        url: "",
        status: 1,
      };
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    changpid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    updata(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.$refs[formName]);
        if (valid) {
          getMenuedit(this.form).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.$refs[formName]);
        if (valid) {
          getMenuAdd(this.form).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
