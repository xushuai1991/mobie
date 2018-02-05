<template>
    <div class='contain'>
        <mt-header title="确认订单" fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class='msg-customer'>
            <img class='avatar' src="static/images/bgimg.png" alt="">
            <div class='msgs'>
                <p class='name'>徐X 00000000000</p>
                <p class='area'><i class='icon iconfont icon-dingwei'></i>上海市浦东新区</p>
            </div>
            <div class='more'>
                <p class='icon iconfont icon-arrow-right-copy'></p>
            </div>
        </div>
        <div class='msg-goods'>
            <h3 class="title">确认商品信息</h3>
            <div class='detail'>
                <div class='img-goods'>
                    <img src="" alt="">
                </div>
                <div class='msg'>
                    <p class='name'>FASHION</p>
                    <p class='brand'>品牌：禾目</p>
                    <p class='area'>服务区域：上海</p>
                </div>
                <div class='tips'>
                    <p class='price'>￥200</p>
                    <p class='oper'>
                        <span>数量</span>
                        <span>1</span>
                        <router-link to='/' class='icon iconfont icon-edit_icon'></router-link>
                    </p>
                </div>
            </div>
        </div>
        <div class='price-total'>
            <span class='tip'>金额合计：</span>
            <span class='value'>￥200</span>
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
export default {
    data(){
        return{
            checked:'checked'
        }
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
        }
    }
}
</script>

<style scoped>
.contain{
    font-size: .28rem;
    text-align: left;
    background-color: #e9e9e9;
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
    background-color: #31B1B0;
    border:1px solid #31B1B0;
    border-radius: .5rem;
    color: #fff;
    outline:none;
    float: right;
}
</style>
