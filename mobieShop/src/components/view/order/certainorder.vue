<template>
    <div class='contain certainorder_xs'>
        <div class='msg-customer'>
            <img class='avatar' src="static/images/bgimg.png" alt="">
            <div class='msgs'>
                <p class='name'>{{username}} {{phone}}</p>
                <p class='area'><i class='icon iconfont icon-dingwei'></i>{{address}}</p>
            </div>
            <div class='more'>
                <p class='icon iconfont icon-arrow-right-copy'></p>
            </div>
        </div>
        <div class='msg-goods'>
            <h3 class="title">确认商品信息</h3>
            <ul class='detail'>
                <li v-for='(item,index) in goodslist' :key='index'>
                    <div class='img-goods'>
                        <img src="item.imgurl" alt="">
                    </div>
                    <div class='msg'>
                        <p class='name'>{{item.name}}</p>
                        <p class='brand'>品牌：{{item.brand}}</p>
                        <p class='area'>服务区域：{{item.area_service}}</p>
                    </div>
                    <div class='tips'>
                        <p class='price'>￥{{item.price_unit}}</p>
                        <p class='oper'>
                            <span>数量</span>
                            <span>{{item.num}}</span>
                            <i class='icon iconfont icon-edit_icon' @click="changenums(index)"></i>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class='price-total'>
            <span class='tip'>金额合计：</span>
            <span class='value'>￥{{totalprice}}</span>
        </div>
        <div class='service-time'>
            <p>
                <span class='tip' >可预约服务时间</span>
                <span class='data'>{{servicedate}}</span>
                <i class='icon iconfont icon-arrow-right-copy' style='position:absolute;right:.2rem;' @click="popupVisible = true"></i>   
            </p>
            
            <mt-popup v-model="popupVisible" position="bottom" class="popup">
                <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true'>
                    <p class='btn-group'>
                        <button class='cancle' @click='cancledate'>取消</button>
                        <button class='certain' @click="getdate">确定</button>
                    </p>
                    
                </mt-picker>
            </mt-popup>
            
        </div>
        <div class='invoice'>
            <!-- <router-link class='tip' to='/invoice'>我要开发票</router-link> -->
            <p>
                <span class='tip'>我要开发票</span>
                <i class='icon iconfont icon-arrow-right-copy' style='position:absolute;right:.2rem;'  @click='makeinvoice'></i>   
            </p>
            
        </div>
        <div class='type-pay'>
            <p>
                <span class='typepay'>
                    <img src="static/images/bgimg.png" alt="">
                    <span class='type'>微信支付</span>
                </span>
                <span class='select'>
                    <input type="checkbox" v-model='checked'>
                    <span class='check checked' @click="selectpaytype($event)"></span>
                </span>
            </p>
        </div>
        <div class='submitorder'>
            <span class='msgs'>
                <p>共1件产品</p>
                <p>合计：<span class='price'>￥300</span></p>
            </span>
            <button class='submit'>提交订单</button>
        </div>
    </div>
</template>
<script>
import {formatdate} from '../../../assets/javascript/formatdate.js'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            checked:'checked',
            username:'徐X',
            phone:'1505816****',
            address:'上海市浦东新区',
            goodslist:[
                {
                    name:'fashion',
                    brand:'禾目',
                    area_service:'上海',
                    price_unit:200,
                    num:1,
                    imgurl:''
                },
                {
                    name:'fashion2',
                    brand:'禾目',
                    area_service:'上海',
                    price_unit:300,
                    num:10,
                    imgurl:''
                }
            ],

            servicedate:'',
            datechange:'',
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
            ]
        }
    },
    computed:{
        totalprice(){
            let total=0;
            this.goodslist.forEach(item=>{
                total+=item.price_unit*item.num
            });
            return total;
        }
    },
    created:function(){
        this.$root.$emit('header','确认订单');
    },
    methods:{
        selectpaytype(e){
            let classname=e.target.getAttribute('class');
            if(classname=='check'){
                e.target.setAttribute('class','check checked');
                this.checked='checked';
            }
            else{
                e.target.setAttribute('class','check');
                this.checked='';
            }
        },
        onValuesChange(picker,values){
            this.datechange=values;
            // console.log(values);
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
            this.servicedate=date;
            this.popupVisible=false;
        },
        cancledate(){
            this.popupVisible=false;
        },
        makeinvoice(){
            this.$router.push('/invoice');
        },
        changenums(index){
            MessageBox.prompt('请输入数量').then(({ value }) => {
                if(isNaN(value)){
                    Toast('请输入数字');
                }
                else{
                    this.goodslist[index].num=value;
                }
            }).catch(()=>{});
        }
    }
}
</script>

<style scoped>
.contain{
    font-size: .28rem;
    text-align: left;
    background-color: #e9e9e9;
    margin-top:40px;
}
.msg-customer{
    padding:.4rem .2rem;
    background-color: #fff;
    overflow: hidden;
}
.msg-customer .avatar,
.msg-customer .msgs{
    float: left;
}
.msg-customer .avatar{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
}
.msg-customer .msgs{
    width: 4.6rem;
    margin-left: .5rem;
    padding-top: .1rem;
    text-align: left;
}
.msg-customer .msgs .name{
    margin-bottom: .2rem;
}
.msg-customer .msgs .area{
    color: #787878;    
}
.msg-customer .more{
    padding-left: .2rem;
    border-left: 1px solid #cdcdcd;
    float: right;
}
.msg-customer .more p{
    height: 1rem;
    line-height: 1rem;
    font-size: .6rem;
    color: #787878;
    display: block;
}
.msg-goods{
    margin-top: .2rem;
    background-color: #fff;
}
.msg-goods .title{
    padding:.3rem .2rem;
}
.msg-goods .detail{
    overflow: hidden;
    padding: .3rem 0;
    border-top: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
}
.msg-goods .detail li{
    overflow: hidden;
    padding: .3rem 0;
}
.msg-goods .img-goods{
    width: 2.2rem;
    height: 2rem;
    border-radius: 5%;
    box-shadow: 0 0 0.1rem #cdcdcd;
    border:1px solid #cdcdcd;
    margin-left:.2rem;
    float: left;
}
.msg-goods .msg{
    margin-left: .3rem;
    padding-top: .2rem;
    float: left;
}
.msg-goods .msg .name{
    font-size: .4rem;
    padding-bottom: .3rem;
}
.msg-goods .msg .brand,
.msg-goods .msg .area{
    font-size: .25rem;
    padding-bottom: .3rem;
}

.msg-goods .tips p{
    text-align: right;
    padding-right: .2rem;
    padding-top: .4rem;
}
.msg-goods .tips p.oper{
    margin-top: .5rem;
}
.msg-goods .tips p.oper span{
    padding: 0 .2rem;
}
.msg-goods .tips p.oper button{
    background-color: #fff;
    border: none;
    outline:none;
    margin-left: .2rem;
}
.price-total{
    padding:.4rem .2rem;
    overflow: hidden;
    background-color: #fff;
}
.price-total .tip{
    height: .4rem;
    line-height: .4rem;
    font-size: .28rem;
    float: left;
}
.price-total .value{
    height: .4rem;
    line-height: .4rem;
    font-size: .4rem;
    float: right;
}
.type-pay{
    height: 3.65rem;
    background-color: #fff;
    padding: .4rem .2rem;
    margin-top: .2rem;
    overflow: hidden;
    position: relative;
}
.type-pay>p{
    height: 1rem;
    line-height: 1rem;
}
.type-pay .typepay{
    height: 1rem;
    line-height: 1rem;
    display: inline-block;
}
.type-pay .typepay img{
    width: .7rem;
    height: .7rem;
    margin-top: .08rem;
    border-radius: 10%;
    float: left;
}
.type-pay .typepay .type{
    height: 1rem;
    line-height: 1rem;
    font-size: .3rem;
    display: inline-block;
    margin-left: .3rem;
}
.type-pay .select{
    float: right;
}
.type-pay .select input[type='checkbox']{
    position: absolute;
    right: .25rem;
    top: .7rem;
    opacity: 0;
    z-index: 1;
}
.type-pay .check{
    width: .4rem;
    height: .4rem;
    display: inline-block;
    border: 1px solid;
    border-radius: 50%;
    z-index: 99;
    position: absolute;
    right:.25rem;
    top: .55rem;
}
.type-pay .checked{
    width: .45rem;
    height: .45rem;
    border:none;
    background: url(/static/images/selected.png) no-repeat round;
}
.service-time{
    margin-top:.2rem;
    background-color: #fff;
    padding: .4rem .2rem;
}
.service-time .tip{
    /* color:#46c5d9; */
}
.service-time .data{
    padding-left: .5rem;
}
.invoice{
    margin-top:.2rem;
    background-color: #fff;
    padding: .4rem .2rem;
}
.invoice .tip{
    /* color:#46c5d9; */
    
}
.submitorder{
    padding: .2rem;
    background-color: #f1f1f1;
}
/* .submitorder .msg{

} */
.submitorder .msgs p:first-child{
    font-size: .2rem;
    color: #787878;
}
.submitorder .msgs p:last-child{
    font-size: .28rem;
    padding-top: .2rem;
}
.submitorder .msgs .price{
    font-size: .35rem;
    color: orange;
}
.submitorder .submit{
    width: 3rem;
    height: .8rem;
    margin-top: -0.75rem;
    background:linear-gradient(180deg,#11bcbc, #46c5d9);
    border:1px solid #31B1B0;
    border-radius: .5rem;
    color: #fff;
    outline:none;
    float: right;
}
.btn-group{
    padding:.2rem 0;
    border-bottom:1px solid #eaeaea;
    text-align: center;
}
.btn-group button{
    background: none;
    border: none;
    color:#46c5d9;
    font-size: .3rem;
    padding: 0 1.5rem;
    outline: none;
}
</style>
<style>
.certainorder_xs .popup{
    width: 100%;
}
.certainorder_xs .popup .picker-slot-wrapper,.certainorder_xs .popup .picker-item {
          backface-visibility: hidden;
        }
        
</style>
