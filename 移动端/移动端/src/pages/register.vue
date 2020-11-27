<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-arrow class="nav" right-text="登录" @click-right="$router.push('/login')">
    </van-nav-bar>
    <!-- 表单项 -->
    <van-form @submit="register">
      <van-field v-model="regInfo.phone" name="手机号" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="regInfo.nickname" name="昵称" label="昵称" placeholder="请输入昵称" :rules="[{ required: true, message: '请填写昵称' }]" />
      <van-field v-model="regInfo.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
      
      <van-field name="选择" label="" :rules="[{ required: true, message: '请选择' }]" class="choose">
  <template #input>
      <van-checkbox  style="width:500px" v-model="regInfo.isGree" shape="square"><span class="ch">我已阅读并同意使用条款和隐私政策</span></van-checkbox>
  </template>
</van-field>
      
    </van-form>
  </div>
</template>

<script>
import { register } from '../util/axios'
import { Toast } from 'vant'
export default {
  data () {
    return {
      regInfo: {
        phone: '',
        nickname: '',
        password: '',
        isGree: true//默认值可以用true/false
      }
    };
  },
  methods: {
    //封装一个注册事件
    register () {
      register(this.regInfo)
        .then(res => {
          if (res.code == 200) {
            Toast.success(res.msg)
            //成功之后跳转到登录页
            this.$router.push('/login')
          } else {
            Toast.fail(res.msg)
          }
        })
    }
  },
};
</script>

<style lang="" scoped>
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
.van-form {
  margin-top: 50px;
}
.van-field {
  height: 60px;
  /* line-height: 50px; */
}
.choose {
  width: 150px;
}
.ch {
  width: 400px;
}
</style>
