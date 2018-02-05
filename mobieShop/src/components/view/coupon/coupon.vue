<template>
    <section>
    <ul class="coupon_class">
        <li class="whole_coupon">
            <p class="coupon_left">全场优惠券</p>
            <div class="border_color"></div>
            <div class="whole whole_left">
                <div class="coupon_content" >
                    <div class="draw" >
                        <p class="draw_top">可领取优惠券</p>
                        <ul class="draw_info draw_left">
                           <li class="bg_red">'
                            <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                            <div class="cir_half cir_half_top"></div>
                            <div class="cir_half cir_half_bottom"></div>
                            <div class="receive_right">
                            <div>￥<span class="money_fav">1</span></div>
                            <div class="coupon_info">
                            <p>满11使用</p>
                            <p class="receive">2014-2015</p>
                            </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                    <div class="overdue">
                        <p class="draw_bottom">已过期优惠券</p>
                        <ul class="overdue_info overdue_left">
                           <li class="bg_red">'
                            <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                            <div class="cir_half cir_half_top"></div>
                            <div class="cir_half cir_half_bottom"></div>
                            <div class="receive_right">
                            <div>￥<span class="money_fav">1</span></div>
                            <div class="coupon_info">
                            <p>满11使用</p>
                            <p class="receive">2014-2015</p>
                            </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="pre_coupon">
                    <p><img src="static/HMMobilePhone/dsit/img/preSearch.png" alt=""></p>
                    <p>暂无可使用优惠券！</p>
                </div>
            </div>
        </li>
        <li class="limit_coupon">
            <p class="coupon_right">限定优惠券</p>
            <div class="whole whole_right" >
                <div class="coupon_content">
					<div class="draw">
                        <p class="draw_top">可领取优惠券</p>
                        <ul class="draw_info draw_right">
                          <li class="bg_red">'
                            <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                            <div class="cir_half cir_half_top"></div>
                            <div class="cir_half cir_half_bottom"></div>
                            <div class="receive_right">
                            <div>￥<span class="money_fav">1</span></div>
                            <div class="coupon_info">
                            <p>满11使用</p>
                            <p class="receive">2014-2015</p>
                            </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                    <div class="overdue">
                        <p class="draw_bottom">已过期优惠券</p>
                        <ul class="overdue_info overdue_right">
                           <li class="bg_red">'
                            <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                            <div class="cir_half cir_half_top"></div>
                            <div class="cir_half cir_half_bottom"></div>
                            <div class="receive_right">
                            <div>￥<span class="money_fav">1</span></div>
                            <div class="coupon_info">
                            <p>满11使用</p>
                            <p class="receive">2014-2015</p>
                            </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="pre_coupon" >
                    <p><img src="static/HMMobilePhone/dsit/img/preSearch.png" alt=""></p>
                    <p>暂无可使用优惠券！</p>
                </div>
            </div>
        </li>
    </ul>

</section>
</template>
<script>
    
</script>
<style lang="" scoped>
    
.coupon_class{
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}
.whole_coupon,.limit_coupon{
    width: 50%;
}
.coupon_left,.coupon_right{
    height: .9rem;
    font-size: .26rem;
    color: #333;
    text-align: center;
    line-height: .9rem;
    border-bottom: .01rem solid #dcdcdc;
}
.border_color{
    width: 100%;
    border-bottom: #0cbbb9 solid .02rem;
}
.pre_coupon{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.45rem;
    margin-left: -1.26rem;
}
.pre_coupon p{
    color: #bfbfbf;
    font-size: .26rem;
    text-align: center;
}
.pre_coupon p img{
    display: inline-block;
    width: 2.9rem;
    height: 3.32rem;
    opacity: .5;
}
.whole{
    width: 200%;
}
.coupon_content{
    width: 7rem;
    margin: 0 auto;
}
.draw_top,.draw_bottom{
    width: 100%;
    margin: 0.2rem auto .3rem auto;
    height: .75rem;
    line-height: .75rem;
    border-bottom: .01rem #dcdcdc solid;
    text-align: left;
    font-size: .24rem;
}
.draw ul{
    width: 100%;
}
.draw ul li,.overdue ul li{
    height: 1.88rem;
    line-height:1.88rem;
    width: 100%;
    border-radius: .1rem;
    margin-bottom: .3rem;
    color: white;
    font-size: 0;
    position: relative;
}
.bg_green{
    background: linear-gradient(to right, #3FB5B6 0%,#41DB9C 100%);
}
.bg_red{
    background: linear-gradient(to right, #F67A84 0%,#F28A76 100%);
}
.bg_orange{
    background: linear-gradient(to right, #F49A6F 0%,#E6AE4C 100%);
}
.bg_gray{
    background: #CBCBCB;
}
.receive_left{
    float: left;
    display: inline-block;
    width: 1.8rem;
    height: 1.88rem;
    line-height:0.5rem;
    font-size: 0.36rem;
    text-align: center;
    border-right: .01rem white dashed;
}
.cir_half{
    width: .4rem;
    height: .4rem;
    background: white;
    border-radius: 50%;
}
.cir_half_top{
    position: absolute;
    top: -.2rem;
    left: 1.6rem;
}
.cir_half_bottom{
    position: absolute;
    bottom: -.2rem;
    left: 1.6rem;
}
.receive_right{
    display: inline-block;
    font-size: .36rem;
    text-align:left;
}
.receive_right div{
    display: inline-block;
    color: white;
}
.receive_right div:first-child{
    width: 1.6rem;
    padding-left: .3rem;
}
.money_fav{
    font-size: .6rem;
}
.coupon_info{
    font-size: .26rem;
    height: .3rem;
    line-height: .5rem;
}
.receive{
    font-size: .2rem;
}
.money_dis{
	font-size:.24rem;
}
.whole_right{
	margin-left:-100%;
}
</style>


