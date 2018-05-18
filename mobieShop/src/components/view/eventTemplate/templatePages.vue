<template>
    <div class="page-navbar" id='activitytemplatePage'>
        <!-- <div class="searchTop clear">
            <div class='code'><i data-v-13ee4bcf="" class="icon iconfont icon-erweima "></i></div>
            <div class="page-search">
                <mt-search autofocus v-model="value"></mt-search>
            </div>
            <div class='notice'><i data-v-13ee4bcf="" class="icon iconfont icon-tongzhi "></i></div>
        </div> -->
            <keep-alive v-for='(item,index) in comlist' :key='index'>
              <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
            </keep-alive>
    </div>
</template>

<script>
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
                activeImages:'',
                activeId:'',
                templateId:'',
                activityTitle:''
            };
        },
        created(){
            this.hostName = location.hostname;
            this.port = location.port;
            let that = this;
            ///////活动模板///////
            //浏览状态 / 手机显示状态
            let isBrowse = sessionStorage.getItem ("isBrowse");
            console.log(isBrowse)
            if(isBrowse == true){
                this.eventTemplateUrl = sessionStorage.getItem ("eventTemplateUrl");
                let companyId = sessionStorage.getItem("companyId");
                let id = this.getUrlParms("id")
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
            }else if(isBrowse == null){
                this.templateId = this.getURLparms("templateId");
                let companyId = this.getURLparms("companyId");
                let activeId = this.getURLparms("activeId");
                this.activeId = activeId
                 this.$http.post('/api/product/activity/find?pageSize=1&pageNo=1',
                    {
                        'id':activeId,
                        'companyId':companyId
                    }
                )
                .then(function(response){
                    console.log(response.data.info.list[0])
                    let datasss = response.data.info.list[0]
                    that.activeImages = "http://"+that.hostName+":"+that.port+"/api"+datasss.image
                    that.desc = datasss.note
                    that.activityTitle = datasss.activityTitle
                })
                .catch(function(response){
                    console.log(response)
                })
                if(companyId == null || companyId == 'null'){
                    companyId = sessionStorage.getItem("companyId");
                }
                let that=this;
                this.$http.post('/api/product/mall/template/queryMap/mall',
                    {
                        'templateID':that.templateId,
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
                        link: 'http://'+location.hostname+'/eventTemplate?templateId=' + that.templateId + "&companyId=" + companyId+'&activeId='+that.activeId, // 分享链接
                        //imgUrl: "http://"+location.hostname+":8887" + encodeURI(that.zbdBannerArr2[0].url),
                        imgUrl: that.activeImages,
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
        width: 80%;
        float: left;
    }
</style>
