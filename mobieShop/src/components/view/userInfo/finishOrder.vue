<template>
    <div class='CmyOveroder'>
        <section>
            <div class="wrap2">
                <div class="goods_list">
                    <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading"  infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li v-for="(item,index) in list" :key="index">
                            <div class='title' @click.stop='toOrderDetail(item.number)'>
                                <span class='tip font'>退款完成</span>
                            </div>
                            <div class='content' @click.stop='toOrderDetail(item.number)'>
                                <div class='detail' v-for='(commodity,index1) in item.orderDetails' :key='index1' >
                                    <div class='img-goods'>
                                        <img :src="commodity.image" alt="图片丢失">
                                    </div>
                                    <div class='detail-goods'>
                                        <h3 class='name'>{{commodity.commodityName}}</h3>
                                        <P class='area'>{{commodity.condition1Name}}</P>
                                        <p class='date'>{{commodity.condition2Name}}</p>
                                    </div>
                                    <div class='price'>
                                        <p>￥{{commodity.price}}</p>
                                        <p>x{{commodity.saleNumber}}</p>
                                    </div>
                                </div>
                                <div class='price-total'>
                                    <p>合计：<span class='total'>￥{{item.actualMoney}}</span></p>
                                </div>
                                <!-- <div class='operation'>
                                    <button class='prime pay' @click.stop="invoice">申请开票</button>
                                    <button @click.stop='refund(item)'>退款</button>
                                </div> -->
                            </div>
                        </li>
                        <!--底部判断是加载图标还是提示“全部加载”-->
                        <li class="more_loading" >
                            <mt-spinner type="snake" :size="20" v-show="moreLoading&&!allLoaded">加载中...</mt-spinner>
                            <span v-show="allLoaded">已全部加载</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {MessageBox} from 'mint-ui';
    import { Toast } from 'mint-ui'; 
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                // queryLoading: false,
                moreLoading: false,
                allLoaded: false,
                pageNum: 1,
                list: []
            }
        },
        created(){
            this.$root.$on('loadorder_finish',()=>{
                if(this.list.length==0){
                    this.getOrderlist_finish(1);
                }  
            });
        },
        methods: {
            getOrderlist_finish(pagenum){
                if(pagenum==1){
                    Indicator.open();
                    this.list=[];
                }
                let that=this;
                this.$http.post('/api/product/order/mall/find?pageSize=5&pageNo='+pagenum,{orderState:5})
                .then(res=>{
                    if(res.data.status==200){
                        res.data.info.list.forEach(item=>{
                            that.list.push(item);
                        });
                        let length=res.data.info.list.length;
                        if(length<5){
                            that.allLoaded=true;
                        }
                        else if(length==5){
                            that.pageNum+=1;
                        }
                    }
                    else{
                        Toast(res.data.msg);
                    }
                    Indicator.close();
                })
                .catch(err=>{
                    console.log(err);
                    Indicator.close();
                    Toast('数据载入出错！');
                })
            },
            toOrderDetail(ordernumber){
                this.$router.push('orderDeil?ordernumber='+ordernumber+'&index='+null);
            },
            loadMore() {
                // console.log(this.allLoaded,this.queryLoading);
                if (this.allLoaded) {
                    this.moreLoading = true;
                    return;
                }
                else{
                    this.getOrderlist_finish(this.pageNum);
                }
            },
            // invoice(){

            // },
            // //退款
            // refund(data){
            //     sessionStorage.setItem('orderdetail',JSON.stringify(data));
            //     this.$router.push('applyRefund');
            // }
        },
        beforeDestroy(){
            this.$root.$off('loadorder_finish');
        }
    }
</script>
<style>
    .CmyOveroder .mint-cell-value {
        width: 100%;
    }
    .CmyOveroder .mint-cell-wrapper {
        padding-left: 0;
    }
    .CmyOveroder .mint-cell-swipe-button {
        font-size: 0.3rem;
        line-height: 3rem;
    }
    .CmyOveroder .mint-cell-wrapper {
        border-bottom: none;
        padding-bottom: 0.2rem;
    }
    .CmyOveroder .more_loading{
        text-align:center;
        font-size:0.3rem;
        padding-top: .2rem;
    }
    .CmyOveroder .mint-spinner-snake{
        margin-left: 45%;
    }
</style>
<style scoped lang='less'>
    .status{
        font-size: .26rem;
        color: #26a2ff;
        text-align: left;
        padding: .3rem .2rem;
        border-bottom: 1px solid #e9e9e9;
    }
    .goods_list{
        
        ul{
            background-color: #f5f5f5;
            li{
                margin-bottom:.2rem;
                background-color: #fff;
            }
        }
        
    }
    // .ordercell{
    //     margin-bottom: 0.2rem;
    //     background-color: #fff;
    //     overflow: hidden;
    // }
    .grey{
        background-color: #f5f5f5;
    }
    .title{
        font-size: 0.26rem;
        padding: 0.3rem 0.2rem;
        overflow: hidden;
        border-bottom: 1px solid #e9e9e9;
    }
    .title .tip{
        float: left;
        color: #26a2ff;
    }
    .title .time-remain{
        color: #cdcdcd;
        float: right;
    }
    .detail{
        padding: .2rem 0;
        border-bottom: 1px solid #e9e9e9;
        overflow: hidden;
        position: relative;
        .refund{
            position: absolute;
            top:1.5rem;
            right:.2rem;
            outline: none;
            background-color: #fff;
            border:1px solid #26a2ff;
            padding:.05rem .3rem;
            border-radius: .1rem;
        }
    }
    .appointment{
        /* text-align: right; */
        margin-top:1.8rem;
        /* position: absolute; */
        width:100%;
        overflow: hidden;
    }
    .appointment span{
        width: 5rem;
        text-align: left;
        font-size: .3rem;
        float: left;
        margin-top: .2rem;
        margin-left: .3rem;
    }
    .appointment button{
        /* position: absolute;
        bottom:.2rem;
        right:.2rem; */
        background-color: #26a2ff;
        outline: none;
        border:0;
        color:#fff;
        padding:.1rem .2rem;
        margin-right:.2rem;
        border-radius: .1rem;
        float: right;
    }
    .img-goods{
        width: 2.2rem;
        height: 2rem;
        font-size: .2rem;
        border-radius: 5%;
        box-shadow: 0 0 0.1rem #e9e9e9;
        border:1px solid #e9e9e9;
        margin-left:.2rem;
        float: left;
    }
    .detail-goods{
        width: 3.8rem;
        margin-left: .3rem;
        text-align: left;
        float: left;
    }
    .detail-goods .name{
        font-size: .35rem;
        padding-top: .1rem;
        padding-bottom: .1rem;
    }
    .detail-goods p{
        color:#787878;
    }
    .detail-goods p.name-sub{
        font-size: .28rem;
        padding-bottom: .2rem;
    }
    .detail-goods p.area,
    .detail-goods p.date{
        font-size: .22rem;
        padding-bottom: .2rem;
    }
    .price{
        position: absolute;
        font-size: .28rem;
        right:.2rem;
        top:.6rem;
        /* float: right; */
        /* margin-right: .2rem; */
        /* padding-top: .6rem; */
    }
    .price p{
        padding-top: .1rem;
    }
    .price p:last-child{
        font-size: .25rem;
        color: #787878;
    }
    .price-total{
        font-size: .35rem;
        padding: .2rem;
        text-align: right;
        border-bottom: 1px solid #e9e9e9;
        /* border-top: 1px solid #e9e9e9; */
    }
    .price-total .total{
        font-size: .5rem;
        color: #f38650;
    }
    .operation{
        overflow: hidden;
        padding: .2rem 0;
    }
    .operation button{
        width: 1.8rem;
        float: right;
        padding: .15rem .2rem;
        margin-right: .2rem;
        border:1px solid #26a2ff;
        border-radius: .1rem;
        background-color: #fff;
    }
    .operation button.prime{
        background-color: #26a2ff;
        color: #fff;
    }
</style>