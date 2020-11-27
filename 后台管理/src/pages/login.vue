<template>
  <div class="login">
    <el-form
      :model="userinfo"
      :rules="rules"
      ref="userinfo"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input clearable v-model="userinfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          show-password
          clearable
          v-model="userinfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('userinfo')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserlogin } from "../util/axios";
// import{mapActions}from 'vuex'
export default {
  data() {
    return {
      userinfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // ...mapActions(['changeUserInfo']),
    login(formName) {
      //form是自带提交表单的验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserlogin(this.userinfo).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // console.log(res);
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
              // this.changeUserInfo(res.data.list)
              // console.log(JSON.parse((sessionStorage.getItem("userInfo"))).token);
              this.$router.push("/home");
            } else {
              this.$message.error("账号或者密码错误");
            }
          });
          {
          }
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
.login {
  width: 100vw;
  height: 100vh;
  text-align: center;
}
.demo-ruleForm {
  text-align: center;
  width: 50vw;
  margin: 20vh auto;
}
</style>
