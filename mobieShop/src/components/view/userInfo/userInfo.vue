<template>
    <section class='infoBottom'>
        <div class="account">
            <div class="account_info">
                <div class="change"><i class='icon iconfont icon-qiehuan'></i></div>
                <div class="portrait">
                    <div class="portrait_img"><img src="static/HMMobilePhone/dsit/img/headPortrait2.png" alt=""></div>
                    <div class="portrait_info">
                        <p>郭湘君</p>
                        <p>15035896892</p>
                    </div>
                    <ul class="behavior">
                        <li>
                            <div class="collect">
                                <i class='icon iconfont icon-xingxing coloBule'></i>
                            </div>
                            <p class="text_wait">收藏 <span class="coller">20</span></p>
                        </li>
                        <li class="shopCar">
                            <div class="collect">
                                <i class='icon iconfont icon-gouwuche coloBule'></i>
                            </div>
                            <p class="text_wait">购物车 <span class="carNum">5</span></p>
                        </li>
                        <li class="markFooter">
                            <div class="collect">
                               <i class='icon iconfont icon-zuji coloBule'></i>
                            </div>
                            <p class="text_wait">足迹</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="order">
            <div class="my_order">我的订单
                <div class="check">查看全部订单</div>
                <p><a href="###"><img src="static/HMMobilePhone/dsit/img/goahead.png" alt=""></a></p>
            </div>
            <ul class="wait_for">
                <li>
                    <div class="img_wait">
                        <i class="pay orageColor">2</i>
                     <i class='icon iconfont icon-daifukuan fontSize'></i>
                    </div>
                    <p class="text_wait">代付款</p>
                </li>
                <li>
                    <div class="img_wait">
                    <i class="wait orageColor">2</i>
                    <i class='icon iconfont icon-icondaifahuo fontSize'></i>
                    </div></i>
                    <p class="text_wait">待发货</p>
                </li>
                <li>
                    <div class="img_wait ">
                    <i class="receive orageColor">2</i>
                    <i class='icon iconfont icon-ziyuan fontSize'></i>
                    </div>
                    <p class="text_wait">待收货</p>
                </li>
                <li>
                    <div class="img_wait ">
                    <i class="evaluate orageColor">2</i>
                    <i class='icon iconfont icon-daipingjia fontSize'></i>
                    </div>
                    <p class="text_wait">待评价</p>
                </li>
                <li>
                    <div class="img_wait ">
                    <i class='icon iconfont icon-shouhou fontSize'></i>
                    </div>
                    <p class="text_wait">售后</p>
                </li>
            </ul>
        </div>
        <div class="account_management">账号管理 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="address_management">地址管理 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
         <div class="address_management">二维码 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="coupon">优惠券 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="log_off">退出登录</div>
    </section>
</template>

<script>
   //import { Toast } from 'mint-ui'
   
</script>
<style  scoped>
.coloBule{
    color:#31b1b0;
    font-weight:700;
    font-size:0.4rem;
}
.icon-qiehuan{
    position:absolute;
    right:5%;
    color:#f38550;
    font-size:0.4rem;
}
    .account{
    width: 100%;
    height: 3.64rem;
    padding: .36rem 0 0 0;
}
.account_info{
    width: 6.3rem;
    margin: .36rem  auto;
    height: 3.2rem;
    background: white;
    padding-top: .3rem;
    box-shadow: .05rem .05rem .15rem #31b1b0;
    position: relative;
}
.change img{
    display: inline-block;
    width: .38rem;
    height: .29rem;
    position: absolute;
    top: .2rem;
    right: .2rem;
}
.infoBottom{
    margin-bottom:2rem;
}
.portrait{
    width: 100%;
    height: 1.75rem;
    text-align:left;
}
.portrait_img{
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background: #C4C4C4;
    margin-left: .72rem;
    display: inline-block;
    vertical-align: middle;
}
.portrait_img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.portrait_info{
    height: 1.1rem;
    display: inline-block;
    font-size: .22rem;
    line-height: .5rem;
    color: #353535!important;
}
.behavior{
    width: 100%;
    height: 1.5rem;
    margin-top: .3rem;
    display: flex;
    justify-content: space-around;
}
.behavior li{
    width: 30%;
    font-size: .24rem;
    text-align: center;
}
.collect{
    width: .3rem;
    height: .3rem;
    margin: 0.3rem auto;
    position: relative;
}
.collect img{
    width: 100%;
    height: 100%;

}
.img_shadow1{
    width: .3rem;
    height: .3rem;
}
.img_shadow1 img{
    opacity: .3;
}
.img_shadow2{
    width: .3rem;
    height: .3rem;
    position: absolute;
    top: -0.04rem;
    left: -.04rem;
}
.wait_for li:nth-child(1) .fontSize{
    font-size:0.5rem;
}
.wait_for li:nth-child(2) .fontSize{
    font-size:0.5rem;
}
.wait_for li:nth-child(3) .fontSize{
    font-size:0.4rem;
}
.wait_for li:nth-child(4) .fontSize{
    font-size:0.4rem;
}
.wait_for li:nth-child(5) .fontSize{
    font-size:0.4rem;
}
/**/
.order{
    width: 100%;
    height: 2.5rem;
    margin-top: .6rem;
}

.check{
    float: right;
    margin-right: .75rem;
}
.my_order:after{
    content:"";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
}
.account_management{
    margin-top: .1rem;
}
.my_order,.account_management,.address_management,.coupon{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    border-bottom: .01rem solid #dcdcdc;
    font-size: .26rem;
    padding-left: .24rem;
    position: relative;
    text-align:left;
}
.my_order p,.account_management p,.address_management p,.coupon p{
    width: .15rem;
    height: .26rem;
    position: absolute;
    right: .48rem;
    top: .05rem;
}
.my_order p img,.account_management p img,.address_management p img,.coupon p img{
    width: 100%;
    height: 100%;
}
.wait_for{
    display: flex;
    justify-content: space-around;
}
.wait_for li{
    width: 1.2rem;
    height: 1.5rem;
    text-align: center;
    font-size: .24rem;
}
.img_wait{
    width: .4rem;
    height: .4rem;
    margin: .3rem auto ;
    position: relative;
}
.img_wait img{
    width: 100%;
    height: 100%;
}
.wait_for li .orageColor{
    display: inline-block;
    width: .35rem;
    height: .35rem;
    line-height: .35rem;
    border-radius: 50%;
    background: #e47524;
    position: absolute;
    top: -.18rem;
    right: -.2rem;
    font-style: normal;
    color: white;
}
.log_off{
    width: 5.6rem;
    height: .9rem;
    margin: .2rem auto 1.2rem auto;
    border-radius: 1.9rem;
    font-size: .3rem;
    color: white;
    text-align: center;
    line-height: .9rem;
    background: linear-gradient(to bottom,  #0CBBB9 0%,#4AC6DC 100%);
}

.shade{
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    z-index:499;
    -moz-opacity: 0.5;
    opacity:.3;
    filter: alpha(opacity=80);
}
.side_menu{
    position: fixed;
    top: 0;
    left: -3.33rem;
    width: 3.33rem;
    height: 100%;
    padding: 0;
    background-color: white;
    _position:absolute;
    z-index:500;
    transform: translate3d(0,0,0);
}
.menu_speed{
    transform: translate3d(100%,0,0);
    transition: transform 0.6s;
}

.brand_change{
    font-size: .3rem;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border-bottom: .03rem solid #00ADAB;
}
.brand li{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    position: relative;
    border-bottom: .01rem solid #dcdcdc;
    font-size: .24rem;
    text-indent: 1rem;
}
.check_select,.input_model{
    width: .45rem;
    height: .45rem;
    border-radius: 50%;
    position: absolute;
    top: .24rem;
    left: .24rem;
    border: .01rem solid #bfbfbf;
}
.check_select{
    opacity: 0;
}
.bg_color{
    background: #31B1B0;
    border: .01rem solid #31B1B0;
}
.input_model img{
    width: .26rem;
    height: .18rem;
    display: block;
    margin: .15rem .1rem ;
}
</style>