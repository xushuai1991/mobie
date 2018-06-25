<template>
    <div class='contain order-xs'>
        <mt-navbar v-model="selected" fixed >
            <mt-tab-item id="all">全部</mt-tab-item>
            <mt-tab-item id="willpay">待付款</mt-tab-item>
            <mt-tab-item id="willservice">待服务</mt-tab-item>
            <mt-tab-item id="inservice">服务中</mt-tab-item>
            <mt-tab-item id="willevaluate">待评价</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <!-- 全部 -->
            <mt-tab-container-item id="all" class='order_type'>
                <ul  v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading1" :infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="(item,index) in orderlist[0]" :key="index">
                        <ordercell :data='item' index='0' :indexorder='index' :test='test'></ordercell>
                        <!-- <pendpay :data='item' index='0' v-if="item.payState!=1&&item.orderState==1"></pendpay>
                        <inservice :data='item' index='0' v-if='item.payState==1&&item.orderState==1&&item.serviceState==2'></inservice>
                        <willservice :data='item' index='0' v-if='item.payState==1&&item.orderState==1&&item.serviceState==1'></willservice>
                        <other :data='item' index='0' v-if='(item.payState==1&&item.orderState==4)||(item.payState==1&&item.orderState==5)||(item.orderState==6)||(item.orderState==3)||(item.payState==3)'></other> -->
                    </li>
                </ul>
                <p v-show="!loading1" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[0]' class="page-over">———— 我是有底线的 ————</p>
            </mt-tab-container-item>
            <!-- 待付款 -->
            <mt-tab-container-item id="willpay" class='order_type'>
                <ul v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading2" :infinite-scroll-immediate-check='false' class='orderlist'>
                    <li v-for="(item,index) in orderlist[1]" :key="index" >
                        <ordercell :data='item' index='1' :indexorder='index'></ordercell>
                    </li>
                </ul>
                <p v-show="!loading2" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[1]' class="page-over">———— 我是有底线的 ————</p>
            </mt-tab-container-item>
            <!-- 待服务 -->
            <mt-tab-container-item id="willservice" class='order_type'>
                <ul v-infinite-scroll="loadMore2" infinite-scroll-disabled="loading3" infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="(item,index) in orderlist[2]" :key="item">
                        <ordercell :data='item' index='2' :type='type_service[0]' :indexorder='index'></ordercell>
                    </li>
                </ul>
                <p v-show="!loading3" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[2]' class="page-over">———— 我是有底线的 ————</p>
            </mt-tab-container-item>
            <!-- 服务中 -->
            <mt-tab-container-item id="inservice" class='order_type'>
                <ul v-infinite-scroll="loadMore3" infinite-scroll-disabled="loading4" infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="(item,index) in orderlist[3]" :key="item">
                        <ordercell :data='item' index='3' :type='type_service[1]' :indexorder='index'></ordercell>
                    </li>
                </ul>
                <p v-show="!loading4" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[3]' class="page-over">———— 我是有底线的 ————</p>
            </mt-tab-container-item>
            <!-- 待评价 -->
            <mt-tab-container-item id="willevaluate" class='order_type'>
                <ul v-infinite-scroll="loadMore4" infinite-scroll-disabled="loading5" infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="item in orderlist[4]" :key="item">
                        <willevaluate :data='item' index='4'></willevaluate>
                    </li>
                </ul>
                <p v-show="!loading5" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[4]' class="page-over">———— 我是有底线的 ————</p>
            </mt-tab-container-item>
            
        </mt-tab-container>
        <!-- <Calendar
            class='calendar'
            ref='Calendar'
            v-on:choseDay="clickDay"
            :agoDayHide='today'
            :futureDayHide='lastdat'
        ></Calendar> -->
        <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-picker :slots="dates" @change='onValuesChange'  :showToolbar='true' >
                <p class='btn-group'>
                    <button class='cancle font' @click.stop='cancledate'>取消</button>
                    <button class='certain font' @click.stop="getdate">确定</button>
                </p>
            </mt-picker>
        </mt-popup>
        <transition name="fade">
            <div class="calendar-dropdown" v-if="calendar3.show" @click='clickcalendar($event)'>
                <calendar :events="calendar3.events" :zero="calendar3.zero" :lunar="calendar3.lunar"  :value='minday' :begin="minday" :end="lastday" @select="clickDay"></calendar>
            </div>
        </transition>
    </div>
</template>
<script>
import willevaluate from './willevaluate.vue'
import ordercell from './ordercell.vue'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui'; 
import calendar from './calendar.vue'
// import Calendar from 'vue-calendar-component';
import {formatdate} from '../../../assets/javascript/formatdate.js'
import {operatelocalstorage} from '../../../assets/javascript/localstorage_hasdata.js'
import {mycommon} from '../../../assets/javascript/mycommon_xs.js'
import {MessageBox} from 'mint-ui'
export default {
    components:{willevaluate,ordercell,calendar},
    data() {
        return {
            test:true,
            selected: 'all',
            orderlist:[[],[],[],[], []],
            loading1:true,
            loading2:true,
            loading3:true,
            loading4:true,
            loading5:true,
            loading:false,
            dataover:[false,false,false,false,false],//数据是否加载完
            pagenumlist:[1,1,1,1,1],
            type_service:['unservice','inservice'],
            popupVisible:false,
            dates:[
                {
                    values: ['上午', '下午'],  
                    className: 'slot1',  
                    textAlign: 'center',
                },
            ],
            periodlist:[],
            calendar3: {
                show: false,
                zero: true,
                lunar: true, //显示农历
            },
            datechange:'',
            selectTime:'',
            startPeriod:'',
            endPeriod:'',
            // 当前订单服务类商品的信息
            templateid_current:null,
            orderdetailid_current:null,
            commodityrid_current:null,
            commodityindex_current:null,
            typeindex_current:null,
            indexorder_current:null,
            appointid_current:null,
            type_opera:null,
            userinfo:null,
            // 预约的商品数量
            appointnum:0,
            index_currentappoint:null
        };
    },
    created(){
        this.$root.$emit('header','我的订单');
        let user_str = operatelocalstorage('userinfo', null, 'get', null);
        if (user_str == null) {
            Toast('请先登录');
        } else {
            let userinfo = JSON.parse(user_str);
            this.userinfo = userinfo;
        }
        this.selected=this.$route.params.type==undefined?'all':this.$route.params.type;
        if(this.selected=='all'){
            this.getOrderList(1,{companyId:sessionStorage.getItem('companyId')});
        }
        // 对订单操作后，重新刷新对应tab下的数据
        this.$root.$on('loaddata',index=>{
            // console.log(index);
            this.pagenumlist[index]=1;
            this.dataover[index]=false;
            switch(index){
                // 更新全部数据
                case '0':{
                    this.getOrderList(1,{});
                    break;
                }
                // 更新待付款数据
                case '1':{
                    let data={payState:2,orderState:1};
                    this.getOrderList(1,data);
                }
                 //更新待服务数据
                case '2':{
                    let data={payState:1,serviceState:1};
                    this.getOrderListService(1,1);
                    break;
                }
                //更新服务中数据
                case '3':{
                    let data={payState:1,serviceState:2};
                    this.getOrderListService(1,2);
                    break;
                }
                //更新待评价数据
                case '4':{
                    let data={};
                    this.getOrder_Willevaluate(1);
                    break;
                }
                default:{
                    break;
                }
            }
            
        });
        // 监听日历插件唤醒
        this.$root.$on('calendar',data=>{
            let commodityid=data.commodityid;
            let orderdetailid=data.orderdetailid;
            let templateid=data.templateId;
            let e=data.e;
            this.templateid_current=templateid;
            this.orderdetailid_current=orderdetailid;
            this.commodityrid_current=commodityid;
            this.type_opera=data.type;
            this.commodityindex_current=data.index;
            this.typeindex_current=data.type_index;
            this.indexorder_current=data.indexorder;

            this.appointid_current=data.appointid;
            this.index_currentappoint=data.index_appoint;
            MessageBox.prompt('预约数量','').then(datas=>{
                let value=datas.value;
                let isnum=value!=null&&!isNaN(value-0);
                if(isnum){
                    let num_hasappoint=0;
                    let list=this.orderlist[this.typeindex_current][this.indexorder_current].orderDetails;
                    let list_foreach=list[this.commodityindex_current].appointments==null?[]:list[this.commodityindex_current].appointments;
                    list_foreach.forEach((item,key)=>{
                        num_hasappoint+=(key!=data.index_appoint?item.number:0);
                    })
                    // 已经预约的数目
                    let  num_canappoint=list[this.commodityindex_current].saleNumber-num_hasappoint;
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
        })
    },
    watch:{ 
        selected(value){
            switch(value){
                //全部
                case 'all':{
                    if(this.orderlist[0].length==0){
                        let data={companyId:sessionStorage.getItem('companyId')};
                        this.getOrderList(1,data);
                    }
                    else{
                        this.loading1=this.dataover[0];
                    }
                    this.loading2=true;
                    this.loading3=true;
                    this.loading4=true;
                    this.loading5=true;
                    break;
                }
                // 待付款
                case 'willpay':{
                    if(this.orderlist[1].length==0){
                       let data={payState:2,orderState:1,companyId:sessionStorage.getItem('companyId')};
                        this.getOrderList(1,data);
                    }
                    else{
                        this.loading2=this.dataover[1];
                    }
                    this.loading1=true;
                    
                    this.loading3=true;
                    this.loading4=true;
                    this.loading5=true;
                    break;
                }
                //待服务
                case 'willservice':{
                    if(this.orderlist[2].length==0){
                        // let data={orderStatus:1};
                        this.getOrderListService(1,1);
                    }
                    else{
                        this.loading3=this.dataover[2];
                    }
                    this.loading1=true;
                    this.loading2=true;
                    this.loading4=true;
                    this.loading5=true;
                    break;
                }
                //服务中
                case 'inservice':{
                    if(this.orderlist[3].length==0){
                        // let data={orderStatus:2};
                        this.getOrderListService(1,2);
                    }
                    else{
                        this.loading4=this.dataover[3];
                    }
                    this.loading1=true;
                    this.loading2=true;
                    this.loading3=true;
                    
                    this.loading5=true;
                    break;
                }
                //待评价
                case 'willevaluate':{
                    if(this.orderlist[4].length==0){
                        this.getOrder_Willevaluate(1);
                    }
                    else{
                        this.loading5=this.dataover[4];
                    }
                    this.loading1=true;
                    this.loading2=true;
                    this.loading3=true;
                    this.loading4=true;
                    
                    break;
                }
                default:{
                    break;
                }
            }
        }
    },
    computed:{
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
    },
    methods:{
        clickcalendar(e){
            this.calendar3.show = false;
        },
        onValuesChange(picker,values){
            this.datechange=values[0];
            // console.log(values);
        },
        clickDay(value){
            let str=value[0]+'-'+value[1]+'-'+value[2];
            if(this.templateid_current==null){
                Toast('请联系客服配置该商品的预约时间');
                return;
            }
            this.getPeriodList(str).then(success=>{
                if(success){
                    this.selectTime=str;
                    this.startPeriod='';
                    this.endPeriod='';
                    this.popupVisible=true;
                }
            });
            
        },
        getdate(){
            let currentstr=this.datechange;
            let result=this.dates[0].values.has(currentstr);
            if(result.result){
                let index=result.index;
                let canselect=currentstr.indexOf('剩余:0')<0;
                if(canselect){
                    let list=this.datechange.substring(0,13).split('-');
                    this.startPeriod=list[0].trim('');
                    this.endPeriod=list[1].trim('');
                    // 添加预约记录
                    if(this.type_opera=='add'){
                        let periodid=this.periodlist[index].id;
                        this.insertAppointment(periodid,index);
                    }
                    // 修改预约记录
                    else if(this.type_opera=='edit'){
                        this.editAppointment(index);
                    }
                }
                else{
                    Toast('该时间段不可选');
                }
            }
            else{
                Toast('发生错误');
            }
            // console.log(currentstr);
            
        },
        cancledate(){
            this.popupVisible=false;
            this.calendar3.show = false;
        },
        // 添加预约记录
        insertAppointment(periodId,index){
            let that=this;
            this.$http.post('/api/product/appointment/insertone?weekDay='+that.selectTime,{
                startTime:that.selectTime+' '+that.periodlist[index].startTime,
                endTime:that.selectTime+' '+that.periodlist[index].endTime,
                accountId:that.userinfo.id,
                commodityId:that.commodityrid_current,
                periodId:periodId,
                orderDetailId:that.orderdetailid_current,
                templateId:that.templateid_current,
                companyId:sessionStorage.getItem('companyId'),
                isService:0,
                number:that.appointnum
            })
            .then(res=>{
                if(res.data.status==200){
                    let json={
                        accountId:res.data.info.accountId,
                        commodityId:res.data.info.commodityId,
                        companyId:res.data.info.companyId,
                        id:res.data.info.id,
                        number:res.data.info.number,
                        orderDetailId:res.data.info.orderDetailId,
                        periodId:res.data.info.periodId,
                        endTime:res.data.info.endTime,
                        startTime:res.data.info.startTime,
                        isService:res.data.info.isService
                    }
                    let list=that.orderlist[that.typeindex_current][that.indexorder_current].orderDetails[that.commodityindex_current].appointments;
                    if(list==null){
                        that.orderlist[that.typeindex_current][that.indexorder_current].orderDetails[that.commodityindex_current].appointments=[];
                    }
                    that.orderlist[that.typeindex_current][that.indexorder_current].orderDetails[that.commodityindex_current].appointments.push(json);
                    that.popupVisible=false;
                    that.calendar3.show = false;
                    Toast('预约时间申请成功');
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        // 修改预约记录
        editAppointment(index){
            let that=this;
            this.$http.post('/api/product/appointment/update',
            {
                id:this.appointid_current,
                startTime:this.selectTime+' '+this.periodlist[index].startTime,
                endTime:this.selectTime+' '+this.periodlist[index].endTime,
                isService:0,
                number:this.appointnum
            })
            .then(res=>{
                if(res.data.status==200){
                    let str=that.selectTime+' '+that.startPeriod+'-'+that.endPeriod;
                    let starttime=that.selectTime+' '+that.startPeriod;
                    let endtime=that.selectTime+' '+that.endPeriod;
                    
                    let list=that.orderlist[that.typeindex_current][that.indexorder_current].orderDetails[that.commodityindex_current].appointments[that.index_currentappoint]
                    list.startTime=that.selectTime+' '+that.periodlist[index].startTime;
                    list.endTime=that.selectTime+' '+that.periodlist[index].endTime;
                    list.number=that.appointnum;

                    // let dom=document.querySelectorAll('.order_type')[that.typeindex_current].querySelectorAll('li')[that.indexorder_current].querySelectorAll('.detail')[that.commodityindex_current];
                    // dom.querySelector('.appointment').querySelector('button').innerHTML='修改时间';
                    // dom.querySelector('.appointment').querySelector('span').innerHTML='服务时间：'+that.selectTime+' '+that.startPeriod+'-'+that.endPeriod+'(待确认)';
                    that.popupVisible=false;
                    that.calendar3.show = false;
                    Toast('预约时间修改成功');
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 获取时间段
        getPeriodList(date){
            return new Promise((resolve,reject)=>{
                let that=this;
                let companyid=sessionStorage.getItem('companyId');
                that.$http.post('/api/product/period/query',{
                    date:date,
                    templateId:that.templateid_current
                })
                .then(res=>{
                    if(res.data.status==200){
                        that.dates=[];
                        let periodlist=[];
                        that.periodlist=res.data.info.list[1];
                        let lastnumlist=res.data.info.list[0];
                        // console.log(res);
                        res.data.info.list[1].forEach((item,index)=>{
                            periodlist.push(item.startTime.substring(0,5)+' - '+item.endTime.substring(0,5)+'(剩余:'+lastnumlist[index]+')');
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
        getOrderList(pagenum,data){
            let index=this.selected=='all'?0:this.selected=='willpay'?1:this.selected=='willservice'?2:this.selected=='inservice'?3:4;
            if(pagenum==1){
                Indicator.open();
                this.orderlist[index]=[];
            }
            let that=this;
            this.changeStatus(index,true);
            this.$http.post('/api/product/order/mall/find?pageNo='+pagenum+'&pageSize=5',data)
            .then(res=>{
                if(res.data.status==200){
                    if(pagenum>=res.data.info.pages){
                        that.$set(that.dataover,index,true);
                    }
                    that.pagenumlist[index]=res.data.info.list.length==5?pagenum+1:pagenum;
                    res.data.info.list.forEach(item=>{
                        that.orderlist[index].push(item);
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                if(!that.dataover[index]){
                    that.changeStatus(index,false);
                }
                else{
                    Toast('数据已加载完');

                }
                Indicator.close();
            })
            .catch(err=>{
                if(!that.dataover[index]){
                    that.changeStatus(index,false);
                }
                else{
                    Toast('数据已加载完');
                }
                that.changeStatus(index,true);
                console.log(err);
                Indicator.close();
                Toast('查询失败');
            })
        },
        // 查询待评价订单列表
        getOrder_Willevaluate(pagenum,data){
            let that=this;
            // 当前tab内数据为空，出现加载圆圈
            if(pagenum==1){
                Indicator.open();
                this.orderlist[4]=[];
            }
            this.changeStatus(4,true);
            this.$http.post('/api/product/order/mall/find/withoutEvaluate?pageSize=5&&page='+pagenum+'&companyId='+sessionStorage.getItem('companyId'),{})
            .then(res=>{
                console.log(that.orderlist[4]);
                if(res.data.status==200){
                    if(pagenum>=res.data.info.pages){
                        that.$set(that.dataover,4,true);
                    }
                    that.pagenumlist[4]=res.data.info.list.length==5?pagenum+1:pagenum;
                    res.data.info.list.forEach(item=>{
                        that.orderlist[4].push(item);
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                if(!that.dataover[4]){
                    that.changeStatus(4,false);
                }
                else{
                    Toast('数据已加载完');
                }
                Indicator.close();
                console.log(res);
            })
            .catch(err=>{
                if(!that.dataover[4]){
                    that.changeStatus(4,false);
                }
                // else{
                //     Toast('数据已加载完');
                // }
                console.log(err);
                Indicator.close();
                Toast('查询失败');
            });
        },
        // 查询服务状态的订单
        getOrderListService(pagenum,status){
            let that=this;
            let index=this.selected=='all'?0:this.selected=='willpay'?1:this.selected=='willservice'?2:this.selected=='inservice'?3:4;
            if(pagenum==1){
                Indicator.open();
                this.orderlist[index]=[];
            }
            this.changeStatus(index,true);
            this.$http.post('/api/product/order/mall/find/status?pageSize=5&pageNo='+pagenum+'&orderStatus='+status+'&companyId='+sessionStorage.getItem('companyId'))
            .then(res=>{
                console.log(that.orderlist[index]);
                if(res.data.status==200){
                    if(pagenum>=res.data.info.pages){
                        that.$set(that.dataover,index,true);
                    }
                    that.pagenumlist[index]=res.data.info.list.length==5?pagenum+1:pagenum;
                    res.data.info.list.forEach(item=>{
                        that.orderlist[index].push(item);
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                if(!that.dataover[index]){
                    that.changeStatus(index,false);
                }
                else{
                    Toast('数据已加载完');
                }
                Indicator.close();
                console.log(res);
            })
            .catch(err=>{
                if(!that.dataover[index]){
                    that.changeStatus(index,false);
                }
                else{
                    Toast('数据已加载完');
                }
                console.log(err);
                Indicator.close();
                Toast('查询失败');
            })
        },
        // 改变触发状态
        changeStatus(index,flag){
            switch(index){
                case 0:{
                    this.loading1=flag;
                    break;
                }
                case 1:{
                    this.loading2=flag;
                    break;
                }
                case 2:{
                    this.loading3=flag;
                    break;
                }
                case 3:{
                    this.loading4=flag;
                    break;
                }
                case 4:{
                    this.loading5=flag;
                    break;
                }
                default:{
                    break;
                }
            }
        },
        
        // 加载全部订单
        loadMore() {
            // console.log('全部');
            if(this.dataover[0]==true){
                Toast('数据已加载完');
            }
            else{
                this.getOrderList(this.pagenumlist[0],{});
            }
        },
        //加载待付款订单
        loadMore1(){
            // console.log('待付款');
            let data={payState:2};
            if(this.dataover[1]==true){
                Toast('数据已加载完');
            }
            else{
                this.getOrderList(this.pagenumlist[1],data);
            }
        },
        //加载待服务订单
        loadMore2(){
            console.log(222);
            // let data={orderStatus:1};
            this.getOrderListService(this.pagenumlist[2],1);
        },
        //加载服务中的订单
        loadMore3(){
            // let data={orderStatus:2};
            this.getOrderListService(this.pagenumlist[3],2);
        },
        //加载未评价订单
        loadMore4(){
            this.getOrder_Willevaluate(this.pagenumlist[4]);
        }
    },
    beforeDestroy(){
        this.$root.$off('loaddata');
        this.$root.$off('calendar');
    }
}
</script>
<style lang="less" scoped>
.order-xs{
    .orderlist{
        background: #f5f5f5;
    }
    .calendar-dropdown{
        left:0px;
        right:0;
        top:0px;
        position:fixed;
        height:100vh;
        z-index:999;
        background-color:#fff;
    }
    
}
</style>
<style  lang="less" >
.order-xs{
    .wh_container{
        background-color:#26a2ff;
        display: none;
        position: absolute;
        top:0;
        left: 0;
        width:100%;
        height:100%;
        z-index: 999;
        .wh_content_all{
            background-color:#26a2ff;
        }
        .wh_content_item div .wh_isToday{
            color:#26a2ff;
        }
    }
    // margin-top: 2rem;
    .mint-navbar{
        // margin-top: .8rem;
    }
    .mint-tab-container{
        margin-top: 1rem;
    }
    .mint-tab-item-label{
        font-size: 0.3rem;
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom: 3px solid #26a2ff;
        color: #26a2ff;
    }
    .mint-tab-container-item{
        /* background-color: #e9e9e9 !important; */
    }
    .page-infinite-loading{
        /* display: block; */
        font-size: .3rem;
        text-align: center;
        padding: .1rem;
    }
    .page-infinite-loading div {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        padding-top: .1rem;
    }
    .page-over{
        font-size:.3rem;
        padding:.2rem 0;
        color:#dcdcdc;
    }
    .popup{
        width: 100%;
        
    }
    .btn-group{
        padding:.2rem 0;
        line-height:0;
        border-bottom:1px solid #eaeaea;
        text-align: center;
    }
    .btn-group button{
        background: none;
        border: none;
        color:#46c5d9;
        font-size: .3rem;
        padding: 0 1.5rem;
        outline: none;
    }
}


</style>