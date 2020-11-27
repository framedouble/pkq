// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/'
import './assets/css/reset.css'
import './assets/js/remScale'
import vantUI from 'vant'
Vue.use(vantUI)
import 'vant/lib/index.css'

Vue.config.productionTip = false
//在vue原型上挂载一个服务器地址
Vue.prototype.$imgUrl = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
