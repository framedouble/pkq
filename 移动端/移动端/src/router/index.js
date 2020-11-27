import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:()=>import ("@/pages/index"),
      children:[
        {
          path:'/home',
          component:()=>import ("@/views/home"),
          meta:{ // 自定义配置标签
            name:'首页'
          }
        },
        {
          path: '/cart',
          component: () => import("@/views/cart"),
          meta: { // 自定义配置标签
            name: '购物车'
          }
        },
        {
          path: '/mine',
          component: () => import("@/views/mine"),
          meta: { // 自定义配置标签
            name: '我的'
          }
        },
        {
          path: '/sort',
          component: () => import("@/views/sort"),
          meta: { // 自定义配置标签
            name: '商品分类'
          }
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'/login',
      component: () => import("@/pages/login"),
      meta: { // 自定义配置标签
        name: '登录'
      }
    },
    {
      path: '/register',
      component: () => import("@/pages/register"),
      meta: { // 自定义配置标签
        name: '注册'
      }
    },
    {
      path: '/goodsDetail',
      component: () => import("@/pages/goodsDetail"),
      meta: { // 自定义配置标签
        name: '商品详情'
      }
    },  
    {
      path: '/goodsList',
      component: () => import("@/pages/goodsList"),
      meta: { // 自定义配置标签
        name: '商品列表'
      }
    },   
    {
      path:'*',
      redirect:'/index'
    },
  ]
})
