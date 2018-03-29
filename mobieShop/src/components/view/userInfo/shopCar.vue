<template>
    <div class='Cmycar'>
        <section>
            <div class="wrap2">
                <div class="goods_list">
                    <ul class="mui-table-view" infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                            <div class="cart">
                                <div class="goods">
                                    <div class="goods_title type-pay">
                                        <input type="checkbox" class='CinputBox' v-model="item.shopselected" @click="checkShop(index)" /><span>{{item.shopname}}</span>
                                        <div class="checks" @click='showServer(item.shopname)'>领券</div>
                                        <p></p>
                                    </div>
                                    <div class="goodsBox" v-for="(items,indexs) in item.listgoods" :key="indexs">
                                    <mt-cell-swipe :right="[  
                                                        {  
                                                            content: '删除',  
                                                            style: { background: '#ff7900', color: '#fff'},  
                                                            handler: () => deleteSection(index,indexs)  
                                                        }  
                                                    ]">
                                        <ul class="goods_detail" style='overflow: hidden; margin-top:0.2rem;'>
                                            <li class="goods_img" style="margin-left:0px;">
                                                <img :src="items.img">
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">{{items.name}}</p>
                                                <p class="goods_identifier strlen" style="width:3rem;"><span>水电费收到发生的防守打法收到发生的防守打法斯蒂芬斯蒂芬是收到放斯蒂芬斯蒂芬松放松发顺丰</span></p>
                                                <p class="goods_color">颜色：<span>红色</span></p>
                                                <p class="goods_size">尺码：<span>尺寸</span></p>
                                            </li>
                                            <li class="goods_info_se">
                                                <p class="goods_price">￥<span>{{items.price}}</span></p>
                                                <div class='cgqNumBox'>
                                                    <input type="button" @click="reduce(index,indexs)" value='－'>
                                                    <input type="number" disabled :value="items.count" />
                                                    <input type="button" @click="add(index,indexs)" value='＋'>
                                                </div>
                                            </li>
                                           <!-- <span class="mui_shopcar_del" @click="remove(index,indexs)">
                                                        <i class='icon iconfont icon-lajitong'></i>
                                                    </span>!-->
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
        <footer>
            <ul class="footer">
                <li class='type-pay'>
                    <input type="checkbox" v-model="selectAll" style='position: relative; top: 0.02rem;'> 全选 (<span class="shopNum">{{nums}}</span>)
                </li>
                <li class="all_price">
                    合计: <span>￥<i class="price_all" >{{total.toFixed(1)}}</i></span>
                </li>
                <li class="pay">
                    <p @click='Submit'>结算</p>
                </li>
            </ul>
        </footer>
        
        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;'>
            <div class='shopBoxS'>{{ShopName}}</div>
            <p class='shopBxo'>领取优惠劵</p>
            <ul class='shopBox'>
                <li>
                    <div class='shopFont'>
                        <p>15元</p>
                        <p>订单满149使用(不含邮费)</p>
                        <p>使用期限 2018.03.25-2018.03.31</p>
                    </div><button>领取</button>
                </li>
                <li>
                    <div class='shopFont'>
                        <p>15元</p>
                        <p>订单满149使用(不含邮费)</p>
                        <p>使用期限 2018.03.25-2018.03.31</p>
                    </div><button>领取</button>
                </li>
                <li>
                    <div class='shopFont'>
                        <p>15元</p>
                        <p>订单满149使用(不含邮费)</p>
                        <p>使用期限 2018.03.25-2018.03.31</p>
                    </div><button>领取</button>
                </li>
            </ul>
            <div class='closeBtn' @click="btnClose">关闭</div>
        </mt-popup>
    </div>
</template>
<script>
    import {
        MessageBox
    } from 'mint-ui';
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
                ShopName: '',
                value: [],
                checked: '',
                nums: '',
                OrderTotal: 0,
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
                                price: 400000,
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
                ], //领取优惠劵
                popupVisible: false,
            }
        },
        params() {
            return {
                //这里先定义要传递给后台的数据
                //然后将每次请求20条的参数一起提交给后台
                pageSize: this.pageSize
            }
        },
        changes(val) {
            console.log(val)
        },
        computed: { //计算属性的方法
            selectAll: {
                get() { //获取到每个checkbox的属性
                    return this.list.filter(function(item) { //每次点击过滤不一样的属性
                        return (item.shopselected == true) //把不一样的属性返回出去
                    }).length == this.list.length; //当完全相等的时候把全选的值设置为选中的状态
                },
                set(val) {
                    this.list.forEach(function(item) { //遍历所有商店
                        item.shopselected = val; //所有商店选中
                        item.listgoods.forEach(function(list) { //遍历所有商品
                            list.selected = val //所有商品选中
                        })
                    })
                }
            },
            num() {
                var num = 0;
                this.list.forEach(function(item) {
                    item.listgoods.filters(function(a) {
                        return a.selected
                    }).map(function(a) {
                        return a.count
                    }).foreEach(function(a) {
                        num += a
                    })
                })
                return num
            },
            total() {
                let total = 0;
                let as = 0;
                this.list.forEach(function(item) {
                    item.listgoods.filter(function(a) {
                        return a.selected
                    }).map(function(a) {
                        as += a.count
                        return a.count * a.price
                    }).forEach(function(a) {
                        total += a;
                    })
                })
                //计算总件数
                this.nums = as
                this.OrderTotal = total; //更新商品总价
                return total; //返回总价
            }
        },
        methods: {
            //无限加载函数
            checkShop(pID) { //商品的全选和反宣
                var self = this.list[pID];
                if (self.shopselected != true) {
                    self.listgoods.forEach(function(list, index) {
                        list.selected = true;
                        console.log(list)
                    })
                    
                } else {
                    self.listgoods.forEach(function(list) {
                        list.selected = false;
                        console.log(list)
                    })
                }
            },
            add: function(parentID, ID) { //parentID是商家id,ID是商品id
                var self = this.list[parentID].listgoods[ID];
                if (self.count > 100) {
                    return false;
                }
                self.count++;
            },
            //减少商品数量 最少买一件
            reduce: function(parentID, ID) { //parentID是商家id,ID是商品id
                var self = this.list[parentID].listgoods[ID];
                if (self.count <= 1) {
                    return false
                }
                self.count--;
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
            goback() {
                this.$router.go(-1);
            },
            Submit() {
                var TotalPrice = this.OrderTotal.toFixed(1); //存放要支付的总价
                var OrderArry = []; //存放选中的商品数组
                this.list.forEach(function(item) { //遍历商家数组
                    if (item.shopselected) { //如果商家备选中则其下商品均被选中，直接添加数组
                        return OrderArry.push(item)
                    } else { //如果商家没有选中，继续遍历旗下商品是否备选中
                        var arry = { //设置临时数组，来保存没有选中商店的数据
                            'id': item.id, //商店id
                            'shopname': item.shopname, //商店名字
                            'shopselected': item.shopselected, //商店是否备选中
                            'listgoods': [] //商店旗下的商品数组
                        };
                        item.listgoods.filter(function(list) { //遍历商店旗下的商品数组
                            return list.selected //过滤所有选中的商品
                        }).map(function(a) {
                            return arry.listgoods.push(a) //将选中的商品添加到数组中
                        });
                        if (arry.listgoods.length > 0) { //如果有商品选中在添加到数组
                            OrderArry.push(arry)
                        }
                    }
                });
                console.log(OrderArry,TotalPrice)
            },
            btnClose() {
                this.popupVisible = false;
            },
            showServer(name) {
                this.ShopName = name;
                this.popupVisible = true;
            }
        },
    }
</script>

    <style>
    input[type=button]{
	-webkit-appearance:none;
	outline:none
}
    .Cmycar .mint-cell-value{
            width:100%;
        }
    .Cmycar .mint-cell-wrapper{
            padding-left: 0;
        }
   .Cmycar .mint-cell-swipe-button{
            font-size:0.3rem;
            line-height:3rem;
        }

</style>
<style lang="less" scoped>
    .cgqNumBox input[type=button]{
        font-size:0.3rem;
        background:#ddd;
       vertical-align: middle;
       line-height:0rem;
    }
    .shopBox {
        margin-bottom: 0.4rem;
        font-size: 0.2rem;
        
        button {
            position: absolute;
            right: 0;
            top: 0.2rem;
            border: none;
            padding: 0.15rem;
            background: linear-gradient(to bottom, #0CBBB9 0%, #4AC6DC 100%);
            color: #fff;
            margin-right: 0.2rem;
            font-size:0.25rem;
            border-radius: 5px;
        }
    }
    .closeBtn {
        background: linear-gradient(to bottom, #0CBBB9 0%, #4AC6DC 100%);
        line-height: 1rem;
        font-size: 0.4rem;
        color: #fff;
    }
    .shopBox li {
        position: relative;
        height: 0.5rem;
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #ddd;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .shopBox li:last-child {
        border-bottom: none;
    }
    .shopFont {
        float: left;
        padding-left: 0.2rem;
    }
    .shopFont p {
        font-size: 0.2rem;
        line-height: 0.4rem;
        text-align: left;
    }
    .shopFont p:nth-child(1) {
        font-size: 0.25rem;
        color: #0CBBB9;
    }
    .shopFont p:nth-child(3) {
        font-size: 0.2rem;
        color: #b8bbbf;
    }
    .shopBoxS {
        font-size: 0.35rem;
        padding-top: 0.2rem;
        padding-bottom: 0.1rem;
    }
    .shopBxo {
        font-size: 0.3rem;
        padding-top: 0.1rem;
    }
    .shopBox li {
        height: 1.26rem;
        line-height: 1.26rem;
    }
    #selectAll {
        position: relative;
        left: -0.7rem;
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
            right: 0.5rem;
            top: 1.4rem;
        }
        .mint-popup-bottom {
            width: 100%;
        }
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
    .type-pay .select input[type='checkbox'] {
        position: absolute;
        right: .25rem;
        top: .7rem;
        opacity: 0;
        z-index: 1;
    }
    .type-pay .check {
        width: .4rem;
        height: .4rem;
        display: inline-block;
        border: 1px solid #ddd;
        border-radius: 50%;
        z-index: 99;
        position: absolute;
        left: .25rem;
        top: 0.2rem;
    }
    .type-pay .checked {
        width: .45rem;
        height: .45rem;
        border: none;
        left: .25rem;
        top: 0.2rem;
        background: url(/static/images/selected.png) no-repeat round;
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
    .goods_detail li {
        height: 2.7rem;
        margin-left:0rem;
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
        font-size: .3rem;
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
    .cgqNumBox {
        width: 3rem;
    position: absolute;
    line-height:2rem;
    right: -.5rem;
    text-align:center;
        button {
            width: 0.5rem;
            height: 0.5rem;
        }
        input {
            width: 0.5rem;
            height: 0.5rem;
            text-align: center;
        }
    }
     .strlen {
        margin-bottom: 0.2rem;
        font-size: 0.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 0.3rem;
    }
    .goods_color,
    .goods_size {
        font-size: 0.2rem;
        color: #707070;
    }
     .brandDesc {
        font-size: 0.3rem;
        font-weight: 700;
    }
</style>



