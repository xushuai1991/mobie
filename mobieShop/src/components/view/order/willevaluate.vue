<template>
    <div class='pendpay'>
        <div class='title' @click.stop='toOrderDetail(data.number,index)'>
            <span class='tip font'>待评价</span>
        </div>
        <div class='content' @click.stop='toOrderDetail(data.number,index)'>
            <div :class='{"detail":true,"haseval":item.evaluation!=null}' v-for='(item,index) in data.orderDetails' :key='index'>
                <div class='img-goods'>
                    <img :src='"http://"+hostName+":"+port+"/api"+item.image' alt="图片丢失" style='width:100%;height:100%;'>
                </div>
                <div class='detail-goods'>
                    <h3 class='name'>{{item.commodityName}}</h3>
                    <P class='area'>{{item.condition1Name}}</P>
                    <p class='date'>{{item.condition2Name}}</p>
                </div>
                <div class='price'>
                    <p>￥{{item.price}}</p>
                    <p>x{{item.saleNumber}}</p>
                </div>
            </div>
            <div class='price-total'>
                <p>合计：<span class='total'>￥{{onValuesChange}}</span></p>
            </div>
            <div class='operation'>
                <button class='prime evaluate button' style='padding:.16rem .2rem' @click.stop='evaluate'>评价</button>
                <button class='invoice border' @click.stop='invoice(data.id,data.actualMoney)'>申请发票</button>
                <!-- <button class='check'>查看报告</button> -->
                <!-- <button class='complaint'>投诉</button> -->
            </div>
        </div>
    </div>

</template>
<script>
export default {
    props:['data','index'],
    data(){
        return{

        }  
    },
    created(){
         this.hostName = location.hostname;
        this.port = location.port;
        // console.log(this.data);
    },
    computed:{
        // 申请开发票
        invoice(orderid,totalprice){
            this.$router.push('/invoice?orderid='+orderid+'&totalprice='+totalprice);
        }
        // totalmoney(){
        //     let total=0;
        //     for(let item of this.data.orderDetails==null?[]:this.data.orderDetails){
        //         total+=item.price*item.saleNumber;
        //     }
        //     return total;
        // }
    },
    methods:{
        evaluate(){
            // let order_withoutevaluate=[];
            // this.data.orderDetails.forEach(item=>{
            //     if(item.evaluation==null){
            //         order_withoutevaluate.push(item.commodityId);
            //     }
            // });
            sessionStorage.setItem('orderdetail',JSON.stringify(this.data));
            this.$router.push({'name':'evaluate'});
            
            // this.$router.push({'name':'evaluate',params:{'orderlist':order_withoutevaluate}});
            
        },
        //跳转订单详情
        toOrderDetail(ordernumber,index){
            this.$router.push('orderDeil?ordernumber='+ordernumber+'&index='+index);
            // sessionStorage.setItem('orderdetail',JSON.stringify(this.data));
        },
    }
}
</script>
<style scoped>
.pendpay{
    margin-bottom: 0.2rem;
    background-color: #fff;
    overflow: hidden;
}
.haseval{
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
/* .price{
    width: 1rem;
    float: left;
} */
</style>

