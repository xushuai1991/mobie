<template>
    <div id="invite-register">
        <h2 style='font-size:0.5rem; color:#fff;'>到家商城邀请注册</h2>
        <ul class="invite-top">
            <li><img id="sharePic" :src='totalSrc' /></li>
            <li>微信扫一扫</li>
            <li>邀请好友获5元无门槛优惠券</li>
            <li>邀请码 : <span>025645889</span></li>
            <li>
                <router-link to='/invitingRegular'>邀请规则 >></router-link>
            </li>
        </ul>
        <!--<div class="invite-bottom">
                <p class="bottom-title">分享到</p>
                <ul class="invite-bottom-share">
                    <li>
                        <div class="imgDiv imgDiv1" @click='shareTo("wechat")'>
                            <p class="icon iconfont icon-ai-weixin"></p>
                        </div>
                        <p>微信</p>
                    </li>
                    <li>
                        <div class="imgDiv imgDiv2" @click='shareTo("qq")'>
                            <p class="icon iconfont icon-iconfonticon6"></p>
                        </div>
                        <p>QQ</p>
                    </li>
                    <li>
                        <div class="imgDiv imgDiv3" @click='share'>
                            <p class="icon iconfont icon-friends"></p>
                        </div>
                        <p>朋友圈</p>
                    </li>
                    <li>
                        <div id="nativeShare">
                            <div class="imgDiv imgDiv4">
                                <p class="icon iconfont icon-qqkongjian"></p>
                            </div>
                            <p>QQ空间</p>
                        </div>
                    </li>
                </ul>
            </div>!-->
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
                wxSrc: 'http://101.89.175.155:8887/customer/resource/qrCode.png?content=',
                address: 'http://www.itchun.com/invitingGift',
                // address: '10.1.1.206:8080',                
                shareUrl: '/invitingGift',
                paramData: ''
            }
        },
        created() {
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
        },
        methods: {
            shareUrlFn() {
                let curHref = window.location.href;
                let companyid=sessionStorage.getItem('companyId');
                this.paramData = this.getQueryString('recommendedCustomerId') // 获取url中的参数
                if (curHref.indexOf('&') === -1) {
                    let url=this.address+'?recommendedCustomerId=' + this.paramData+'&companyId='+companyid;
                    this.totalSrc = this.wxSrc +escape(url);
                    console.log(this.totalSrc)
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
                        link: 'http://www.itchun.com/InvitingGift?recommendedCustomerId=' + that.paramData+"&companyId="+companyId, // 分享链接
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
        background: #409EFF;
        font-size: .24rem;
        padding-top: .7rem;
        letter-spacing: 0.01rem;
    }
    .invite-top {
        background: #fff;
        margin: 0.7rem 0.2rem;
        padding: 0.7rem 0 0.6rem;
        border-radius: .08rem;
        li:nth-child(1) {
            width: 3.3rem;
            height: 3.3rem;
            margin: auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        li:nth-child(2) {
            width: 1.5rem;
            margin: .3rem auto .55rem;
            cursor: pointer;
        }
        li:nth-child(3) {
            font-size: .3rem;
        }
        li:nth-child(4) {
            font-size: .3rem;
            margin: .45rem 0 .6rem 0;
            span {
                color: #409EFF;
            }
        }
        li:nth-child(5) {
            width: 1.5rem;
            opacity: 0.5;
            cursor: pointer;
            margin: auto;
        }
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
