// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import {operatelocalstorage} from './assets/javascript/localstorage_hasdata.js'
import { Toast } from 'mint-ui';
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'eBFK8PeaclOw8XQBiOEatBPrazdK0qDg'
  })

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.url_qrcode='http://47.100.51.41:8887/customer/resource/qrCode.png';
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    if(to.meta.requireAuth){
        let userinfo_location=operatelocalstorage('userinfo',null,'get',null);
        
        //需要登录的页面未登录，跳转回登录页
        if(userinfo_location==null){
            Toast('尚未登录，请登录...');
            sessionStorage.setItem('select_index','我的')
            next({
                name: 'home'
            })
        }
        else{
            next();
        }
    }
    next()
  })
Vue.use(Mint)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})