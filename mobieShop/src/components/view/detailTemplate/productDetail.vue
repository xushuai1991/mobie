<template>
    <div id="zbd-productParameters" class="clear">
        <div class="productDetail">
            <div class="productsTitle">
                <p>{{ zbdCommodityInfo.name }}</p>
            </div>
            <div class="productsDescription">
                <p>{{ zbdCommodityInfo.description==null?'':zbdCommodityInfo.description }}</p>
            </div>
            <div class="productDetailRMB">
                <p>RMB</p>
                <p v-show='zbdCommodityInfo.options =="null" ||zbdCommodityInfo.options == null ||zbdCommodityInfo.options == ""?true:false'>{{ zbdCommodityInfo.price == ''?0:zbdCommodityInfo.price }}</p>
                <p v-show='zbdCommodityInfo.options =="null" ||zbdCommodityInfo.options == null ||zbdCommodityInfo.options == ""?false:true'>{{ zbdCommodityInfo.minPrice}}<span>-</span>{{ zbdCommodityInfo.maxPrice }}</p>
            </div>
        </div>
        <div class="productReview">
            <div class="productsTitleNum">
                <p class="commentsNum">{{ evaluationTotals>1000?"999+":evaluationTotals==''?'0':evaluationTotals }}</p>
                <p class="commentsNumTitle">用户评价</p>
            </div>
        </div>
        <!-- <div class="commodityPrice">
            
        </div> -->
        <div class="commodityStocks">
            <p style="">已交易：<span>{{ zbdCommodityInfo.totalSales }}</span><span style="color:#292929">（库存量：{{ zbdCommodityInfo.displayQuantity<1||zbdCommodityInfo.displayQuantity==''?0:zbdCommodityInfo.displayQuantity }}）</span></p>
        </div>
    </div>
</template>
<script>
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    import {operatelocalstorage} from '../../../assets/javascript/localstorage_hasdata.js'
    export default {
        props: ['zbdCommodityInfo', 'evaluationTotals', 'zbdHostName', 'zbdPort', 'zbdCommodityId', 'zbdBannerArr2'],
        data() {
            return {};
        },
        created() {
            console.log(this.zbdCommodityInfo + '111111')
        },
        beforeUpdate() {
            this.share();
        },
        methods: {
            share() {
                let userInfo = localStorage.getItem('userinfo');
                let nickname =userInfo==null?'': (JSON.parse(JSON.parse(userInfo).data))?(JSON.parse(JSON.parse(userInfo).data)).nickname:""
                let companyId = sessionStorage.getItem("companyId")
                if (companyId == null) {
                    companyId = this.getURLparms('companyId')
                }
                let that = this;
                //  alert("http://"+that.zbdHostName+that.zbdPort+that.zbdBannerArr2[0].url)
                let curHref = window.location.href
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
                        title: that.zbdCommodityInfo.name, // 分享标题
                        desc: nickname + " 分享:" + that.zbdCommodityInfo.description ? that.zbdCommodityInfo.description : '', // 分享描述
                        link: 'http://'+location.hostname+'/detailTemplate?commodityId=' + that.zbdCommodityId + "&companyId=" + companyId, // 分享链接
                        imgUrl: "http://"+location.hostname+":8887" + encodeURI(that.zbdBannerArr2[0].url),
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
            getURLparms(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            }
        }
    };
</script>
<style>
    #zbd-productParameters {
        font-size: 0.2rem;
        text-align: left;
        padding: 0.5rem 0.1rem 0.4rem 0.3rem;
        border-top: 0.12rem solid #efefef;
    }
    #zbd-productParameters .productDetail {
        float: left;
        width: 74%;
    }
    #zbd-productParameters .productsTitle {
        padding-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #zbd-productParameters .productsDescription {
        padding-bottom: 0.2rem;
        font-size: 0.24rem;
    }
    #zbd-productParameters .productDetailRMB {
        padding-bottom: 0.2rem;
        font-size: 0.3rem;
        padding-left: 0.06rem;
    }
    #zbd-productParameters .productReview {
        width: 20%;
        float: left;
        text-align: center;
    }
    #zbd-productParameters .productsTitleNum {
        padding: 0.3rem 0.15rem 0.3rem 0.15rem;
        -moz-box-shadow: 0px 0px 2px #f4f4f4;
        -webkit-box-shadow: 0px 0px 2px #f4f4f4;
        box-shadow: 0px 0px 0.2rem #f4f4f4;
    }
    #zbd-productParameters .commentsNum {
        font-size: 0.28rem;
        color: #f0670b;
        padding-bottom: 0.15rem;
    }
    #zbd-productParameters .commentsNumTitle {
        font-size: 0.14rem;
    }
    #zbd-productParameters .productDetailRMB {
        width: 95%;
        float: left;
    }
    #zbd-productParameters .productDetailRMB p:nth-child(1){
        font-family: Helveticaneueltpro;
        font-style:normal;
        width: 14%;
        display: inline-block;
    }
    #zbd-productParameters .productDetailRMB p:nth-child(2),#zbd-productParameters .productDetailRMB p:nth-child(3) {
        padding-bottom: 0.2rem;
        font-size: 0.45rem;
        color: #f0670b;
        padding-left: 0.1rem;
        margin-top: 0.1rem;
        width: 81%;
        display: inline-block;
    }
    #zbd-productParameters .commodityStocks {
        width: 100%;
        float: left;
        text-align: right;
    }
    #zbd-productParameters .commodityStocks p {
        font-size: 0.22rem;
        color: #1d1d1d;
        padding-top: 0.34rem;
    }
</style>
