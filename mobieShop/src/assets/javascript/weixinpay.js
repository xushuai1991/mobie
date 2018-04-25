import axios from 'axios'
let weixinPay=function(config,ordernumber,_this){
    
    let onBridgeReady=function(){
        
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
                "appId":config.appId,     //公众号名称，由商户传入     
                "timeStamp":config.timeStamp,         //时间戳，自1970年以来的秒数     
                "nonceStr":config.nonceStr, //随机串     
                "package":config.package,     
                "signType":config.signType,         //微信签名方式：     
                "paySign":config.paySign //微信签名 
            },
            (res)=>{
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    alert('支付成功');
                    _this.$router.push('orderDeil?ordernumber='+ordernumber+'&index=0');
                    // this.$router.push('/');
                    // window.location.reload();
                }
                if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    alert('取消支付');
                    window.location.reload();
                }
                if(res.err_msg == "get_brand_wcpay_request:fail"){
                    alert('支付失败');
                }
            }
        );
    };
    let callpay=function(){
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }            
    }
    callpay();
    // this.axios.post('/weipay/pay/unifiedorder',
    // {
    //     appid:'',//公众账号id
    //     mch_id:'',//商户号
    //     nonce_str:'',//随机字符串
    //     sign:'',//签名
    //     sign_type:'MD5',
    //     body:'',//商品描述（商家名称-销售商品类目）
    //     out_trade_no:'',//商户订单号（重新发起支付，使用原订单号，避免重复支付，已支付过或已调用关单、撤销的订单号不能重新支付使用）
    //     total_fee:'',//标价金额(分)
    //     spbill_create_ip:'',//终端ip
    //     notify_url:'',//支付结果通知地址
    //     trade_type:'JSAPI',//交易类型（JSAPI为公众号交易）
    //     openid:''//用户标志
    // })
    // .then(res=>{
    //     console.log(res);
    // })
    // .catch(err=>{
    //     console.log(err);
    //     Toast('支付失败');
    // })
}
export  {weixinPay};