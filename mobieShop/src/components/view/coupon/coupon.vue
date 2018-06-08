<template>
    <section>
    <ul class="coupon_class">
        <li class="whole_coupon">
            <div class="whole whole_left" >
                <div class="coupon_content" v-if='couplist.list_using.length!=0||couplist.list_overdue.length!=0'>
                    <div class="draw" >
                        <p class="draw_top">可使用优惠券</p>
                        <ul class="draw_info draw_left">
                            <li class="bg_red" v-for='(item,index) in couplist.list_using' :key='index'>
                                <div class="receive_left" data-id="'+e.couponId+'" @click='toCommodity'>
                                    <br>立即<br>使用
                                </div>
                                <div class="cir_half cir_half_top"></div>
                                <div class="cir_half cir_half_bottom"></div>
                                <div class="receive_right">
                                <div>￥<span class="money_fav">{{item.couponMoney}}</span></div>
                                <div class="coupon_info">
                                <p>{{item.couponType==0?'满'+item.fullAmount+'元使用':item.couponType==1?'专享':item.couponType==2?'无门槛':''}}</p>
                                <p class="receive">{{item.endTime}}</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                        <div style='font-size:.2rem;' v-if='couplist.list_using.length==0'>
                            <p>暂无可使用优惠券！</p>
                        </div>
                    </div>
                    <div class="overdue">
                        <p class="draw_bottom">已过期优惠券</p>
                        <ul class="overdue_info overdue_left">
                            <li class="bg_gray" v-for='(item,index) in couplist.list_overdue' :key='index'>
                                <div class="receive_left" ><br>立即<br>使用</div>
                                <div class="cir_half cir_half_top"></div>
                                <div class="cir_half cir_half_bottom"></div>
                                <div class="receive_right">
                                <div>￥<span class="money_fav">{{item.couponMoney}}</span></div>
                                <div class="coupon_info">
                                <p>{{item.couponType==0?'满'+item.fullAmount+'元使用':item.couponType==1?'专享':item.couponType==2?'无门槛':''}}</p>
                                <p class="receive">{{item.endTime}}</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                        <div style='font-size:.2rem;' v-if='couplist.list_overdue.length==0'>
                            <p>暂无过期优惠券！</p>
                        </div>
                    </div>
                </div>
                <div class="pre_coupon" v-if='couplist.list_using.length==0&&couplist.list_overdue.length==0'>
                    <p><img src="/static/images/nodata.png" alt=""></p>
                    <p>暂无可使用优惠券！</p>
                </div>
            </div>
        </li>
    </ul>

</section>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            show_whole:true,
            show_limit:false,
            userinfo:'',
            couplist:{
                list_using:[],
                list_overdue:[]
            },
        }
    },
    created(){
        this.$root.$emit('header','我的优惠券');
        let userinfo=JSON.parse(localStorage.getItem('userinfo'));
        this.userinfo=userinfo;
        // console.log(JSON.parse(userinfo_str));
        this.getCouponlist();
    },
    methods:{
        toCommodity(){
            this.$router.push({name:'index',params:{direct:'commodity'}});
        },
        // switchcoupon(){
        //     this.show_whole=!this.show_whole;
        //     this.show_limit=!this.show_limit;
        // },
        // 获取优惠券
        getCouponlist(){
            let that=this;
            this.$http.post('/api/product/coupon/customer/find?pageSize=0',
            {
                customerId:that.userinfo.id,
                isActive:1
            })
            .then(res=>{
                if(res.data.status==200){
                    let list=res.data.info.list;
                    //  this.$set(that.couplist.list_using,0,{'text':1})
                    list.forEach(item=>{
                        if(item.couponInfo!=null){
                            let json={
                                'couponMoney':item.couponInfo.couponMoney,
                                'fullAmount':item.couponInfo.fullAmount,
                                'couponType':item.couponInfo.couponType,
                                'endTime':item.couponInfo.endTime.substring(0,10)
                            }
                            // 可领取
                            if(item.couponInfo.couponStatus=='1'){
                                that.couplist.list_using.push(json);
                            }
                            // 过期
                            else if(item.couponInfo.couponStatus=='0'){
                                that.couplist.list_overdue.push(json);
                            }
                        }
                        
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                Toast('数据获取失败');
            })
        }
    }
}
</script>

<style lang="" scoped>
    
.coupon_class{
    /* display: flex; */
    /* justify-content: space-around; */
    /* flex-wrap: nowrap; */
    /* margin-top:.8rem; */
}
.whole_coupon,.limit_coupon{
    width: 100%;
    /* display: none; */
}
.whole_coupon.on,.limit_coupon.on{
    display: block;

}
.coupon_left p{
    width:50%;
}
.coupon_left p.on{
    border-bottom: #26a2ff solid .02rem;
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
    border-bottom: #26a2ff solid .02rem;
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
    height: .7rem;
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


