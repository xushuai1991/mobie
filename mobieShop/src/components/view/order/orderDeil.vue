<template>
    <div class='CmyOveroderDeil'>
        <!--<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                                                            <li v-for="item in list">{{ item }}</li>
                                                        </ul>!-->
        <section>
            <div class="wrap2">
                <div class='tiemBox'>
                    <p>{{ orderState}}</p>
                    <p v-if='orderState=="等待买家支付"'>
                        <span :endTime="endTime" :callback="callback" :endText="endText">
                                                <slot>
                                                    {{content}}
                                                </slot>
                                            </span></p>
                    <p v-else>
                        {{orderText}}
                    </p>
                </div>
                <div class='userInfo'>
                    <div class='userImg'>
                        <img src='./../homepage/recommend/recommendImage/1.jpg'>
                    </div>
                    <div class='infoNmae'>
                        <p><span>{{uerName}}</span> <span>{{userPhone}}</span></p>
                        <p><i class='icon iconfont icon-dizhi1'></i><span>{{userAdd}}</span></p>
                    </div>
                </div>
                <div class="goods_list">
                    <ul class="mui-table-view" infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                            <div class="cart">
                                <div class="goods">
                                    <div class="goods_title type-pay" style='height:5px;'>
                                    </div>
                                    <div class="goodsBox">
                                        <ul class="goods_detail" style=' margin-top:0.2rem;'>
                                            <li class="goods_img" style="margin-left:0px;">
                                                <img :src="item.img">
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">{{item.commodityBrand}}</p>
                                                <p class="goods_identifier strlen" style="width:2.5rem;padding-right:0.2rem;"><span></span></p>
                                                <p class="goods_color">颜色：<span>红色</span></p>
                                                <p class="goods_size">尺码：<span>尺寸</span></p>
                                            </li>
                                            <li class="goods_info_se">
                                                <p class="goods_price">￥<span>{{item.price}}</span></p>
                                                <div class='cgqNumBox'>
                                                    数量:<input type="number" disabled :value="item.saleNumber" style='background:#fff;margint-top:0.2rem;' />
                                                </div>
                                                <!--<span class="mui_shopcar_del" @click="remove(index,indexs)">
                                                                                                <i class='icon iconfont icon-lajitong'></i>
                                                                                            </span>!-->
                                            </li>
                                        </ul>
                                        <div class='refundDetail' v-show='refundOrder'>
                                            <button @click='refundButton($event, index)'>退款状态</button>
                                            <div class='hiddles'>
                                                <p>退款金额：{{item.priceEnd}}</p>
                                                <p>退款状态：{{orderState}}</p>
                                            </div>
                                        </div>
                                        <!--</mt-cell-swipe>!-->
                                    </div>
                                    <div class="goodsBox" v-for="(items,indexs) in item.orderDetailList" :key="indexs">
                                        <ul class="goods_detail" style=' margin-top:0.2rem;'>
                                            <li class="goods_img" style="margin-left:0px;">
                                                <img :src="items.img">
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">套餐:{{items.commodityBrand}}</p>
                                                <p class="goods_identifier strlen" style="width:2.5rem;padding-right:0.2rem;"><span></span></p>
                                                <p class="goods_color">颜色：<span>红色</span></p>
                                                <p class="goods_size">尺码：<span>尺寸</span></p>
                                            </li>
                                            <li class="goods_info_se">
                                                <p class="goods_price">￥<span>{{items.price}}</span></p>
                                                <div class='cgqNumBox'>
                                                    数量:<input type="number" disabled :value="items.saleNumber" style='background:#fff;margint-top:0.2rem;' />
                                                </div>
                                                <!--<span class="mui_shopcar_del" @click="remove(index,indexs)">
                                                                                                <i class='icon iconfont icon-lajitong'></i>
                                                                                            </span>!-->
                                               
                                            </li>
                                        </ul>
                                        <!--</mt-cell-swipe>!-->
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!--底部判断是加载图标还是提示“全部加载”-->
                    </ul>
                    <div class='orderFooter'>
                        <p><span class='floatLeft'>合计金额:</span><span class="moneyColor">￥{{orderMoney}}</span></p>
                        <p><span class='floatLeft'>实付金额:</span><span class="moneyColor">￥{{actualMoney}}</span></p>
                    </div>
                    <div class='orderDeilText'>
                        <p>订单编号编号:<span>{{number}}</span></p>
                        <p>下单时间:<span>{{createTime}}</span></p>
                        <input type='button' value='复制单号' button class="tag-read" :data-clipboard-text="number" @click="copy">
                    </div>
                </div>
            </div>
        </section>
        <div class='markOrder'>
            <div class='nums'>合计:<span class="moneyColor">￥{{actualMoney}}</span></div>
            <input type='button' class='delBtn' v-show=showBtn1 @click='clearOrder(number,actualMoney)' value='取消订单'>
            <input type='button' v-show=showBtn2 value='立即付款'>
            <input type='button' class='delBtn' v-show=showBtn3 @click='delOrder(number)' value='删除订单'>
            <input type='button' class='delBtn' v-show=showBtn4 @click='delOrder(number)' value='订单退款'>
            <input type='button' class='delBtn' v-show=showBtn6 @click='delOrder(number)' value='取消退款'>
            <input type='button'  v-show=showBtn5 @click='delOrder(number)' value='确认收货'>
            
        </div>
    </div>
</template>
<script>
    
    import {
        Toast
    } from 'mint-ui';
    import Clipboard from 'clipboard';
    import {
        MessageBox
    } from 'mint-ui';
    export default {
        data() {
            return {
                content: '',
                orderStaty: '',
                orderMoney: '',
                actualMoney: '',
                orderState: '',
                uerName: '',
                userPhone: '',
                userAdd: '',
                orderText: '',
                createTime: '',
                number: '',
                copyBtn: null,
                list: [],
                showBtn1: false, //取消按钮
                showBtn2: false, //立即付款按钮
                showBtn3: false, //关闭按钮，
                showBtn4: false, //关闭按钮，
                showBtn5: false, //关闭按钮，
                showBtn6: false, //关闭按钮，
                // refundShow:false,//退款显示，
                refundOrder:false
            }
        },
        props: {
            endTime: {
                type: String,
                default: ''
            },
            endText: {
                type: String,
                default: '订单超时已结束'
            },
            callback: {
                // type : Function,
                default: ''
            }
        },
        methods: {
            refundButton($event, indexs){
              if($event.currentTarget.nextElementSibling.classList.value == 'hiddles'){
                  $event.currentTarget.nextElementSibling.classList.remove("hiddles")
              }else{
                   $event.currentTarget.nextElementSibling.classList.add("hiddles")
              }
            },
            getDate(ordernumber) {
                let url = '/api/product/order/mall/find';
                this.$http({
                    url: url,
                    method: 'post',
                    data: {
                        "number": ordernumber
                    }
                }).then((res) => {
                    if (res.data.status != 200) {
                        return false
                    }
                    let orderStaty = res.data.info.list[0];
                    this.uerName = orderStaty.name;
                    this.userPhone = orderStaty.phone
                    this.userAdd = orderStaty.detailAddress
                    this.orderMoney = orderStaty.orderMoney
                    this.actualMoney = orderStaty.actualMoney
                    this.createTime = orderStaty.createTime
                    this.number = orderStaty.number
                    console.log(orderStaty)
                    if (orderStaty.payState == 1) {
                        this.orderState = '已支付等待卖家发货'
                        this.orderText = '亲,请耐心能等待';
                    } else if (orderStaty.payState == 2) {
                        this.orderState = '等待买家支付'
                        this.countdowm((this.timestampToTime((new Date(res.data.info.list[0].createTime).getTime() / 1000) + (24 * 60 * 60)))) //时间戳加24小时;
                    } else if (orderStaty.payState == 3) {
                        this.orderState = '订单已过期'
                        this.orderText = '订单已过期';
                    }
                    if (orderStaty.orderState == 1) {
                        this.showBtn1 = true, //取消按钮
                        this.showBtn2 = true; //立即付款按钮
                    }
                    if (orderStaty.orderState == 2) {
                        this.showBtn4 = true, //取消按钮
                        this.showBtn5 = true; //立即付款按钮
                         this.orderState = '已支付等待卖家发货'
                         this.orderText = '亲,请耐心能等待';
                    }
                    if (orderStaty.orderState == 4) {
                        this.showBtn6 = true, //取消按钮
                        this.showBtn5 = true; //立即付款按钮
                         this.orderState = '退款中...'
                         this.orderText = '亲,请耐心能等待';
                         this.refundOrder = true
                    }
                    if (orderStaty.orderState == 5) {
                        this.showBtn3 = true; //立即付款按钮
                         this.orderState = '退款完成'
                        //  this.orderText = '';
                    }
                    if (orderStaty.orderState == 6) {
                        this.orderState = '交易关闭'
                        this.showBtn3 = true
                        this.orderText = '';
                    }
                    this.list = orderStaty.orderDetails
                    this.list.forEach((item)=>{
                        item.refundShow = false
                    })
                    // // this.list.refundShow=false
                    // console.log(this.list)
                }).catch((error) => {
                    console.log(error)
                })
            },
            delOrder(order) {
                let url = '/api/product/order/mall/update';
                this.$http({
                    url: url,
                    method: 'post',
                    data: [{
                        number: order,
                        isActive: false
                    }]
                }).then((res) => {
                    if (res.data.status == 200) {
                        Toast('删除订单成功')
                        this.$router.push({
                            // path:"./order",
                            name: 'order',
                            params: {
                                index: 1
                            }
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            clearOrder(order, actualMoney) { //取消订单
                let url = '/api/product/order/mall/update';
                this.$http({
                    url: url,
                    method: 'post',
                    data: [{
                        number: order,
                        orderState: 6,
                        actualMoney: actualMoney
                    }]
                }).then((res) => {
                    if (res.data.status == 200) {
                        Toast('取消订单成功')
                        this.$router.push({
                            // path:"./order",
                            name: 'order',
                            params: {
                                index: 1
                            }
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            copy() {
                var clipboard = new Clipboard('.tag-read')
                clipboard.on('success', e => {
                    Toast('复制成功')
                    // 释放内存  
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制  
                    Toast('该浏览器不支持自动复制')
                    // 释放内存  
                    clipboard.destroy()
                })
            },
            countdowm(timestamp) {
                let self = this;
                let timer = setInterval(function() {
                    let nowTime = new Date();
                    let endTime = new Date(timestamp);
                    let t = endTime.getTime() - nowTime.getTime();
                    if (t > 0) {
                        let day = Math.floor(t / 86400000);
                        let hour = Math.floor((t / 3600000) % 24);
                        let min = Math.floor((t / 60000) % 60);
                        let sec = Math.floor((t / 1000) % 60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        sec = sec < 10 ? "0" + sec : sec;
                        let format = '';
                        if (day > 0) {
                            format = `${day}天${hour}小时${min}分${sec}秒`;
                        }
                        if (day <= 0 && hour > 0) {
                            format = `${hour}小时${min}分${sec}秒`;
                        }
                        if (day <= 0 && hour <= 0) {
                            format = `${min}分${sec}秒`;
                        }
                        self.content = format;
                    } else {
                        clearInterval(timer);
                        self.content = self.endText;
                        self._callback();
                    }
                }, 1000);
            },
            _callback() {
                //   this.orderState = "订单已结束";
                //   this.orderStaty = 3
                //   console.log(this.orderState)
            },
            timestampToTime(timestamp) { //转成时间
                var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                return Y + M + D + h + m + s;
            },
            urlArgs() {
                var args = {};
                var query = location.search.substring(1);
                var pairs = query.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    var pos = pairs[i].indexOf("=");
                    if (pos == -1) continue;
                    var name = pairs[i].substring(0, pos);
                    var value = pairs[i].substring(pos + 1);
                    value = decodeURIComponent(value);
                    args[name] = value;
                }
                return args;
            }
        },
        created() {
            this.getDate(this.urlArgs().ordernumber)
           
        },
    }
</script>
<style>
    .CmyOveroderDeil .mint-cell-value {
        width: 100%;
    }
    .CmyOveroderDeil .mint-cell-wrapper {
        padding-left: 0;
    }
    .CmyOveroderDeil .mint-cell-swipe-button {
        font-size: 0.3rem;
        line-height: 3rem;
    }
    .CmyOveroderDeil .mint-cell-wrapper {
        border-bottom: none;
        padding-bottom: 0.2rem;
    }
</style>
<style scoped lang='less'>
    .hiddles{
        display:none;
    }
    .refundDetail{
        font-size:0.25rem;
        text-align:right;
        padding-right:0.2rem;
        line-height:0.6rem;
        button{
            border:none;
            padding:0.1rem 0.2rem;
            outline: none; 
            border-radius:0.1rem;
            background:#fff;
            border:1px solid #ddd;
        }
    }
    .markOrder .delBtn{
        background:#fff;border:1px solid #ddd; color:#000;
    }
    .moneyColor {
        color: #f38650;
    }
    .package {
        margin-top: 0.4rem;
        font-size: 0.3rem;
        text-align: right;
        p {
            border-top: 1px solid #ddd;
            padding-right: 0.2rem;
            line-height: 0.8rem;
            &:nth-child(2) {
                border-bottom: 1px solid #ddd;
            }
        }
    }
    .tiemBox {
        height: 1.02rem;
        background: #0cbbb9;
        font-size: 0.25rem;
        line-height: 0.4rem;
        padding-top: 0.2rem;
        text-align: left;
        padding-left: 0.5rem;
        color: #fff;
    }
    .userInfo {
        position: relative;
        height: 1.76rem;
        line-height: 1.76rem;
        overflow: hidden;
        .userImg {
            width: 1.2rem;
            height: 1.2rem;
            margin: 0.22rem;
            border-radius: 1rem;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .infoNmae {
            position: absolute;
            font-size: 0.25rem;
            top: 0;
            line-height: 0.5rem;
            text-align: left;
            color: #888;
            top: 0.4rem;
            left: 25%;
        }
    }
    .markOrder {
        height: 1rem;
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #ddd;
        font-size: 0.25rem;
        line-height: 1rem;
        text-align: right;
        .nums {
            float: left;
            padding-left: 0.2rem;
            span {
                font-size: 0.3rem;
                font-weight: 700;
                color: #f38650;
            }
        }
    }
    .markOrder input {
        background: #28c0c9;
        padding: 0.1rem 0.2rem;
        color: #fff;
        margin-right: 0.2rem;
        border-radius: 0.1rem;
    }
    .markOrder input:nth-child(1) {
        background: #fff;
        border: 1px solid #ddd;
        color: #888;
    }
    .orderDeilText {
        border-top: 1px solid #ddd;
        font-size: 0.25rem;
        text-align: left;
        line-height: 0.8rem;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
        position: relative;
        color: #bababa;
        input {
            position: absolute;
            top: 15%;
            right: 2%;
            padding: 0.1rem 0.2rem;
            border: 1px solid #ddd;
            background: #fff;
            border-radius: 0.1rem;
        }
    }
    .floatLeft {
        float: left;
        padding-left: 0.2rem;
    }
    input[type=button] {
        -webkit-appearance: none;
        outline: none
    }
    .orderFooter {
        text-align: right;
        margin-top: 0.2rem;
        font-size: 0.3rem;
        line-height: 1rem;
        border-top: 1px solid #ddd;
    }
    .orderFooter p {
        padding-right: 0.2rem;
    }
    .orderFooter p:nth-child(2) {
        border-top: 1px solid #ddd;
    }
    .orderFooter input {
        background: #0cbbb9;
        color: #fff;
        padding: 0.08rem 0.15rem;
        border-radius: 0.1rem;
    }
    .orderFooter input:nth-child(1) {
        background: #fff;
        color: #888;
        border: 1px solid #ddd;
        padding: 0.08rem 0.15rem;
        border-radius: 0.1rem;
    }
    .CmyOveroder .tuikuan {
        position: absolute;
        bottom: 0.1rem;
        border: 1px solid #ddd;
        height: 0rem;
        padding: 0.2rem;
        line-height: 0;
        border-radius: 0.1rem;
    }
    .brandDesc {
        font-size: 0.3rem;
        font-weight: 700;
    }
    .goods {
        width: 100%;
        background: white;
        position: relative;
    }
    .cart {
        position: relative;
        /*margin-left: -1.1rem;*/
    }
    .wrap2 {
        margin-top: 0.8rem;
        margin-bottom: 1rem;
        .CinputBox {
            position: absolute;
            left: 0.4rem;
            top: 0.3rem;
        }
        .mui_shopcar_del {
            position: absolute;
            right: 0.6rem;
            top: 1.4rem;
        }
        .mint-popup-bottom {
            width: 100%;
        }
    }
    .delete_this img {
        width: .3rem;
        height: .4rem;
        position: absolute;
        top: 1.6rem;
        left: .4rem;
    }
    .goods {
        width: 100%;
        background: white;
        position: relative;
    }
    .goods_title {
        text-align: left;
        height: .88rem;
        line-height: 1rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .3rem;
        padding-left: .3rem;
        position: relative;
    }
    .goods_title p {
        width: .14rem;
        height: .25rem;
        position: absolute;
        right: 1.6rem;
        top: .05rem;
    }
    .goods_title p img {
        width: 100%;
        height: 100%;
    }
    .checks {
        float: right;
        margin-right: 0.8rem;
        color: #31B1B0;
    }
    .check_select,
    .input_model {
        width: .45rem;
        height: .45rem;
        border-radius: 50%;
        position: absolute;
        border: .01rem solid #bfbfbf;
    }
    .check_select {
        opacity: 0;
    }
    .bg_color {
        background: #31B1B0;
        border: .01rem solid #31B1B0;
    }
    .input_model img {
        width: .26rem;
        height: .18rem;
        display: block;
        margin: .15rem .1rem;
    }
    .goods_detail {
        position: relative;
        background: white;
        width: 100%;
        height: 2.7rem;
        display: flex;
        justify-content: space-around;
        font-size: .24rem;
    }
    .goods_detail {
        margin-top: 0rem;
    }
    .goods_detail .goods_img {
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }
    .goods_detail li {
        height: 2.7rem;
        margin-left: -0.5rem;
        text-align: left;
    }
    .goods_detail .goods_img img {
        height: 100%;
        min-width: 3rem;
        width: 3rem;
    }
    .goods_info {
        margin-top: .3rem;
        line-height: .5rem;
    }
    .goods_info p {
        text-indent: 0.2rem;
    }
    .goods_info p:first-child {
        font-size: .3rem;
    }
    .goods_info_se {
        text-align: right;
        line-height: 1.5rem;
    }
    .goods_num {
        font-size: .36rem;
    }
    .goods_price {
        color: #f38650;
        font-size: .26rem;
        line-height: 1.1rem;
    }
    .footer {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        font-size: .26rem;
        position: fixed;
        bottom: 0;
        z-index: 11;
        text-align: center;
        background: white;
    }
    .footer li:first-child {
        color: #9b9b9b;
    }
    .all_price span {
        color: #f38650;
        font-size: .40rem;
    }
    .price_all {
        font-style: normal;
    }
    .pay p {
        width: 2.65rem;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        background: linear-gradient(to bottom, #0CBBB9 0%, #4AC6DC 100%);
        color: white;
        font-size: .3rem;
        margin-top: .15rem;
        border-radius: .7rem;
    }
    section .cart:last-child {
        padding-bottom: 0.2rem;
    }
    .testWindow,
    .goodsWindow {
        width: 100%;
        height: 100%;
        background-color: #000;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        background: rgba(0, 0, 0, .3);
        display: none;
    }
    .goodsWindow .windowHide {
        background: #fff;
        width: 100%;
        font-size: 0.24rem;
        bottom: -11rem;
        position: absolute;
    }
    .publicBtn {
        position: relative;
        height: 1.5rem;
        background: #fff;
        padding-top: 0.5rem;
    }
    .submitBtn {
        height: 0.9rem;
        width: 80%;
        border-radius: 50px;
        border: none;
        color: #fff;
    }
    .grdient {
        background-image: -webkit-linear-gradient(to top, #0dbbba, #4ac6db);
        background-image: linear-gradient(to top, #0dbbba, #4ac6db);
    }
    .center-x {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
    }
    .windowHeader {
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.36rem;
    }
    .cgqNumBox {
        button {
            width: 0.5rem;
            height: 0.5rem;
        }
        input {
            position: relative;
            width: 0.5rem;
            height: 0.5rem;
            text-align: center;
        }
    }
    .goods_info .strlen {
        margin-bottom: 0.2rem;
        font-size: 0.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 1rem;
        line-height: 0.3rem;
        padding-left: 0.2rem;
        text-indent: 0rem;
    }
    .goods_color,
    .goods_size {
        font-size: 0.2rem;
        color: #707070;
    }
</style>