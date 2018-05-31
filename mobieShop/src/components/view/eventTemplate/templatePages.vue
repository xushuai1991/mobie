<template>
    <div class="page-navbar" id='templatePage'  style='-webkit-overflow-scrolling : touch;'>
            <keep-alive v-for='(item,index) in comlist' :key='index'>
              <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
            </keep-alive>
    </div>
</template>

<script>
import Mint from 'mint-ui';
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    import {
        Toast
    } from 'mint-ui'
    // import { mapState,mapMutations,mapGetters } from 'vuex'
    import imageAds from '@/components/view/template/imageAds.vue'
    import classification from '@/components/view/template/classification.vue'
    import titles from '@/components/view/template/titles.vue'
    import commodity from '@/components/view/template/commodity.vue'
    import detailsImage from '@/components/view/template/detailsImage.vue'
    import window from '@/components/view/template/window.vue'
    import window2 from '@/components/view/template/window2.vue'
    export default {
        data() {
            return {
                selected: '1',
                value: '',
                comlist:'',
                eventTemplateUrl:'',
                hostName:'',
                port:'',
                activeIds:'',
                templateIds:'',
                activityTitle:'',
                activeImages:''
            };
        },
        created(){
            this.hostName = location.hostname;
            this.port = location.port;
            let that = this;
            //浏览状态 / 手机显示状态 
            let isBrowse;
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                isBrowse = false;
            } else {
                isBrowse = true;
            }
           // console.log(isBrowse+'是否为后台浏览')
            if(isBrowse){
            //后台活动模板列表点击浏览时 查询对应id的活动模板信息    
                //this.eventTemplateUrl = sessionStorage.getItem ("eventTemplateUrl");
                let companyId = sessionStorage.getItem("companyId");
                let id = this.getURLparms("id");
                 console.log(id)
                  let that=this;
                    this.$http.post('/api/product/mall/template/queryMap/mall',
                        {
                            'templateID':id,
                            'templateType':2,
                            'companyId': companyId
                        }
                    )
                    .then(function(response){
                        console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                        console.log(comlists)
                        that.comlist = comlists
                    })
                    .catch(function(response){
                        console.log(response)
                    })
            }else{
                //非后台查看活动详情或者活动模板
                let ids = this.getURLparms("id"); //活动模板ID
                if(ids == null) {
                    //根据URL查看活动详情
                    let templateId = this.getURLparms("templateId");//活动详情ID
                    this.templateIds = templateId
                    let companyId = this.getURLparms("companyId"); //活动公司ID
                    if(companyId == null || companyId == 'null'){
                        companyId = sessionStorage.getItem("companyId");
                    }

                    ///////////////查询活动对应活动模板的信息/////////////

                    this.$http.post('/api/product/mall/template/queryMap/mall',
                        {
                            'templateID':templateId,
                            'templateType':2,
                            'companyId': companyId
                        }
                    )
                    .then(function(response){
                        console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                        console.log(comlists)
                        that.comlist = comlists
                    })
                    .catch(function(response){
                        console.log(response)
                    })

                    ///////////////查询活动信息////////////////

                    let activeId = this.getURLparms("activeId"); //活动ID
                    this.activeIds = activeId
                    this.$http.post('/api/product/activity/find?pageSize=10&pageNo=1',{
                        'id':activeId
                    })
                    .then(function(res){
                        console.log(res)
                        //需要判断未登录跳转到登录页  登录后才能够分享 this.$router.push("/login")
                        if(res.data.status == 401){
                            Toast('尚未登录');
                            sessionStorage.setItem('fromgo','/eventTemplate?templateId='+templateId+'&activeId='+activeId+'&companyId='+companyId);
                            that.tologin();
                        }else{
                            // if(response.data.info.list == []){
                            //     Toast('活动信息为空')
                            // }else{
                                let activityData = response.data.info.list[0] //活动信息
                                that.activeImages = activityData.image //活动图片
                                that.desc = activityData.note  //活动标签（模板名称）
                                that.activityTitle = activityData.activityTitle //活动标题
                            // }
                        }
                    }).catch(function(res){
                        //console.log(res)
                    })
                    
                }else{
                    //根据url查看活动模板信息（复制链接到其他终端查看）
                    let companyId = this.getURLparms("companyId"); //活动公司ID
                    if(companyId == null || companyId == 'null'){
                        companyId = sessionStorage.getItem("companyId");
                    }
                      this.$http.post('/api/product/mall/template/queryMap/mall',
                            {
                                'templateID':ids,
                                'templateType':2,
                                'companyId': companyId
                            }
                        )
                        .then(function(response){
                            console.log(response)
                            let comlists = JSON.parse(response.data.info[0].comlist)
                            console.log(comlists)
                            that.comlist = comlists
                        })
                        .catch(function(response){
                            console.log(response)
                        })
                }
            }
        },
        beforeUpdate(){
             this.share();
        },
        methods:{
            share() {
                let userInfo = localStorage.getItem('userinfo');
                let nickname =userInfo==null?'': (JSON.parse(JSON.parse(userInfo).data))?(JSON.parse(JSON.parse(userInfo).data)).nickname:""
                let companyId = sessionStorage.getItem("companyId")
                if (companyId == null) {
                    companyId = this.getURLparms('companyId')
                }
                let that = this;
                //  alert("http://"+that.zbdHostName+that.zbdPort+that.zbdBannerArr2[0].url)
                let curHref = location.href
                // let promisel = new Promise((resolve, reject) => {
                let url = '/api/product/js/weixin/config';
                this.$http({
                    url: '/api/product/js/weixin/config',
                    method: "post",
                    data: {
                        companyId:companyId,
                        url: curHref
                    }
                }).then((res) => {
                    let data = res.data.info;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名，见附录1
                        jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    // wx.error(function(res) {
                    //     logUtil.printLog('验证失败返回的信息:', res);
                    // });
                    let objs = {
                        title: that.activityTitle, // 分享标题
                        desc: nickname + " 分享:" + that.desc ? that.desc : '', // 分享描述
                        link: 'http://'+location.hostname+'/eventTemplate?templateId=' + that.templateIds + "&companyId=" + companyId+'&activeId='+that.activeIds, // 分享链接
                        //imgUrl: "http://"+location.hostname+":8887" + encodeURI(that.zbdBannerArr2[0].url),
                        imgUrl: "http://"+location.hostname+":8887" + encodeURI(that.activeImages),
                        // ", // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            this.$router.push("/templatePages")
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    }
                    wx.ready(function() {
                        wx.onMenuShareAppMessage(objs);
                        wx.onMenuShareQQ(objs);
                        wx.onMenuShareWeibo(objs);
                        wx.onMenuShareQZone(objs);
                    });
                })
                // })
                // promisel.then((data) => {
                // }, (err) => {
                //     console.log(err)
                // })
            },
                //获取地址栏参数，name:参数名称
                getUrlParms(name){
                    let url = this.eventTemplateUrl
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = url.substr(1).match(reg);
                    if(r!=null)
                    return unescape(r[2]);
                    return null;
                },
                getURLparms(name){
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = location.search.substr(1).match(reg);
                    if(r!=null)
                    return unescape(r[2]);
                    return null;
                },
                // 获取appid
            getAppId(){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    let companyid=sessionStorage.getItem('companyId');
                    if(companyid==null){
                        companyid = this.getURLparms("companyId")
                    }
                    this.$http.get('/api/product/order/weixin/config?companyId='+companyid)
                    .then(res=>{
                        if(res.data.status==200){
                            that.appid=res.data.info.appid;
                            resolve(true);
                        }
                        else{
                            resolve(false);
                            Toast({
                                message: res.data.msg,
                                duration: 1000
                            });
                        }
                    })
                    .catch(err=>{
                        resolve(false);
                        Toast('appid获取失败');
                    })
                }) 
            },
            // 登录
            tologin(){
                this.getAppId().then(flag=>{
                    if(flag){
                        let companyid=sessionStorage.getItem('companyId');
                        if(companyid==null){
                          companyid = this.getURLparms("companyId")
                        }
                        let recommendedTeamId=this.$route.query.recommendedTeamId;
                        let recommendedAdminId=this.$route.query.recommendedAdminId;
                        // alert(recommendedAdminId);
                        // alert(recommendedTeamId);
                        // let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+
                        //     '&redirect_uri=http://pay.jingrunjia.com.cn?company='+companyid
                        //     +'&recommendedTeamId='+recommendedTeamId
                        //     +'&recommendedAdminId='+recommendedAdminId
                        //     +'&response_type=code&scope=snsapi_userinfo&state=STATE';
                        let json={
                            company:companyid,
                            recommendedTeamId:recommendedTeamId,
                            recommendedAdminId:recommendedAdminId
                        };
                            let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+
                            '&redirect_uri=http://pay.jingrunjia.com.cn?json='+JSON.stringify(json)
                            +'&response_type=code&scope=snsapi_userinfo&state=STATE';
                        // let url=
                        //     'http://localhost:8082?company='+companyid
                        //     +'&recommendedTeamId='+recommendedTeamId
                        //     +'&recommendedAdminId='+recommendedAdminId
                        //     +'&response_type=code&scope=snsapi_userinfo&state=STATE';
                        location.href=url;
                    }
                }); 
            }
        },
        components: {
            imageAds,
            classification,
            titles,
            commodity,
            detailsImage,
            window,
            window2
        },
    };
</script>
<style>
    #activitytemplatePage .mint-searchbar-inner .mintui-search {
        color: #fff;
        font-size: 0.4rem;
        padding: 0 0.2rem;
    }
    #activitytemplatePage .mint-searchbar-inner {
        background: rgba(100, 100, 100, 0.2);
    }
    #activitytemplatePage .mint-searchbar {
        background: #fff;
    }
    #activitytemplatePage .mint-searchbar-core {
        color: #fff;
        background: rgba(50, 50, 50, 0);
    }
</style>
<style lang="" scoped>
    .clear:after {
        content: "";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }
    #activitytemplatePage .code,
    #activitytemplatePage .notice {
        width: 10%;
        float: left;
    }
    #activitytemplatePage .code i,
    #activitytemplatePage .notice i {
        font-size: 0.55rem;
        position: relative;
        top: -0.1rem;
    }
    #activitytemplatePage .mint-search {
        height: 100%;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #activitytemplatePage .page-search {
        width: 100%;
        float: left;
    }
</style>
