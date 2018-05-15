<template>
    <div class='contain certainorder_xs'>
        <div class='msg-customer'>
            <img class='avatar' :src="userinfo.imgurl" alt="">
            <div class='msgs'>
                <p class='name'>{{userinfo.username}} {{userinfo.phone}}</p>
                <p class='area' v-if='userinfo.address!=""'><i class='icon iconfont icon-dingwei'></i>{{userinfo.address}}</p>
            </div>
            <div class='more'>
                <p class='icon iconfont icon-arrow-right-copy' @click='changeaddress'></p>
            </div>
        </div>
        <div class='msg-goods'>
            <h3 class="title">确认商品信息</h3>
            <ul class='detail'>
                <li v-for='(item,index) in goodslist' :key='index'>
                    <div v-if='item.childlist.length==0'>
                        <div class='img-goods'>
                            <img style='width:100%; height:100%;' :src='"http://"+hostName+":"+port+"/api"+item.imgurl' alt="">
                        </div>
                        <div class='msg'>
                            <p class='name'>{{item.name}}</p>
                            <p class='brand' v-if='item.conditionname1!=""'>{{item.conditionname1}}：{{item.conditionvalue1}}</p>
                            <p class='area' v-if='item.conditionname2!=""'>{{item.conditionname2}}：{{item.conditionvalue2}}</p>
                        </div>
                        <div class='tips'>
                            <p class='price'>￥{{item.price_unit}}</p>
                            <p class='oper'>
                                <span>X{{item.nums}}</span>
                                <!-- <span>{{item.num}}</span> -->
                                <i class='icon iconfont icon-edit_icon' @click="changenums(index)"></i>
                            </p>
                        </div>
                    </div>
                    <div v-if='item.childlist.length>0' class='package'>
                        <p class='name'>{{item.name}}</p>
                        <ul>
                            <li v-for='(item1,index1) in item.childlist' :key='index1'>
                                <div class='img-goods'>
                                    <img src="item1.imgurl" alt="">
                                </div>
                                <div class='msg'>
                                    <p class='name'>{{item1.name}}</p>
                                    <p class='brand' v-if='item1.conditionname1!=""'>{{item1.conditionname1}}：{{item1.conditionvalue1}}</p>
                                    <p class='area' v-if='item1.conditionname2!=""'>{{item1.conditionname2}}：{{item1.conditionvalue2}}</p>
                                </div>
                                <div class='tips'>
                                    <p class='price'>￥{{item1.price_unit}}</p>
                                    <p class='oper'>
                                        <span>X{{item1.nums}}</span>
                                        <!-- <i class='icon iconfont icon-edit_icon' @click="changenums(index1)"></i> -->
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div class='tips'>
                            <p class='price'>￥{{item.price_unit}}</p>
                            <p class='oper'>
                                <span>X{{item.num}}</span>
                                <!-- <span>{{item.num}}</span> -->
                                <i class='icon iconfont icon-edit_icon' @click="changenums(index)"></i>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class='price-total'>
            <span class='tip'>金额合计：</span>
            <span class='value'>￥{{totalprice}}</span>
        </div>
        <!-- 积分抵扣 -->
        <div class='deduction'>
            <p class='label'>
                <span>积分抵扣（可用积分：{{point}}）</span>
            </p>
            <ul>
                <li v-for='(item,index) in deductionlist' :key='index'>
                    <label for="">{{item.score+'积分抵扣'+item.moneycanduct+'元（'+item.commodityname+')'}}</label>
                    <input type="checkbox" v-model="deductionindex" style="float:right;" :value='index' name='deduction'>
                </li>
            </ul>
        </div>
        <!-- 优惠券抵扣 -->
        <div class='coupon'>
            <p class='label'>
                <span v-if='couponlist.length!=0'>优惠券</span>
                <span v-if='couponlist.length==0'>无可用优惠券</span>
            </p>
            <ul>
                <li v-for='(item,index) in couponlist' :key='index'>
                    <label for="">{{item.couponType==0?'满'+item.fullmoney+'元减'+item.money+'元':(item.money+'元（'+(item.coupontype==1?'专享）':item.coupontype==2?'无门槛）':''))}}</label>
                    <input type="checkbox" v-model="couponindex" style="float:right;" :value='index' name='coupon'>
                </li>
            </ul>
        </div>
        <!-- <div class='service-time'>
                    <p>
                        <span class='tip' >可预约服务时间</span>
                        <span class='data'>{{servicedate}}</span>
                        <i class='icon iconfont icon-arrow-right-copy' style='position:absolute;right:.2rem;' @click="popupVisible = true"></i>   
                    </p>
                    
                    <mt-popup v-model="popupVisible" position="bottom" class="popup">
                        <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true'>
                            <p class='btn-group'>
                                <button class='cancle' @click='cancledate'>取消</button>
                                <button class='certain' @click="getdate">确定</button>
                            </p>
                            
                        </mt-picker>
                    </mt-popup>
                    
                </div> -->
        <!-- <div class='invoice'>
                    <p>
                        <span class='tip'>我要开发票</span>
                        <i class='icon iconfont icon-arrow-right-copy' style='position:absolute;right:.2rem;'  @click='makeinvoice'></i>   
                    </p>
                    
                </div> -->
        <div class='type-pay'>
            <p>
                <span class='typepay'>
                            <img src="static/images/weixin.jpg" alt="">
                            <span class='type'>微信支付</span>
                </span>
                <span class='select'>
                    
                    <input type="checkbox" v-model='checked'>
                    <span class='check checked' @click="selectpaytype($event)"></span>
                </span>
            </p>
        </div>
        <div class='submitorder'>
            <span class='msgs'>
                        <p>共1件产品</p>
                        <p>合计：
                            <span class='price'>￥{{finalprice}}</span>
                            <span class='tip'>{{'积分抵扣：'+deductionmoney+'元'}}</span>
                            <span class='tip'>{{'优惠券抵扣：'+coupmoney+'元'}}</span>
                        </p>
            </span>
            <button class='submit' @click='submitorder'>提交订单</button>
        </div>
    </div>
</template>
<script>
    import {
        formatdate
    } from '../../../assets/javascript/formatdate.js'
    import {
        MessageBox
    } from 'mint-ui'
    import {
        Toast
    } from 'mint-ui'
    import {
        operatelocalstorage
    } from '../../../assets/javascript/localstorage_hasdata.js'
    // import {weixinPay} from '../../../assets/javascript/weixinpay.js'
    export default {
        data() {
            return {
                checked: 'checked',
                userinfo: {
                    id: '',
                    username: '',
                    phone: '',
                    address: '',
                    addressid: '',
                    imgurl: '',
                    consumptionpoints: 0
                },
                goodslist: [],
                deductionlist: [
                    // {
                    //     commodityname:'商品一',
                    //     score:20,
                    //     moneycanduct:1
                    // },
                    // {
                    //     commodityname:'商品一',
                    //     score:20,
                    //     moneycanduct:1
                    // }
                ],
                scorecandeduct: 0,
                moneycanduct: 0,
                deductionindex: [],
                iscoupon: false,
                couponlist: [],
                couponindex: [],
                servicedate: '',
                datechange: '',
                popupVisible: false,
                dates: [{
                        values: ['今天', '明天', '后天'],
                        className: 'slot1',
                        textAlign: 'left'
                    },
                    {
                        flex: 1,
                        values: ['00点', '01点', '02点', '03点', '04点', '05点',
                            '06点', '07点', '08点', '09点', '10点', '11点',
                            '12点', '13点', '14点', '15点', '16点', '17点',
                            '18点', '19点', '20点', '21点', '22点', '23点'
                        ],
                        className: 'slot2',
                        textAlign: 'center'
                    },
                    {
                        values: ['00分', '10分', '20分', '30分', '40分', '50分', ],
                        className: 'slot3',
                        textAlign: 'right'
                    }
                ],
                deductionmoney:0,
                coupmoney:0,
                point:0
            }
        },
        computed: {
            totalprice() {
                let total = 0;
                this.goodslist.forEach(item => {
                    total += item.price_unit * item.nums
                });
                return total.toFixed(2);;
            },
            finalprice() {
                let price = this.totalprice;
                let deductionmoney = 0;
                if (this.deductionindex.length != 0) {
                    this.deductionindex.forEach(item => {
                        deductionmoney +=Number(this.deductionlist[item].moneycanduct);
                    });
                }
                this.deductionmoney=deductionmoney;
                let coupmoney = 0;
                this.couponindex.forEach(item => {
                    coupmoney +=Number(this.couponlist[item].money);
                });
                this.coupmoney=coupmoney;
                price = price - deductionmoney - coupmoney;
                return price < 0 ? 0 : price.toFixed(2);
            }
        },
        watch: {
            deductionindex(newvalue, oldvalue) {
                let length_old = oldvalue.length;
                let length_new = newvalue.length;
                if (length_old > length_new) {
                    this.point += this.deductionlist[length_old - 1].score;
                } else if (length_old < length_new) {
                    if (this.point - this.deductionlist[length_new - 1].score < 0) {
                        Toast('剩余积分不足，无法抵扣！');
                        this.deductionindex.pop();
                    } else {
                        this.point-=this.deductionlist[length_new - 1].score;
                        // this.userinfo.consumptionpoints -= this.deductionlist[length_new - 1].score;
                    }
                }
            }
        },
        created: function() {
            this.hostName = location.hostname;
            this.port = location.port;
            this.$root.$emit('header', '确认订单');
            // 订单内的商品数据
            // let data=JSON.parse(localStorage.getItem('shopCar'))[0].listgoods;
            let data = JSON.parse(localStorage.getItem('commodityInfo'));
            console.log(data);
            data.forEach(item => {
                console.log(item)
                let json = {
                    id: item.id,
                    name: item.name,
                    imgurl: item.commodityImageList.length > 0 ? item.commodityImageList[0].url : '',
                    conditionname1: item.options[0]==null?'':item.options[0].name,
                    conditionvalue1: item.options[0]==null?'':item.options[0].value,
                    conditionname2: item.options[1]==null?'':item.options[1].name,
                    conditionvalue2: item.options[1]==null?'':item.options[1].value,
                    price_unit: item.originalPrice,
                    nums: item.nums,
                    childlist: []
                };
                this.goodslist.push(json);
                if (item.originalPricePoint != null) {
                    let json1 = {
                        commodityid:item.id,
                        commodityname: item.name,
                        score: item.originalPricePoint,
                        moneycanduct:item.originalPrice-item.originalPriceMoney
                    };
                    this.deductionlist.push(json1);
                }
            });
            let user_str = operatelocalstorage('userinfo', null, 'get', null);
            if (user_str == null) {
                Toast('请先登录');
            } else {
                let userinfo = JSON.parse(user_str);
                this.userinfo.id = userinfo.id;
                this.userinfo.username = userinfo.nickname == null ? '无昵称' : userinfo.nickname;
                this.userinfo.phone = userinfo.mobile;
                this.userinfo.imgurl = userinfo.avatar;
                this.userinfo.consumptionpoints = userinfo.consumptionPoints;
                this.getDefaultaddress();
                // console.log(userinfo);
                this.getCouponcanuse();
                this.integral();
            }
        },
        methods: {
            // 获取用户可用总积分
            integral(){
                let that = this
                this.$http.post(
                    '/api/customer/consumption/points/find?pageSize=1',
                ).then(res => { 
                    if(res.data.status == 200){
                        that.point = res.data.info.list[0].effectivePoints
                        that.expiredPoints = res.data.info.list[0].expiredPoints
                    }else{
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            changeaddress() {
                this.$router.push({
                    'name': 'addManagement',
                    // props:{'compoanyId':sessionStorage.getItem('companyId')}
                });
                sessionStorage.setItem('from', 'ordercertain');
            },
            selectpaytype(e) {
                let classname = e.target.getAttribute('class');
                if (classname == 'check') {
                    e.target.setAttribute('class', 'check checked');
                    this.checked = 'checked';
                } else {
                    e.target.setAttribute('class', 'check');
                    this.checked = '';
                }
            },
            onValuesChange(picker, values) {
                this.datechange = values;
                // console.log(values);
            },
            getdate() {
                let day = new Date();
                if (this.datechange[0] == '今天') {
                    day = day.format('yyyy-MM-dd');
                } else if (this.datechange[0] == '明天') {
                    day = new Date(day.setDate(day.getDate() + 1)).format('yyyy-MM-dd');
                } else if (this.datechange[0] == '后天') {
                    day = new Date(day.setDate(day.getDate() + 2)).format('yyyy-MM-dd');
                }
                let date = day + ' ' + this.datechange[1].substring(0, 2) + ':' + this.datechange[2].substring(0, 2);
                this.servicedate = date;
                this.popupVisible = false;
            },
            cancledate() {
                this.popupVisible = false;
            },
            makeinvoice() {
                this.$router.push('/invoice');
            },
            changenums(index) {
                MessageBox.prompt('请输入数量').then(({
                    value
                }) => {
                    if (isNaN(value)) {
                        Toast('请输入数字');
                    } else {
                        this.goodslist[index].nums = Math.abs(value);
                    }
                }).catch(() => {});
            },
            // 获取默认地址
            getDefaultaddress() {
                let that = this;
                this.$http.post('/api/customer/address/queryMap', {
                        customerId: this.userinfo.id
                    })
                    .then(res => {
                        if (res.data.status == 401) {
                            Toast('请先登录');
                        }
                        if (res.data.status == 200) {
                            for (let item of res.data.info) {
                                if (item.isDefaultAddress) {
                                    let address = item.province.regionName + item.city.regionName + item.district.regionName + item.region.regionName + item.address;
                                    that.userinfo.address = address;
                                    that.userinfo.addressid = item.id;
                                    break;
                                }
                            }
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 获取可用优惠券
            getCouponcanuse() {
                let that = this;
                let idlist=[];
                this.goodslist.forEach(item=>{
                    idlist.push(item.id);
                });
                let data = {
                    amount: this.totalprice,
                    couponCustomerList:idlist
                };
                this.$http.post('/api/product/coupon/customer/display', data)
                    .then(res => {
                        if (res.data.status == 200) {
                            res.data.info.forEach(item => {
                                let json = {
                                    id: item.id,
                                    money: item.couponMoney,
                                    fullmoney: item.fullAmount,
                                    coupontype: item.couponType
                                };
                                that.couponlist.push(json);
                            });
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //生成订单
            createOrder(data) {
                let that = this;
                this.$http.post('/api/product/order/mall/insert', data)
                    .then(res => {
                        console.log(res)
                        if (res.data.status == 200) {
                            let carId = JSON.parse(localStorage.getItem('commodityInfo'))
                            if (carId!==null||carId=='') {
                                let cartIdList = [];
                                carId.forEach((item, i) => {
                                    if(item.cartIdList!=null){
                                        cartIdList.push(item.cartIdList[0])
                                    }
                                    
                                })
                                let url = '/api/product/shoppingCart/remove';
                                that.$http({
                                    url: url,
                                    method: 'post',
                                    data: cartIdList
                                }).then((res) => {
                                    console.log(res)
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                            let number = res.data.info.number;
                            // Toast('订单生成成功！');
                            this.$router.push('paying?number=' + number + '&money=' + this.finalprice);
                            // this.$router.push({name:'paying',params:{'number':number}});
                            // let url='daojia.jingrunjia.com.cn/paying?number='+number;
                            // let weixinurl="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx047af049a2f7c678&redirect_uri="+encodeURI(url)+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                            // window.location.href=encodeURI(weixinurl);
                        } else {
                            Toast(res.data.msg);
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        Toast('订单生成失败');
                        console.log(err);
                    });
            },
            //获取微信支付config
            // getWeixinpayconfig(){
            //     return new Promise((resolve,reject)=>{
            //         let that=this;
            //         let url=window.location.href;
            //         this.$http.get('/api/public/share/wechat/config/fetch?url='+url)
            //         .then(res=>{
            //             console.log(res);
            //             if(res.data.status==200){
            //                 resolve(true);
            //             }
            //         })
            //         .catch(err=>{
            //             console.log(err);
            //             resolve(false);
            //         });
            //     })
            // },
            submitorder() {
                if (this.checked != 'checked') {
                    Toast('请选择支付方式！');
                    return;
                }
                let data = {
                    mallOrderList: [],
                    regionTemplateId: this.userinfo.addressid,
                    couponInfoList: []
                };
                let mallOrderList = [];
                this.goodslist.forEach(item => {
                    let json = {
                        commodityId: item.id,
                        amount: item.nums,
                        usePoint: false,
                        pointSum: 0,
                        condition1Name: item.conditionname1 +'：'+ item.conditionvalue1,
                        condition2Name: item.conditionname2==''?'':(item.conditionname2 + '：'+ item.conditionvalue2) 
                    };
                    for(let item1 in this.deductionindex){
                        if(this.deductionlist[item1].commodityid==item.id){
                            json.usePoint=true;
                            json.pointSum=this.deductionlist[item1].score;
                        }
                    }
                    mallOrderList.push(json);
                });
                // this.deductionindex.forEach(item => {
                //     mallOrderList[item].usePoint = true;
                //     mallOrderList[item].pointSum = this.deductionlist[item].score;
                // })
                data.mallOrderList = mallOrderList;
                this.couponindex.forEach(item => {
                    let json = {
                        id: this.couponlist[item].id,
                        couponAmount: 1
                    };
                    data.couponInfoList.push(json);
                });
                console.log(data);
                this.createOrder(data);
            }
        }
    }
</script>

<style scoped lang='less'>
    .contain {
        // margin-top: 0.8rem;
        font-size: .28rem;
        text-align: left;
        background-color: #e9e9e9;
        // margin-top: 40px;
    }
    .msg-customer {
        padding: .4rem .2rem;
        background-color: #fff;
        overflow: hidden;
    }
    .msg-customer .avatar,
    .msg-customer .msgs {
        float: left;
    }
    .msg-customer .avatar {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    .msg-customer .msgs {
        width: 4.6rem;
        margin-left: .5rem;
        padding-top: .1rem;
        text-align: left;
    }
    .msg-customer .msgs .name {
        margin-bottom: .2rem;
    }
    .msg-customer .msgs .area {
        color: #787878;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .msg-customer .more {
        padding-left: .2rem;
        border-left: 1px solid #cdcdcd;
        float: right;
    }
    .msg-customer .more p {
        height: 1rem;
        line-height: 1rem;
        font-size: .6rem;
        color: #787878;
        display: block;
    }
    .msg-goods {
        margin-top: .2rem;
        background-color: #fff;
    }
    .msg-goods .title {
        padding: .3rem .2rem;
    }
    .msg-goods .detail {
        overflow: hidden;
        padding: .3rem 0;
        border-top: 1px solid #cdcdcd;
        border-bottom: 1px solid #cdcdcd;
    }
    .msg-goods .detail li {
        position: relative;
        overflow: hidden;
        padding: .3rem 0;
    }
    .msg-goods .img-goods {
        width: 2.2rem;
        height: 2rem;
        border-radius: 5%;
        box-shadow: 0 0 0.1rem #cdcdcd;
        border: 1px solid #cdcdcd;
        margin-left: .2rem;
        float: left;
    }
    .msg-goods .msg {
        margin-left: .3rem;
        padding-top: .2rem;
        float: left;
    }
    .msg-goods .msg .name {
        font-size: .4rem;
        padding-bottom: .3rem;
    }
    .msg-goods .msg .brand,
    .msg-goods .msg .area {
        font-size: .25rem;
        padding-bottom: .3rem;
    }
    .tips {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
    }
    .msg-goods .tips p {
        text-align: right;
        padding-right: .2rem;
        padding-top: .4rem;
    }
    .msg-goods .tips p.oper {
        margin-top: .5rem;
        position: absolute;
        bottom: .3rem;
        right: 0;
    }
    .msg-goods .tips p.oper span {
        padding: 0 .2rem;
    }
    .msg-goods .tips p.oper button {
        background-color: #fff;
        border: none;
        outline: none;
        margin-left: .2rem;
    }
    .package {
        >.name {
            padding-left: .3rem;
        }
        ul {
            padding: 0 .5rem;
            .img-goods {
                width: 1.8rem;
                height: 1.6rem;
            }
            .msg {
                .name {
                    font-size: .3rem;
                }
                .brand,
                .area {
                    font-size: .2rem;
                }
            }
            .tips {
                position: relative;
                p {
                    font-size: .25rem;
                    padding-top: .25rem;
                    padding-right: 1rem;
                }
                .oper {
                    position: static !important;
                }
            }
        }
        .tips {
            .oper {
                bottom: .6rem !important;
            }
        }
    }
    .deduction {
        margin-top: .2rem;
        background-color: #fff;
        padding: .2rem;
        input:checked {
            background: black !important;
        }
        .label {
            padding: .2rem 0;
            color: red;
        }
        ul {
            li {
                padding: .2rem;
                label {
                    color: red;
                }
                input[type='radio'] {
                    float: right;
                }
            }
        }
    }
    .coupon {
        border-top: 1px solid #cdcdcd;
        background-color: #fff;
        padding: .2rem;
        .label {
            padding: .2rem 0;
            color: red;
        }
        ul {
            li {
                padding: .2rem;
                label {
                    color: red;
                }
                input[type='radio'] {
                    float: right;
                }
            }
        }
    }
    .price-total {
        padding: .4rem .2rem;
        overflow: hidden;
        background-color: #fff;
    }
    .price-total .tip {
        height: .4rem;
        line-height: .4rem;
        font-size: .28rem;
        float: left;
    }
    .price-total .value {
        height: .4rem;
        line-height: .4rem;
        font-size: .4rem;
        float: right;
    }
    .type-pay {
        height: 3.65rem;
        background-color: #fff;
        padding: .4rem .2rem;
        margin-top: .2rem;
        overflow: hidden;
        position: relative;
    }
    .type-pay>p {
        height: 1rem;
        line-height: 1rem;
    }
    .type-pay .typepay {
        height: 1rem;
        line-height: 1rem;
        display: inline-block;
    }
    .type-pay .typepay img {
        width: .7rem;
        height: .7rem;
        margin-top: .08rem;
        border-radius: 10%;
        float: left;
    }
    .type-pay .typepay .type {
        height: 1rem;
        line-height: 1rem;
        font-size: .3rem;
        display: inline-block;
        margin-left: .3rem;
    }
    .type-pay .select {
        float: right;
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
        border: 1px solid;
        border-radius: 50%;
        z-index: 99;
        position: absolute;
        right: .25rem;
        top: .55rem;
    }
    .type-pay .checked {
        width: .45rem;
        height: .45rem;
        border: none;
        background: url(/static/images/selected.png) no-repeat round;
    }
    .service-time {
        margin-top: .2rem;
        background-color: #fff;
        padding: .4rem .2rem;
    }
    .service-time .tip {
        /* color:#46c5d9; */
    }
    .service-time .data {
        padding-left: .5rem;
    }
    .invoice {
        margin-top: .2rem;
        background-color: #fff;
        padding: .4rem .2rem;
    }
    .invoice .tip {
        /* color:#46c5d9; */
    }
    .submitorder {
        padding: .2rem;
        background-color: #f1f1f1;
    }
    /* .submitorder .msg{
        } */
    .submitorder .msgs p:first-child {
        font-size: .2rem;
        color: #787878;
    }
    .submitorder .msgs p:last-child {
        font-size: .28rem;
        padding-top: .2rem;
    }
    .submitorder .msgs .price {
        font-size: .35rem;
        color: orange;
    }
    .submitorder .msgs .tip {
        font-size:.2rem;
        display:block;
        padding-left:.9rem;
        padding-top: .1rem;
        color: red;
    }
    .submitorder .submit {
        width: 3rem;
        height: .8rem;
        margin-top: -0.75rem;
        background: #26a2ff;
        border: 1px solid #26a2ff;
        border-radius: .5rem;
        color: #fff;
        outline: none;
        float: right;
    }
    .btn-group {
        padding: .2rem 0;
        border-bottom: 1px solid #eaeaea;
        text-align: center;
    }
    .btn-group button {
        background: none;
        border: none;
        color: #46c5d9;
        font-size: .3rem;
        padding: 0 1.5rem;
        outline: none;
    }
</style>
<style lang='less'>
    .certainorder_xs {
        .popup {
            width: 100%;
        }
        .popup .picker-slot-wrapper,
        .popup .picker-item {
            backface-visibility: hidden;
        }
        .mint-checklist {
            background: #fff;
            .mint-checklist-title {
                margin-top: 0;
                padding-top: .2rem;
                font-size: .28rem;
                color: red;
            }
            .mint-checklist-label {
                font-size: .26rem;
            }
        }
    }
</style>
