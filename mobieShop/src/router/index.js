import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      name:'login',
      component: resolve => require(['../components/view/login/login.vue'], resolve),
    },
    {
      path:'/loginquick',
      name:'loginquick',
      component: resolve => require(['../components/view/login/loginquick.vue'], resolve),
    },
    // 订单列表
    {
      path:'/order',
      name:'order',
      component: resolve => require(['../components/view/order/order.vue'], resolve),
    }
  ]
})
