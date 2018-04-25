<template>
    <div id="zbd-productParameters" class="clear">
        <div class="productDetail">
            <div class="productsTitle">
                <p>{{ zbdCommodityInfo.name }}</p>
            </div>
            <div class="productsDescription">
                <p>{{ zbdCommodityInfo.description==null?'商品':zbdCommodityInfo.description }}</p>
            </div>
            <p class="productDetailRMB">RMB</p>
        </div>
        <div class="productReview">
            <div class="productsTitleNum" @click="dsad">
                <p class="commentsNum">{{ evaluationTotals>1000?"999+":evaluationTotals==''?'0':evaluationTotals }}</p>
                <p class="commentsNumTitle">用户评价</p>
            </div>
        </div>
        <div class="commodityPrice">
            <p style="">{{ zbdCommodityInfo.price }}</p>
        </div>
        <div class="commodityStocks">
            <p style="">已交易：<span>{{ zbdCommodityInfo.totalSales }}</span><span style="color:#292929">（库存量：{{ zbdCommodityInfo.displayQuantity<1?0:zbdCommodityInfo.displayQuantity }}）</span></p>
        </div>
    </div>
</template>
<script>
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        props:['zbdCommodityInfo','evaluationTotals'],
        data() {
            return {
            };
        },
        created(){
            console.log(this.zbdCommodityInfo+'111111')
        },
        methods:{
            dsad(){
                console.log(this.zbdCommodityInfo)
            }
        }
    };
</script>
<style>
#zbd-productParameters{
    font-size: 0.2rem;text-align: left;padding: 0.5rem 0.1rem 0.4rem 0.3rem;border-top: 0.12rem solid #efefef;
}
#zbd-productParameters .productDetail{float: left;width: 74%;}
#zbd-productParameters .productsTitle{padding-bottom: 0.2rem;font-size:0.3rem;}
#zbd-productParameters .productsDescription{padding-bottom: 0.2rem;font-size:0.24rem;}
#zbd-productParameters .productDetailRMB{padding-bottom: 0.2rem;font-size:0.3rem;padding-left: 0.06rem;}
#zbd-productParameters .productReview{width: 20%;float: left;text-align: center;}
#zbd-productParameters .productsTitleNum{padding:0.3rem 0.15rem 0.3rem 0.15rem;-moz-box-shadow: 0px 0px 2px #f4f4f4;-webkit-box-shadow: 0px 0px 2px #f4f4f4;box-shadow: 0px 0px 0.2rem #f4f4f4;}
#zbd-productParameters .commentsNum{font-size:0.28rem;color:#f0670b;padding-bottom: 0.15rem;}
#zbd-productParameters .commentsNumTitle{font-size:0.14rem;}
#zbd-productParameters .commodityPrice{width:29%;float:left;}
#zbd-productParameters .commodityPrice p{padding-bottom: 0.2rem;font-size:0.7rem;color:#f0670b;padding-left: 0.1rem;}
#zbd-productParameters .commodityStocks{width: 67%;float: left;text-align: right;}
#zbd-productParameters .commodityStocks p{font-size:0.22rem;color:#1d1d1d;padding-top: 0.34rem;}
</style>
