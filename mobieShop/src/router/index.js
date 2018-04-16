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
                    path: '',
                    redirect: '/login'
                },
                // 订单列表
                {
                    path: '/order',
                    name: 'order',
                    component: resolve => require(['../components/view/order/order.vue'], resolve)
                },
                // 确认订单
                {
                    path: '/ordercertain',
                    name: 'ordercertain',
                    component: resolve => require(['../components/view/order/certainorder.vue'], resolve)
                },
                {//订单详情
                    path: '/orderDeil',
                    name: 'orderDeil',
                    component: resolve => require(['../components/view/order/orderDeil.vue'], resolve)
                },
                //支付
                {
                    path:'/paying',
                    name:'paying',
                    component: resolve => require(['../components/view/order/paying.vue'], resolve)
                },
                //开票申请
                {
                    path: '/invoice',
                    name: 'invoice',
                    component: resolve => require(['../components/view/order/invoice.vue'], resolve)
                },
                // 消息中心
                {
                    path: '/msgcenter',
                    name: 'msgcenter',
                    component: resolve => require(['../components/view/order/msgcenter.vue'], resolve)
                },
                {
                    path: '/userInfo', // 个人中心
                    name: 'userInfo',
                    component: resolve => require(['../components/view/userInfo/userInfo.vue'], resolve)
                },
                {
                    path: '/personalScores', // 个人积分管理
                    name: 'personalScores',
                    component: resolve => require(['../components/view/userInfo/personalScore.vue'], resolve)
                },
                {
                    path: '/accountMangagement', // 账号管理
                    name: 'accountMangagement',
                    component: resolve => require(['../components/view/userInfo/accountMangagement.vue'], resolve)
                },
                {
                    path: '/addEdit', // 添加地址
                    name: 'addEdit',
                    component: resolve => require(['../components/view/addEdit/addEdit.vue'], resolve)
              },
                
                {
                    path: '/addManagement', // 地址管理
                    name: 'addManagement',
                    component: resolve => require(['../components/view/addEdit/addManagement.vue'], resolve)
                },
                {
                    path: '/shopCar', // 购物管理
                    name: 'shopCar',
                    component: resolve => require(['../components/view/userInfo/shopCar.vue'], resolve)
                },
                {
                    path: '/Coupon', // 优惠劵
                    name: 'Coupon',
                    component: resolve => require(['../components/view/Coupon/Coupon.vue'], resolve)
                },
                {
                    path: '/evaluate', // 评论详情
                    name: 'evaluate',
                    component: resolve => require(['../components/view/evaluate/evaluate.vue'], resolve)
                },
                {
                    path: '/confirmationOrder', // 个人中心
                    name: 'confirmationOrder',
                    component: resolve => require(['../components/view/confirmationOrder/confirmationOrder.vue'], resolve)
                },
                {
                    path: '/classification', // 分类
                    name: 'classification',
                    component: resolve => require(['../components/view/classification/classification.vue'], resolve)
                },
                {
                    path: '/recommend', // 首页
                    name: 'recommend',
                    component: resolve => require(['../components/view/homepage/recommend/recommend.vue'], resolve)
                },
                {
                    path: '/shopinfo', // 消息中心
                    name: 'shopinfo',
                    component: resolve => require(['../components/view/shopinfo/shopinfo.vue'], resolve)
                },
                {
                    path: '/Inviting', // 受邀码
                    name: 'Inviting',
                    component: resolve => require(['../components/view/Inviting/Inviting.vue'], resolve)
                },
                {
                    path: '/InvitingGift', // 邀请有礼
                    name: 'InvitingGift',
                    component: resolve => require(['../components/view/Inviting/InvitingGift.vue'], resolve)
                },
                {
                    path: '/InvitingRegular', // 邀请规则
                    name: 'InvitingRegular',
                    component: resolve => require(['../components/view/Inviting/InvitingRegular.vue'], resolve)
                },
                {
                    path: '/InvitingResult', // 邀请结果
                    name: 'InvitingResult',
                    component: resolve => require(['../components/view/Inviting/InvitingResult.vue'], resolve)
                },
                {
                    path: '/buttomNav', // 底部导航栏
                    name: 'InvitingResult',
                    component: resolve => require(['../components/common/buttomNav.vue'], resolve)
                },
                {
                    path: '/myCollection', // 收藏列表
                    name: 'myCollection',
                    component: resolve => require(['../components/view/userInfo/myCollection.vue'], resolve)
                },
                {
                    path: '/applyRefund', // 申请退款
                    name: 'applyRefund',
                    component: resolve => require(['../components/view/order/applyrefund.vue'], resolve)
                },
                {
                    path: '/logisticsList', // 物流列表
                    name: 'logisticsList',
                    component: resolve => require(['../components/view/userInfo/logisticsList.vue'], resolve)
                },
                {
                    path: '/logistics', // 物流详情
                    name: 'logistics',
                    component: resolve => require(['../components/view/userInfo/logistics.vue'], resolve)
                }
            ]
        },
        {
            path: '/index', // 首页
            name: 'index',
            component: resolve => require(['../components/view/index/index.vue'], resolve)
        },
        {
            path: '/homepage', // 主页
            name: 'homepage',
            component: resolve => require(['../components/view/homepage/homepage.vue'], resolve)
        },
        {
            path: '/navBottom', // 刚刚底边栏
            name: 'navBottom',
            component: resolve => require(['../components/view/navBottom/navBottom.vue'], resolve)
        },
        {
            path: '/eventTemplate', // 活动模板
            name: 'eventTemplate',
            component: resolve => require(['../components/view/eventTemplate/templatePages.vue'], resolve)
        },
        {
            path: '/detailTemplate', // 详情模板
            name: 'detailTemplate',
            component: resolve => require(['../components/view/detailTemplate/templatePages.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/view/login/login.vue'], resolve)
        }
    ]
})