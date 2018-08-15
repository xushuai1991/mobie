<template>
    <div class='Cmycar'>
        <!-- <mt-header fixed title="购物车">
                </mt-header> -->
        <section>
            <div class="wrap2">
                <div class="goods_list">
                    <ul class="mui-table-view" infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                            <div class="cart">
                                <div class="goods">
                                    <div class="goods_title type-pay">
                                        <input type="checkbox" class='CinputBox' v-model="item.shopselected" @change="checkShop(index)" /><span>{{item.listgoods[0].otherInfo.company.companyName}}</span>
                                        <div class="checks font" @click='showServer(item.shopname,item.listgoods[0].otherInfo.company.companyId)'>领券</div>
                                        <p></p>
                                    </div>
                                    <div class="goodsBox list-item" v-for="(items,indexs) in item.listgoods" :key="indexs" data-type="0">
                                        <div class="list-box" @touchstart.capture="touchStart" @touchmove.capture="touchmove" @touchend.capture="touchEnd" @click="skip">
                                            <ul class="goods_detail" style='overflow: hidden; margin-top:0.2rem;'>
                                                <li class="goods_img" style="margin-left:0px;">
                                                    <input type="checkbox" v-model="items.selected" v-on:change="checkGoods(index,indexs)" style='position: relative;top:-2.3rem;margin-left:0.2rem;'>
                                                    <img :src='items.otherInfo.commodityImageUrl?"http://"+hostName+":"+port+"/api"+items.otherInfo.commodityImageUrl:"./test.jpg"'>
                                                </li>
                                                <li class="goods_info">
                                                    <p class="brandDesc">{{items.otherInfo.commodityName}}</p>
                                                    <p class="goods_identifier strlen" style="width:3rem;"></p>
                                                     <p class="goods_color" v-for='cars in items.options'>{{cars.name}}：<span>{{cars.value}}</span></p>
                                                    <!--<p @click="open('picker1',index,indexs)" size="large">{{items.otherInfo.commodityInfo.playTime}}</p>!-->
                                                </li>
                                                <li class="goods_info_se">
                                                    <p class="goods_price">￥<span>{{items.commodityDetail==""?items.otherInfo.commodityPrice:JSON.parse(items.commodityDetail).commodityPrice?JSON.parse(items.commodityDetail).commodityPrice:items.otherInfo.commodityPrice}}</span></p>
                                                    <div class='cgqNumBox'>
                                                        <input type="button" @click="reduce(index,indexs,items.commodityCount,items.id)" value='－'>
                                                        <input type="number"  v-model="items.commodityCount" v-on:blur="changeCount(index,indexs,items.commodityCount,items.id,items.otherInfo.commodityInfo.displayQuantity)"/>
                                                        <input type="button" @click="add(index,indexs,items.commodityCount,items.id,items.otherInfo.commodityInfo.displayQuantity)" value='＋'>
                                                    </div>
                                                </li>
                                                <!-- <span class="mui_shopcar_del" @click="remove(index,indexs)">
                                                                                                                                                <i class='icon iconfont icon-lajitong'></i>
                                                                                                                                            </span>!-->
                                            </ul>
                                            <div class="delete" @click="deleteSection(index,indexs,items.id)" :data-index="index">删除</div>
                                        </div>
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
        <footer v-if='list.length!=0'>
            <ul class="footer">
                <li class='type-pay'>
                    <input type="checkbox" v-model="selectAll" style='position: relative; top: 0.02rem;'> 全选 (<span class="shopNum">{{nums}}</span>)
                </li>
                <li class="all_price">
                    合计: <span>￥<i class="price_all" >{{total.toFixed(2)}}</i></span>
                </li>
                <li class="pay">
                    <p @click='Submit' class='button'>结算</p>
                </li>
            </ul>
        </footer>
        <div style='margin-top:4rem;font-size:.4rem;' v-if='list.length==0'>暂无数据</div>
        <mt-popup v-model="popupVisible" position="bottom" style='width:100%; margin-bottom: 0.96rem;'>
            <div class='shopBoxS'>{{ShopName}}</div>
            <p class='shopBxo'>领取优惠劵</p>
            <ul class='shopBox' v-if='coupon.length!=0'>
                <li v-for='(item,index) in coupon' :key='index' v-if='item'>
                    <div class='shopFont'>
                        <p class='font'>{{item?item.couponMoney:''}}元</p>
                        <p>{{item?item.couponName:""}}</p>
                        <p>使用期限 {{item?item.starTime.split(" ")[0]:""}}—{{item?item.endTime.split(" ")[0]:''}}</p>
                    </div><button @click='okcoupon(item.id)' :disabled='item.couponAmount==0' :class='item.couponAmount==0?"noButton":""'   class='button'>领取</button>
                </li>
            </ul>
            <ul class='shopBox' v-else >
                <li>暂无可用的优惠劵</li>
            </ul>
            <div class='closeBtn button' @click="btnClose">关闭</div>
        </mt-popup>
        <mt-popup v-model="popupVisible2" position="bottom" style='width:100%; margin-bottom: 0.96rem;'>
            <div class='shopBoxS'></div>
            <p class='shopBxo'>付款</p>
            <ul class='shopBox'>
                <li v-for='(item,index) in shopLIst' :key='index'>
                    <div class='shopFont'>
                        <p>{{item.listgoods[0].otherInfo.company.companyName}}</p>
                        <p>合计:{{item.num}}件 合计金额:{{item.prices}}元</p>
                    </div><button @click='playmoney(item)'>付款</button>
                </li>
            </ul>
            <div class='closeBtn button' @click="btnClose">关闭</div>
        </mt-popup>
        <mt-datetime-picker ref="picker1" type="date" v-model="value1" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" :endDate="endDate" @confirm="handleChange">
        </mt-datetime-picker>
    </div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui';
    import {
        MessageBox
    } from 'mint-ui';
    export default {
        data() {
            return {
                pIndex: '',
                pIndex2: '',
                value: null,
                value1: null,
                startDate: new Date(),
                endDate: this.addDay(2),
                //初始化无限加载相关参数
                queryLoading: false,
                moreLoading: false,
                allLoaded: false,
                totalNum: 0,
                pageSize: 2,
                pageNum: 1,
                ShopName: '',
                value: [],
                coupon: [],
                checked: '',
                nums: '',
                OrderTotal: 0,
                startX: 0,
                endX: 0,
                startY: 0,
                moveEndY: 0,
                list: [], //领取优惠劵
                popupVisible: false,
                popupVisible2: false,
                shopLIst: [],
                flag:true,
            }
        },
        params() {
            return {
                //这里先定义要传递给后台的数据
                //然后将每次请求20条的参数一起提交给后台
                pageSize: this.pageSize
            }
        },
        changes(val) {},
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
                    item.listgoods.map(function(a) {
                        return a.commodityCount-0
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
                        as += a.commodityCount-0
                        return (a.commodityCount-0) * a.commodityDetail == ""?a.otherInfo.commodityPrice:JSON.parse(a.commodityDetail).commodityPrice?JSON.parse(a.commodityDetail).commodityPrice:a.otherInfo.commodityPrice
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
        created() {
            if (this.getURLparms("name")) {
                this.getCarData();
            }
            this.$root.$on('loadShopcar', () => {
                // 首次进入购物车页面，加载商品信息
                if (this.list.length == 0) {
                    this.getCarData();
                }
            });
            this.hostName = location.hostname;
            this.port = location.port;
        },
        methods: {
            changeCount(parentID, ID, sum, shopId,maxShop){
                 var self = this.list[parentID].listgoods[ID];
                if (self.commodityCount <= 1) {
                    self.commodityCount = 1
                    Toast('最少买一件');
                    return false
                }
                if (self.commodityCount >= maxShop) {
                    self.commodityCount = maxShop-1
                    Toast('最多买'+maxShop);
                    return false
                }
            },
            getURLparms(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            },
            addDay(dayNumber, date) {
                date = date ? date : new Date();
                var ms = dayNumber * (1000 * 60 * 60 * 24)
                var newDate = new Date(date.getTime() + ms);
                return newDate;
            },
            open(picker, index, index2) {
                this.startDate = new Date(),
                    this.pIndex = index
                this.pIndex1 = index2
                this.$refs[picker].open();
            },
            handleChange(value) {
                this.date1 = value;
                this.timestampToTime(this.date1)
                this.list[this.pIndex].listgoods[this.pIndex1]['otherInfo']['commodityInfo'].playTime = this.timestampToTime(this.date1)
                //this.show = true;
                // Toast({
                //     message: '已选择 ' + value.toString(),
                //     position: 'bottom'
                // });
            },
            timestampToTime(timestamp) {
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                return Y + M + D + h + m + s;
            },
            //购物车数据群
            //付款
            playmoney(items) {
                this.$router.push({
                    path: '/ordercertain',
                    name: 'ordercertain',
                    params: {
                        name: 'shopCar',
                        // dataObj: item
                    }
                });
                console.log(items)
                localStorage.setItem("shopCar", JSON.stringify([items]))
                let commodityInfo = [];
                items.listgoods.forEach((item, index) => {
                    let cartIdList = [];
                    cartIdList.push(item.id);
                    item.otherInfo.commodityInfo.cartIdList = cartIdList;
                    item.otherInfo.commodityInfo.nums = item.commodityCount-0;
                    commodityInfo.push(item.otherInfo.commodityInfo)
                })
                localStorage.setItem("commodityInfo", JSON.stringify(commodityInfo))
            },
            //领取优惠劵
            okcoupon(id) {
                let userInfo = localStorage.getItem("userinfo");
                let userInfoId = JSON.parse(userInfo).id
                let url = '/api/product/coupon/customer/insert?couponId=' + id + '&number=1';
                this.$http({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {}
                }).then(response => {
                    if (response.data.status == 200) {
                        Toast(response.data.msg);
                        this.popupVisible = false;
                    } else {
                        Toast(response.data.msg);
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            //获取优惠劵
            getcoupon(id) {
                let that = this;
                let getdata = new Promise(function(rel, rej) {
                    let url = '/api/product/coupon/info/find?pageSize=0';
                    that.$http({
                        url: url,
                        method: 'POST',
                        // headers: {
                        //     'Content-Type': 'application/x-www-form-urlencoded'
                        // },
                        data: {
                            companyId: id,
                            couponStatus:1
                        }
                    }).then(response => {
                        rel(response)
                    }).catch(error => {
                        rej(error)
                    })
                })
                getdata.then(function(result) {
                    let couponArr = [];
                    result.data.info.list.forEach(item=>{
                        console.log(item)
                        if(item.couponStatus=='1'){
                            couponArr.push(item)
                        }
                    })
                    that.coupon = couponArr
                    
                }).catch(function(errmsg) {})
            },
            getCarData() {
                // let userInfo = sessionStorage.getItem("userinfo");
                // console.log(userInfo);
                // if(userInfo==null){
                //     Toast
                // }
                // let userInfoId = JSON.parse(userInfo).id
                let that = this;
                let getdata = new Promise(function(rel, rej) {
                    let url = '/api/product/shoppingCart/myShoppingCart';
                    that.$http({
                        url: url,
                        method: 'POST',
                        // headers: {
                        //     'Content-Type': 'application/x-www-form-urlencoded'
                        // },
                        data: {}
                    }).then(response => {
                        console.log(response)
                        if (response.data.status == 200) {
                            let data = response.data.info;
                            var b = data.reduce((v, k) => { //循环
                                 k.options = JSON.parse(k.options)
                                // k.otherInfo.commodityInfo.optionss = JSON.parse()
                                if(k.otherInfo.commodityInfo){
                                    k.otherInfo.commodityInfo.commodityImageList.push({"url":k.otherInfo.commodityImageUrl})
                                    k.otherInfo.commodityInfo.options= k.options==null?'': k.options    
                                    k['selected'] = false;
                                }
                                var filters = v.filter((data) => {
                                    return data.commodityCount === k.otherInfo.commodityCompanyId //过滤相同的companyId
                                });
                                if (filters.length === 0) { //判断数组的长度
                                    v.push({
                                        commodityCount: k.otherInfo.commodityCompanyId, //设置对象
                                        shopselected: false,
                                        listgoods: [k] //设置值
                                    })
                                } else {
                                    filters[0].listgoods.push(k) //扔进去
                                };
                                return v
                            }, [])
                            console.log(b)
                           let newArr = [];
                            b.forEach((items)=>{
                                items.listgoods.forEach(item=>{
                                     
                                    if(item.otherInfo.commodityInfo){
                                        newArr.push(item)
                                    }
                                    console.log(newArr)
                                    
                                })
                            })
                            console.log()
                            // b[0].listgoods = newArr
                            console.log(b)
                            // b = newArr
                            that.list = (b)
                        } else {
                            if (response.data.status == 401) {
                                localStorage.removeItem('userinfo');
                                Toast('请先登录');
                            } else {
                                Toast(response.data.msg);
                            }
                        }
                    }).catch(error => {
                        rej(error)
                    })
                })
                getdata.then(function(result) {}).catch(function(errmsg) {})
            },
            //无限加载函数
            checkShop(pID) { //商品的全选和反宣
                var self = this.list[pID];
                if (self.shopselected == true) {
                    self.listgoods.forEach(function(list, index) {
                        list.selected = true;
                        // console.log(list)
                    })
                } else {
                    self.listgoods.forEach(function(list) {
                        list.selected = false;
                        // console.log(list)
                    })
                }
            },
            add: function(parentID, ID, sum, shopId,maxShop) { //parentID是商家id,ID是商品id
                var self = this.list[parentID].listgoods[ID];
                if (self.commodityCount >= maxShop) {
                    self.commodityCount = maxShop
                    Toast('最多买'+maxShop);
                    return false;
                }
                let that = this;
                self.commodityCount++;
                if(this.flag){
                    this.flag = false
                let url = '/api/product/shoppingCart/update';
                this.$http({
                        url: url,
                        method: "post",
                        data: {
                            id: shopId,
                            commodityCount: self.commodityCount
                        }
                    })
                    .then(res => {
                        console.log(res)
                        setTimeout(function(){
                            that.flag = true
                        },300)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            //减少商品数量 最少买一件
            reduce: function(parentID, ID, sum, shopId) { //parentID是商家id,ID是商品id
                var self = this.list[parentID].listgoods[ID];
                if (self.commodityCount <= 1) {
                    self.commodityCount = 1
                    Toast('最少买一件');
                    return false
                }
                let that = this;
                self.commodityCount--;
                // let flag = true;
                if(this.flag){
                    this.flag = false
                    let url = '/api/product/shoppingCart/update';
                this.$http({
                        url: url,
                        method: "post",
                        data: {
                            id: shopId,
                            commodityCount: self.commodityCount
                        }
                    })
                    .then(res => {
                        console.log(res)
                        setTimeout(function(){
                            that.flag = true
                        },300)
                        console.log(this.flag )
                    }).catch(error => {
                        console.log(error)
                    })
                }
                
            },
            deleteSection(parentID, ID, shopID) { //parentID是商家id,ID是商品id
                this.unbind(parentID, ID, shopID)
            },
            unbind(parentID, ID, shopID) {
                let that = this;
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
                    let url = '/api/product/shoppingCart/remove';
                    that.$http({
                            url: url,
                            method: "post",
                            data: [shopID]
                        })
                        .then(res => {
                            if (res.data.status == 200) {
                                Toast('删除成功');
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                }).catch(err => {
                    if (err == 'cancel') {}
                });
            },
            checkGoods(pID, id) {
                var self = this.list[pID];
                console.log(self.shopselected)
                if (self.listgoods[id].selected) {
                    self.listgoods.filter(function(item) {
                        return item.selected == true;
                    }).length  == self.listgoods.length ? self.shopselected = true : self.shopselected = false;
                } else {
                    self.listgoods.filter(function(item) {
                        return item.selected == true;
                    }).length  == self.listgoods.length ? self.shopselected = true : self.shopselected = false;
                }
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
                if (OrderArry.length < 1) {
                    Toast('亲,请勾选商品');
                } else if (OrderArry.length == 1) {
                    OrderArry.forEach((item, index) => {
                        let num = 0;
                        let prices = 0;
                        item.listgoods.forEach((item) => {
                            if(item.commodityDetail ==""){
                                num += (item.commodityCount - 0)
                                prices += item.commodityCount * item.otherInfo.commodityPrice
                            }else{
                                num += (item.commodityCount - 0)
                                prices += item.commodityCount * JSON.parse(item.commodityDetail).commodityPrice?JSON.parse(item.commodityDetail).commodityPrice:item.otherInfo.commodityPrice
                            }
                        })
                        item['num'] = num;
                        item['prices'] = prices;
                    })
                    this.$router.push({
                        path: '/ordercertain',
                        name: 'ordercertain',
                        params: {
                            name: 'shopCar',
                            // dataObj: OrderArry
                        }
                    });
                    let commodityInfo = [];
                    OrderArry[0].listgoods.forEach((item, index) => {
                        console.log(item)
                        let cartIdList = [];
                        cartIdList.push(item.id);
                        item.otherInfo.commodityInfo.cartIdList = cartIdList;
                        item.otherInfo.commodityInfo.nums = item.commodityCount
                        item.otherInfo.commodityInfo.commodityDetail = item.commodityDetail
                        commodityInfo.push(item.otherInfo.commodityInfo)
                    })
                    localStorage.setItem("commodityInfo", JSON.stringify(commodityInfo))
                } else if (OrderArry.length > 1) {
                    this.shopLIst = OrderArry
                    this.popupVisible2 = true;
                    OrderArry.forEach((item, index) => {
                        let num = 0;
                        let prices = 0;
                        item.listgoods.forEach((item) => {
                            num += (item.commodityCount - 0)
                            prices += item.commodityCount * JSON.parse(items.commodityDetail).commodityPrice?JSON.parse(items.commodityDetail).commodityPrice:JSON.parse(item.commodityDetail).commodityPrice
                        })
                        item['num'] = num;
                        item['prices'] = prices;
                    })
                }
            },
            btnClose() {
                this.popupVisible = false;
                this.popupVisible2 = false;
            },
            showServer(name, companyId) {
                this.ShopName = name;
                this.popupVisible = true;
                this.getcoupon(companyId)
            },
            //跳转
            skip() {
                if (this.checkSlide()) {
                    this.restSlide();
                } else {
                    // alert('You click the slide!')
                }
            },
            //滑动开始
            touchStart(e) {
                // 记录初始位置
                this.startX = e.touches[0].clientX;
                this.startY = e.changedTouches[0].pageY;
            },
            touchmove(e) {
                this.moveEndY = e.changedTouches[0].pageY;
                let Y = this.moveEndY - this.startY;
                //    if (Math.abs(Y) >= 10) {　
                //         console.log(1)　　　　　
                //         document.addEventListener('touchmove', this.handler, false);　　　　
                //     }else{
                //         console.log(2)　　　　
                //          document.removeEventListener('touchmove', this.handler, false);
                //     }
            },
            handler() {
                event.preventDefault();
            },
            //滑动结束
            touchEnd(e) {
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                //  e.preventDefault(); 
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if (parentElement.dataset.type == 0 && this.startX - this.endX > 50) {
                    this.restSlide();
                    // console.log('..')
                    parentElement.dataset.type = 1;
                }
                // 右滑
                if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;
            },
            //判断当前是否有滑块处于滑动状态
            checkSlide() {
                let listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].dataset.type == 1) {
                        return true;
                    }
                }
                return false;
            },
            //复位滑动状态
            restSlide() {
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].dataset.type = 0;
                }
            },
        },
        beforeDestroy() {
            this.$root.$off('loadShopcar');
        },
        
    }
</script>

<style lang='less'>
    .Cmycar{
        .noButton{
            background:gray !important;
        }
        input[type=button] {
            -webkit-appearance: none;
            outline: none
        }
        .Cmycar .mint-cell-value {
            width: 100%;
        }
        .Cmycar .mint-cell-wrapper {
            padding-left: 0;
        }
        .Cmycar .mint-cell-swipe-button {
            font-size: 0.3rem;
            line-height: 3rem;
        }
        .mint-toast-text {
            position: relative;
            z-index: 999999 !important;
        }
        .mint-popup-bottom {
            z-index: 16 !important;
        }
        .v-modal {
            z-index: 15 !important;
        }
    }
    
</style>
<style lang="less" scoped>
    .list-item {
        position: relative;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
    }
    .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
    }
    .list-item[data-type="1"] {
        transform: translate3d(-2rem, 0, 0);
    }
    .list-item .delete {
        width: 1.4rem;
        height: 100%;
        background: #ff4949;
        font-size: 17px;
        color: #fff;
        text-align: center;
        line-height: 2.8rem;
        position: absolute;
        top: 0;
        right: -2rem;
    }
    .cgqNumBox input[type=button] {
        font-size: 0.3rem;
        background: #ddd;
        vertical-align: middle;
        line-height: 0rem;
    }
    .shopBox {
        margin-bottom: 0.4rem;
        font-size: 0.2rem;
        height: 7rem;
        overflow-y: auto;
        button {
            position: absolute;
            right: 0;
            top: 0.2rem;
            border: none;
            padding: 0.15rem;
            background: #26a2ff;
            color: #fff;
            margin-right: 0.2rem;
            font-size: 0.25rem;
            border-radius: 5px;
        }
    }
    .closeBtn {
        background: #26a2ff;
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
        color: #26a2ff;
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
        // margin-top: 0.8rem;
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
        line-height:1rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .25rem;
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
        color: #26a2ff;
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
        background: #26a2ff;
        border: .01rem solid #26a2ff;
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
        margin-left: 0rem;
        text-align: left;
        // padding-left: .2rem;
    }
    .goods_detail .goods_img img {
        height: 100%;
        min-width: 3rem;
        width: 3rem;
        // border:none;
        // outline: none;
    }
    .goods_info {
        margin-top: .3rem;
        line-height: .5rem;
        // padding-left: .1rem;
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
        position: relative;
        right:.2rem;
        // padding-right: .2rem;
    }
    .footer {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        font-size: .26rem; // position: fixed;
        // bottom: .9rem;
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
        background: #26a2ff;
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
        line-height: 2rem;
        right: -.5rem;
        top:1.3rem;
        text-align: center;
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
        padding-left: .1rem;
    }
    .brandDesc {
        font-size: 0.3rem;
        font-weight: 700;
        padding-left: .1rem;
    }
</style>



