<template>
    <div class='bgColor'>
        <article class="container colorWith">
            <div class="user wrap clear">
                <div class="user_left">
                   <img src="static/HMMobilePhone/dsit/images/img2/headPortrait2.png"/> 
                </div>
                <div class="user_center">
                    <h3 class="title">郭湘君<span style="padding: 0 .1rem;"></span>15035896892</h3>
    			<p>上海市浦东新区商城路988弄8号508</p> 
                </div>
                <div class="user_right">
					<i  class="icon iconfont icon-arrow-right-copy "></i>
                </div>
            </div>
        </article>
        <article class="container container2">
            <div class="confirm">
                <h2 class="title line">确认商品信息</h2>
                <section class="goods_msg line clear">
                    <ul class="goods_ul">
                     <div class="img">
    				<img src="static/HMMobilePhone/dsit/images/img2/goods-glasses.png"/>
    			</div>
    			<div class="msg">
    				<h3>FASHION</h3>
    				<p class="first">休闲时尚</p>
                    <p>服务区域: <span>上海</span></p>
    				<p class="number">
    					数量
    					<i  class="icon iconfont icon-bianji fontBg "></i>
    				</p>
					<div class="number_btn" ><button class="minus">-</button><input  value="1" ><button class="plus">+</button></div>
    			</div>
    			<div class="price">￥299</div>		
                    </ul>
                </section>
                <section class="order order2 line order3">
                    金额合计
                    <span class="scale">￥111</span>
                </section>

                <section class="order order2 line"  @click="open('picker1')">
                    预约服务时间
                    <span class="scale"><i  class="icon iconfont icon-arrow-right-copy fontBg "></i></span>
                </section>
                <section class="order order2 line">
                    我要开发票
                    <span class="scale"><i  class="icon iconfont icon-arrow-right-copy fontBg "></i></span>
                </section>
                <section class="pay_way line clear">
                    <ul class="pay_ul">
                        <li data-select="select" class="pay_wx pay">
                            <img class="pay_pic" src="static/HMMobilePhone/dsit/images/img2/weixin.jpg" />
                           <mt-radio
								align="right"
								class="page-part"
								:options="options3" @change="check" />
                            
                        </li>
                    </ul>
					
                </section>
                <section class="pay_foot line clear">
                    <p>合计：<span></span></p>
                    <a class="btn" href="javascript:void(0);">提交订单</a>
                </section>
				<br>
				<mt-datetime-picker
				ref="picker1"
				v-model="value"
				:closeOnClickModal="false"
				@confirm="handleChange">
				</mt-datetime-picker>
            </div>
        </article>
    </div>
</template>


<script>  
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data () {
    return {
      value: null,
      value1: null,
      reset: true,
	  value3: '',	
      startDate: new Date(new Date().getFullYear() - 10, 0, 1),
      endDate: new Date()
    }
  },
  created(){
	   this.options3 = ['微信支付'];
  },
  methods: {
      open(picker) {
        this.$refs[picker].open();
      },
      handleChange(value) {
		  
        this.date1 = value.toString();
        //this.show = true;
        Toast({
          message: '已选择 ' + value.toString(),
          position: 'bottom'
        });
      },
    }
}
</script>  

<style scoped>

.bgColor{
    background:#eaeaea;
}
.order2{
    height:.6rem;
    line-height:.6rem;
}
.order3{
    margin-bottom:0.2rem;
}
.wrap{
	width: 7rem;
	margin: 0 auto;
	background: white;  
    position: relative;
}
body::-webkit-scrollbar {
	display: none;/*隐藏滚轮*/
}
.clear:after{
	content: "";
	display: block;
	height: 0;
	visibility: hidden;
	clear: both;
}
.fontBg{
	font-size:0.5rem;
}
.line{
    background:#fff;
	padding: .3rem .31rem;
	border-bottom: .01rem solid #ccc;
	position: relative;
}
.pay_wx{
	text-align:left;
	padding-left:0.2rem;
}

.confirm{
	font-size: .24rem;
}
.container{
	width: 100%;
	overflow: hidden;
}
.container2{
	margin-top: .2rem;
}
.colorWith{
    background:#fff;
}
/*------- 用户信息   -----------------------------------*/

.paytime{
	width: 100%;
	position: relative;
	background: #0dbbba;
	color: white;
	font-size: .2rem;
	padding: .3rem 0;
	padding-left: .6rem;
}
.paytime .title{
	margin-bottom: .15rem;
	font-weight: normal;
	font-size: .26rem;
    text-align:left;
}

/*----------------------------------*/
.wrap_in p{
	padding: 0 .3rem;
	line-height: .45rem;
}
.order_loca{
	position: relative;
	width: 100%;
	clear: both;
	padding-top: .2rem;
}
.order_loca .black{
	width: 5.2rem;
	color: #5d5d5d;
	font-size: .24rem;
	letter-spacing: .02rem;
}
.order_loca .bus{
	position: absolute;
	width: .47rem;height: .43rem;
	left: -.16rem;top: .2rem;
}

/*--------  物流信息   ------------------------------------*/
.order_msg .user_right{
	position: absolute;
	right: 0;top: 50%;
	margin-top: -.3rem;
	height: .8rem;
	padding-left: .4rem;
	border-left: .01rem solid #dbdbdb;
}
.order_msg .user_right img{
	position: absolute;
	right: 0;top: 50%;
	margin-top: -.13rem;
	width: .15rem;height: .26rem;
}
/* ------------------------------- */
.windowHide{
	width:100%;
	height:100%;
	font-size:0.24rem;
	background:rgba(0,0,0,0.5);
	position: absolute;
	z-index:40;
	display:none;
}
.coupon_use{
	margin-top:12rem;
}
.publicBtn {
	border-top:1px solid #ccc;
    position:fixed;
    width:100%;
    height: 1.5rem;
    background: #fff;
    z-index:42;
    bottom:0;
}
.submitBtn {
    width: 80%;
    height: 0.9rem;
    border-radius: 0.5rem;
    border: none;
    color: #fff;
    margin-top:0.3rem;
}
.grdient {
    background-image: -webkit-linear-gradient(to top, #0dbbba, #4ac6db);
    background-image: linear-gradient(to top,#0dbbba, #4ac6db);
}
.center-x {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
}
.windowHeader{
	height:1.5rem;
	line-height:1.5rem;
	text-align:center;
	font-size:0.36rem;
	background:#fff;
	border-bottom:1px solid #ccc;
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
.overdue_info {
    overflow: scroll;
    background:#fff;
    padding:1rem 0 2.3rem 0;
}
.overdue_info li{
	height: 1.88rem;
    width: 85%;
    border-radius: .1rem;
    margin:0 auto .3rem;
    color: white;
    font-size: 0;
    position: relative;

}
.bg_gray{
    background:#CBCBCB;
}
.receive_left{
    display: inline-block;
    width: 1.8rem;
    height: 100%;
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
    line-height: .5rem;
}
.receive{
    font-size: .2rem;
}
.money_dis{
	font-size:.24rem;
}

/*--------  用户信息   ------------------------------------*/
.user{
	padding: .3rem 0;
}
.user .user_left{
	float: left;
	width: 1.15rem;
	height: 1.15rem;
	border-radius: 100%;
	overflow: hidden;
}
.user_left img{
	widht:100%;
	height:100%;
}
.user .user_center{
	float: left;
	margin-left: .5rem;
	font-size: .24rem;
}
.user .user_center .title{
	padding: .12rem 0;
	font-weight: normal;
}
.user .user_center p{
	color: #b7b7b7;
	padding-left: .35rem;
	background: url() no-repeat 0 30%;
	background-size: .26rem .29rem;
}
.user .user_right .iconfont{
	font-size:0.5rem;
}
.user .user_right{
	position: absolute;
	right: 0;top: 50%;
	margin-top: -.4rem;
	height: .8rem;
	line-height:.5rem;
	font-size:1rem;
	padding-left: .2rem;
	border-left: .01rem solid #dbdbdb;
}
.user .user_right img{
	position: absolute;
	right: 0;top: 50%;
	margin-top: -.13rem;
	width: .15rem;height: .26rem;
}

/*-----  确认商品信息  ------------------------------------------*/

.confirm .title{
	font-weight: normal;
	font-size: .24rem;
    text-align:left;
}

.confirm .goods_msg{
	position: relative;
}
.goods_ul li{height:2.4rem;}
/* .goods_ul li:nth-child(n+2){border-top:.01rem solid #ccc;} */
.confirm .goods_msg .img{
	float: left;
	overflow: hidden;
	width: 2.4rem;
	height: 2.1rem;
	border: .01rem solid #ccc;
	border-radius: .05rem;
}
.confirm .goods_msg .img img{
	width: 100%;
	height: 100%;
}

/*--------  商品详情   ------------------------------------*/
.confirm .goods_msg .msg{
	float: left;
	margin: .2rem 0 0 0.5rem;
	line-height: .4rem;
	color: #565656;
	font-size: .2rem;
    text-align:left;
}
.confirm .goods_msg .msg h3{
	font-size: .3rem;
}

.confirm .goods_msg .msg .first{
	font-size: .24rem;
}

.confirm .goods_msg .price{
	position: absolute;
	right: .35rem;
 	top: .5rem; 
	font-size: .24rem;
	color: #505050;
}
.confirm .goods_msg .num{
	color: #bbbbbb;
	position: absolute;
	right: .35rem;
	top: 1.7rem;
}
.confirm .goods_msg .number{
	position: absolute;
	padding-right: .4rem;
	right: .5rem;
}
.confirm .goods_msg .number_btn{
	float:left;
	position:relative;
}
.number_btn input{
	width:0.4rem;
	display:inline-block;

	text-align:center;
}
.number_btn .plus{
	margin-left:0.77rem;
}
.confirm .goods_msg .msg img{
	position: absolute;
	width: .4rem;
	height: .42rem;
	right: 0.3rem;
}

/*--------  订单信息   ------------------------------------*/
.confirm .order{
	position: relative;
	font-size: .24rem;
	color: #333;
    text-align:left;
}
.confirm .order span{
	float: right;
	color: #505050;
}
.confirm .order .scale{
	font-size: .36rem;
	line-height: .6rem;
	color: #222121;
}

.confirm .order_msg{
	position: relative;
	padding-bottom: .8rem;
	line-height: .4rem;
	color: #9f9f9f;
	font-size: .24rem;
}
.confirm .order_msg .left{
	float: left;
}
.confirm .order_msg .copy{
	float: right;
	width: 1.9rem;
	text-align: center;
	padding: .05rem 0rem;
	border: .01rem solid #BBBBBB;
	border-radius: .05rem;
	color: #5d5d5d;
}


/*--------  支付方式   ------------------------------------*/
.confirm .pay_way{
    margin-top:0.2rem;
}
.confirm .pay_way .pay{
	position: relative;
	height: 1rem;
}
.confirm .pay_way .pay .pay_pic{
	position: absolute;
	width: .6rem;height: .6rem;
	left: 0;top: 50%;
	margin-top: -.3rem;
	z-index:10;
}
.confirm .pay_way .pay span{
	position: absolute;
	left: 1rem;top: 50%;
	margin-top: -.15rem;
	font-size: .26rem;
	color: #333333;
}
.confirm .pay_way .pay i{
	display: block;
	width: .45rem;
	height: .45rem;
	border: .01rem solid #c4c4c4;
	border-radius: 50%;
	position: absolute;
	right: 0;top: 50%;
	margin-top: -.2rem;
	text-align: center;
	line-height: .4rem;
}
.confirm .pay_way .pay .bg{
	background: #00adab;
}

.confirm .pay_way .pay i img{
	width: .26rem;height: .18rem;
}

/*--------  立即付款   ------------------------------------*/
.confirm .pay_foot{
	position: relative;
	margin-bottom: 1rem;
}
.confirm .pay_foot p{
	float: left;
	margin-bottom: .3rem;
	font-size: .26rem;
	color: #222121;
}
.confirm .pay_foot p span{
	color: #f38650;
	font-size: .44rem;
}

.confirm .pay_foot .btn{
	float: right;
	display: block;
	width: 2.56rem;
	height: .7rem;
	line-height: .7rem;
	font-size: .3rem;
	font-weight: bold;
	text-align: center;
	color: white;
	background: #29c0c9;
	/*padding: .05rem .2rem;*/
	border-radius: .35rem;
}
.icon-bianji{
	position:relative;
	left:0.5rem;
	font-size:0.4rem;
	top:0.05rem;
}
.number_btn{
	position:relative;
	left:3rem;
	top:0.05rem;
}
.minus,.plus{
	display:none;
}
</style>