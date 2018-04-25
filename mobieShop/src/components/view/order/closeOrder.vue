<template>
    <div class='CmyOveroderDeil'>
        <!--<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                                <li v-for="item in list">{{ item }}</li>
                            </ul>!-->
        <section>
            <div class="wrap2">
                <div class='tiemBox'>
                    <p>交易关闭</p>
                </div>
                <div class='orderDeilTexts'>
                    <p>配送方式:<span>京东快递</span></p>
                    <p>快递单号:<span>758487985468487</span></p>
                    <input type='button' value='复制快递单号'>
                </div>
                <div class='userInfoAdd'>
                    <div class='infoNmae'>
                        <p><i class='icon iconfont icon-dizhi1'></i>上海杨浦区长阳创谷服务部进行签收扫描,快件已被签收</p>
                        <p>下单时间:<span>2018-05-18 12:08:30</span></p>
                    </div>
                </div>
                <div class='userInfo'>
                    <div class='userImg'>
                        <img src='./../homepage/recommend/recommendImage/1.jpg'>
                    </div>
                    <div class='infoNmae'>
                        <p><span>郭相君</span> <span>15035896892</span></p>
                        <p><i class='icon iconfont icon-dizhi1'></i><span>上海浦东新区商城路988弄8号508</span></p>
                    </div>
                </div>
                <div class='express'>
                </div>
                <div class="goods_list">
                    <ul class="mui-table-view" infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                            <div class="cart">
                                <div class="goods">
                                    <div class="goods_title type-pay">
                                        <span>{{item.shopname}}</span>
                                    </div>
                                    <div class="goodsBox" v-for="(items,indexs) in item.listgoods" :key="indexs">
                                        <ul class="goods_detail" style=' margin-top:0.2rem;'>
                                            <li class="goods_img" style="margin-left:0px;">
                                                <img :src="items.img">
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">{{items.name}}</p>
                                                <p class="goods_identifier strlen" style="width:2.5rem;padding-right:0.2rem;"><span>第三方辅导费胜多负少发斯蒂芬斯发斯蒂芬是否锁定蒂芬视斯蒂芬斯蒂芬收到发生的</span></p>
                                                <p class="goods_color">颜色：<span>红色</span></p>
                                                <p class="goods_size">尺码：<span>尺寸</span></p>
                                            </li>
                                            <li class="goods_info_se">
                                                <p class="goods_price">￥<span>{{items.price}}</span></p>
                                                <div class='cgqNumBox'>
                                                    数量:<input type="number" disabled :value="items.count" style='background:#fff;margint-top:0.2rem;' />
                                                </div>
                                                <!--<span class="mui_shopcar_del" @click="remove(index,indexs)">
                                                                    <i class='icon iconfont icon-lajitong'></i>
                                                                </span>!-->
                                            </li>
                                        </ul>
                                        <!--</mt-cell-swipe>!-->
                                    </div>
                                    <div class='orderFooter'>
                                        <p><span class='floatLeft'>快递运费:全国包邮</span> <span>￥0.00</span></p>
                                        <p><span class='floatLeft'>合计金额:</span> <span>￥0.00</span></p>
                                    </div>
                                    <div class='orderDeilText'>
                                        <p>订单编号编号:<span>758487985468487</span></p>
                                        <p>下单时间:<span>2018-05-18 12:08:30</span></p>
                                        <p>支付时间:<span>2018-05-18 12:08:30</span></p>
                                        <p>发货时间:<span>2018-05-18 12:08:30</span></p>
                                        <input type='button' value='复制单号'>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!--底部判断是加载图标还是提示“全部加载”-->
                    </ul>
                </div>
            </div>
        </section>
        <div class='markOrder'>
            <div class='nums'>合计:<span>￥299</span></div>
            <input type='button' value='取消订单'>
            <input type='button' value='立即付款'>
        </div>
    </div>
</template>
<script>
    import {
        MessageBox
    } from 'mint-ui';
    export default {
        data() {
            return {
                selected: '1',
                loading: false,
                queryLoading: false,
                moreLoading: false,
                allLoaded: false,
                list: [
                    // shop:[{'img': require('./../homepage/recommend/recommendImage/1.jpg')}],
                    {
                        id: 1,
                        shopname: '内蒙古原产牛奶',
                        shopselected: false,
                        listgoods: [{
                                id: 101,
                                name: '奶片',
                                price: 1.3,
                                count: 2,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 102,
                                name: '小辣椒',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 103,
                                name: '小辣椒22222',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    this.loading = true;
                }, 2500);
            },
            deleteSection(parentID, ID) { //parentID是商家id,ID是商品id
                this.unbind(parentID, ID)
            },
            unbind(parentID, ID) {
                const htmls = `是否删除此信息？`;
                MessageBox.confirm('', {
                    message: htmls,
                    title: '',
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonClass: 'cancelButton',
                    confirmButtonClass: 'confirmButton',
                    confirmButtonText: '删除',
                    cancelButtonText: '不删除'
                }).then(action => {
                    if (action == 'confirm') {
                        var self = this.list[parentID]; //删除购车商品执行部分
                        self.listgoods.length == 1 ? this.list.splice(parentID, 1) : self.listgoods.splice(ID, 1); //如果删除最后一个商品，则商家一并删除
                    }
                }).catch(err => {
                    if (err == 'cancel') {}
                });
            },
        }
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
.CmyOveroderDeil{
    margin-bottom:1rem;
}
    .tiemBox {
        height: 1.02rem;
        background: #26a2ff;
        font-size: 0.25rem;
        line-height: 0.8rem;
        padding-top: 0.2rem;
        text-align: left;
        padding-left: 0.5rem;
        color: #fff;
    }
    .userInfoAdd{
        border-top:0.1rem solid #f5f5f5;
        border-bottom:0.1rem solid #f5f5f5;
        font-size:0.25rem;
        text-align:left;
        padding-left:0.6rem;
        line-height:0.6rem;
    }
    .userInfo {
         border-bottom:0.1rem solid #f5f5f5;
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
        background: #26a2ff;
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
    .orderDeilTexts {
        border-top: 1px solid #ddd;
        font-size: 0.25rem;
        text-align: left;
        line-height: 0.8rem;
        padding-top: 0.2rem;
        padding-left: 0.6rem;
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
        background: #26a2ff;
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
        overflow: hidden;
        position: relative;
    }
    .cart {
        position: relative;
        /*margin-left: -1.1rem;*/
    }
    .wrap2 {
        margin-top: 0.8rem;
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
        overflow: hidden;
        position: relative;
    }
    .goods_title {
        width: 100%;
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
        background: #26a2ff;
        color: white;
        font-size: .3rem;
        margin-top: .15rem;
        border-radius: .7rem;
    }
    section .cart:last-child {
        margin-bottom: 0.2rem;
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