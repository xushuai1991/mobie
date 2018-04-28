<template>
    <div class="page-navbar" id='homepage'>
        <div class="searchTop clear">
            <div class='code' @click='share'><i data-v-13ee4bcf="" class="icon iconfont icon-erweima "></i></div>
            <div class="page-search">
                <mt-search v-model="value"></mt-search>
            </div>
            <div class='notice'><i data-v-13ee4bcf="" class="icon iconfont icon-tongzhi "></i></div>
        </div>
        <div class="page-navbar">
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">推荐</mt-tab-item>
                <mt-tab-item id="2">家电保养</mt-tab-item>
                <mt-tab-item id="3">家居保养</mt-tab-item>
                <mt-tab-item id="4">空气净化</mt-tab-item>
                <mt-tab-item id="5">净水</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <recommend></recommend>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
    import recommend from '@/components/view/homepage/recommend/recommend.vue'
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        data() {
            return {
                selected: '1',
                value: ''
            };
        },
        methods: {
            share() {
                let companyId = localStorage.getItem("companyId")
                let that = this;
                let curHref = window.location.href
                // let promisel = new Promise((resolve, reject) => {
                let url = '/api/product/js/weixin/config';
                this.$http({
                    url: '/api/product/js/weixin/config?companyId=' + 79 + '&url=' + curHref,
                    methods: "post",
                    data: {}
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
                    wx.ready(function() {
                        wx.scanQRCode({
                            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function(res) {
                                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            }
                        });
                    });
                })
                // })
                // promisel.then((data) => {
                // }, (err) => {
                //     console.log(err)
                // })
            },
        },
        computed: {},
        components: {
            recommend
        },
    };
</script>
<style>
    #homepage .mint-searchbar-inner .mintui-search {
        color: #fff;
        font-size: 0.4rem;
        padding: 0 0.2rem;
    }
    #homepage .mint-searchbar-inner {
        background: rgba(100, 100, 100, 0.2);
    }
    #homepage .mint-searchbar {
        background: #fff;
    }
    #homepage .mint-searchbar-core {
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
    #homepage .code,
    #homepage .notice {
        width: 10%;
        float: left;
    }
    #homepage .code i,
    #homepage .notice i {
        font-size: 0.55rem;
        position: relative;
        top: -0.1rem;
    }
    #homepage .mint-search {
        height: 100%;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #homepage .page-search {
        width: 80%;
        float: left;
    }
</style>
