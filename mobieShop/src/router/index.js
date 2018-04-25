import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     // 带返回头部的页面
        //     path: '',
        //     component: resolve => require(['../components/common/home.vue'], resolve),
        //     children: []
        // },
        {
            path: '',
            redirect: '/index'
        },
        {
            path: '/index', // 首页
            name: 'index',
            component: resolve => require(['../components/view/index/index.vue'], resolve),
            meta: {
                title: '首页'
            },
        },
        {
            path: '/homepage', // 主页
            name: 'homepage',
            component: resolve => require(['../components/view/homepage/homepage.vue'], resolve),
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
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/view/login/login.vue'], resolve),
            meta: {
                title: '登录'
            },
        },
        
        // 订单列表
        {
            path: '/order',
            name: 'order',
            component: resolve => require(['../components/view/order/order.vue'], resolve),
            meta: {
                title: '订单列表'
            },
        },
        // 确认订单
        {
            path: '/ordercertain',
            name: 'ordercertain',
            component: resolve => require(['../components/view/order/certainorder.vue'], resolve),
            meta: {
                title: '确认订单'
            },
        },
        {//订单详情
            path: '/orderDeil',
            name: 'orderDeil',
            component: resolve => require(['../components/view/order/orderDeil.vue'], resolve),
            meta: {
                title: '订单详情'
            }
        },
        //支付
        {
            path:'/paying',
            name:'paying',
            component: resolve => require(['../components/view/order/paying.vue'], resolve),
            meta: {
                title: '支付'
            }
        },
        //开票申请
        {
            path: '/invoice',
            name: 'invoice',
            component: resolve => require(['../components/view/order/invoice.vue'], resolve),
            meta: {
                title: '开票申请'
            }
        },
        // 消息中心
        {
            path: '/msgcenter',
            name: 'msgcenter',
            component: resolve => require(['../components/view/order/msgcenter.vue'], resolve),
            meta: {
                title: '消息中心'
            }
        },
        {
            path: '/userInfo', // 个人中心
            name: 'userInfo',
            component: resolve => require(['../components/view/userInfo/userInfo.vue'], resolve),
            meta: {
                title: '个人中心'
            }
        },
        {
            path: '/personalScores', // 个人积分管理
            name: 'personalScores',
            component: resolve => require(['../components/view/userInfo/personalScore.vue'], resolve),
            meta: {
                title: '个人积分管理'
            }
        },
        {
            path: '/accountMangagement', // 账号管理
            name: 'accountMangagement',
            component: resolve => require(['../components/view/userInfo/accountMangagement.vue'], resolve),
            meta: {
                title: '账号管理'
            }
        },
        {
            path: '/addEdit', // 添加地址
            name: 'addEdit',
            component: resolve => require(['../components/view/addEdit/addEdit.vue'], resolve),
            meta: {
                title: '添加地址'
            }
        },
        
        {
            path: '/addManagement', // 地址管理
            name: 'addManagement',
            component: resolve => require(['../components/view/addEdit/addManagement.vue'], resolve),
            meta: {
                title: '地址管理'
            }
        },
        {
            path: '/shopCar', // 购物管理
            name: 'shopCar',
            component: resolve => require(['../components/view/userInfo/shopCar.vue'], resolve),
            meta: {
                title: '购物车'
            }
        },
        {
            path: '/Coupon', // 优惠劵
            name: 'Coupon',
            component: resolve => require(['../components/view/Coupon/Coupon.vue'], resolve),
            meta: {
                title: '我的优惠券'
            }
        },
        {
            path: '/evaluate', // 评论详情
            name: 'evaluate',
            component: resolve => require(['../components/view/evaluate/evaluate.vue'], resolve),
            meta: {
                title: '评论'
            }
        },
        {
            path: '/confirmationOrder', // 个人中心
            name: 'confirmationOrder',
            component: resolve => require(['../components/view/confirmationOrder/confirmationOrder.vue'], resolve),
            meta: {
                title: '确认订单'
            }
        },
        {
            path: '/classification', // 分类
            name: 'classification',
            component: resolve => require(['../components/view/classification/classification.vue'], resolve),
            meta: {
                title: '商品'
            },
        },
        {
            path: '/recommend', // 首页
            name: 'recommend',
            component: resolve => require(['../components/view/homepage/recommend/recommend.vue'], resolve),
            meta: {
                title: '到家服务'
            },
        },
        {
            path: '/shopinfo', // 消息中心
            name: 'shopinfo',
            component: resolve => require(['../components/view/shopinfo/shopinfo.vue'], resolve),
            meta: {
                title: '消息中心'
            },
        },
        {
            path: '/active', // 活动提醒
            name: 'active',
            component: resolve => require(['../components/view/shopinfo/active.vue'], resolve),
            meta: {
                title: '活动中心'
            },
        },
        {
            path: '/invoiceDateil', // 发票
            name: 'invoiceDateil',
            component: resolve => require(['../components/view/shopinfo/invoice.vue'], resolve),
            meta: {
                title: '发票列表'
            },
        },
        {
            path: '/invoiceInfo', // 发票
            name: 'invoiceInfo',
            component: resolve => require(['../components/view/shopinfo/invoiceInfo.vue'], resolve),
            meta: {
                title: '发票详情'
            },
        },
        {
            path: '/Inviting', // 受邀码
            name: 'Inviting',
            component: resolve => require(['../components/view/Inviting/Inviting.vue'], resolve),
            meta: {
                title: '邀请注册'
            },
        },
        {
            path: '/InvitingGift', // 邀请有礼
            name: 'InvitingGift',
            component: resolve => require(['../components/view/Inviting/InvitingGift.vue'], resolve),
            meta: {
                title: '邀请有礼'
            },
        },
        {
            path: '/InvitingRegular', // 邀请规则
            name: 'InvitingRegular',
            component: resolve => require(['../components/view/Inviting/InvitingRegular.vue'], resolve),
            meta: {
                title: '邀请规则'
            },
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
            component: resolve => require(['../components/view/userInfo/myCollection.vue'], resolve),
            meta: {
                title: '我的收藏'
            },
        },
        {
            path: '/applyRefund', // 申请退款
            name: 'applyRefund',
            component: resolve => require(['../components/view/order/applyrefund.vue'], resolve),
            meta: {
                title: '申请退款'
            },
        },
        {
            path: '/logisticsList', // 物流列表
            name: 'logisticsList',
            component: resolve => require(['../components/view/userInfo/logisticsList.vue'], resolve),
            meta: {
                title: '物流'
            },
        },
        {
            path: '/logistics', // 物流详情
            name: 'logistics',
            component: resolve => require(['../components/view/userInfo/logistics.vue'], resolve),
            meta: {
                title: '物流'
            },
        },
        {
            path: '/Customer', // 售后订单
            name: 'Customer',
            component: resolve => require(['../components/view/userInfo/Customer.vue'], resolve),
            meta: {
                title: '售后订单'
            },
        },
        {
            path: '/detailTemplate', // 详情模板
            name: 'detailTemplate',
            component: resolve => require(['../components/view/detailTemplate/templatePages.vue'], resolve),
            meta: {
                title: '商品详情'
            },
        },
    ]
})