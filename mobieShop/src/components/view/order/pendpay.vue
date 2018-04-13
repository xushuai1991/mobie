<template>
    <div class='pendpay'>
        <div class='title'>
            <span class='tip'>待付款</span>
            <span class='time-remain'>还剩{{date_ramian}}</span>
            <!-- <div class='time-remain'></div> -->
        </div>
        <div class='content'>
            <div class='detail' v-for='(item,index) in data.orderDetails' :key='index'>
                <div class='img-goods'>
                    <img src="" alt="">
                </div>
                <div class='detail-goods'>
                    <h3 class='name'>{{item.commodityName}}</h3>
                    <P class='name-sub'>休闲舒适 潮男标配 SM1212</P>
                    <P class='area'>{{item.condition1Name}}:服务区域：萧山区</P>
                    <p class='date'>{{item.condition2Name}}</p>
                </div>
                <div class='price'>
                    <p>￥300</p>
                    <p>x{{item.saleNumber}}</p>
                </div>
            </div>
            <div class='price-total'>
                <p>合计：<span class='total'>￥300</span></p>
            </div>
            <div class='operation'>
                <button class='prime pay' @click="pay">付款</button>
                <button class='cancle' @click="cancleOrder">取消订单</button>
            </div>
        </div>
    </div>

</template>
<script>
import { Toast } from 'mint-ui'; 
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    props:['data'],
    data(){
        return{
            date_ramian:'',
            date_dead:''
        }  
    },
    created(){
        let date_create=new Date(this.data.createTime);
        this.date_dead=new Date(date_create.getTime() + 24*60*60*1000);
        this.countDown();
        // console.log(date_dead,date_remain_ts,date_remain_h,date_remain_m,date_remain_s);
    },
    methods:{
        //剩余时间
        getRemianTime(){
            console.log(111);
            //当前时间
            let date_current=new Date();
            // 当前离截止时间的时间
            let date_remain_ts=this.date_dead-date_current;
            let date_remain_h=Math.floor(date_remain_ts/1000/60/60%24);;
            let date_remain_m=Math.floor(date_remain_ts/1000/60%60);
            let date_remain_s=Math.floor(date_remain_ts/1000%60);
            this.date_ramian=   date_remain_h+'小时'+date_remain_m+'分'+date_remain_s+'秒'
        },
        //倒计时
        countDown(){
            let that=this;
            setInterval(function(){that.getRemianTime()},1000);
        },
        changeStatusOrder(data,msg){
            let that=this;
            Indicator.open('操作中');
            this.$http.post('/api/product/order/mall/update',data)
            .then(res=>{
                if(res.data.status==200){
                    Toast(msg+'成功');
                }
                else{
                    Toast(res.data.msg);
                }
                Indicator.close();
            })
            .catch(err=>{
                Indicator.close();
                Toast(msg+'失败');
            })
        },
        //取消订单
        cancleOrder(){
            MessageBox({
                title: '',
                message: '是否取消订单?',
                showCancelButton: true
            }).then((flag)=>{
                if(flag=='confirm'){
                    let data=[
                        {
                            id:this.data.id,
                            number:this.data.number,
                            orderState:6
                        }
                    ];
                    this.changeStatusOrder(data,'取消订单');
                }
                else{
                    return;
                }
            });
            
        },
        //付款
        pay(){
            console.log('付款。。。');
        }
    }
}
</script>
<style scoped>
.pendpay{
    margin-bottom: 0.2rem;
    background-color: #fff;
    overflow: hidden;
}
.title{
    font-size: 0.26rem;
    padding: 0.3rem 0.2rem;
    overflow: hidden;
    border-bottom: 1px solid #e9e9e9;
}
.title .tip{
    float: left;
    color: #31B1B0;
}
.title .time-remain{
    color: #cdcdcd;
    float: right;
}
.detail{
    padding: .2rem 0;
    border-bottom: 1px solid #e9e9e9;
    overflow: hidden;
}
.img-goods{
    width: 2.2rem;
    height: 2rem;
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
    font-size: .4rem;
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
    font-size: .28rem;
    float: right;
    margin-right: .2rem;
    padding-top: .6rem;
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
    border:1px solid #31B1B0;
    border-radius: .1rem;
    background-color: #fff;
}
.operation button.prime{
    background-color: #31B1B0;
    color: #fff;
}
/* .price{
    width: 1rem;
    float: left;
} */
</style>

