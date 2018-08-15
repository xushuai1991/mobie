<template>
    <div class='CmyOveroderDeil'>
        <!--<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                                                                                                                                                    <li v-for="item in list">{{ item }}</li>
                                                                                                                                                </ul>!-->
        <section>
            <div class="wrap2">
                <div class='tiemBox background'>
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
                        <img :src='userImg'>
                    </div>
                    <div class='infoNmae'>
                        <p><span>{{commodityName}}</span> <span>{{userPhone}}</span></p>
                        <p><i class='icon iconfont icon-dizhi1'></i><span>{{userAdd}}</span></p>
                    </div>
                </div>
                <div class="goods_list">
                    <ul class="mui-table-view" infinite-scroll-immediate-check="false">
                        <!--li数据遍历循环部分-->
                        <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                            <div class="cart" :class='{"gray":(serverState==2&&item.serviceState!=1)||(serverState==3&&item.serviceState!=2)||(serverState==4&&item.serviceState!=3)}' :value=item.serviceState>
                                <div class="goods">
                                    <div class="goods_title type-pay" style='height:5px;'>
                                    </div>
                                    <div class="goodsBox">
                                        <ul class="goods_detail" style=' margin-top:0.2rem;'>
                                            <li class="goods_img" style="margin-left:0px;" @click='goShopDateil(item)'>
                                                <img :src='"http://"+hostName+":"+port+"/api"+item.image'>
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">{{item.commodityBrand}}</p>
                                                <p class="goods_identifier strlen" style="width:2.5rem;padding-right:0.2rem;"><span></span></p>
                                                <p class="goods_color">{{item.condition1Name}}</p>
                                                <p class="goods_color">{{item.condition2Name}}</p>
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
                                                <p v-if='briefReason'>驳回理由：{{briefReason}}</p>
                                            </div>
                                        </div>
                                        <!--</mt-cell-swipe>!-->
                                    </div>
                                    <div v-show='item.isService&&(orderState!="订单已取消"||orderState!="等待买家支付")'>
                                        
                                        <div class='appointment' v-if='item.isService' >
                                            <button class='button' v-show=appTime @click.stop="openByDrop({index:index,e:$event,commodityid:item.commodityId,orderdetailid:item.id,templateId:item.commodityInfo.periodTemplateId,appointments:item.appointments,saleNumber:item.saleNumber,type:'add'})">预约时间</button>
                                        </div>
                                        <div class='edmitTime' v-if='item.isService'>
                                            <div class='appoint' v-if='item.appointments!=null'>
                                                <div>
                                                    <p>Date</p>
                                                </div>
                                                <div>
                                                    <p>Time</p>
                                                </div>
                                                <div>
                                                    <p>Num</p>
                                                </div>  
                                                <div>
                                                    <p>State</p>
                                                </div>  
                                                <div style='text-align:left;text-indent:.3rem;'>
                                                    <p>Oper</p>
                                                </div>                        
                                            </div>
                                            <div class='appoint' v-for='(appoint,index2) in item.appointments' :key='index2'>
                                                <div>
                                                    <p>{{appoint.startTime.substring(0,10)}}</p>
                                                </div>
                                                <div>
                                                    <p>{{appoint.startTime.substring(11,16)+'-'+appoint.endTime.substring(11,16)}}</p>
                                                </div>
                                                <div>
                                                    <p>X{{appoint.number}}</p>
                                                </div>
                                                <div>
                                                    <p>{{appoint.isService==1?'确认':'待确认'}}</p>
                                                </div>
                                                <div>
                                                    <button  class='prime editttime' @click.stop="openByDrop({index:index,index_appoint:index2,appointid:appoint.id,e:$event,commodityid:item.commodityId,orderdetailid:item.id,templateId:item.commodityInfo.periodTemplateId,saleNumber:item.saleNumber,appointments:item.appointments,type:'edit'})">修改</button>
                                                </div>                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="goodsBox" v-for="(items,indexs) in item.orderDetailList" :key="indexs">
                                        <ul class="goods_detail" style=' margin-top:0.2rem;'>
                                            <li class="goods_img" style="margin-left:0px;">
                                                <img :src='"http://"+hostName+":"+port+"/api"+item.image'>
                                            </li>
                                            <li class="goods_info">
                                                <p class="brandDesc">套餐:{{items.commodityBrand}}</p>
                                                <p class="goods_identifier strlen" style="width:2.5rem;padding-right:0.2rem;"><span></span></p>
                                                <p class="goods_color">{{items.condition1Name}}</p>
                                                <p class="goods_color">{{items.condition2Name}}</p>
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
            <div class='nums'>合计:<span class="moneyColor">￥{{actualMoney}}<span v-if='userPoint'>抵扣金额：{{conversionAmount-0}}</span></span>
            </div>
            <input type='button' class='delBtn' v-show=showBtn1 @click='clearOrder(number,actualMoney)' value='取消订单'>
            <input type='button' class='button' v-show=showBtn2 value='立即付款' @click='playOrder(number,actualMoney,companyId)'>
            <input type='button' class='delBtn' v-show=showBtn3 @click='delOrder(number)' value='删除订单'>
            <input type='button' class='delBtn' v-show=showBtn4 @click='applectoinMoney(datas.data.info.list[0])' value='申请退款'>
            <input type='button' class='delBtn' v-show=showBtn6 @click='CloseOrder(number)' value='取消退款'>
            <input type='button' class='button' v-show=showBtn5 @click='OkOrder(number)' value='确认收货'>
            <input type='button' class='button' v-show=showBtn8 @click='opInt(datas.data.info.list[0].id,actualMoney)' value='申请开票'>
            <input type='button' class='button' v-show=showBtn7 @click='comment(datas.data.info.list[0])' value='评价订单'>
        </div>
        <transition name="fade">
            <div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
                <calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
            </div>
        </transition>
        <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-picker :slots="dates" @change='onValuesChange' :showToolbar='true'>
                <p class='btn-group'>
                    <button class='cancle' @click.stop='cancledate'>取消</button>
                    <button class='certain' @click.stop="getdate">确定</button>
                </p>
            </mt-picker>
        </mt-popup>
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
    import calendar from './calendar.vue'
    import {
        formatdate
    } from '../../../assets/javascript/formatdate.js'
    import {
        mycommon
    } from '../../../assets/javascript/mycommon_xs.js'
    export default {
        data() {
            return {
                templateIds:'',
                Willday: '',
                newDay: '',
                calendar3: {
                    display: this.getNowFormatDate(),
                    show: false,
                    begin: [], //可选开始日期
                    end: [], //可选结束日期
                    zero: true,
                    // value:[2018,5,22], //默认日期
                    lunar: true, //显示农历
                    select: (value) => {
                        let that = this;
                        this.calendar3.show = true;
                        this.calendar3.value = value;
                        this.calendar3.display = value.join("-");
                        // console.log(this.calendar3.display)
                        let url = '/api/product/period/query';
                        this.$http({
                            url: url,
                            method: "POST",
                            data: {
                                date:this.calendar3.display,
                                templateId: this.templateIds,
                            }
                        }).then((res) => {
                            if (res.data.status == 200) {
                                this.popupVisible = true;
                                let periodlist = [];
                                that.periodlist = res.data.info.list[1];
                                let lastnumlist = res.data.info.list[0];
                                console.log(res.data.info.list[1])
                                res.data.info.list[1].forEach((item, index) => {
                                    console.log(item[0])
                                    periodlist.push(item.startTime.substring(0, 5) + ' - ' + item.endTime.substring(0, 5) + '(剩余:' + lastnumlist[index] + ')');
                                });
                                that.dates[0].values = periodlist
                                console.log(that.dates[0].values)
                            } else if (res.data.status == 300) {
                                Toast('请联系客服配置该商品的预约时间');
                                resolve(false);
                            } else {
                                Toast(res.data.msg);
                                resolve(false);
                            }
                            // this.getDate(this.urlArgs().ordernumber)
                            // Toast(res.data.msg)
                        }).catch((err) => {})
                    }
                },
                // pIndex:'',
                // pIndex2:'',
                // value: null,
                // value1: null,
                // startDate: new Date(),
                // endDate: this.addDay(2),
                commodityName: '',
                periodlist: [],
                popupVisible: false,
                compunetid: '',
                currentindex: '',
                briefReason: '',
                id: '',
                orstate: '',
                datechange: '',
                userImg: '',
                orderStates: '',
                dates: [{
                        values: ['暂无时间'],
                        className: 'slot1',
                        textAlign: 'left'
                    },
                    // {
                    //     flex: 1,
                    //     values: ['00点', '01点', '02点', '03点', '04点', '05点',
                    //         '06点', '07点', '08点', '09点', '10点', '11点',
                    //         '12点', '13点', '14点', '15点', '16点', '17点',
                    //         '18点', '19点', '20点', '21点', '22点', '23点'
                    //     ],
                    //     className: 'slot2',
                    //     textAlign: 'center',
                    //     defaultIndex: 0
                    // },
                    // {
                    //     values: ['00分', '10分', '20分', '30分', '40分', '50分', ],
                    //     className: 'slot3',
                    //     textAlign: 'right'
                    // }
                ],
                content: '',
                orderStaty: '',
                orderMoney: '',
                actualMoney: '',
                companyId: '',
                orderState: '',
                uerName: '',
                serverState: '',
                userPhone: '',
                userAdd: '',
                orderText: '',
                createTime: '',
                number: '',
                copyBtn: null,
                datas: '',
                list: [],
                userPoint: '',
                conversionAmount: 0,
                timeShow: false, //服务时间
                showBtn1: false, //取消按钮
                showBtn2: false, //立即付款按钮
                showBtn3: false, //关闭按钮，
                showBtn4: false, //关闭按钮，
                showBtn5: false, //关闭按钮，
                showBtn6: false, //关闭按钮，
                showBtn7: false, //关闭按钮，
                showBtn8: false, //申请开票，
                appTime:true,//预约时间
                // refundShow:false,//退款显示，
                refundOrder: false,
                datechange: '',
                selectTime: '',
                startPeriod: '',
                endPeriod: '',
                // 当前订单服务类商品的信息
                templateid_current: null,
                orderdetailid_current: null,
                commodityrid_current: null,
                commodityindex_current: null,
                typeindex_current: null,
                indexorder_current: null,
                appointid_current: null,
                type_opera: null,
                userinfo: null
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
        components: {
            calendar,
        },
        methods: {
            getNowFormatDate() {
                var curDate = new Date();
                var date = new Date((curDate / 1000 + 86400) * 1000);
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            openByDrop(data) {
                // this.calendar3.show = true;
                // this.calendar3.left = e.target.offsetLeft + 19;
                // this.calendar3.top = e.target.offsetTop + 70;
                // e.stopPropagation();
                // window.setTimeout(() => {
                //     document.addEventListener("click", (e) => {
                //         // this.calendar3.show = false;
                //         document.removeEventListener("click", () => {}, false);
                //     }, false);
                // }, 1000)
                let commodityid=data.commodityid;
                let orderdetailid=data.orderdetailid;
                let templateid=data.templateId;
                let e = data.e;
                this.templateid_current=templateid;
                this.orderdetailid_current=orderdetailid;
                this.commodityrid_current=commodityid;
                this.type_opera=data.type;
                this.commodityindex_current=data.index;
                this.appointid_current=data.appointid;
            MessageBox.prompt('预约数量','').then(datas=>{
                console.log(data)
                let value=datas.value;
                let isnum=value!=null&&!isNaN(value-0);
               
                if(isnum){
                    let num_hasappoint=0;
                    if(data.appointments ==null){
                         Toast('请联系客服无预约');   
                    }
                    // let list=this.orderlist[this.typeindex_current][this.indexorder_current].orderDetails;
                    let list_foreach=data.appointments;
                    list_foreach.forEach((item,key)=>{
                        console.log(item)
                        num_hasappoint+=(key!=data.index_appoint?item.number:0);
                    })
        //             // 已经预约的数目
                    let  num_canappoint=data.saleNumber-num_hasappoint;
                    if(Math.abs(value)==0){
                        Toast('预约时间不能为0');
                        return;
                    }
                    if(Math.abs(value)>num_canappoint){
                        Toast('超过最多可预约数目');
                        return;
                    }
                    this.appointnum=Number(value);
                    this.calendar3.show = true;
                    window.setTimeout(() => {
                        document.addEventListener("click", (e) => {
                            document.removeEventListener("click", () => {}, false);
                        }, false);
                    }, 1000)
                }
                else{
                    Toast('请输入正确的数目');
                    return;
                }
            }).catch(_=>{
                console.log('取消');
                return;
            });
            },
            getdate() {
                let currentstr = this.datechange;
                let result = this.dates[0].values.has(currentstr);
                if (result.result) {
                    let index = result.index;
                    let canselect = currentstr.indexOf('剩余:0') < 0;
                    if (canselect) {
                        let list = this.datechange.substring(0, 13).split('-');
                        this.startPeriod = list[0].trim('');
                        this.endPeriod = list[1].trim('');
                        // 添加预约记录
                        let datainfo = JSON.parse(JSON.parse(localStorage.getItem("userinfo")).data);
                        let accpid = datainfo.id
                        console.log(this.orstate)
                        if (this.type_opera == 'add') {
                            let that = this;
                            this.$http.post('/api/product/appointment/insertone?weekDay=' + that.calendar3.display, {
                                    startTime: that.calendar3.display + ' ' + this.periodlist[0].startTime,
                                    endTime: that.calendar3.display + ' ' + this.periodlist[0].endTime,
                                    accountId: accpid,
                                    commodityId: that.commodityrid_current,
                                    periodId: that.periodlist[index].id,
                                    orderDetailId: that.orderdetailid_current,
                                    templateId:that.templateid_current,
                                    companyId: sessionStorage.getItem('companyId'),
                                    isService: 0,
                                    number:that.appointnum
                                })
                                .then(res => {
                                    if (res.data.status == 200) {
                                        Toast('预约时间申请成功');
                                        this.getDate(this.urlArgs().ordernumber)
                                        that.calendar3.show = false
                                    } else {
                                        Toast(res.data.msg);
                                    }
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }
                        // 修改预约记录
                        else {
                            
                            let that = this;
                            console.log(that.compunetid.appointments)
                            this.$http.post('/api/product/appointment/update', {
                                    startTime: this.calendar3.display + ' ' + this.periodlist[0].startTime,
                                    endTime: this.calendar3.display + ' ' + this.periodlist[0].endTime,
                                    isService: 0,
                                    id:this.appointid_current,
                                    number:this.appointnum    
                                })
                                .then(res => {
                                    if (res.data.status == 200) {
                                        Toast('预约时间修改成功');
                                         this.getDate(this.urlArgs().ordernumber)
                                         that.calendar3.show = false
                                    } else {
                                        Toast(res.data.msg);
                                    }
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    } else {
                        Toast('该时间段不可选');
                    }
                }
                // if (this.orstate == null) {
                // } else {
                // }
                this.popupVisible = false;
            },
            cancledate() {
                this.popupVisible = false;
            },
            CloseOrder(onb) {
                let url = '/api/product/order/mall/refund/cancel';
                this.$http({
                    url: url,
                    method: "POST",
                    data: {
                        orderNumber: onb
                    }
                }).then((res) => {
                    // this.getDate(this.urlArgs().ordernumber)
                    Toast(res.data.msg)
                }).catch((err) => {})
            },
            opInt(id, mony) {
                console.log(id, mony)
                this.$router.push({
                    path: '/invoice',
                    query: {
                        orderid: id,
                        totalprice: mony
                    }
                })
            },
            appointment(val) {
                console.log(val)
                // this.compunetid = orstate;
                // console.log(this.compunetid)
                // // var d = new Date();
                // // var hour = d.getHours();
                // // let arrTime = [];
                // // for (let i = 0; i <= 24; i++) {
                // //     if (i > hour) {
                // //         arrTime.push(i + "点")
                // //     }
                // // }
                // // this.dates[1].values = arrTime
                // this.calendar3.show = true;
                // // this.popupVisible = true;
                // this.currentindex = index;
                // this.id = id;
                // this.orstate = time;
            },
            onValuesChange(picker, values) {
                this.datechange = values[0];
                console.log(this.datechange)
                // var d = new Date();
                // var hour = d.getHours();
                // if (values[0] == '今天' && this.dates[1].values.indexOf(values[1]) < hour + 1) {
                //     picker.setSlotValue(1, this.dates[1].values[hour + 1]);
                // }
                // this.datechange = values;
            },
            refundButton($event, indexs) {
                if ($event.currentTarget.nextElementSibling.classList.value == 'hiddles') {
                    $event.currentTarget.nextElementSibling.classList.remove("hiddles")
                } else {
                    $event.currentTarget.nextElementSibling.classList.add("hiddles")
                }
            },
            goShopDateil(item) {
                this.$router.push({
                    name: 'detailTemplate',
                    query: {
                        commodityId: item.commodityId,
                        companyId: item.companyId
                    }
                });
            },
            comment(item) {
                let orderdetail = sessionStorage.setItem('orderdetail', JSON.stringify(item));
                this.$router.push("/evaluate")
            },
            OkOrder(order) { //
                this.unbind('/api/product/order/mall/update', order, "actualMoney", '确认收货')
                // let url = '/api/product/order/mall/update';
                // this.$http({
                //     url: url,
                //     method: 'post',
                //     data: [{
                //         number: order,
                //         orderState: 2
                //     }]
                // }).then((res) => {
                //     if (res.data.status == 200) {
                //         Toast('确认订单')
                //         this.$router.push({
                //             // path:"./order",
                //             name: 'order',
                //             params: {
                //                 index: 1
                //             }
                //         });
                //     }
                // }).catch((err) => {
                //     console.log(err)
                // })
            },
            getDate(ordernumber) {
                // let orderdetail = sessionStorage.getItem("orderdetail");
                // let orderdetails = JSON.parse(orderdetail)
                // console.log(ordernumber)
                let url = '/api/product/order/mall/find';
                this.$http({
                    url: url,
                    method: 'post',
                    data: {
                        "number": ordernumber
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.data.info.list.length == 0 || res.data.status != 200) {
                        Toast('订单有问题请联系客服')
                        return false
                    }
                    this.datas = res
                    let orderStaty = res.data.info.list[0];
                    if (orderStaty.orderDetails) {
                        orderStaty.orderDetails.forEach((item) => {
                            if (item.userPoint == true) {
                                this.userPoint = true
                            }
                        })
                        orderStaty.orderDetails.forEach((item) => {
                            this.conversionAmount += (item.conversionAmount - 0)
                        })
                    }
                 
                    this.templateIds = orderStaty.orderDetails[0].appointments?orderStaty.orderDetails[0].appointments.templateId:1;
                    this.uerName = orderStaty.name;
                    this.userPhone = orderStaty.phone
                    this.userAdd = orderStaty.detailAddress
                    this.orderMoney = orderStaty.orderMoney
                    this.actualMoney = orderStaty.actualMoney
                    this.companyId = orderStaty.companyId
                    this.createTime = orderStaty.createTime
                    this.number = orderStaty.number
                    if (orderStaty.payState == 1) {
                        //卖家付款过的
                        this.orderState = '已支付等待卖家发货'
                        this.orderText = '亲,请耐心能等待';
                        this.showBtn4 = true; //退款
                        //是否可申请退款
                            if(orderStaty.canBeRefund){
                                this.showBtn4 = true;
                                this.appTime = true;
                            }else{
                                this.showBtn4 = false; 
                                 this.appTime = false;
                            }
                        this.showBtn5 = true; //立即付款按钮
                        if (orderStaty.orderState == 2) {
                            this.showBtn4 = true; //退款
                            //是否可申请退款
                            if(orderStaty.canBeRefund){
                                this.showBtn4 = true;
                                 this.appTime = true;
                            }else{
                                this.showBtn4 = false; 
                                 this.appTime = false;
                            }
                             this.showBtn5 = false; //确认收货
                            this.showBtn8 = true;
                            //是否可申请开票
                            if(orderStaty.canApplyInvoice){
                                this.showBtn8 = true; 
                            }else{
                                this.showBtn8 = false; 
                            }
                            this.showBtn7 = true; //评价
                            //是否可评价
                            if(orderStaty.canBeEvaluate){
                                this.showBtn7 = true; 
                            }else{
                                this.showBtn7 = false; 
                            }
                            this.orderState = '已经完成'
                            this.orderText = '亲，请确认';
                        }
                        if (orderStaty.orderState == 4) {
                            this.showBtn4 = false, //取消退款
                                this.showBtn6 = true, //取消退款
                                this.showBtn5 = true; //立即付款按钮
                             //是否可申请退款
                            if(orderStaty.canBeRefund){
                                this.showBtn4 = true;
                                 this.appTime = true;
                            }else{
                                this.showBtn4 = false; 
                                 this.appTime = false;
                            }
                            this.orderState = '退款中...'
                            this.orderText = '亲,请耐心能等待';
                            this.refundOrder = true
                        }
                        if (orderStaty.orderState == 7) {
                            this.briefReason = orderStaty.briefReason
                            this.showBtn4 = true, //取消退款
                                this.showBtn6 = false, //取消退款
                                this.showBtn5 = true; //立即付款按钮
                            //是否可申请退款
                            if(orderStaty.canBeRefund){
                                this.showBtn4 = true;
                                 this.appTime = true;
                            }else{
                                this.showBtn4 = false; 
                                 this.appTime = false;
                            }
                            this.orderState = '驳回'
                            this.orderText = '亲,请和客服联系重新退款';
                            this.refundOrder = true
                        }
                        // if (orderStaty.serviceState == 1) {
                        //     this.orderState = '等待服务'
                        // }
                        // if (orderStaty.serviceState == 2) {
                        //     this.orderState = '服务中...'
                        // }
                        // if (orderStaty.serviceState == 3) {
                        //     this.orderState = '服务中...'
                        // }
                        if (orderStaty.orderState == 5) {
                            this.showBtn3 = true; //删除订单
                            this.showBtn8 = false; //申请开票
                            this.showBtn4 = false; //退款
                            this.appTime = false; //预约时间
                            this.showBtn5 = false; //立即付款按钮
                            this.orderState = '退款完成'
                            this.orderText = '';
                        }
                        if (orderStaty.orderState == 6) {
                            this.showBtn3 = true; //删除订单
                            this.showBtn4 = false; //退款
                             this.appTime = false; //预约时间
                            this.showBtn5 = false; //立即付款按钮
                            this.orderState = '订单已取消'
                            this.orderText = '';
                        }
                    } else if (orderStaty.payState == 2) {
                        //卖家未付款
                        this.orderState = '等待买家支付'
                        // alert(orderStaty.createTime.replace(/\-/g,'/'))
                        this.countdowm((this.timestampToTime((new Date(orderStaty.createTime.replace(/\-/g, '/')).getTime() / 1000) + (24 * 60 * 60)))) //时间戳加24小时;
                        if (orderStaty.orderState == 1) {
                            this.showBtn1 = true, //取消按钮
                                this.showBtn2 = true; //立即付款按钮
                        }
                        if (orderStaty.orderState == 6) {
                            this.showBtn3 = true; //删除订单
                            this.showBtn4 = false; //退款
                             this.appTime = false; //预约时间
                            this.showBtn5 = false; //立即付款按钮
                            this.orderState = '订单已取消'
                            this.orderText = '';
                        }
                    } else if (orderStaty.payState == 3) {
                        //过去订单只能删除
                        this.orderState = '订单已过期'
                        this.orderText = '订单已过期';
                        if (orderStaty.orderState == 1) {
                            this.showBtn3 = true; //删除订单
                        }
                    }
                    // if (orderStaty.orderState == 6) {
                    //     this.orderState = '交易关闭'
                    //     this.showBtn3 = true
                    //     this.orderText = '';
                    // }
                    this.list = orderStaty.orderDetails
                    console.log(this.list)
                    if (this.list) {
                        this.list.forEach((item) => {
                            item.refundShow = false
                        })
                    }
                    // this.list.refundShow=false
                    // console.log(this.list)
                }).catch((error) => {
                    console.log(error)
                })
            },
            applectoinMoney(item) {
                // console.log(item)
                let orderdetail = sessionStorage.setItem('orderdetail', JSON.stringify(item));
                this.$router.push("/applyRefund")
            },
            delOrder(order) { //删除订单
                this.unbind('/api/product/order/mall/update', order, 'actualMoney', '删除订单')
                // let url = '/api/product/order/mall/update';
                // this.$http({
                //     url: url,
                //     method: 'post',
                //     data: [{
                //         number: order,
                //         isActive: false
                //     }]
                // }).then((res) => {
                //     if (res.data.status == 200) {
                //         Toast('删除订单成功')
                //         this.$router.push({
                //             // path:"./order",
                //             name: 'order',
                //             params: {
                //                 index: this.serverState
                //             }
                //         });
                //     }
                // }).catch((err) => {
                //     console.log(err)
                // })
            },
            clearOrder(order, actualMoney) { //取消订单
                console.log(actualMoney)
                this.unbind('/api/product/order/mall/update', order, actualMoney, '取消订单')
                // let url = '/api/product/order/mall/update';
                // this.$http({
                //     url: url,
                //     method: 'post',
                //     data: [{
                //         number: order,
                //         orderState: 6,
                //         actualMoney: actualMoney
                //     }]
                // }).then((res) => {
                //     if (res.data.status == 200) {
                //         Toast('取消订单成功')
                //         this.$router.push({
                //             // path:"./order",
                //             name: 'order',
                //             params: {
                //                 index: 1
                //             }
                //         });
                //     }
                // }).catch((err) => {
                //     console.log(err)
                // })
            },
            playOrder(order, actualMoney, companyId) { //支付订单
                let objs = {
                    "order": order,
                    'actualMoney': actualMoney,
                    'companyId': companyId
                }
                this.$router.push('paying?number=' + order + '&money=' + actualMoney);
                // this.$router.push({
                //     'name': 'paying',
                //     params: {
                //         dataObj: objs
                //     }
                // });
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
                // alert(timestamp)
                let self = this;
                let timer = setInterval(function() {
                    let nowTime = new Date();
                    let endTime = new Date(timestamp.replace(/\-/g, '/'));
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
            unbind(url, number, actualMoney, stateText) {
                let that = this;
                const htmls = `是否确认信息`;
                MessageBox.confirm('', {
                    message: htmls,
                    title: '',
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonClass: 'cancelButton',
                    confirmButtonClass: 'confirmButton',
                    confirmButtonText: '确认',
                    cancelButtonText: '不确认'
                }).then(action => {
                    let orderUlr = url + ""
                    if (action == 'confirm') {
                        let objs = []
                        if (stateText == '取消订单') {
                            objs.push({
                                number: number,
                                orderState: 6,
                                // payState: 3,
                                actualMoney: actualMoney
                            })
                        }
                        if (stateText == '删除订单') {
                            objs.push({
                                number: number,
                                isActive: false
                            })
                        }
                        console.log(stateText)
                        if (stateText == '确认收货') {
                            console.log(objs)
                            objs.push({
                                number: number,
                                orderState: 2
                            })
                        }
                        that.$http({
                                url: orderUlr,
                                method: "post",
                                data: objs
                            })
                            .then(res => {
                                if (res.data.status == 200) {
                                    Toast(res.data.msg);
                                    this.$router.push({
                                        // path:"./order",
                                        name: 'order',
                                        params: {
                                            index: this.serverState
                                        }
                                    });
                                }
                            }).catch(error => {
                                console.log(error)
                            })
                    }
                }).catch(err => {
                    if (err == 'cancel') {}
                });
            },
            timestampToTime(timestamp) { //转成时间
                var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                h < 10 ? "0" + h : h;
                m < 10 ? "0" + m : m;
                s < 10 ? "0" + s : s;
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
            this.hostName = location.hostname;
            this.port = location.port;
            // let url = res.data.info;
            // let imageUrl = 'http://' + hostName + ':' + port + '/api' + url; //  后台返!-->
            let userImg = JSON.parse(localStorage.getItem("userinfo"));
            this.userImg = JSON.parse(userImg.data).avatar
            this.getDate(this.urlArgs().ordernumber)
            this.serverState = this.urlArgs().index;
            console.log(this.serverState)
            var d = new Date();
            var hour = d.getHours();
            // this.dates[1].defaultIndex = hour + 1;
            let day = new Date();
            this.Willday = new Date(day.setDate(day.getDate() + 30)).format('yyyy-M-d');
            this.calendar3.value = [(this.newDay = this.getNowFormatDate(day).split("-")[0]), (this.newDay = this.getNowFormatDate(day).split("-")[1]), (this.newDay = this.getNowFormatDate(day).split("-")[2])];
            this.calendar3.begin = [(this.newDay = this.getNowFormatDate(day).split("-")[0]), (this.newDay = this.getNowFormatDate(day).split("-")[1]), (this.newDay = this.getNowFormatDate(day).split("-")[2])];
            this.calendar3.end = [this.Willday.split("-")[0], this.Willday.split("-")[1], this.Willday.split("-")[2]]
        },
        // beforeUpdate(){
        //     this.getDate(this.urlArgs().ordernumber)
        // }
    }
</script>
<style lang='less'>
    .gray {
        background: #e0e0e0;
    }
    .edmitTime {
        font-size: 0.3rem;
        text-align: left;
        line-height: 0.6rem;
        margin-top: 0.2rem;
    }
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
    .CmyOveroderDeil .popup {
        width: 100%;
        .btn-group {
            padding: .2rem 0;
            line-height: 0;
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
    }
</style>
<style scoped lang='less'>
.appoint:nth-child(odd){
        background-color: #eaeaea;
        
    }
    .appoint:nth-child(even){
        background-color: #f6f6f6;
    }
    .appoint:nth-child(1){
        background-color: #f6f6f6;
        padding: 0 .2rem;
        background-color: white;
        div:nth-child(4){
            font-size: .25rem;
        }
    }
.appoint{
        padding:.1rem .2rem;
        overflow: hidden;
        text-align: left;
        div{
            width:25%;
            float: left;
            line-height: .4rem;
            p{
                padding:.1rem 0;
            }
        }
        div:nth-child(3){
            width:17%;
            // padding-left: .3rem;
        }
        div:nth-child(4){
            width:13%;
            font-size: .2rem;
        }
        div:nth-child(5){
            width: 20%;
            text-align: center;
        }
        button.editttime{
            font-size: .25rem;
            width:60%;
            padding:.07rem 0;
            margin-top: .03rem;
            outline: none;
            border-radius: .1rem;
            border:1px solid grey;
            background-color: transparent;
        }
    }
    .calendar {
        position: fixed;
        z-index: 100;
        top: 0;
        height: 100%;
    }
    .appointment {
        text-align: right;
        position: relative;
        width: 56%;
        bottom: 0;
    }
    .edmitTime {
        position: relative;
    }
    .appointment button {
        top: -0.6rem;
        float: right;
        position: absolute;
        right: -3.2rem;
        /*   bottom:.2rem;
                                                                            right:.2rem; */
        background-color: #26a2ff;
        outline: none;
        border: 0;
        color: #fff;
        padding: .1rem .2rem;
        margin-right: .2rem;
        border-radius: .1rem;
    }
    .hiddles {
        display: none;
    }
    .refundDetail {
        font-size: .25rem;
        text-align: right;
        padding-right: .31rem;
        line-height: .6rem;
        padding-bottom: .5rem;
        button {
            border: none;
            padding: 0.1rem 0.2rem;
            outline: none;
            border-radius: 0.1rem;
            background: #fff;
            border: 1px solid #ddd;
        }
    }
    .markOrder .delBtn {
        background: #fff;
        border: 1px solid #ddd;
        color: #000;
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
        background: #26a2ff;
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
    .orderDeilText {
        border-top: 1px solid #ddd;
        font-size: 0.25rem;
        text-align: left;
        line-height: 0.8rem;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
        margin-bottom: 1rem;
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
        position: relative;
    }
    .cart {
        position: relative;
        /*margin-left: -1.1rem;*/
    }
    .wrap2 {
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
    .goods_info p:first-child {}
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