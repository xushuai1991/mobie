<template>
    <div class='Cmyoder'>
        <!--<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <li v-for="item in list">{{ item }}</li>
                    </ul>!-->
        <section>
            <div class="wrap2">
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
                                        <mt-cell-swipe :right="[  
                                                        {  
                                                            content: '删除',  
                                                            style: { background: '#ff7900', color: '#fff'},  
                                                            handler: () => deleteSection(index,indexs)  
                                                        }  
                                                    ]">
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
                                        </mt-cell-swipe>
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
                list: [1, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4],
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
                    },
                    {
                        id: 2,
                        shopname: '云端电子',
                        shopselected: false,
                        listgoods: [{
                                id: 201,
                                name: '三星',
                                price: 4000,
                                count: 2,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 202,
                                name: '华为1',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 203,
                                name: '华为2',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 204,
                                name: '华为3',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            }
                        ]
                    },
                    {
                        id: 3,
                        shopname: '小米官方商店',
                        shopselected: false,
                        listgoods: [{
                            id: 301,
                            name: '小米4',
                            price: 1.3,
                            count: 2,
                            selected: false,
                            'img': require('./../homepage/recommend/recommendImage/1.jpg')
                        }]
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
    .Cmyoder .mint-cell-value{
            width:100%;
        }
    .Cmyoder .mint-cell-wrapper{
            padding-left: 0;
        }
   .Cmyoder .mint-cell-swipe-button{
            font-size:0.3rem;
            line-height:3rem;
        }
        .mint-cell-wrapper{
            border-bottom:none;
            padding-bottom:0.2rem;
        }
</style>
<style scoped lang='less'>
    .brandDesc {
        font-size: 0.3rem;
        font-weight: 700;
    }
    .goods {
        width: 100%;
        background: white;
        margin-bottom: .12rem;
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
        margin-bottom: .12rem;
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
        line-height:1.1rem;
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
    .goods_info  .strlen {
        margin-bottom: 0.2rem;
        font-size: 0.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width:1rem;
        line-height: 0.3rem;
        padding-left:0.2rem;
        text-indent: 0rem;
    }
    .goods_color,
    .goods_size {
        font-size: 0.2rem;
        color: #707070;
    }
</style>