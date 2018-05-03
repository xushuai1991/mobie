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

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'eBFK8PeaclOw8XQBiOEatBPrazdK0qDg'
  })

Vue.config.productionTip = false
Vue.prototype.$http = axios
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
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