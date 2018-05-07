<template>
    <div class='pendpay'>
        <div class='title' @click.stop='toOrderDetail(data.number,index)'>
            <span class='tip'>待服务</span>
        </div>
        <div class='content' @click.stop='toOrderDetail(data.number,index)'>
            <div class='detail' v-for='(item,index) in data.orderDetails' :key='index'>
                <div class='img-goods'>
                    <img :src='"http://"+hostName+":"+port+"/api"+item.image' alt="图片丢失" style='width:100%;height:100%;'>
                </div>
                <div class='detail-goods'>
                    <h3 class='name'>FASHION</h3>
                    <!-- <P class='name-sub'>休闲舒适 潮男标配 SM1212</P> -->
                    <!-- <P class='area'>服务区域：萧山区</P>
                    <p class='date'>服务预约时间：2018-2-5</p> -->
                    <P class='area'>{{item.condition1Name}}</P>
                    <p class='date'>{{item.condition2Name}}</p>
                </div>
                <div class='price'>
                    <p>￥{{item.price}}</p>
                    <p>x{{item.saleNumber}}</p>
                </div>
                <div class='appointment' v-if='true'>
                    <button  @click.stop="appointment">预约时间</button>
                </div>
            </div>
            <div class='price-total'>
                <p>合计：<span class='total'>￥{{data.actualMoney}}</span></p>
            </div>
            <div class='operation'>
                <!-- <button class='prime appoint' @click='appointment'>预约时间</button> -->
                <button class='apply' @click.stop='application'>申请退款</button>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true'>
                <p class='btn-group'>
                    <button class='cancle' @click.stop='cancledate'>取消</button>
                    <button class='certain' @click.stop="getdate">确定</button>
                </p>
            </mt-picker>
        </mt-popup>
    </div>

</template>
<script>
export default {
    props:['data','index'],
    data(){
        return{
            currentindex:'',
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
                },
                
            ],
            datechange:''
        }  
    },
    created(){
        this.hostName = location.hostname;
        this.port = location.port;
    },
    computed:{
        // totalmoney(){
        //     let total=0;
        //     // console.log(this.data);
        //    for(let item of this.data.orderDetails==null?[]:this.data.orderDetails){
        //         total+=item.price*item.saleNumber;
        //     }
        //     return total;
        // }
    },
    methods:{
        
        appointment(index){
            
            this.popupVisible=true;
            this.currentindex=index;
        },
        onValuesChange(picker,values){
             
            this.datechange=values;
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
            let date=day+' '+this.datechange[1].substring(0,2) +':'+this.datechange[2].substring(0,2);
            this.data.time=date;
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
        //申请退款
        application(){
            this.$router.push({path:'applyRefund'})
            sessionStorage.setItem('orderdetail',JSON.stringify(this.data));
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
.appointment{
    text-align: right;
    margin:1.8rem 0 .2rem 0;
    /* position: absolute; */
    width:100%;
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
}
</style>

