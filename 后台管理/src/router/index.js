import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
export let indexRoutes = [{
  path: '/menu',
  component: () => import('../views/menu/menu'),
  name: '菜单管理'
}, {
  path: '/role',
  component: () => import('../views/role/role'),
  name: '角色管理'
}, {
  path: '/user',
  component: () => import('../views/user/user'),
  name: '管理员管理'
}, {
  path: '/cate',
  component: () => import('../views/cate/cate.vue'),
  name: '商品分类'
}, {
  path: '/specs',
  component: () => import('../views/specs/specs.vue'),
  name: '商品规格管理'
}, {
  path: '/goods',
  component: () => import('../views/goods/goods.vue'),
  name: '商品管理'
}, {
  path: '/member',
  component: () => import('../views/member/member.vue'),
  name: '会员管理'
}, {
  path: '/banner',
  component: () => import('../views/banner/banner.vue'),
  name: '轮播图管理'
}, {
  path: '/seck',
  component: () => import('../views/seck/seck.vue'),
  name: '活动列表'
},]

const router = new Router({ //一个页面只能有一个export default
  routes: [{
    path: '/login',
    component: () => import('../pages/login')
  }, {
    path: '/index',
    component: () => import('../pages/index'),
    children: [{
      path: '/home',
      component: () => import('../views/home')
    }, ...indexRoutes, {
      path: '',
      redirect: '/menu'
    }]
  },
  {
    path: '*',
    redirect: '/index'
  }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  if (sessionStorage.getItem('userInfo')) {
    next();
    return
  }
  next('/login')
})
export default router;