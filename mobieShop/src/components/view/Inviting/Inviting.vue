<template>
    <div id="invite-register" class=''>
        <!-- <h2 style='font-size:0.5rem; color:#fff;'>到家商城邀请注册</h2> -->
        <div class="invite-top background">
            <div><img id="sharePic" :src='totalSrc' /></div>
            <p>微信扫一扫</p>
            <p>邀请好友“注册”即可获5积分</p>
        </div>
        <div class='tips'>
            <p class='title'><span></span> 我的邀请记录 <span></span></p>
            
            <div class='msg'>
                <div class='icon'></div>
                <p class=''>已成功邀请<span class='font'>{{peopleinvited}}</span>人</p>
                <p class=''>已获得<span class='font'>{{scoregeted}}</span>积分</p>                
            </div>
        </div>
        <router-link to='/InvitingRegular' class='linkto font'>邀请规则</router-link>
        <div class='background-tip' @click='cancelback($el)'></div>
        
    </div>
</template>


<script>
    // import wx from 'weixin-js-sdk';
    import {
        Toast
    } from 'mint-ui';
    import {
        Button
    } from 'mint-ui';
    import {
        MessageBox
    } from 'mint-ui';
    import {
        Indicator
    } from 'mint-ui';
    export default {
        data() {
            return {
                totalSrc: '',
                wxSrc:this.url_qrcode+'?content=',
                address: 'http://'+location.host+'/invitingGift',
                // address: '10.1.1.206:8080',                
                shareUrl: '/invitingGift',
                paramData: '',
                peopleinvited:0,
                scoregeted:0
            }
        },
        created() {
            this.hostName = location.hostname;
            if (!sessionStorage.getItem(sessionStorage.getItem("tiemId"))) {
                sessionStorage.setItem(sessionStorage.getItem("tiemId"), 1)
                location.reload();
            }
            if (!this.getQueryString('recommendedCustomerId')) {
                Toast("你好请登陆后再分享");
                setTimeout(() => {
                    window.history.go(-1);
                }, 1000)
            }
            this.share()
            this.shareUrlFn()
            this.$root.$emit('header', '邀请注册');
            this.getMsgabout();
        },
        methods: {
            // 获取用户的邀请信息
            getMsgabout(){
                let that=this;
                this.$http.post('/api/customer/consumption/points/find',{channel: 5, remarks: "邀请注册赠送积分"})
                .then(res => { 
                    if(res.data.status == 200){
                        console.log(res)
                        that.peopleinvited=res.data.info.list.length;
                        let score_every=res.data.info.list.length==0?0:res.data.info.list[0].increasedPoints;
                        that.scoregeted=res.data.info.list.length*score_every;
                    }else{
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            cancelback(e){
                e.querySelector('.background-tip').style.display='none';
                console.log(e);
            },
            shareUrlFn() {
                let curHref = window.location.href;
                let companyid=sessionStorage.getItem('companyId');
                this.paramData = this.getQueryString('recommendedCustomerId') // 获取url中的参数
                if (curHref.indexOf('&') === -1) {
                    let url=this.address+'?recommendedCustomerId=' + this.paramData+'&companyId='+companyid;
                    this.totalSrc = this.wxSrc +escape(url);
                    console.log(url)
                } else {
                    return
                }
            },
            share() {
                let userInfo = localStorage.getItem("userinfo")
                let nickname = (JSON.parse(JSON.parse(userInfo).data))?(JSON.parse(JSON.parse(userInfo).data)).nickname:""
                let companyId = sessionStorage.getItem("companyId")
                if(companyId==null){
                    companyId = this.getURLparms('companyId')
                }
                let that = this;
                let curHref = window.location.href.split('#')[0]
                let promisel = new Promise((resolve, reject) => {
                    let url = '/api/product/js/weixin/config';
                    this.$http({
                        url: '/api/product/js/weixin/config',
                        method: "post",
                        data: {
                            companyId:companyId,
                            url:curHref
                        }
                    }).then((res) => {
                        resolve(res.data.info)
                        console.log(res)
                    }).catch((err) => {
                        reject(err)
                    })
                })
                promisel.then((data) => {
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
                        title: '到家商城邀请注册', // 分享标题
                        desc: nickname + ' 邀请你到家商城邀请注册有礼', // 分享描述
                        link: 'http://'+that.hostName+'/InvitingGift?recommendedCustomerId=' + that.paramData+"&companyId="+companyId, // 分享链接
                        imgUrl: that.totalSrc, // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            this.$router.push("/Inviting")
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
                }, (err) => {
                    console.log(err)
                })
            },
            getURLparms(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            },
            // register() {
            //     Indicator.open({
            //         text: '加载中...',
            //         spinnerType: 'fading-circle'
            //     });
            //     let that = this;
            //     this.$http.get(
            //         'http://192.168.199.102/customer/resource/qrCode.png?content=http://localhost:8080/inviting'
            //     ).then(res => {
            //         // that.wxSrc = res.data
            //         Indicator.close();
            //         // this.$router.path('/InvitingResult','成功或者失败');
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            // shareToWX() {
            //     MessageBox.confirm('确定分享到微信吗?').then(action => {
            //         console.log("分享成功!");
            //     }).catch(err => {
            //         console.log("取消分享");
            //     })
            // },
            // shareToQQ() {
            //     MessageBox.confirm('分享到QQ?').then(action => {
            //         console.log("分享成功!");
            //     }).catch(err => {
            //         console.log("取消分享");
            //     })
            // },
            // shareToWXSpace() {
            //     // MessageBox.confirm('分享到微信朋友圈?').then(action => {
            //     //     console.log("分享成功!");
            //     // }).catch(err => {
            //     //     console.log("取消分享");
            //     // })
            //     wx.onMenuShareTimeline({
            //         title: '', // 分享标题
            //         link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //         imgUrl: '', // 分享图标
            //         success: function() {
            //             // 用户确认分享后执行的回调函数
            //         },
            //         cancel: function() {
            //             // 用户取消分享后执行的回调函数
            //         }
            //     });
            // },
            // shareToQQSpace() {
            //     MessageBox.confirm('分享到QQ空间?').then(action => {
            //         console.log("分享成功!");
            //     }).catch(err => {
            //         console.log("取消分享");
            //     })
            // },
            // shareTo(stype){
            //     var ftit = '绿城';
            //     var flink = '';
            //     var lk = 'http://'+window.location.host+'/static/images/logo.png';
            //     // console.log(lk)
            //     //获取网页中内容的第一张图片
            //     flink = document.getElementById('sharePic').getAttribute('src')
            //     //如果是上传的图片则进行绝对路径拼接
            //     if(flink.indexOf('/uploads/') != -1) {
            //         lk = 'http://'+window.location.host+flink;
            //     }
            //     //qq空间接口的传参
            //     if(stype=='qzone'){
            //         window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+this.totalSrc+'&desc=绿城');
            //     }
            //     //qq好友接口的传参
            //     if(stype == 'qq'){
            //         window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+this.totalSrc+'&desc=绿城');
            //     }
            //     //生成二维码给微信扫描分享
            //     if(stype == 'wechat'){
            //         window.open('http://192.168.199.102/customer/resource/qrCode.png?content=http://localhost:8080/inviting');
            //     }
            // },
            getQueryString(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                return null;
            }
        }
    }
</script>
<style>
    html,
    body {
        height: 100%;
    }
</style>
<style lang="less" scoped>
    #invite-register {
        height: 100%;
        min-height: 12rem;
        // background: #409EFF;
        font-size: .24rem;
        // padding-top: .7rem;
        letter-spacing: 0.01rem;
    }
    .background-tip{
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 999;
        position: fixed;
        top: 0;
        left:0;
        // background-image: url("/static/images/back_tip.png");
        background-image: url("/static/images/back_tip.png");
        background-position-y: -1rem;
        background-size: cover;
    }
    .invite-top {
        background: #409EFF;    
        padding-top: .5rem;    
        padding-bottom: .5rem;
        // margin: 0.7rem 0.2rem;
        // margin-top: .5rem;
        // padding: 0.1rem;
        border-radius: .08rem;
        div:nth-child(1) {
            margin: auto;
            padding:.3rem;
            background: #fff;            
            width: 3.3rem;
            height: 3.3rem;
            
            img {
                width: 100%;
                height: 100%;
            }
        }
        div:nth-child(2) {
            width: 1.5rem;
            margin: .3rem auto .55rem;
            cursor: pointer;
        }
        p:nth-child(2){
            color: #fff;
            font-size: .25rem;
            margin-top: .2rem;
        }
        p:nth-child(3){
            color: #fff;
            margin-top: .3rem;
            font-size: .35rem;
        }






        // li:nth-child(3) {
        //     font-size: .3rem;
        // }
        // li:nth-child(4) {
        //     font-size: .3rem;
        //     margin: .45rem 0 .6rem 0;
        //     span {
        //         color: #409EFF;
        //     }
        // }
        // li:nth-child(5) {
        //     width: 1.5rem;
        //     opacity: 0.5;
        //     cursor: pointer;
        //     margin: auto;
        // }
    }
    .tips{
        
        width:6rem;
        margin:0 auto;
        margin-top: 1rem;
        // border:1px solid #FCBF01;
        border-radius: .2rem;
        padding-top: .5rem;
        padding-bottom: .2rem;
        box-shadow:0px 0px 2px #FCBF01;
        span{
            color:#409EFF;
            padding: 0 .1rem;
        }
        .title{
            padding-bottom: .2rem;
            color:#7e8c8d;
            span{
                width: 1rem;
                height:1px;
                background-color: #d9d9d9;
                display: inline-block;
            }
            span:nth-child(1){
                margin-right: .2rem;
            }
            span:nth-child(2){
                margin-left: .2rem;
            }
        }
        .msg{
            position: relative;
            margin-top: .3rem;
            .icon{
                width:.8rem;
                height:1rem;
                background-image: url("/static/images/style1-icon.png");
                background-size:cover;
                background-repeat: no-repeat;
                position: absolute;
                left: 1.2rem;;
            }
            p{
                padding-left: 1.5rem;
                font-size: .3rem;
                padding-bottom: .4rem;
            }
        }
        
    }
    .linkto{
        color: #409EFF;
        font-size: .3rem;
        margin-top: .5rem;
        display: block;
    }
    .invite-bottom {
        margin-top: .6rem;
        padding: 0.2rem;
        background: #fff;
        padding-top: .5rem;
        p.bottom-title {
            font-size: .3rem;
            opacity: 0.8;
        }
        p.bottom-title::before {
            display: inline-block;
            content: '';
            width: 2.5rem;
            background: #eee;
            height: 0.04rem;
            vertical-align: 40%;
            margin-right: 0.5rem;
        }
        p.bottom-title::after {
            display: inline-block;
            content: '';
            width: 2.5rem;
            height: 0.04rem;
            background: #eee;
            vertical-align: 40%;
            margin-left: 0.5rem;
        }
        .invite-bottom-share {
            padding-top: 0.35rem;
            display: flex;
            justify-content: space-around;
            li {
                border-radius: 50%;
                .imgDiv {
                    width: 1rem;
                    height: 1rem;
                    line-height: 1rem;
                    border-radius: 50%;
                    margin: 0.3rem auto 0.3rem;
                    p {
                        color: #fff;
                        font-size: 0.7rem;
                    }
                }
                .imgDiv1 {
                    background: green;
                    p {
                        font-size: 0.55rem;
                    }
                }
                .imgDiv2 {
                    background: #409EFF;
                }
                .imgDiv3 {
                    background: #32D561;
                }
                .imgDiv4 {
                    background: #FCBF01;
                }
                p {
                    font-size: 0.25rem;
                    opacity: 0.8;
                }
            }
        }
    }
</style>
