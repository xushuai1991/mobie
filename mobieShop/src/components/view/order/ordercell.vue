<template>
    <div class='ordercell' >
        <div class='title' @click.stop='toOrderDetail(data.number,index)'>
            <span class='tip font'>{{status}}</span>
            <span class='time-remain' v-if='data.payState==2&data.orderState==1'>还剩{{date_ramian}}</span>
            <!-- <div class='time-remain'></div> -->
        </div>
        <div class='content' @click.stop='toOrderDetail(data.number,index)'>
            <div :class='{"detail":true,"grey":(type=="unservice"&item.serviceState!=1)||(type=="inservice"&item.serviceState!=2)}' v-for='(item,index1) in orderdetails' :key='index1' >
                <div class='img-goods'>
                    <img :src='"http://"+hostName+":"+port+"/api"+item.image' alt="图片丢失" style="width:100%;height:100%;">
                </div>
                <div class='detail-goods'>
                    <h3 class='name'>{{item.commodityName}}</h3>
                    <P class='area'>{{item.condition1Name==''||item.condition1Name==':'?'':item.condition1Name}}</P>
                    <p class='date'>{{item.condition2Name==''||item.condition2Name==':'?'':item.condition2Name}}</p>
                </div>
                <div class='price'>
                    <p>￥{{item.price}}</p>
                    <p>x{{item.saleNumber}}</p>
                </div>
                <div class='appointment' v-if='item.isService==true'>
                    <button class='button' v-show='data.canBeRefund==true?true:false'  @click.stop="openByDrop({index:index1,e:$event,commodityid:item.commodityId,orderdetailid:item.id,templateId:item.commodityInfo.periodTemplateId,type:'add'})">预约时间</button>                    
                    
                    <!-- <button class='button'  @click.stop="openByDrop({index:index1,e:$event,commodityid:item.commodityId,orderdetailid:item.id,templateId:item.commodityInfo.periodTemplateId,type:item.appointments==null?'add':'edit',appointid:item.appointments==null?null:item.appointments.id})">{{item.appointments==null?'预约时间':'修改预约'}}</button>                     -->
                    <!-- <span>服务时间：{{item.appointments==null?'无':(item.appointments.startTime.substring(0,10)+' '+item.appointments.startTime.substring(11,16)+'-'+ item.appointments.endTime.substring(11,16)+(item.appointments.isService==0?'(待确认)':''))}}</span> -->
                </div>
                <div class='servicetime' v-if='item.isService' >
                    <div class='appoint' v-if='item.appointments!=null'>
                        <div>
                            <p>Date</p>
                        </div>
                        <div>
                            <p>Time</p>
                        </div>
                        <div>
                            <p>Num</p>
                        </div>  
                        <div>
                            <p>State</p>
                        </div>  
                        <div style='text-align:left;text-indent:.3rem;'>
                            <p>Oper</p>
                        </div>                        
                    </div>
                    <div class='appoint' v-for='(appoint,index2) in item.appointments' :key='index2'>
                        <div>
                            <p>{{appoint.startTime.substring(0,10)}}</p>
                        </div>
                        <div>
                            <p>{{appoint.startTime.substring(11,16)+'-'+appoint.endTime.substring(11,16)}}</p>
                        </div>
                        <div>
                            <p>X{{appoint.number}}</p>
                        </div>
                        <div>
                            <p>{{appoint.isService==1?'确认':'待确认'}}</p>
                        </div>
                        <div>
                            <button  class='prime editttime' @click.stop="openByDrop({index:index1,index_appoint:index2,appointid:appoint.id,e:$event,commodityid:item.commodityId,orderdetailid:item.id,templateId:item.commodityInfo.periodTemplateId,type:'edit'})">修改</button>
                        </div>                                
                    </div>
                </div>
            </div>
            <div class='price-total'>
                <p>合计：<span class='total'>￥{{data.actualMoney}}</span></p>
            </div>
            <div class='operation'>
                <button class='prime pay button' style='padding:.16rem .2rem' @click.stop="pay" v-if='data.payState==2&data.orderState==1'>付款</button>
                <button class='cancle border' @click.stop="cancleOrder" v-if='(data.payState==2||data.payState==3)&data.orderState==1'>取消订单</button>
                <button class='prime follow button' style='padding:.16rem .2rem' v-if='type=="inservice"'>追单</button>
                <button class='apply border' @click.stop='application' v-show='data.canBeRefund' v-if='data.payState==1&&data.orderState!=4&data.orderState!=5&data.actualMoney!=0'>申请退款</button>
                <button class='invoice border' @click.stop='invoice(data.id,data.actualMoney)' v-show='data.canApplyInvoice' v-if='data.orderState==2&data.actualMoney!=0'>申请发票</button>
                
            </div>
        </div>
        <!-- <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true' >
                <p class='btn-group'>
                    <button class='cancle font' @click.stop='cancledate'>取消</button>
                    <button class='certain font' @click.stop="getdate">确定</button>
                </p>
            </mt-picker>
        </mt-popup> -->
    </div>
</template>
<script>
import {formatdate} from '../../../assets/javascript/formatdate.js'
import { Toast } from 'mint-ui'; 
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    props:['data','index','type','indexorder'],
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
                    textAlign: 'center',
                    defaultIndex:0
                },
                {
                    values:['00分', '10分','20分','30分','40分','50分'],
                    className: 'slot3',  
                    textAlign: 'right'  
                }
            ],
            currentid:'',
            datechange:'',
            type_appoint:'',
            index_appoint:'',
            orderdetails:this.data.orderDetails
            // status:''
        }  
    },
    created(){
        var d = new Date();
        var hour = d.getHours();
        this.dates[1].defaultIndex=hour+1;
        this.hostName = location.hostname;
        this.port = location.port;
        let date=this.data.createTime.replace(/\-/g,'/');
        let date_create=new Date(date);
        this.date_dead=new Date(date_create.getTime() + 24*60*60*1000);
        this.countDown();
    },
    methods:{
        openByDrop(data) {
            // console.log(data);
            data.indexorder=this.indexorder;
            data.type_index=this.index;

            this.$root.$emit('calendar',data)
        },
        // test(){
        //     this.$root.$emit('calendar')
        // },
        //剩余时间
        getRemianTime(){
            //当前时间
            let date_current=new Date();
            // 当前离截止时间的时间
            let date_remain_ts=this.date_dead-date_current;
            let date_remain_h=Math.floor(date_remain_ts/1000/60/60%24);;
            let date_remain_m=Math.floor(date_remain_ts/1000/60%60);
            // let date_remain_s=Math.floor(date_remain_ts/1000%60);
            // alert(date_remain_h);
            // alert(date_remain_m);
            this.date_ramian= date_remain_h+'小时'+date_remain_m+'分'
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
        appointment(id,index){
            this.index_appoint=index;
            this.popupVisible=true;
            this.currentid=id;
            // console.log(this.data.orderDetails[this.index_appoint].appointTime);
        },
        onValuesChange(picker,values){
            var d = new Date();     
            var hour = d.getHours();
            if(values[0]=='今天'&&this.dates[1].values.indexOf(values[1])<hour+1){
                picker.setSlotValue(1, this.dates[1].values[hour+1]);
            }
            this.datechange=values;
        },
        // 修改订单明细
        updateOrderdetail(id,updateAppointTime,date){
            let data=[{id:id,updateAppointTime:updateAppointTime,updateAppointTimeIsActive:false}];
            // 第一次预约时间
            // if(this.data.orderDetails[this.index_appoint].appointTime==null){
            //     data=[{id:id,appointTime:updateAppointTime,updateAppointTime:null,updateAppointTimeIsActive:false}];
            // }
            // else{
            //     data=[{id:id,updateAppointTime:updateAppointTime}];
            // }
            Indicator.open('修改申请提交中...');
            let that=this;
            this.$http.post('/api/product/order/mall/update/orderDetail',data)
            .then(res=>{
                if(res.data.status==200){
                    let msg='申请提交成功！';
                    console.log(that.indexorder,document.querySelectorAll('.orderlist')[that.index].querySelectorAll('li'));
                    let dom=document.querySelectorAll('.orderlist')[that.index].querySelectorAll('li')[that.indexorder].querySelectorAll('.detail')[that.index_appoint].querySelector('.appointment');
                    dom.querySelector('span').innerHTML='服务时间：'+date+'(待确认)';
                    dom.querySelector('button').innerHTML='修改时间';



                    // if(this.data.orderDetails[this.index_appoint].appointTime==null){
                    //     msg='预约时间成功！';
                    //     that.data.orderDetails[that.index_appoint].appointTime=date;
                    //     dom.querySelector('span').innerHTML='服务时间：'+date;
                    //     dom.querySelector('button').innerHTML='修改时间';
                    // }
                    // else{
                    //     msg='申请提交成功！';
                    //     // dom.querySelector('span').innerHTML=dom.querySelector('span').innerHTML.substring(0,21)+'(待确认)';
                    //     dom.querySelector('span').innerHTML='服务时间：'+date+'(待确认)';
                    // }
                    Toast(msg);
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
            let day2=new Date();
            if(this.datechange[0]=='今天'){
                day=day.format('yyyy/MM/dd');
                day2=day2.format('yyyy-MM-dd');
            }
            else if(this.datechange[0]=='明天'){
                day=new Date(day.setDate(day.getDate()+1)).format('yyyy/MM/dd');
                day2=new Date(day2.setDate(day2.getDate()+1)).format('yyyy-MM-dd');
            }
            else if(this.datechange[0]=='后天'){
                day=new Date(day.setDate(day.getDate()+2)).format('yyyy/MM/dd');
                day2=new Date(day2.setDate(day2.getDate()+2)).format('yyyy-MM-dd');                
            }
            // console.log(this.datechange);
            let date=day+' '+this.datechange[1].substring(0,2) +':'+this.datechange[2].substring(0,2);
            let date2=day2+' '+this.datechange[1].substring(0,2) +':'+this.datechange[2].substring(0,2);
            let timestampToTime=Date.parse(new Date(date));
            this.updateOrderdetail(this.currentid,timestampToTime,date2);
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
            // sessionStorage.setItem('orderdetail',JSON.stringify(this.data));
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
            this.$router.push('paying?number='+this.data.number+'&money='+this.data.actualMoney);
            // console.log('付款。。。');
        },
        // 申请退款
        application(){
            this.$router.push({path:'applyRefund'})
            sessionStorage.setItem('orderdetail',JSON.stringify(this.data));
        },
        // 申请开发票
        invoice(orderid,totalprice){
            this.$router.push('/invoice?orderid='+orderid+'&totalprice='+totalprice);
        }
    },
    computed:{
        status(){
            if(this.data.payState==2){
                return this.data.orderState==6?'已取消':'未支付';
            }
            else{
                return this.data.orderState==1?"未完成":this.data.orderState==2?"已完成":this.data.orderState==3?"异常订单":this.data.orderState==4?"退款中":this.data.orderState==5?"退款完成":this.data.orderState==6?'已取消':this.data.orderState==7?"驳回":"";
            }
        }
        // totalmoney(){
        //     let total=0;
        //     for(let item of this.data.orderDetails==null?[]:this.data.orderDetails){
        //         total+=item.price*item.saleNumber;
        //     }
        //     return total;
        // }
    },
    watch:{
        data(){
            console.log(1111);
        }
    }
}
</script>
<style scoped lang='less'>
.ordercell{
    margin-bottom: 0.2rem;
    background-color: #fff;
    overflow: hidden;
}
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
}
.appointment{
    /* text-align: right; */
    /* margin-top:1.8rem; */
    position: absolute;
    top:1.5rem;
    width:100%;
    overflow: hidden;
}
.appointment span{
    width: 5rem;
    text-align: left;
    font-size: .25rem;
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
.img-goods img{
    width: 100%;
    height: 100%;
    border-radius: 5%;
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
    padding-top: .2rem;
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
.detail .servicetime {
    font-size: .25rem;
    padding: .1rem 0;
    clear: both;
    .appoint{
        padding:.1rem .2rem;
        overflow: hidden;
        text-align: left;
        div{
            width:25%;
            float: left;
            line-height: .4rem;
            p{
                padding:.1rem 0;
            }
        }
        div:nth-child(3){
            width:17%;
            // padding-left: .3rem;
        }
        div:nth-child(4){
            width:13%;
            font-size: .2rem;
        }
        div:nth-child(5){
            width: 20%;
            text-align: center;
        }
        button.editttime{
            font-size: .25rem;
            width:60%;
            padding:.07rem 0;
            margin-top: .03rem;
            outline: none;
            border-radius: .1rem;
            border:1px solid grey;
            background-color: transparent;
        }
    }
    .appoint:nth-child(odd){
        background-color: #eaeaea;
        
    }
    .appoint:nth-child(even){
        background-color: #f6f6f6;
    }
    .appoint:nth-child(1){
        background-color: #f6f6f6;
        padding: 0 .2rem;
        background-color: white;
        div:nth-child(4){
            font-size: .25rem;
        }
    }
}
</style>

