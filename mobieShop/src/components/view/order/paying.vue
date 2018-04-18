<template>
    <div class='paying-xs'>
        <p class='orderid'>{{id}}</p>
        <p class='money'>￥{{money}}</p>
        <p class='cheques'>
            <span style='float:left;color:#787878;'>收款人</span>
            <span style='float:right;'>{{cheques}}</span>
        </p>
        <button class='pay' @click="pay">立即支付</button>
    </div>
</template>
<script>
import {weixinPay} from '../../../assets/javascript/weixinpay.js'
import { Toast } from 'mint-ui'; 
export default {
    data(){
        return{
            money:'20.00',
            id:'XX眼镜',
            cheques:'禾目',
            code:'',
            orderNumber:''
        }
    },
    created(){
        this.$root.$emit('header','确认交易');
        let url=location.search;
        let number=this.getQueryString('number');
        this.orderNumber=number!=null?number:'';
        // let number=this.$route.params.number;
        // if(number==undefined){
        //     Toast('支付失败,请从订单列表支付');
        // }
        // else{
        //     this.orderNumber=this.$route.params.number;
        // }
        
        // console.log(code);
    },
    methods:{
        getQueryString(name) { 
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) return unescape(r[2]); 
            return null; 
        },
        pay(){
            let that=this;
            // alert(this.orderNumber);
            
            this.$http.post('/api/product/order/weixin/pay',[this.orderNumber])
            .then(res=>{
                // Toast(res);
                if(res.data.status==200){
                    if(res.data.info.code){
                        let data=res.data.info;
                        let config={
                            appId:data.appId,
                            timeStamp:data.timeStamp,
                            nonceStr:data.nonceStr,
                            package:data.package,
                            signType:data.signType,
                            paySign:data.paySign
                        };
                        // Toast(config.appId);
                        weixinPay(config);
                    }
                    else{
                        Toast(res.data.info.desc);
                    }
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>
<style scoped lang='less'>
.paying-xs{
    margin-top:1rem;
    padding-top:.5rem;
    color: black;
    .orderid{
        font-size: .35rem;
    }
    .money{
        padding:.3rem 0;
    }
    .cheques{
        padding:.3rem;
        font-size:.35rem;
        border-top:1px solid #cdcdcd;
        border-bottom:1px solid #cdcdcd;
        overflow: hidden;
        margin-top:.5rem;
    }
    .pay{
        width:80%;
        border:none;
        outline: none;
        padding: .3rem;
        background-color:rgb(70,193,24);
        color:#fff;
        margin-top:.5rem;
    }
}
</style>
