import axios from 'axios'
let weixinPay=function(config){
    let onBridgeReady=function(){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            config,
            (res)=>{
                alert(res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    that.alert('支付成功');
                    window.location.reload();
                }
                if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    that.alert('取消支付');
                    window.location.reload();
                }
            }
        );
    };
    let callpay=function(){
        alert(222);
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