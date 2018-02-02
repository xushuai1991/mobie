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
      // children:[
      //   {
      //     path:'/',
      //     name:'qicklogin',
      //     component:''
      //   }
      // ]
    }
  ]
})
