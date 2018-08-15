<template>
    <div class="wrapper userinfo">
        <!-- <mt-header fixed  title="个人中心"> -->
            <!-- <router-link to="" slot="left">
                <mt-button icon="back" @click="goback" ></mt-button>
            </router-link> -->
        <!-- </mt-header> -->
        <section class='infoBottom' style=''>
            <div class="account">
                <div class="account_info">
                    <div class="change" v-if='userinfo.id!=""'>
                        <router-link to='accountMangagement'>
                            <i class='icon iconfont icon-arrow-right-copy icon-qiehuan'></i>
                        </router-link>
                        
                    </div>
                    <div class="portrait">
                        <div class="portrait_img">
                            <img :src="userinfo.avatar" v-if='!userinfo.avatar==""' alt="图片缺失" style='font-size:.2rem;'>
                            <p class='vip'>{{viplevel}}</p>
                            <i :class="{'icon':true,'iconfont':true,'icon--huangguan':false}" style='color:#fdd23e;position:absolute;right:.2rem;top:-.15rem;transform:rotate(25deg);'></i>
                        </div>
                        <div class="portrait_info">
                            <!-- 用户已登录 ，显示用户信息 -->
                            <div v-if='userinfo.id!=""'>
                                <p style='font-size:.3rem;padding-top:.1rem;'>{{userinfo.nickname==null?'&nbsp;':userinfo.nickname}}</p>
                                <router-link to='/personalScores'>
                                    <p style='color:#e47524;margin-top:.2rem;font-size:.25rem;'><i class='icon iconfont icon-qian' style='font-size:.4rem;'></i>&nbsp;{{point}}</p>
                                </router-link>
                                <p class='info_other' style='color:#939393'>至2019.1.1 &nbsp;&nbsp;过期积分：{{expiredPoints}}分</p>
                            </div>
                            <!-- 未登录，跳转到登录页面 -->
                            <div v-else style='font-size:.3rem;padding-top:.5rem;padding-left:.2rem;'>
                                <span style='color:#e47524;' @click='tologin'>点击登录</span>
                                <!-- <router-link @click='login' :to="{name:'login'}" style='color:#e47524;'>点击登录</router-link> -->
                            </div>
                        </div>
                        <ul class="behavior">
                            <li @click="toMycollection">
                                <div class="collect">
                                    <i class='icon iconfont icon-xingxing coloBule font'></i>
                                </div>
                                <p class="text_wait">收藏 <span class="coller">{{num_collection}}</span></p>
                            </li>
                            <li class="shopCar" @click="toShopCar">
                                <div class="collect">
                                    <i class='icon iconfont icon-gouwuche coloBule font'></i>
                                </div>
                                <p class="text_wait">购物车 <span class="carNum">{{num_shopcar}}</span></p>
                            </li>
                            <!-- <li class="markFooter">
                                <div class="collect">
                                    <i class='icon iconfont icon-zuji coloBule'></i>
                                </div>
                                <p class="text_wait">足迹</p>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="order">
                <div class="my_order">我的订单
                    <div class="check" @click="myorder('all')">查看全部订单</div>
                    <p ><i class='icon iconfont icon-arrow-right-copy fontSize' @click="myorder('all')"></i></p>
                </div>
                <ul class="wait_for">
                    <li @click="myorder('willpay')">
                        <div class="img_wait">
                            <i class="pay orageColor" v-if='num_orderlist[0]!=0'>{{num_orderlist[0]}}</i>
                            <i class='icon iconfont icon-daifukuan fontSize'></i>
                        </div>
                        <p class="text_wait">待付款</p>
                    </li>
                    <li @click="myorder('willservice')">
                        <div class="img_wait">
                            <i class="wait orageColor" v-if='num_orderlist[1]!=0'>{{num_orderlist[1]}}</i>
                            <i class='icon iconfont icon-icondaifahuo fontSize'></i>
                        </div>
                        <p class="text_wait">待服务</p>
                    </li>
                    <li @click="myorder('inservice')">
                        <div class="img_wait ">
                            <i class="receive orageColor" v-if='num_orderlist[2]!=0'>{{num_orderlist[2]}}</i>
                            <i class='icon iconfont icon-ziyuan fontSize'></i>
                        </div>
                        <p class="text_wait">服务中</p>
                    </li>
                    <li @click="myorder('willevaluate')">
                        <div class="img_wait ">
                            <i class="evaluate orageColor" v-if='num_orderlist[3]!=0'>{{num_orderlist[3]}}</i>
                            <i class='icon iconfont icon-daipingjia fontSize'></i>
                        </div>
                        <p class="text_wait">待评价</p>
                    </li>
                    <li @click="toLink('customer')">
                        <div class="img_wait ">
                            <i class='icon iconfont icon-shouhou fontSize'></i>
                        </div>
                        <p class="text_wait">售后</p>
                    </li>
                </ul>
            </div>
            <div class='opera_list'>
                <ul>
                    <li @click='toLink("address")'>
                            <i class='icon iconfont icon-dingwei fontSize operaicon font'></i>
                            <!-- <i class='flag on'></i> -->
                            <i class='flag'></i>                            
                            <p class='name_opera'>地址</p>
                    </li>
                    <li @click='toLink("kefu")'>
                            <i class='icon iconfont icon-kefu fontSize operaicon font'></i>
                            <i class='flag'></i>
                            <p class='name_opera'>客服</p>
                    </li>
                    <li @click='toLink("coupon")'>
                            <i class='icon iconfont icon-youhuijuan fontSize operaicon font'></i>
                            <i class='flag'></i>
                            <p class='name_opera'>优惠券</p>
                        <!-- </router-link> -->
                    </li>
                    <li @click='toLink("msg")' >
                        <!-- <router-link to=''> -->
                            <i class='icon iconfont icon-lingdang fontSize operaicon font'></i>
                            <i :class='{"on":hasnewmsg,"flag":true}'></i>
                            <p class='name_opera'>消息</p>
                        <!-- </router-link> -->
                    </li>
                    <li @click='toLink("activity")'>
                        <!-- <router-link to=''> -->
                            <i class='icon iconfont icon-liwu fontSize operaicon font'></i>
                            <i class='flag'></i>
                            <p class='name_opera'>活动专区</p>
                        <!-- </router-link> -->
                    </li>
                    <li @click='toLink("report")'>
                        <!-- <router-link to=''> -->
                            <i class='icon iconfont icon-fapiao fontSize operaicon font'></i>
                            <i class='flag'></i>
                            <p class='name_opera'>服务报告更新</p>
                        <!-- </router-link> -->
                    </li>
                    <li @click='toLink("invite")'>
                        <!-- <router-link :to="'/inviting?recommendedCustomerId='+userinfo.id"> -->
                            <i class='icon iconfont icon-yaoqing fontSize operaicon font'></i>
                            <i class='flag'></i>
                            <p class='name_opera'>邀请注册</p>
                        <!-- </router-link> -->
                    </li>
                    <li @click='toLink("invoice")'>
                        <!-- <router-link to=''> -->
                            <i class='icon iconfont icon-printer fontSize operaicon font'></i>
                            <i class='flag'></i>
                            <p class='name_opera'>发票管理</p>
                        <!-- </router-link> -->
                    </li>
                </ul>
            </div>
            <!-- <buttomNav></buttomNav> -->
            <!-- <div class="account_management" @click='gotAccount'>账号管理 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
                <div class="address_management" @click='gotAddress'>地址管理 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
                <div class="address_management">二维码 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
                <div class="coupon" @click='gotCoupon'>优惠券 <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div> -->
            <!-- <div class="log_off">退出登录</div> -->
        </section>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    // import buttomNav from '@/components/common/buttomNav.vue'
    import {mapState} from 'vuex'
    import {operatelocalstorage} from '../../../assets/javascript/localstorage_hasdata.js'
    export default {
        prop: ['listLoading'],
        data() {
            return {
                viplevel: '',
                point:0,
                expiredPoints:0,
                num_collection:0,
                num_shopcar:0,
                num_orderlist:[0,0,0,0],
                // num_orderwillpay:0,
                // num_orderwillservice:0,
                // num_orderinservice:0,
                // num_orderwillevaluate:0,
                memberId:'',
                userinfo:{
                    id:'',
                    avatar:'',
                    nickname:'',
                    level:''
                },
                appid:'',
                hasnewmsg:false
            }
        },
        created() {
            sessionStorage.setItem("tiemId", Date.parse(new Date()))
            // this.$root.$emit('header', '个人中心')
            this.$root.$on('loadUserinfo',()=>{
                
                let userinfo_location=operatelocalstorage('userinfo',null,'get',null);
                // console.log(userinfo_location);
                // 收藏数量
                // this.getNumberFavorite();
                if(userinfo_location!=null){
                    let data = JSON.parse(userinfo_location);
                    this.userinfo=data;
                    this.getuserinfo();
                    this.integral();
                    // let data_willpay={payState:2};
                    // let data_willservice={payState:1,serviceState:1};
                    // let data_inservice={payState:1,serviceState:2};
                    // 订单数量计算
                    // this.getNUmberOrder(data_willpay,0);
                    // this.getNumberOrderService(1,1);
                    // this.getNumberOrderService(2,2);
                    // this.getNUmberOrderEval(); 
                    
                    // // 购物车数量
                    // this.getNumberShopcar();
                    // // 查询未读消息
                    // this.getMsgwithoutWatch();
                    // 相关数量
                    this.getNumbersAbout();
                }
            });
        },
        methods: {
            // 查询数量相关（收藏、购物车、待付款、待服务、服务中、待评价）
            getNumbersAbout(){
                let that=this;
                this.$http.post('/api/product/mall/panel/countsOnMallPanel?companyId='+sessionStorage.getItem('companyId'),{})
                .then(res=>{
                    if(res.data.status==200){
                        let nums=res.data.info;
                        that.num_collection=nums.favoriteCount;
                        that.num_orderlist=[nums.pendingPayment,nums.waitingForService,nums.inService,nums.withoutEvaluate]
                    }
                    else{
                        Toast(res.data.msg);
                    }
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                    Toast('相关数量查询失败');
                })
                //购物车数量
                this.$http.post('/api/product/shoppingCart/myShoppingCart', {})
                    .then(function(response) {
                            //console.log(response.data.info)
                        let num = null;
                        response.data.info.forEach((element, i) => {
                            //  console.log(element.commodityCount)
                            num += element.commodityCount
                        });
                        that.num_shopcar = num
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
            },
            // 登录
            tologin(){
                this.getAppId().then(flag=>{
                    if(flag){
                        let companyid=sessionStorage.getItem('companyId');
                        let json={
                            company:companyid,
                            recommendedTeamId:null,
                            recommendedAdminId:null
                        };
                        let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+
                        '&redirect_uri=http://pay.jingrunjia.com.cn?json='+JSON.stringify(json)
                        +'&response_type=code&scope=snsapi_userinfo&state=STATE';

                        // let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+
                        //     '&redirect_uri=http://pay.jingrunjia.com.cn?company='+companyid+
                        //     '&response_type=code&scope=snsapi_userinfo&state=STATE ';
                        location.href=url;
                        // this.$router.replace(url);
                    }
                });
            },
            //获取appId
            getAppId(){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    let companyid=sessionStorage.getItem('companyId');
                    
                    this.$http.get('/api/product/order/weixin/config?companyId='+companyid)
                    .then(res=>{
                        if(res.data.status==200){
                            this.appid=res.data.info.appid;
                            resolve(true);
                        }
                        else{
                            resolve(false);
                            Toast(res.data.msg);
                        }
                    })
                    .catch(err=>{
                        resolve(false);
                        Toast('appid获取失败');
                    })
                })
                
                
            },
            integral(){
                let that = this
                this.$http.post(
                    '/api/customer/consumption/points/find?pageSize=1',
                ).then(res => { 
                    if(res.data.status == 200){
                        that.point = res.data.info.list[0].effectivePoints
                        that.expiredPoints = res.data.info.list[0].expiredPoints
                    }
                    // 长时间未操作，需重新登录
                    else if(res.data.status==401){
                        localStorage.removeItem('userinfo');
                        that.userinfo={
                            id:'',
                            avatar:'',
                            nickname:'',
                            level:''
                        };
                    }
                    else{
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            myorder(type){
                //未登录，提示先登录
                if(this.userinfo.id==''){
                    Toast('请先登录！');
                }
                else{
                    this.$router.push({name:'order',params:{type:type}});
                }
            },
            // 跳转
            toLink(direct){
                if(this.userinfo.id==''){
                    Toast('请先登录！');
                }
                else{
                    switch(direct){
                        case 'address':{
                            this.$router.push({name:"addManagement"});
                            sessionStorage.setItem('from','index');
                            break;
                        }
                        case 'coupon':{
                            this.$router.push("Coupon");
                            break;
                        }
                        case 'invite':{
                            this.$router.push("/inviting?recommendedCustomerId="+this.userinfo.id);
                            break;
                        }
                        case 'invoice':{
                            this.$router.push("/invoiceDateil");
                            break;
                        }
                        case 'customer':{
                            this.$router.push("/Customer");
                            break;
                        }
                        case 'activity':{
                            this.$router.push('/active');
                            break;
                        }
                        case 'msg':{
                            this.$router.push('/msgcenter');
                            break;
                        }
                        case 'report':{
                            Toast('该功能正在开发，请耐心等待。。。');
                            break;
                        }
                        default:{
                            break;
                        }
                    }
                }
            },
            // 获取用户信息
            getuserinfo(){
                console.log();
                let that=this;
                this.$http.post('/api/customer/account/queryByIds',[that.userinfo.id])
                .then(res => {
                    if (res.data.status == 200) {
                        if(res.data.info.list.length!=0){
                            let data=res.data.info.list[0];
                            operatelocalstorage('userinfo',JSON.stringify(data),'set',300);
                            that.userinfo=data;
                        }
                    }
                    else{
                        Toast(res.data.info.msg);
                    }
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
            },
            //查询订单数量（待付款，待服务，服务中）
            // getNUmberOrder(data,index){
            //     let that=this;
            //     this.$http.post('/api/product/order/mall/find?pageSize=0',data)
            //     .then(res=>{
            //         if(res.data.status==200){
            //             // console.log(res.data.info.size);
            //             let num=res.data.info.size
            //             that.num_orderlist[index]=num;
            //         }
            //         else{
            //             Toast(res.data.msg);
            //         }
            //         console.log(res);
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     });
                
            // },
            // 查询服务状态订单数量
            // getNumberOrderService(status,index){
            //     let that=this;
            //     this.$http.post('/api/product/order/mall/find/status?pageSize=0&orderStatus='+status)
            //     .then(res=>{
            //         if(res.data.status==200){
            //             // console.log(res.data.info.size);
            //             let num=res.data.info.size
            //             that.num_orderlist[index]=num;
            //         }
            //         else{
            //             Toast(res.data.msg);
            //         }
            //         console.log(res);
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     });
            // },
            //查询待评价订单数量
            // getNUmberOrderEval(){
            //     let that=this;
            //     this.$http.post('/api/product/order/mall/find/withoutEvaluate?pageSize=1',{})
            //     .then(res=>{
            //         if(res.data.status==200){
            //             that.num_orderlist[3]=res.data.info.total;
            //         }
            //         console.log(res);
            //         // return 0;
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //         // return 0;
            //     })
            // },
            // 查询总的收藏数
            // getNumberFavorite(){
            //     let that=this;
            //     this.$http.post('/api/product/commodity/favorite/queryPageList')
            //     .then(res=>{
            //         if(res.data.status==401){
            //             localStorage.removeItem('userinfo');
            //             this.userinfo={
            //                 id:'',
            //                 avatar:'',
            //                 nickname:'',
            //                 level:''
            //             };
            //         }
            //         if(res.data.status==200){
            //             this.num_collection=res.data.info.total;
            //         }
            //         console.log(res);
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     });
            // },
            // 查询购物车内商品数量
            // getNumberShopcar(){
            //     let that=this;
            //     this.$http.post('/api/product/shoppingCart/myShoppingCart',{})
            //     .then(res=>{
            //         if(res.data.status==200){
            //             let count=0;
            //             res.data.info.forEach(item=>{
            //                 count+=item.commodityCount;
            //             });
            //             this.num_shopcar=count;
            //         }
            //         console.log(res);
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     });
            // },
            toShopCar(){
                if(this.userinfo.id==''){
                    Toast('请先登录！');
                }
                else{
                    this.$root.$emit('switchindex','shopcar');
                }
            },
            toMycollection(){
                if(this.userinfo.id==''){
                    Toast('请先登录！');
                }
                else{
                    this.$router.push('/mycollection');
                }
            },
            // 查询未读消息的数量
            getMsgwithoutWatch(){
                
                let that=this;
                this.$http.post('/api/public/message/record/query?pageSize=0',{})
                .then(res=>{
                    if(res.data.status==200){
                        for(let item in res.data.info.list){
                            if(!item.isRead){
                                that.hasnewmsg=true
                                return;
                            }
                        }
                    }
                    else{
                        Toast(res.data.msg);
                    }
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        },
        mounted() {
            // console.log(this.userinfo);
            let that = this;
            if(this.userinfo.id!=''){
                this.$http.post('/api/customer/customerLevelComputing/query', {
                    level: that.userinfo.level
                })
                .then(function(response) {
                    if (response.data.info == '尚未登录') {
                        // that.$router.push({
                        //     path: '/login'
                        // })
                    }
                    if (response.data.status == 200) {
                        that.viplevel = response.data.info.length == 0 ? '非会员' : response.data.info[0].levelName
                    } else {
                        console.log(response);
                    }
                })
                .catch(function(response) {
                    console.log(response);
                });
            }
            
        },
        components: {
            // buttomNav
        },
        computed: {
            // userinfo(){
            //     let userinfo_session=sessionStorage.getItem('userinfo');
            //     if(userinfo_session==null){
            //         let json={
            //             id:'',
            //             avatar:'',
            //             nickname:'',
            //             level:''
            //         };
            //         return json;
            //     }
            //     else{
            //         let data = JSON.parse(sessionStorage.getItem('userinfo'));
            //         return data;
            //     }
            // }
            // ...mapState({
            //     userinfo: function(state) {
            //         // console.log(state.userinfo);
            //         // console.log(JSON.stringify(state.userinfo.userinfo));
            //         if (JSON.stringify(state.userinfo.userinfo) == '{}') {
            //             let data = JSON.parse(sessionStorage.getItem('userinfo'));
            //             this.$store.commit('login', data)
            //             return data;
            //         } else {
            //             return state.userinfo.userinfo
            //         }
            //     }
            // })
        },
        beforeDestroy(){
            this.$root.$off('loadUserinfo');
        }
    }
</script>
<style scoped>
    .infoBottom{
        /* background-image:url("/static/images/style1-background_info.png"); */
        background-image:url("/static/images/style1-background_info.png");
        background-repeat: no-repeat;
        background-size:contain;
    }
    .mint-header{
        background-color: black;
    }
    .coloBule {
        color: #26a2ff;
        font-weight: 700;
        font-size: 0.4rem;
    }
    .icon-qiehuan {
        position: absolute;
        top: 17%;
        right: 5%;
        color: #848484;
        font-size: 0.4rem;
    }
    .account {
        width: 100%;
        height: 4.2rem;
        padding: .36rem 0 0 0;
    }
    .account_info {
        width: 6.3rem;
        margin: 0rem auto;
        height: 3.8rem;
        background: white;
        padding-top: .3rem;
        box-shadow: .05rem .05rem .15rem #bde9fd;
        position: relative;
    }
    .change img {
        display: inline-block;
        width: .38rem;
        height: .29rem;
        position: absolute;
        top: .2rem;
        right: .2rem;
    }
    .infoBottom {
        /* margin-top: .8rem; */
        /* padding-bottom:1rem; */
    }
    .portrait {
        width: 100%;
        height: 1.5rem;
        text-align: left;
        margin-top: .3rem;
    }
    .portrait_img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #C4C4C4;
        margin-left: .3rem;
        /* display: inline-block; */
        vertical-align: middle;
        float: left;
        position: relative;
    }
    .portrait_img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .portrait_img .vip {
        width: 100%;
        text-align: center;
        font-size: .1rem;
        position: absolute;
        bottom: -.25rem;
    }
    .portrait_info {
        height: 1.5rem;
        display: inline-block;
        float: left;
        margin-left: .3rem;
        font-size: .22rem;
        line-height: .5rem;
        color: #353535!important;
    }
    .behavior {
        width: 100%;
        height: 1.5rem;
        padding-top: .5rem;
        display: flex;
        justify-content: space-around;
    }
    .behavior li {
        width: 30%;
        font-size: .24rem;
        text-align: center;
    }
    .collect {
        width: .3rem;
        height: .3rem;
        margin: 0.3rem auto;
        position: relative;
    }
    .collect img {
        width: 100%;
        height: 100%;
    }
    .img_shadow1 {
        width: .3rem;
        height: .3rem;
    }
    .img_shadow1 img {
        opacity: .3;
    }
    .img_shadow2 {
        width: .3rem;
        height: .3rem;
        position: absolute;
        top: -0.04rem;
        left: -.04rem;
    }
    .wait_for li:nth-child(1) .fontSize {
        font-size: 0.6rem;
    }
    .wait_for li:nth-child(2) .fontSize {
        font-size: 0.6rem;
    }
    .wait_for li:nth-child(3) .fontSize {
        font-size: 0.45rem;
    }
    .wait_for li:nth-child(4) .fontSize {
        font-size: 0.45rem;
    }
    .wait_for li:nth-child(5) .fontSize {
        font-size: 0.5rem;
    }
    /**/
    .order {
        width: 100%;
        height: 2.5rem;
        margin-top: .3rem;
        border-bottom: .15rem solid #f4f4f4;
    }
    .check {
        float: right;
        margin-right: .75rem;
    }
    .my_order:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .account_management {
        margin-top: .1rem;
    }
    .my_order,
    .account_management,
    .address_management,
    .coupon {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .26rem;
        padding-left: .24rem;
        position: relative;
        text-align: left;
    }
    .my_order p,
    .account_management p,
    .address_management p,
    .coupon p {
        width: .15rem;
        height: .26rem;
        position: absolute;
        right: .48rem;
        top: 0rem;
    }
    .my_order p img,
    .account_management p img,
    .address_management p img,
    .coupon p img {
        width: 100%;
        height: 100%;
    }
    .wait_for {
        display: flex;
        justify-content: space-around;
    }
    .wait_for li {
        width: 1.2rem;
        height: 1.5rem;
        text-align: center;
        font-size: .24rem;
    }
    .img_wait {
        width: .4rem;
        height: .4rem;
        margin: .3rem auto;
        position: relative;
    }
    .img_wait img {
        width: 100%;
        height: 100%;
    }
    .wait_for li .orageColor {
        display: inline-block;
        width: .3rem;
        height: .3rem;
        line-height: .35rem;
        border-radius: 50%;
        background: #e47524;
        position: absolute;
        top: -.12rem;
        right: -.3rem;
        font-size: .2rem;
        font-style: normal;
        color: white;
    }
    .log_off {
        width: 5.6rem;
        height: .9rem;
        margin: .2rem auto 0rem auto;
        border-radius: 1.9rem;
        font-size: .3rem;
        color: white;
        text-align: center;
        line-height: .9rem;
        background: #26a2ff;
    }
    .shade {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 499;
        -moz-opacity: 0.5;
        opacity: .3;
        filter: alpha(opacity=80);
    }
    .side_menu {
        position: fixed;
        top: 0;
        left: -3.33rem;
        width: 3.33rem;
        height: 100%;
        padding: 0;
        background-color: white;
        _position: absolute;
        z-index: 500;
        transform: translate3d(0, 0, 0);
    }
    .menu_speed {
        transform: translate3d(100%, 0, 0);
        transition: transform 0.6s;
    }
    .brand_change {
        font-size: .3rem;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        border-bottom: .03rem solid #00ADAB;
    }
    .brand li {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        position: relative;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .24rem;
        text-indent: 1rem;
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
    .opera_list {
        padding: .2rem 0;
    }
    .opera_list ul {
        display: flex;
        justify-content: flex-start;

        flex-wrap: wrap;
    }
    .opera_list li {
        width: 25%;
        position: relative;
    }
    .opera_list .name_opera {
        font-size: .24rem;
        padding: .2rem 0;
        color: #2c3e50;
    }
    .opera_list .icon.operaicon {
        font-size: .5rem;
        color: #2ba1f2;
    }
    .opera_list .flag {
        width: .1rem;
        height: .1rem;
        top: 20%;
        left: 60%;
        display: none;
        position: absolute;
        border-radius: 50%;
        background: #e47524;
    }
    .opera_list .flag.on {
        display: block;
    }
</style>