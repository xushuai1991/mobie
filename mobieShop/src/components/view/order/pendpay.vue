<template>
    <div class='pendpay' >
        <div class='title' @click.stop='toOrderDetail(data.number,index)'>
            <span class='tip'>待付款</span>
            <span class='time-remain'>还剩{{date_ramian}}</span>
            <!-- <div class='time-remain'></div> -->
        </div>
        <div class='content' @click.stop='toOrderDetail(data.number,index)'>
            <div class='detail' v-for='(item,index) in data.orderDetails' :key='index'>
                <div class='img-goods'>
                    <img :src='"http://"+hostName+":"+port+"/api"+item.image' alt="图片丢失">
                </div>
                <div class='detail-goods'>
                    <h3 class='name'>{{item.commodityName}}</h3>
                    <!-- <P class='name-sub'>休闲舒适 潮男标配 SM1212</P> -->
                    <P class='area'>{{item.condition1Name}}</P>
                    <p class='date'>{{item.condition2Name}}</p>
                </div>
                <div class='price'>
                    <p>￥{{item.price}}</p>
                    <p>x{{item.saleNumber}}</p>
                </div>
                <!-- 服务类商品，添加预约时间功能 -->
                <div class='appointment' v-if='item.isService==true'>
                    
                    <button  @click.stop="appointment(item.id)">{{item.appointTime==null?'预约时间':'修改时间'}}</button>
                    <span>服务时间：{{item.appointTime==null?'空':item.appointTime.substring(0,16)}}{{((item.updateAppointTimeIsActive&&item.updateAppointTime!=null)||item.updateAppointTime==null)?'':'('+'已修改'+')'}}</span>
                </div>
            </div>
            <div class='price-total'>
                <p>合计：<span class='total'>￥{{data.actualMoney}}</span></p>
            </div>
            <div class='operation'>
                <button class='prime pay' @click.stop="pay">付款</button>
                <button class='cancle' @click.stop="cancleOrder">取消订单</button>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true' >
                <p class='btn-group'>
                    <button class='cancle' @click.stop='cancledate'>取消</button>
                    <button class='certain' @click.stop="getdate">确定</button>
                </p>
            </mt-picker>
        </mt-popup>
        
    </div>

</template>
<script>
import {formatdate} from '../../../assets/javascript/formatdate.js'
import { Toast } from 'mint-ui'; 
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    props:['data','index'],
    data(){
        return{
            date_ramian:'',
            date_dead:'',
            popupVisible:false,
            dates:[
                {
                    values: ['今天', '明天', '后天'],  
                    className: 'slot1',  
                    textAlign: 'left'  
                },
                {
                    flex: 1,  
                    values: ['00点','01点','02点','03点','04点','05点',
                            '06点','07点','08点','09点','10点','11点',
                            '12点','13点','14点','15点','16点','17点',
                            '18点','19点','20点','21点','22点','23点'],  
                    className: 'slot2',  
                    textAlign: 'center'  
                },
                {
                    values: ['00分', '10分','20分','30分','40分','50分',],  
                    className: 'slot3',  
                    textAlign: 'right'  
                }
            ],
            currentid:'',
            datechange:''
        }  
    },
    created(){
         this.hostName = location.hostname;
        this.port = location.port;
        let date_create=new Date(this.data.createTime);
        this.date_dead=new Date(date_create.getTime() + 24*60*60*1000);
        this.countDown();
        // console.log(date_dead,date_remain_ts,date_remain_h,date_remain_m,date_remain_s);
    },
    methods:{
        //剩余时间
        getRemianTime(){
            // console.log(111);
            //当前时间
            let date_current=new Date();
            // 当前离截止时间的时间
            let date_remain_ts=this.date_dead-date_current;
            let date_remain_h=Math.floor(date_remain_ts/1000/60/60%24);;
            let date_remain_m=Math.floor(date_remain_ts/1000/60%60);
            // let date_remain_s=Math.floor(date_remain_ts/1000%60);
            this.date_ramian=   date_remain_h+'小时'+date_remain_m+'分'
        },
        //倒计时
        countDown(){
            let that=this;
            this.getRemianTime()
            setInterval(function(){that.getRemianTime()},60000);
        },
        changeStatusOrder(data,msg){
            let that=this;
            Indicator.open('操作中');
            this.$http.post('/api/product/order/mall/update',data)
            .then(res=>{
                if(res.data.status==200){
                    Toast(msg+'成功');
                    that.$root.$emit('loaddata',this.index);
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
        // 唤醒时间插件
        appointment(id){
            this.popupVisible=true;
            this.currentid=id;
        },
        onValuesChange(picker,values){
            console.log(values);
            this.datechange=values;
        },
        // 修改订单明细
        updateOrderdetail(id,updateAppointTime){
            Indicator.open('修改申请提交中...');
            let that=this;
            this.$http.post('/api/product/order/mall/update/orderDetail',[{id:id,updateAppointTime:updateAppointTime}])
            .then(res=>{
                if(res.data.status==200){
                    Toast('申请提交成功！');
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
                Indicator.close();
            })
            .catch(err=>{
                console.log(err);
                Indicator.close();                
            })
        },
        getdate(){
            let day=new Date();
            if(this.datechange[0]=='今天'){
                day=day.format('yyyy-MM-dd');
            }
            else if(this.datechange[0]=='明天'){
                day=new Date(day.setDate(day.getDate()+1)).format('yyyy-MM-dd');
            }
            else if(this.datechange[0]=='后天'){
                day=new Date(day.setDate(day.getDate()+2)).format('yyyy-MM-dd');
            }
            // console.log(this.datechange);
            let date=day+' '+this.datechange[1].substring(0,2) +':'+this.datechange[2].substring(0,2);
            date=Date.parse(new Date(date));
            this.updateOrderdetail(this.currentid,date);
            // console.log(date);
            // this.data.time=date;
            // 修改服务时间
            // let con1=this.data.orderDetails[this.currentindex].condition1Name;
            // let con2=this.data.orderDetails[this.currentindex].condition2Name;
            // if(con1.indexOf("服务时间") > 0){
            //     this.data.orderDetails[this.currentindex].condition1Name='服务时间：'+date;
            // }
            // else if(con2.indexOf("服务时间") > 0){
            //     this.data.orderDetails[this.currentindex].condition2Name='服务时间：'+date;                
            // }
            
            this.popupVisible=false;
        },
        cancledate(){
            this.popupVisible=false;
        },
        //跳转订单详情
        toOrderDetail(ordernumber,index){
            this.$router.push('orderDeil?ordernumber='+ordernumber+'&index='+index);
            sessionStorage.setItem('orderdetail',JSON.stringify(this.data));
        },
        //取消订单
        cancleOrder(){
            // console.log(this.index);
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
    },
    computed:{
        // totalmoney(){
        //     let total=0;
        //     for(let item of this.data.orderDetails==null?[]:this.data.orderDetails){
        //         total+=item.price*item.saleNumber;
        //     }
        //     return total;
        // }
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
/* .price{
    width: 1rem;
    float: left;
} */
</style>

