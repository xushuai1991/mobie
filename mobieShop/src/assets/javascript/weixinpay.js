import axios from 'axios'
let weixinPay=function(){
    alert(111);
    // 随机字符
    let randstr=function(){
        let str='';
        let str_arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                    '0','1','2','3','4','5','6','7','8','9'];
        for(let i=0;i<31;i++){
            let random=Math.floor(Math.random() * 58);
            str=str+str_arr[random]
        }
        return str;
    };
    let timeStamp=Date.parse(new Date()).toString().substr(0,10);
    let nonceStr=this.randstr();
    let jsApiParameters={
        "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
        "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数     
        "nonceStr":nonceStr, //随机串     
        "package":"prepay_id=u802345jgfjsdfgsdg888",     
        "signType":"MD5",         //微信签名方式：     
        "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
    };
    let onBridgeReady=function(){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            jsApiParameters,
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
    this.axios.post('/weipay/pay/unifiedorder',
    {
        appid:'',//公众账号id
        mch_id:'',//商户号
        nonce_str:'',//随机字符串
        sign:'',//签名
        sign_type:'MD5',
        body:'',//商品描述（商家名称-销售商品类目）
        out_trade_no:'',//商户订单号（重新发起支付，使用原订单号，避免重复支付，已支付过或已调用关单、撤销的订单号不能重新支付使用）
        total_fee:'',//标价金额(分)
        spbill_create_ip:'',//终端ip
        notify_url:'',//支付结果通知地址
        trade_type:'JSAPI',//交易类型（JSAPI为公众号交易）
        openid:''//用户标志
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
        Toast('支付失败');
    })
}
export default weixinPay;