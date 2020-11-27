<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-arrow class="nav" right-text="注册" @click-right="$router.push('/register')">
    </van-nav-bar>
    <!-- 表单项 -->
    <van-form @submit="login">
      <van-field
        v-model="loginInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="loginInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <div class="no">
          <van-button @click='$router.push("/register")' type='warning' class="btn">未注册，先去注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from '../util/axios'
import {Toast} from 'vant'
export default {
  data() {
    return {
      loginInfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    //封装一个登录事件
    login() {
       login(this.loginInfo)
          .then(res=>{
              if(res.code==200){
                  Toast.success(res.msg)
                  //把数据存储到本地存储中
                  sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                  //成功之后跳转到个人中心
                  this.$router.push('/mine')
              }else{
                    Toast.fail(res.msg)
              }
          })
    }
  }
};
</script>

<style  lang="" scoped>
.nav {
  padding-top: 0.19rem;
  background-color: #f26b11;
}
.van-nav-bar__title {
  color: #fff !important;
}
.van-nav-bar .van-icon {
  color: #fff !important;
}
.van-field {
  margin: 20px 0px;
  font-size: 15px !important;
}
.van-form {
  margin-top: 70px;
}
.no {
  padding-right: 5px;
  text-align: right;
}
.btn {
  width: 150px !important;
  height: 40px !important;
  border-radius: 5px;
  background-color: #f26b11;
}
</style>
