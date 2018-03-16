import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        // 带返回头部的页面
        path: '',
        component: resolve => require(['../components/common/home.vue'], resolve),
        children: [{
                path: '/login',
                name: 'login',
                component: resolve => require(['../components/view/login/login.vue'], resolve),
            },
            {
                path: '/loginquick',
                name: 'loginquick',
                component: resolve => require(['../components/view/login/loginquick.vue'], resolve),
            },
            // 订单列表
            {
                path: '/order',
                name: 'order',
                component: resolve => require(['../components/view/order/order.vue'], resolve),
            },
            // 确认订单
            {
                path: '/ordercertain',
                name: 'ordercertain',
                component: resolve => require(['../components/view/order/certainorder.vue'], resolve),
            },
            {
                path: '/userInfo', //个人中心
                name: 'userInfo',
                component: resolve => require(['../components/view/userInfo/userInfo.vue'], resolve),
            },
            {
                path: '/navBottom', //刚刚底边栏
                name: 'navBottom',
                component: resolve => require(['../components/view/navBottom/navBottom.vue'], resolve),
            },
            {
                path: '/accountMangagement', //账号管理
                name: 'accountMangagement',
                component: resolve => require(['../components/view/userInfo/accountMangagement.vue'], resolve),
            },
            {
                path: '/address', //添加地址
                name: 'address',
                component: resolve => require(['../components/view/userInfo/address.vue'], resolve),
            },
            {
                path: '/addressManagnet', //地址管理
                name: 'addressManagnet',
                component: resolve => require(['../components/view/userInfo/addressManagnet.vue'], resolve),
            },
            {
                path: '/shopCar', //购物管理
                name: 'shopCar',
                component: resolve => require(['../components/view/userInfo/shopCar.vue'], resolve),
            },
            {
                path: '/Coupon', //购物管理
                name: 'Coupon',
                component: resolve => require(['../components/view/Coupon/Coupon.vue'], resolve),
            },
            {
                path: '/Inviting', //受邀码
                name: 'Inviting',
                component: resolve => require(['../components/view/Inviting/Inviting1.vue'], resolve),
            },
            {
                path: '/InvitingGift', //邀请有礼
                name: 'InvitingGift',
                component: resolve => require(['../components/view/Inviting/Inviting2.vue'], resolve),
            },
        ]
    }]
})