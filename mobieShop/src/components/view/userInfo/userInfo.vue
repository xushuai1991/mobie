<template>
    <section>
        <div class="account">
            <div class="account_info">
                <div class="change"><img src="static/HMMobilePhone/dsit/img/Change.png" alt="" class="img_change"></div>
                <div class="portrait">
                    <div class="portrait_img"><img src="static/HMMobilePhone/dsit/img/headPortrait2.png" alt=""></div>
                    <div class="portrait_info">
                        <p>郭湘君</p>
                        <p>15035896892</p>
                    </div>
                    <ul class="behavior">
                        <li>
                            <div class="collect">
                                <div class="img_shadow1"><img src="static/HMMobilePhone/dsit/img/Collectshadow.png" alt=""></div>
                                <div class="img_shadow2"><img src="static/HMMobilePhone/dsit/img/Collect.png" alt=""></div>
                            </div>
                            <p class="text_wait">收藏 <span class="coller">20</span></p>
                        </li>
                        <li class="shopCar">
                            <div class="collect">
                                <div class="img_shadow1"><img src="static/HMMobilePhone/dsit/img/Shoppingcartshadow.png" alt=""></div>
                                <div class="img_shadow2"><img src="static/HMMobilePhone/dsit/img/Shoppingcart.png" alt=""></div>
                            </div>
                            <p class="text_wait">购物车 <span class="carNum">5</span></p>
                        </li>
                        <li class="markFooter">
                            <div class="collect">
                                <div class="img_shadow1"><img src="static/HMMobilePhone/dsit/img/footprintshadow.png" alt=""></div>
                                <div class="img_shadow2"><img src="static/HMMobilePhone/dsit/img/footprint.png" alt=""></div>
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
                    <div class="img_wait"><img src="static/HMMobilePhone/dsit/img/WaitForPay.png" alt=""><i class="pay">2</i></div>
                    <p class="text_wait">代付款</p>
                </li>
                <li>
                    <div class="img_wait"><img src="static/HMMobilePhone/dsit/img/WaitForCart.png" alt=""><i class="wait">2</i></div>
                    <p class="text_wait">待发货</p>
                </li>
                <li>
                    <div class="img_wait"><img src="static/HMMobilePhone/dsit/img/WaitForReceive.png" alt=""><i class="receive">2</i></div>
                    <p class="text_wait">待收货</p>
                </li>
                <li>
                    <div class="img_wait"><img src="static/HMMobilePhone/dsit/img/WaitForEvaluate.png" alt=""><i class="evaluate">2</i></div>
                    <p class="text_wait">待评价</p>
                </li>
                <li>
                    <div class="img_wait"><img src="static/HMMobilePhone/dsit/img/CustomerService.png" alt=""></div>
                    <p class="text_wait">售后</p>
                </li>
            </ul>
        </div>
        <div class="account_management">账号管理 <p><img src="static/HMMobilePhone/dsit/img/goahead.png" alt=""></p></div>
        <div class="address_management">地址管理 <p><img src="static/HMMobilePhone/dsit/img/goahead.png" alt=""></p></div>
        <div class="coupon">优惠券 <p><img src="static/HMMobilePhone/dsit/img/goahead.png" alt=""></p></div>
        <div class="log_off">退出登录</div>
    </section>
</template>

<script>
   import { Toast } from 'mint-ui' 
</script>
<style  scoped>
    
</style>