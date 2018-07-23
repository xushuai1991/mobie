<template>
    <div class="page-tabbar">
        <div class="page-wrap" style='-webkit-overflow-scrolling : touch;'>
            <mt-tab-container class="page-tabbar-container" v-model="selected">
                <mt-tab-container-item id="首页">
                    <div v-if='isTrue'>
                        <!-- isTrue true的话 为模板首页 false为默认首页 -->
                        <templatePages></templatePages>
                    </div>
                    <div v-else>
                        <homepage></homepage>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="分类">
                    <classifiCation></classifiCation>
                </mt-tab-container-item>
                <mt-tab-container-item id="购物车">
                    <shopCar></shopCar>
                </mt-tab-container-item>
                <mt-tab-container-item id="我的">
                    <userInfo></userInfo>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected" class='tabbar-xs'>
            <mt-tab-item id="首页">
                <i class='icon iconfont icon-solid-home font'></i> 首页
            </mt-tab-item>
            <mt-tab-item id="分类">
                <i class='icon iconfont icon-leimupinleifenleileibie2 font'></i> 分类
            </mt-tab-item>
            <mt-tab-item id="购物车">
                <i class='icon iconfont icon-gouwuche1 font'></i> 购物车
            </mt-tab-item>
            <mt-tab-item id="我的">
                <i class='icon iconfont icon-wode font'></i> 我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    import homepage from '@/components/view/homepage/homepage.vue'
    import templatePages from '@/components/view/template/templatePages.vue'
    import classifiCation from '@/components/view/classification/classification.vue'
    import shopCar from '@/components/view/userInfo/shopCar.vue'
    import userInfo from '@/components/view/userInfo/userInfo.vue'
    import {
        Toast
    } from 'mint-ui';
    import {
        operatelocalstorage
    } from '../../../assets/javascript/localstorage_hasdata.js'
    export default {
        data() {
            return {
                selected: '首页',
                isTrue: true,
                templateUrl: '',
                code: '',
                companyid: ''
            }
        },
        created() {
            // document.title='xxx';
            let select_session = sessionStorage.getItem('select_index');
            if (select_session != null) {
                this.selected = select_session;
            }
            let url = location.search;
            let companyid = this.getURLparms('company');
            // let code=this.getURLparms('code');
            // this.code=code;
            console.log(companyid);
            if (companyid != null) {
                sessionStorage.setItem('companyId', companyid);
                this.companyid = companyid;
                // localStorage.setItem('companyId', companyid);
            }
            else{
                this.companyid = sessionStorage.getItem('companyId');
            }
            // if(this.$route.params.logining!=null&&this.$route.params.logining){
            //     this.selected='我的';
            //     this.tologin();
            // }
            // if(code!=null){
            //     this.getOpenid().then((flag)=>{
            //         if(flag){
            //             if(this.$route.params.logining!=null&&this.$route.params.logining){
            //                 this.selected='我的';
            //                 this.$router.push('/login');
            //             }
            //         }
            //     });
            // }
            // else{
            //     if(sessionStorage.getItem('openId')==null){
            //         Toast('请授权后再登录商城');
            //     }
            // }
            let direct = this.$route.params.direct;
            console.log(direct);
            // console.log(direct==undefined);
            if (direct != undefined) {
                // console.log(111);
                switch (direct) {
                    case 'commodity':
                        {
                            this.selected = '分类';
                            break;
                        }
                    case 'userinfo':
                        {
                            this.selected = '我的';
                            break;
                        }
                    case 'shopcar':
                        {
                            this.selected = '购物车';
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            this.$root.$on('switchindex', data => {
                switch (data) {
                    case 'commodity':
                        {
                            this.selected = '分类';
                            break;
                        }
                    case 'userinfo':
                        {
                            this.selected = '我的';
                            break;
                        }
                    case 'shopcar':
                        {
                            this.selected = '购物车';
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            });
            // 浏览状态（PC浏览）：根据'ID'和'商城模板类型'查询首页模板数据  。并将默认首页设置消失  isTrue = true
            let isBrowse;
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                isBrowse = false;
            } else {
                isBrowse = true;
            }
            if (isBrowse) {
                //alert('现在浏览状态')
                this.isTrue = true;
                let that = this;
                //从后台取要浏览的ID
                let id = this.getURLparms("id");
                this.$http.post('/api/product/mall/template/queryMap/mall', {
                    'templateID': id,
                    'templateType': 1
                    })
                    .then(function(response) {
                    //console.log(response)
                    let comlists = JSON.parse(response.data.info[0].comlist)
                    // console.log(comlists)
                    that.$store.commit('getTemplateData', comlists) //对应组件的标识
                    })
                    .catch(function(response) {
                    console.log(response)
                    })
            } else {
                // 非浏览状态(手机状态)：根据'启用中'和'商城模板类型'字段，查询首页模板数据。 启用中：查询启用中那一项 isTrue = true  ,  不启用：设置 isTrue = false
                let ids = this.getURLparms("id");
                let companyId = sessionStorage.getItem("companyId");
                if (!companyId) {
                    companyId = this.getURLparms("company")
                }
                //alert(ids)
                if (ids == null) {
                    //地址没有参数，直接查看手机端
                    let that = this;
                    this.$http.post('/api/product/mall/template/queryMap/mall', {
                            'templateType': 1,
                            'isEnabled': true,
                            "companyId": companyId
                        })
                        .then(function(response) {
                            // console.log(response)
                            if (response.data.info.length == 0) {
                                that.isTrue = false
                            } else {
                                if (response.data.info == "尚未登录") {
                                    // that.$router.push({ path: '/login' })
                                }
                                let comlists = JSON.parse(response.data.info[0].comlist)
                                //  console.log(comlists)
                                that.$store.commit('getTemplateData', comlists) //对应组件的标识
                            }
                        })
                        .catch(function(response) {
                            console.log(response)
                        })
                } else {
                    // 后台复制地址，手机查看
                    let that = this;
                    that.$http.post('/api/product/mall/template/queryMap/mall', {
                            'templateID': ids,
                            'templateType': 1
                        })
                        .then(function(response) {
                            if (response.data.info.length == 0) {
                                that.isTrue = false
                            } else {
                                if (response.data.info == "尚未登录") {
                                    // that.$router.push({ path: '/login' })
                                }
                                let comlists = JSON.parse(response.data.info[0].comlist)
                                //  console.log(comlists)
                                that.$store.commit('getTemplateData', comlists) //对应组件的标识
                            }
                        })
                        .catch(function(response) {
                            console.log(response)
                        })
                }
            }
        },
        watch: {
            selected(value) {
                switch (value) {
                    case '首页':
                        {
                            window.document.title = '首页';
                            break;
                        }
                    case '分类':
                        {
                            this.$root.$emit('classification', {
                                companyId: this.companyid
                            });
                            window.document.title = '商品列表';
                            break;
                        }
                    case '购物车':
                        {
                            this.$root.$emit('loadShopcar');
                            window.document.title = '购物车';
                            break;
                        }
                    case '我的':
                        {
                            this.$root.$emit('loadUserinfo');
                            window.document.title = '个人中心';
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
                sessionStorage.setItem('select_index', value);
            }
        },
        methods: {
            // 登录
            tologin() {
                this.getAppId().then(flag => {
                    if (flag) {
                        let companyid = sessionStorage.getItem('companyId');
                        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid +
                            '&redirect_uri=http://pay.jingrunjia.com.cn?company=' + companyid +
                            '&response_type=code&scope=snsapi_userinfo&state=STATE';
                        location.href = url;
                    }
                });
            },
            //获取appId
            getAppId() {
                return new Promise((resolve, reject) => {
                    let that = this;
                    let companyid = sessionStorage.getItem('companyId');
                    this.$http.get('/api/product/order/weixin/config?companyId=' + companyid)
                        .then(res => {
                            if (res.data.status == 200) {
                                this.appid = res.data.info.appid;
                                resolve(true);
                            } else {
                                resolve(false);
                                Toast(res.data.msg);
                            }
                        })
                        .catch(err => {
                            resolve(false);
                            // Toast('appid获取失败');
                        })
                })
            },
            getURLparms(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            },
            //获取用户openid
            getOpenid() {   
                return new Promise((resolve, reject) => {
                    let that = this;
                    this.$http.get('/api/product/order/weixin/user?companyId=' + this.companyid + '&code=' + this.code)
                        .then(res => {
                            if (res.data.info.code) {
                                let openid = res.data.info.openId;
                                sessionStorage.setItem('openId', openid);
                                resolve(true);
                            } else {
                                resolve(false);
                                // Toast(res.data.msg);
                                // Toast('xxx');
                            }
                        })
                        .catch(err => {
                            Toast('获取openid失败');
                            console.log(err);
                            resolve(false);
                        })
                })
            }
        },
        components: {
            homepage,
            templatePages,
            classifiCation,
            shopCar,
            userInfo
        },
        beforeDestroy() {
            this.$root.$off('switchindex');
            // let userinfo_location=operatelocalstorage('userinfo',null,'get',null);
            // if(userinfo_location!=null){
            //     operatelocalstorage('userinfo',userinfo_location,'set',30);
            // }
        }
    }
</script>
<style>
     /* li{
       list-style: none;
     }  */
     .page-tabbar {
         overflow: hidden;
         height: 100vh;
     }
     .page-wrap {
         overflow: auto;
         height: 92%;
         padding-bottom: 47.5px;
     }
     /* .tabbar-xs .mint-tab-item{
          padding:.3rem 0;
      } */
     .tabbar-xs {
         position: fixed;
         z-index: 9999;
     }
     .tabbar-xs .iconfont {
         display: block;
         padding-bottom: .1rem;
     }
     
</style>