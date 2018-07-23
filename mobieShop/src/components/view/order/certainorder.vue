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
                            <!-- <p class='brand' v-for='cars in item.options'>{{cars.name}}：{{cars.value}}</p> -->
                             <p class="brand" v-for="cars in item.options">{{cars.name}}：<span>{{cars.value}}</span></p>
                             <!-- <p class='brand' v-if='item.conditionvalue2!==""'>{{item.conditionname2}}：{{item.conditionvalue2}}</p>
                            <p class='brand' v-if='item.conditionvalue3!==""'>{{item.conditionname3}}：{{item.conditionvalue3}}</p>  -->
                        </div>
                        
                        <div class='servicetime' v-if='item.isservice&(item.peridlist?item.peridlist.length:"")!=0' >
                            <div class='appoint' v-for='(appoint,index1) in item.peridlist' :key='index1'>
                                <div>
                                    <p>Date</p>
                                    <p>{{appoint.commondate}}</p>
                                </div>
                                <div>
                                    <p>Time</p>
                                    <p>{{appoint.startPeriod+'-'+appoint.endPeriod}}</p>
                                </div>
                                <div>
                                    <p>&nbsp;</p>
                                    <p>X{{appoint.nums}}</p>
                                </div>
                                <div>
                                    <button  class='prime editttime' @click='changeappointtime(index,index1)'>修改</button>
                                    <button  class='prime deletetime' @click='deleteappointtime(index,index1)'>删除</button>                                    
                                </div>                                
                            </div>
                       
                            <!-- {{'服务时间：'+(item.startPeriod==''?'空':item.commondate+' '+item.startPeriod+'-'+item.endPeriod)}} -->
                        </div>
                        <div class='tips'>
                            <p class='price'>￥{{item.price_unit}}</p>
                            <p class='oper' >
                                <input type="button" @click="reduce(index)" value='－'>
                                <input type="number" v-model="item.nums" v-on:blur="changeCount(index)" />
                                <input type="button" @click="add(index)" value='＋'>
                            </p>
                            <!-- <p class='oper' v-if='item.isservice'>
                                <span>{{'X'+item.nums}}</span>
                            </p> -->
                        </div>
                        
                         <button v-if='item.isservice' class='prime button appointtime' @click='changeappointtime(index)'>预约时间</button>
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
                                    <p class="brand" v-for="cars in item1.options">{{cars.name}}：<span>{{cars.value}}</span></p>
                                    <!-- <p class='brand' v-if='item1.conditionname1!=""'>{{item1.conditionname1}}：{{item1.conditionvalue1}}</p>
                                    <p class='area' v-if='item1.conditionname2!=""'>{{item1.conditionname2}}：{{item1.conditionvalue2}}</p> -->
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
                <li v-for='(item,index) in goodslist' :key='index'>
                    <label for="" style=''>{{item.name}}</label>
                    <span  style='float:left;color:red;padding-right:.3rem;'>:</span>
                    <input type='number'  v-model="item.scoreuse" @change='changescore(index)' name='deduction'>
                    <span style='color:red;'>{{'（最多可使用'+item.scorecanuse*item.nums+'积分)'}}</span>
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
                    <label for="">{{item.coupontype==0?'满'+item.fullmoney+'元减'+item.money+'元':(item.money+'元（'+(item.coupontype==1?'专享）':item.coupontype==2?'无门槛）':''))}}</label>
                    <input type="radio" v-model="couponindex" style="float:right;" :value='index' name='coupon'>
                </li>
            </ul>
        </div>
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
            <span class='tip'>{{'积分抵扣：'+score_user_all+'元'}}</span>
            <span class='tip'>{{'优惠券抵扣：'+coupmoney+'元'}}</span>
            </p>
            </span>
            <button class='submit button' @click='submitorder'>提交订单</button>
        </div>
        <transition name="fade">
            <div class="calendar-dropdown" v-if="calendar3.show">
                <calendar :events="calendar3.events" :zero="calendar3.zero" :lunar="calendar3.lunar"  :value='minday' :begin="minday" :end="lastday" @select="clickDay"></calendar>
            </div>
        </transition>
        <mt-popup v-model="popupVisible" position="bottom" class="popup" style='width:100%;'>
            <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true' >
                <p class='btn-group'>
                    <button class='cancle font' @click.stop='cancledate'>取消</button>
                    <button class='certain font' @click.stop="getdate">确定</button>
                </p>
            </mt-picker>
        </mt-popup>
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
    import calendar from './calendar.vue'
    import {mycommon} from '../../../assets/javascript/mycommon_xs.js'
    // import {weixinPay} from '../../../assets/javascript/weixinpay.js'
    export default {
        components:{calendar},
        data() {
            return {
                popupVisible:false,
                dates:[
                    {
                        values: ['上午', '下午'],  
                        className: 'slot1',  
                        textAlign: 'center',
                    },
                ],
                timestamp_start: '',
                checked: 'checked',
                userinfo: {
                    id: '',
                    username: '',
                    phone: '',
                    address: '',
                    addressid: null,
                    imgurl: '',
                    consumptionpoints: 0
                },
                goodslist: [],
                regionid:0,
                provinceId:0,
                cityId:0,
                areaId:0,
                streetId:0,
                deductionlist: [
                ],
                scorecandeduct: 0,
                moneycanduct: 0,
                deductionindex: [],
                iscoupon: false,
                couponlist: [],
                couponindex: '',
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
                deductionmoney: 0,
                coupmoney: 0,
                point: 0,
                calendar3: {
                    show: false,
                    zero: true,
                    lunar: true, //显示农历
                },
                selectTime:'',
                startPeriod:'',
                endPeriod:'',
                currentindex:'',
                currentindex_appoint:'',
                periodlist:[],
                periodTemplateid:null,
                // create:添加预约时间，edit:修改预约时间
                appointtype:'create',
                // 预约的商品数量
                appointnum:0
            }
        },
        computed: {
            minday:function(){
                let date=new Date();
                let today=new Date(date.setDate(date.getDate()+1)).format('yyyy-MM-dd');
                let arry=today.split('-');
                return arry;
            },
            lastday(){
                let date=new Date();
                let lastday=new Date(date.setDate(date.getDate()+30)).format('yyyy-MM-dd');
                let arry=lastday.split('-');
                return arry;
            },
            score_user_all(){
                let total=0;
                this.goodslist.forEach(item=>{
                    total+=Number(item.scoreuse);
                });
                return Number(total);
            },
            totalprice() {
                let total = 0;
                this.goodslist.forEach(item => {
                    total += item.price_unit * item.nums
                });
                return total.toFixed(2);;
            },
            finalprice() {
                let price = this.totalprice;
                // let deductionmoney = 0;
                // if (this.deductionindex.length != 0) {
                //     this.deductionindex.forEach(item => {
                //         deductionmoney += Number(this.deductionlist[item].moneycanduct);
                //     });
                // }
                // this.deductionmoney = deductionmoney;
                let coupmoney = this.couponindex === '' ? 0 : this.couponlist[this.couponindex].money;
                // let index_coupon=this.couponindex;
                // console.log(this.couponlist[index_coupon].money);
                // this.couponindex.forEach(item => {
                //     coupmoney +=Number(this.couponlist[item].money);
                // });
                this.coupmoney = coupmoney;
                price = price - this.score_user_all - coupmoney;
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
                        this.point -= this.deductionlist[length_new - 1].score;
                        // this.userinfo.consumptionpoints -= this.deductionlist[length_new - 1].score;
                    }
                }
            },
            timestamp_start(time) {
                setTimeout(_ => {
                    let timestamp_end = new Date() - this.timestamp_start;
                    if (timestamp_end > 1000) {
                        this.getCouponcanuse();
                    }
                }, 1000)
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
                let isservice=item.isService;
                if(isservice){
                    console.log(item)
                    let json = {
                        id: item.id,
                        name: item.name,
                        periodTemplateId:item.periodTemplateId,
                        imgurl: item.commodityImageList.length > 0 ? item.commodityImageList[0].url : '',
                        options:item.options,
                        conditionname1: item.options[0] == null ? '' : item.options[0].name,
                        conditionvalue1: item.options[0] == null ? '' : item.options[0].value,
                        conditionname2: item.options[1] == null ? '' : item.options[1].name,
                        conditionvalue2: item.options[1] == null ? '' : item.options[1].value,
                        conditionname3: item.options[2] == null ? '' : item.options[1].name,
                        conditionvalue3: item.options[2] == null ? '' : item.options[2].value,
                        price_unit: item.priceRule==1?(JSON.parse(item.commodityDetail)?JSON.parse(item.commodityDetail).commodityPrice:item.price):item.priceRule==2?item.discountPrice:item.currentPrice,
                        nums: item.nums,
                        childlist: [],
                        scorecanuse:item.originalPricePoint==null?0:item.originalPricePoint,
                        scoreuse:0,
                        isservice:item.isService,
                        commodityDetail:item.commodityDetail,
                        commondate:'',
                        peridlist:[],
                        // startPeriod:'',
                        // endPeriod:''
                    };
                    this.goodslist.push(json);
                }
                else{
                    let json = {
                        id: item.id,
                        name: item.name,
                        options:item.options,
                        imgurl: item.commodityImageList.length > 0 ? item.commodityImageList[0].url : '',
                        conditionname1: item.options[0] == null ? '' : item.options[0].name,
                        conditionvalue1: item.options[0] == null ? '' : item.options[0].value,
                        conditionname2: item.options[1] == null ? '' : item.options[1].name,
                        conditionvalue2: item.options[1] == null ? '' : item.options[1].value,
                        price_unit: item.priceRule==1?(JSON.parse(item.commodityDetail)?JSON.parse(item.commodityDetail).commodityPrice:item.price):item.priceRule==2?item.discountPrice:item.currentPrice,
                        // price_unit: item.priceRule==1?item.originalPrice:item.priceRule==2?item.discountPrice:item.currentPrice,
                        nums: item.nums,
                        commodityDetail:item.commodityDetail,
                        childlist: [],
                        scorecanuse:item.originalPricePoint==null?0:item.originalPricePoint,
                        scoreuse:0,
                        isservice:item.isService
                    };
                    this.goodslist.push(json);
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
            changeappointtime(index,index1){
                this.appointtype=index1==undefined?'create':'edit';
                this.currentindex=index;
                this.currentindex_appoint=index1;
                // let commodityid=this.goodslist[index].id;
                this.periodTemplateid=this.goodslist[index].periodTemplateId;
                if(this.periodTemplateid==null){
                    Toast('请联系客服配置该商品的预约时间');
                    return;
                }
                MessageBox.prompt('预约数量','').then(data=>{
                    let value=data.value;
                    let isnum=value!=null&&!isNaN(value-0)&&value>0;
                    // console.log(value,isnum);
                    if(isnum){
                        let num_hasappoint=0;
                        this.goodslist[index].peridlist.forEach((item,key)=>{
                            num_hasappoint+=(key!=index1?item.nums:0);
                        });
                        // 可预约的数目
                        let  num_canappoint=this.goodslist[index].nums-num_hasappoint;
                        if(Number(value)>num_canappoint){
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
                    console.log(isnum);
                }).catch(_=>{
                    console.log('取消');
                    return;
                });
                
            },
            deleteappointtime(index,index1){
                console.log(this.goodslist[index].peridlist);
                this.goodslist[index].peridlist.splice(index1,1);
            },
            clickDay(value){
                let str=value[0]+'-'+value[1]+'-'+value[2];
                this.getTimetemplatelist(this.periodTemplateid,str).then(success=>{
                    if(success){
                        this.selectTime=str;
                        this.starPeriod='';
                        this.endPeriod='';
                        this.popupVisible=true;
                    }
                });
            },
            changescore(index){
                let item=this.goodslist[index];
                let maxscore_canuse=item.scorecanuse*item.nums;
                if(item.scoreuse>maxscore_canuse){
                    this.goodslist[index].scoreuse=maxscore_canuse;
                }
                if(this.score_user_all>this.point){
                    Toast('可用积分不足,请重新设置');
                    this.goodslist[index].scoreuse=0;
                }
            },
            // 获取用户可用总积分
            integral() {
                let that = this
                this.$http.post(
                    '/api/customer/consumption/points/find?pageSize=1',
                ).then(res => {
                    if (res.data.status == 200) {
                        that.point = res.data.info.list[0]?res.data.info.list[0].effectivePoints:""
                        that.expiredPoints = res.data.info.list[0]?res.data.info.list[0].expiredPoints:""
                    } else {
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
            },
            getdate() {
                let currentstr=this.datechange[0];
                let canselect=currentstr.indexOf('剩余:0')<0;
                if(canselect){
                    let list=this.datechange[0].substring(0,13).split('-');
                    let result=this.dates[0].values.has(currentstr);
                    if(result.result){
                        let index=result.index;
                        this.startPeriod=this.periodlist[index].startTime;
                        this.endPeriod=this.periodlist[index].endTime;
                        let periodjson={
                            commondate:this.selectTime,
                            startPeriod:list[0].trim(''),
                            endPeriod:list[1].trim(''),
                            startPeriod_all:this.periodlist[index].startTime,
                            endPeriod_all:this.periodlist[index].endTime,
                            periodid:this.periodlist[index].id,
                            nums:this.appointnum
                        };
                        //添加预约时间
                        if(this.appointtype=='create'){
                            this.goodslist[this.currentindex].peridlist.push(periodjson);
                        }
                        //修改预约时间
                        else if(this.appointtype=='edit'){
                            this.goodslist[this.currentindex].peridlist[this.currentindex_appoint]=periodjson;
                        }
                        

                        // this.goodslist[this.currentindex].commondate=this.selectTime;

                        // this.goodslist[this.currentindex].startPeriod=list[0].trim('');
                        // this.goodslist[this.currentindex].endPeriod=list[1].trim(''); 
                        // this.goodslist[this.currentindex].startPeriod_all=this.periodlist[index].startTime;
                        // this.goodslist[this.currentindex].endPeriod_all=this.periodlist[index].endTime; 
                        // this.goodslist[this.currentindex].periodid=this.periodlist[index].id;      
                    }
                    this.popupVisible = false;
                    this.calendar3.show = false;              
                }
                else{
                    Toast('该时间段不可选');
                }
            },
            cancledate() {
                this.popupVisible = false;
                this.calendar3.show = false;
            },
            // 获取时间断列表
            getTimetemplatelist(templateid,date){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    // let companyid=sessionStorage.getItem('companyId');
                    that.$http.post('/api/product/period/query',{
                        date:date,
                        templateId:templateid
                    })
                    .then(res=>{
                        if(res.data.status==200){
                            that.dates=[];
                            let periodlist=[];
                            that.periodlist=res.data.info.list[1];
                            let periodlist_nums=res.data.info.list[0];                            
                            // console.log(res.data.info);
                            res.data.info.list[1].forEach((item,index)=>{
                                periodlist.push(item.startTime.substring(0,5)+' - '+item.endTime.substring(0,5)+'(剩余:'+periodlist_nums[index]+')');
                            });
                            let json={
                                values:periodlist,
                                className: 'slot1',  
                                textAlign: 'center'
                            };
                            that.dates.push(json);
                            console.log(that.dates);
                            resolve(true);
                        }
                        else if(res.data.status==300){
                            Toast('请联系客服配置该商品的预约时间');
                            resolve(false);
                        }
                        else{
                            Toast(res.data.msg);
                            resolve(false);
                        }
                        
                    })
                    .catch(err=>{
                        console.log(err);
                        resolve(false);
                        
                    });
                })
                
            },
            makeinvoice() {
                this.$router.push('/invoice');
            },
            changeCount(index) {
                this.getCouponcanuse();
                console.log(index);
                this.goodslist[index].peridlist=[];
            },
            //改变商品数量+
            add(index) {
                this.timestamp_start = new Date();
                this.changeCouponable = false;
                this.goodslist[index].nums++;
                this.goodslist[index].peridlist=[];
                // this.getCouponcanuse();
            },
            // 改变商品数量-
            reduce(index) {
                this.timestamp_start = new Date();
                this.changeCouponable = false;
                this.goodslist[index].nums = this.goodslist[index].nums == 1 ? 1 : --this.goodslist[index].nums;
                this.goodslist[index].peridlist=[];
                // this.getCouponcanuse();
            },
            // 获取默认地址
            getDefaultaddress() {
                let that = this;
                this.$http.post('/api/customer/account/queryMapByIds', [this.userinfo.id])
                    .then(res => {
                        if (res.data.status == 401) {
                            Toast('请先登录');
                        }
                        if (res.data.status == 200) {
                            if (res.data.info.length > 0) {
                                let data = res.data.info[0];
                                that.userinfo.addressid = data.defaultAddressId;
                                let address = '';
                                if (data.defaultAddressId == 'ziti') {
                                    address = '自提';
                                } else if (data.defaultAddressId == '') {
                                    address = '';
                                } else {
                                    this.regionid=data.defaultAddress.areaId;
                                    this.provinceId=data.defaultAddress.provinceId;
                                    this.cityId=data.defaultAddress.cityId;
                                    this.areaId=data.defaultAddress.areaId;
                                    this.streetId=data.defaultAddress.regionId;
                                    console.log(data.defaultAddress)
                                    address = data.defaultAddress.area.regionName +
                                        data.defaultAddress.province.regionName +
                                        data.defaultAddress.city.regionName +
                                        data.defaultAddress.district.regionName+
                                        data.defaultAddress.region.regionName +
                                        data.defaultAddress.address;
                                }
                                that.userinfo.address = address;
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
                let idlist = [];
                this.couponlist = [];
                this.goodslist.forEach(item => {
                    idlist.push(item.id);
                });
                let data = {
                    amount: this.totalprice,
                    couponCustomerList: idlist
                };
                this.$http.post('/api/product/coupon/customer/display', data)
                    .then(res => {
                        if (res.data.status == 200) {
                            if(res.data.info.length==0){
                                that.couponindex='';
                            }
                            res.data.info.forEach(item => {
                                console.log(item)
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
                            if (carId !== null || carId == '') {
                                let cartIdList = [];
                                carId.forEach((item, i) => {
                                    if (item.cartIdList != null) {
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
            submitorder() {
                if (this.checked != 'checked') {
                    Toast('请选择支付方式！');
                    return;
                }
                if (this.userinfo.address == '') {
                    MessageBox.confirm('请先选择收货地址').then(_ => {
                        this.changeaddress();
                        return;
                    }).catch(_ => {
                        return;
                    });
                }
                let data = {
                    mallOrderList: [],
                    regionTemplateId: this.userinfo.addressid,
                    couponInfoList: []
                };
                let mallOrderList = [];
                this.goodslist.forEach(item => {
                    let json = {
                        regionId:this.regionid,
                        provinceId:this.provinceId,
                        cityId:this.cityId,
                        areaId:this.areaId,
                        streetId:this.streetId,
                        commodityId: item.id,
                        amount: item.nums,
                        usePoint: true,
                        pointSum:Number(item.scoreuse),
                        appointment:[],
                        commodityDetailId:item.commodityDetail?JSON.parse(item.commodityDetail).id:""
                        
                        // condition1Name: item.conditionname1 ==''?'':(item.conditionname1 + '：' + item.conditionvalue1),
                        // condition2Name: item.conditionname2 == '' ? '' : (item.conditionname2 + '：' + item.conditionvalue2)
                    };
                    console.log(json)
                    if(item.isservice&&item.peridlist.length!=0){
                        item.peridlist.forEach(period=>{
                            let json1={
                                startTime:period.commondate+' '+period.startPeriod_all,
                                endTime:period.commondate+' '+period.endPeriod_all,
                                accountId:this.userinfo.id,
                                templateId:item.periodTemplateId,
                                companyId:sessionStorage.getItem('companyId'),
                                isService:0,
                                periodId:period.periodid,
                                date:period.commondate,
                                number:period.nums
                            }
                            json.appointment.push(json1)
                        });
                        // json.appointment={
                        //     startTime:item.commondate+' '+item.startPeriod_all,
                        //     endTime:item.commondate+' '+item.endPeriod_all,
                        //     accountId:this.userinfo.id,
                        //     templateId:item.periodTemplateId,
                        //     companyId:sessionStorage.getItem('companyId'),
                        //     isService:0,
                        //     periodId:item.periodid,
                        //     date:item.commondate,
                        //     nums:
                        // };
                    }
                    mallOrderList.push(json);
                });
                data.mallOrderList = mallOrderList;
                if (this.couponindex!=='') {
                    let json = {
                        id: this.couponlist[this.couponindex].id,
                        couponAmount: 1
                    };
                    data.couponInfoList.push(json);
                }
                this.createOrder(data);
                // console.log(data);
            }
        }
    }
</script>

<style scoped lang='less'>
    .calendar-dropdown{
        left:0px;
        right:0;
        top:0px;
        position:fixed;
        height:100vh;
        z-index:999;
        background-color:#fff;
    }
    .contain {
        // margin-top: 0.8rem;
        font-size: .28rem;
        text-align: left;
        background-color: #e9e9e9; // margin-top: 40px;
    }
    .msg-customer {
        position: relative;
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
        line-height: .4rem;
        padding-left:.3rem;
        i{
            margin-left:-.3rem;
        }
        // text-overflow: ellipsis;
        // overflow: hidden;
        // white-space: nowrap;
    }
    .msg-customer .more {
        width:.5rem;
        padding-left: .2rem;
        border-left: 1px solid #cdcdcd;
        // float: right;
        position: absolute;
        right:0;
        top:.3rem;
        bottom:.3rem;
    }
    .msg-customer .more p {
        height: 1rem;
        line-height: 1rem;
        font-size: .6rem;
        color: #787878;
        display: block;
        position: absolute;
        top:0;
        bottom:0;
        right:0;
        margin:auto;
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
        .appointtime{
            width: 1.5rem;
            position: absolute;
            right:.2rem;
            top:1rem;
            padding: 0.1rem;
            border:1px solid #26a2ff;
            border-radius: .1rem;
            background-color: #fff;
        }
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
        width:3.5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .msg-goods .msg .brand,
    .msg-goods .msg .area{
        font-size: .25rem;
        padding-bottom: .3rem;
    }
    .msg-goods .servicetime {
        font-size: .25rem;
        padding: .1rem 0;
        clear: both;
        .appoint{
            padding:.1rem .2rem;
            overflow: hidden;
            div{
                width:25%;
                float: left;
                p{
                    padding:.1rem 0;
                }
            }
            div:nth-child(3){
                width:10%;
                padding-left: .3rem;
            }
            div:nth-child(4){
                text-align: right;
                width:35%;
            }
            button.editttime{
                width:40%;
                padding:.05rem .15rem;
                outline: none;
                border-radius: .1rem;
                border:1px solid grey;
                margin-top:.25rem;
                background-color: transparent;
            }
            button.deletetime{
                width:40%;
                padding:.05rem .15rem;
                outline: none;
                border-radius: .1rem;
                border:1px solid grey;
                margin-top:.25rem;
                background-color: transparent;
            }
        }
        .appoint:nth-child(odd){
            background-color: #eaeaea;
        }
        .appoint:nth-child(even){
            background-color: #f6f6f6;
        }
        // position: absolute;
        // top:2.3rem;
        // left:2.75rem;
    }
    .tips {
        position: absolute;
        width: 100%;
        // height: 100%;
        top: 0;
    }
    .msg-goods .tips p {
        text-align: right;
        padding-right: .2rem;
        padding-top: .4rem;
    }
    .msg-goods .tips p.oper {
        // margin-top: .5rem;
        position: absolute;
        top: 1.4rem;
        right: 0;
        input[type='number'] {
            // width:auto;
            width: .6rem;
            height: .4rem;
            line-height: .5rem;
            text-align: center;
        }
        input[type='button'] {
            width: .4rem;
            height: .4rem;
            text-align: center;
        }
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
                padding: .2rem 0;
                overflow:hidden;
                line-height:.35rem;
                label {
                    color: red;
                    width:2.5rem;
                    display:inline-block;
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    float:left;
                }
                input{
                    float:left;
                    width:1.5rem;
                    text-align:center;
                    border:1px solid #cdcdcd;
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

    .service-time .data {
        padding-left: .5rem;
    }
    .invoice {
        margin-top: .2rem;
        background-color: #fff;
        padding: .4rem .2rem;
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
        font-size: .2rem;
        display: block;
        padding-left: .9rem;
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
    .mint-toast{
        z-index: 99999;
    }
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
