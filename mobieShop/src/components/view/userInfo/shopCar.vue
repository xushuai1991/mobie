<template>
    <div>
        <section>
            <div class="wrap2">
                <div class="goods_list">
                    <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                            <div class="cart">
                                <div class="goods">
                                    <div class="goods_title">
                                        <i class="input_model"><img src="static/HMMobilePhone/dsit/img/tick.png" alt=""></i>
                                        <input type="checkbox" class="check_select" id="sid1">
                                        <div class="check">领券</div>
                                        <p><img src="static/HMMobilePhone/dsit/img/arrow_Green.png" alt=""></p>
                                    </div>
                                    <div class="goodsBox">
                                        <ul class="goods_detail">
                                            <li class="goods_img" style="padding-left: 0.6rem;padding-top: 0.3rem;">
                                                <img :src="item.img">
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">名称</p>
                                                <p class="goods_identifier strlen" style="width:3rem;"><span>简介</span></p>
                                                <p class="goods_color">颜色：<span>红色</span></p>
                                                <p class="goods_size">尺码：<span>尺寸</span></p>
                                            </li>
                                            <li class="goods_info_se">
                                                <p class="goods_price">￥<span>50</span></p>
                                                <p class="goods_num">x<span>1</span></p>
                                            </li>
                                            <li class="delBox">
                                                <div class="delete_this" data-id='+i.cartId+'>
                                                    <i class='icon iconfont icon-lajitong fontSize'></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!--底部判断是加载图标还是提示“全部加载”-->
                        <li class="more_loading" v-show="!queryLoading">
                            <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
                            <span v-show="allLoaded">已全部加载</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <footer>
            <ul class="footer">
                <li>
                    <i class="input_model"><img src="static/HMMobilePhone/dsit/img/tick.png" alt=""></i>
                    <input type="checkbox" class="check_select" id="selectAll"> 全选(
                    <span class="shopNum">0</span>)
                </li>
                <li class="all_price">
                    合计: <span>￥<i class="price_all">0</i></span>
                </li>
                <li class="pay">
                    <p>结算</p>
                </li>
            </ul>
        </footer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //初始化无限加载相关参数
                queryLoading: false,
                moreLoading: false,
                allLoaded: false,
                totalNum: 0,
                pageSize: 2,
                pageNum: 1,
                list: [
                    {
                        'img':require('./../homepage/recommend/recommendImage/1.jpg')
                    },
                    {
                        'img':require('./../homepage/recommend/recommendImage/2.jpg')
                    },
                    {
                        'img':require('./../homepage/recommend/recommendImage/window1-1.jpg')
                    },
                    {
                        'img':require('./../homepage/recommend/recommendImage/window1-2.jpg')
                    },
                    {
                        'img':require('./../homepage/recommend/recommendImage/window1-3.jpg')
                    },
                    {
                        'img':require('./../homepage/recommend/recommendImage/window1-4.jpg')
                    }
                    ]
            }
        },
        computed: {
            params() {
                return {
                    //这里先定义要传递给后台的数据
                    //然后将每次请求20条的参数一起提交给后台
                    pageSize: this.pageSize
                }
            }
        },
        methods: {
            //无限加载函数
            loadMore() {
                if (this.allLoaded) {
                    this.moreLoading = true;
                    return;
                }
                if (this.queryLoading) {
                    return;
                }
                this.moreLoading = !this.queryLoading;
                this.pageNum++;
                this.$http.post("请求后台数据的接口", Object.assign({
                    pageNum: this.pageNum
                }, this.params)).then((res) => {
                    // if (res.sData && res.sData.list) {
                    //     this.list = this.list.concat(res.sData.list);
                    //     this.allLoaded = this.debtList.length == this.totalNum;
                    // }
                    this.moreLoading = this.allLoaded;
                });
            },
            goback() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style lang="" scoped>
    .wrap2{
        margin-top: 0.8rem;
    }
    body {
        background: #E9E9E9;
    }
    .cart {
        position: relative;
        /*margin-left: -1.1rem;*/
    }
    .delete_this {
        width: 1.1rem;
        height: 3.59rem;
        background: #f38650;
        position: absolute;
        right: -2rem;
        top: 0;
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
        margin-bottom: .12rem;
        overflow: hidden;
        position: relative;
    }
    .goods_title {
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .24rem;
        padding-left: .24rem;
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
    .check {
        float: right;
        margin-right: 1.8rem;
        color: #31B1B0;
    }
    .check_select,
    .input_model {
        width: .45rem;
        height: .45rem;
        border-radius: 50%;
        position: absolute;
        top: .24rem;
        left: .24rem;
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
    .goods_detail li {
        height: 2.7rem;
        margin-left: -1.1rem;
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
        text-indent: .75rem;
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
        margin-bottom: 1rem;
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
    .bg_green {
        background: linear-gradient(to right, #3FB5B6 0%, #41DB9C 100%);
    }
    .bg_red {
        background: linear-gradient(to right, #F67A84 0%, #F28A76 100%);
    }
    .bg_orange {
        background: linear-gradient(to right, #F49A6F 0%, #E6AE4C 100%);
    }
    .overdue_info {
        width: 95%;
        margin: 0 auto;
        height: 6.5rem;
        overflow: scroll;
    }
    .overdue_info li {
        height: 1.88rem;
        width: 100%;
        border-radius: .1rem;
        margin-bottom: .3rem;
        color: white;
        font-size: 0;
        position: relative;
    }
    .bg_gray {
        background: #CBCBCB;
    }
    .receive_left {
        display: inline-block;
        width: 1.8rem;
        height: 100%;
        font-size: 0.36rem;
        text-align: center;
        border-right: .01rem white dashed;
    }
    .cir_half {
        width: .4rem;
        height: .4rem;
        background: white;
        border-radius: 50%;
    }
    .cir_half_top {
        position: absolute;
        top: -.2rem;
        left: 1.6rem;
    }
    .cir_half_bottom {
        position: absolute;
        bottom: -.2rem;
        left: 1.6rem;
    }
    .receive_right {
        display: inline-block;
        font-size: .36rem;
    }
    .receive_right div {
        display: inline-block;
        color: white;
    }
    .receive_right div:first-child {
        width: 1.6rem;
        padding-left: .3rem;
    }
    .money_fav {
        font-size: .6rem;
    }
    .coupon_info {
        font-size: .26rem;
        height: .3rem;
        line-height: .5rem;
    }
    .receive {
        font-size: .2rem;
    }
    .money_dis {
        font-size: .24rem;
    }
</style>



