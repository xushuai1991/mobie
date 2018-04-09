<template>
    <section>
    <ul class="coupon_class">
        <div class="coupon_left">
            <p :class='{"on":show_whole}' @click='switchcoupon'>全场优惠券</p>
            <p :class='{"on":show_limit}' @click='switchcoupon'>限定优惠券</p>    
        </div>
        <li :class="{'whole_coupon':true,'on':show_whole}">
            <div class="whole whole_left">
                <div class="coupon_content" v-if='couplist_whole.list_using.length!=0||couplist_whole.list_overdue.length!=0'>
                    <div class="draw" >
                        <p class="draw_top">可领取优惠券</p>
                        <ul class="draw_info draw_left">
                            <li class="bg_red" v-for='(item,index) in couplist_whole.list_using' :key='index'>
                                <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                                <div class="cir_half cir_half_top"></div>
                                <div class="cir_half cir_half_bottom"></div>
                                <div class="receive_right">
                                <div>￥<span class="money_fav">{{item.value}}</span></div>
                                <div class="coupon_info">
                                <p>{{item.condition}}</p>
                                <p class="receive">{{item.deadline}}</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                        <div style='font-size:.2rem;' v-if='couplist_whole.list_using.length==0'>
                            <p>暂无可使用优惠券！</p>
                        </div>
                    </div>
                    <div class="overdue">
                        <p class="draw_bottom">已过期优惠券</p>
                        <ul class="overdue_info overdue_left">
                            <li class="bg_gray" v-for='(item,index) in couplist_whole.list_overdue' :key='index'>
                                <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                                <div class="cir_half cir_half_top"></div>
                                <div class="cir_half cir_half_bottom"></div>
                                <div class="receive_right">
                                <div>￥<span class="money_fav">{{item.value}}</span></div>
                                <div class="coupon_info">
                                <p>{{item.condition}}</p>
                                <p class="receive">{{item.deadline}}</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                        <div style='font-size:.2rem;' v-if='couplist_whole.list_overdue.length==0'>
                            <p>暂无过期优惠券！</p>
                        </div>
                    </div>
                </div>
                <div class="pre_coupon" v-if='couplist_whole.list_using.length==0&&couplist_whole.list_overdue.length==0'>
                    <p><img src="/static/images/nodata.png" alt=""></p>
                    <p>暂无可使用优惠券！</p>
                </div>
            </div>
        </li>
        <li :class="{'limit_coupon':true,'on':show_limit}">
            <div class="whole whole_right" >
                <div class="coupon_content" v-if='couplist_limit.list_using.length!=0||couplist_limit.list_overdue.length!=0'>
					<div class="draw">
                        <p class="draw_top">可领取优惠券</p>
                        <ul class="draw_info draw_right">
                            <li class="bg_red" v-for='(item,index) in couplist_limit.list_using' :key='index'>
                                <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                                <div class="cir_half cir_half_top"></div>
                                <div class="cir_half cir_half_bottom"></div>
                                <div class="receive_right">
                                    <div>￥<span class="money_fav">{{item.value}}</span></div>
                                    <div class="coupon_info">
                                        <p>{{item.condition}}</p>
                                        <p class="receive">{{item.deadline}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div style='font-size:.2rem;' v-if='couplist_limit.list_using.length==0'>
                            <p>暂无可使用优惠券！</p>
                        </div>
                    </div>
                    <div class="overdue">
                        <p class="draw_bottom">已过期优惠券</p>
                        <ul class="overdue_info overdue_right">
                            <li class="bg_gray" v-for="(item,index) in couplist_limit.list_overdue" :key='index'>
                                <div class="receive_left" data-id="'+e.couponId+'"><br>立即<br>领取</div>
                                <div class="cir_half cir_half_top"></div>
                                <div class="cir_half cir_half_bottom"></div>
                                <div class="receive_right">
                                <div>￥<span class="money_fav">{{item.value}}</span></div>
                                <div class="coupon_info">
                                    <p>{{item.condition}}</p>
                                    <p class="receive">{{item.deadline}}</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                        <div style='font-size:.2rem;' v-if='couplist_limit.list_overdue.length==0'>
                            <p>暂无可使用优惠券！</p>
                        </div>
                    </div>
                </div>
                <div class="pre_coupon" v-if='couplist_limit.list_using.length==0&&couplist_limit.list_overdue.length==0'>
                    <p><img src="/static/images/nodata.png" alt=""></p>
                    <p>暂无可使用优惠券！</p>
                </div>
            </div>
        </li>
    </ul>

</section>
</template>
<script>
export default {
    data(){
        return{
            show_whole:true,
            show_limit:false,
            couplist_whole:{
                list_using:[
                    {
                        id:'1',
                        value:'1',
                        deadline:'2018-4-8',
                        condition:'满11元使用'
                    },
                    {
                        id:'2',
                        value:'100',
                        deadline:'2018-4-8',
                        condition:'满1000元使用'
                    }
                ],
                list_overdue:[
                    {
                        id:'3',
                        value:'1',
                        deadline:'2018-4-8',
                        condition:'满11元使用'
                    },
                    {
                        id:'4',
                        value:'1',
                        deadline:'2018-4-8',
                        condition:'满11元使用'
                    },
                ]
            },
            couplist_limit:{
                list_using:[
                    {
                        id:'1',
                        value:'1',
                        deadline:'2018-4-8',
                        condition:'满11元使用'
                    },
                    {
                        id:'2',
                        value:'100',
                        deadline:'2018-4-8',
                        condition:'满2000元使用'
                    }
                ],
                list_overdue:[
                    {
                        id:'3',
                        value:'1',
                        deadline:'2018-4-8',
                        condition:'满11元使用'
                    }
                ]
            }
        }
    },
    created(){
        this.$root.$emit('header','优惠券');
    },
    methods:{
        switchcoupon(){
            this.show_whole=!this.show_whole;
            this.show_limit=!this.show_limit;
        }
    }
}
</script>

<style lang="" scoped>
    
.coupon_class{
    /* display: flex; */
    /* justify-content: space-around; */
    /* flex-wrap: nowrap; */
    margin-top:.8rem;
}
.whole_coupon,.limit_coupon{
    width: 100%;
    display: none;
}
.whole_coupon.on,.limit_coupon.on{
    display: block;

}
.coupon_left p{
    width:50%;
}
.coupon_left p.on{
    border-bottom: #0cbbb9 solid .02rem;
}
.coupon_left{
    /* width:50%; */
    height: .9rem;
    font-size: .26rem;
    color: #333;
    text-align: center;
    line-height: .9rem;
    border-bottom: .01rem solid #dcdcdc;
    display: flex;
    justify-content: center;
}
.border_color{
    width: 50%;
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
    /* width: 200%; */
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
.receive_right .coupon_info{
    position: relative;
    top:.15rem;
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
	/* margin-left:-100%; */
}
</style>


