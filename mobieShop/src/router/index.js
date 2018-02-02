import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      // 带返回头部的页面
      path: '',
      component: resolve => require(['../components/common/home.vue'], resolve),
      children:[
        {
          path:'/login',
          name:'login',
          component: resolve => require(['../components/view/login/login.vue'], resolve),
        },
        {
          path:'/userInfo',
          name:'userInfo',
          component: resolve => require(['../components/view/userInfo/userInfo.vue'], resolve),
        },
      ]
    }
  ]
})
