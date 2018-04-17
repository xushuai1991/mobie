<template>
    <div class='contain order-xs'>
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="all">全部</mt-tab-item>
            <mt-tab-item id="willpay">待付款</mt-tab-item>
            <mt-tab-item id="willservice">待服务</mt-tab-item>
            <mt-tab-item id="inservice">服务中</mt-tab-item>
            <mt-tab-item id="willevaluate">待评价</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <!-- 全部 -->
            <mt-tab-container-item id="all">
                <ul  v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading1" :infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="(item,index) in orderlist[0]" :key="index">
                        <pendpay :data='item' index='0' v-if="item.payState!=1&&item.orderState==1"></pendpay>
                        <inservice :data='item' index='0' v-if='item.payState==1&&item.orderState==1&&item.serviceState==2'></inservice>
                        <willservice :data='item' index='0' v-if='item.payState==1&&item.orderState==1&&item.serviceState==1'></willservice>
                        <!-- <willevaluate :data='item'></willevaluate> -->
                        <other :data='item' index='0' v-if='(item.payState==1&&item.orderState==4)||(item.payState==1&&item.orderState==5)||(item.orderState==6)||(item.orderState==3)||(item.payState==3)'></other>
                    </li>
                </ul>
                <p v-show="!loading1" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[0]' class="page-over">数据已加载完</p>
            </mt-tab-container-item>
            <!-- 待付款 -->
            <mt-tab-container-item id="willpay">
                <ul v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading2" :infinite-scroll-immediate-check='false' class='orderlist'>
                    <li v-for="(item,index) in orderlist[1]" :key="index">
                        <pendpay :data='item' index='1'></pendpay>
                    </li>
                </ul>
                <p v-show="!loading2" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[1]' class="page-over">数据已加载完</p>
            </mt-tab-container-item>
            <!-- 待服务 -->
            <mt-tab-container-item id="willservice">
                <ul v-infinite-scroll="loadMore2" infinite-scroll-disabled="loading3" infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="item in orderlist[2]" :key="item">
                        <willservice :data='item' index='2'></willservice>
                    </li>
                </ul>
                <p v-show="!loading3" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[2]' class="page-over">数据已加载完</p>
            </mt-tab-container-item>
            <!-- 服务中 -->
            <mt-tab-container-item id="inservice">
                <ul v-infinite-scroll="loadMore3" infinite-scroll-disabled="loading4" infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="item in orderlist[3]" :key="item">
                        <inservice :data='item' index='3'></inservice>
                    </li>
                </ul>
                <p v-show="!loading4" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[3]' class="page-over">数据已加载完</p>
            </mt-tab-container-item>
            <!-- 待评价 -->
            <mt-tab-container-item id="willevaluate">
                <ul v-infinite-scroll="loadMore4" infinite-scroll-disabled="loading5" infinite-scroll-immediate-check='false'  class='orderlist'>
                    <li v-for="item in orderlist[4]" :key="item">
                        <willevaluate :data='item' index='4'></willevaluate>
                    </li>
                </ul>
                <p v-show="!loading5" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <p v-show='dataover[4]' class="page-over">数据已加载完</p>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import pendpay from './pendpay.vue'
import inservice from './inservice.vue'
import willevaluate from './willevaluate.vue'
import willservice from './willservice.vue'
import other from './other.vue'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui'; 
export default {
    components:{pendpay,inservice,willevaluate,willservice,other},
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
        };
    },
    created(){
        // this.getOrderList(3,{});
        this.$root.$emit('header','我的订单');
        this.selected=this.$route.params.type==undefined?'all':this.$route.params.type;
        switch(this.selected){
            //全部
            case 'all':{
                let data={};
                this.getOrderList(1,data);
                break;
            }
            // 待付款
            case 'willpay':{
                let data={payState:2};
                this.getOrderList(1,data);
                break;
            }
            //待服务
            case 'willservice':{
                let data={payState:1,serviceState:1};
                this.getOrderList(1,data);
                break;
            }
            //服务中
            case 'inservice':{
                let data={payState:1,serviceState:2};
                this.getOrderList(1,data);
                break;
            }
            //待评价
            case 'willevaluate':{
                this.getOrder_Willevaluate(1);
                break;
            }
            default:{
                break;
            }
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
                    let data={payState:2};
                    this.getOrderList(1,data);
                }
                 //更新待服务数据
                case '2':{
                    let data={payState:1,serviceState:1};
                    this.getOrderList(1,data);
                    break;
                }
                //更新服务中数据
                case '3':{
                    let data={payState:1,serviceState:2};
                    this.getOrderList(1,data);
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
    },
    watch:{
        selected(value){
            switch(value){
                //全部
                case 'all':{
                    if(this.orderlist[0].length==0){
                        let data={};
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
                       let data={payState:2};
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
                        let data={payState:1,serviceState:1};
                        this.getOrderList(1,data);
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
                        let data={payState:1,serviceState:2};
                        this.getOrderList(1,data);
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
    methods:{
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
            this.$http.post('/api/product/order/mall/find/withoutEvaluate?pageSize=5&&page='+pagenum,{})
            .then(res=>{
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
            let data={payState:1,serviceState:1};
            this.getOrderList(this.pagenumlist[2],data);
        },
        //加载服务中的订单
        loadMore3(){
            let data={payState:1,serviceState:2};
            this.getOrderList(this.pagenumlist[3],data);
        },
        //加载未评价订单
        loadMore4(){
            this.getOrder_Willevaluate(this.pagenumlist[4]);
        }
    },
    beforeDestroy(){
        this.$root.$off('loaddata');
    }
}
</script>
<style lang="less" scoped>
.order-xs{
    .orderlist{
        background: #f5f5f5;
    }
}
</style>
<style  lang="less" >
.order-xs{
    margin-top: 2rem;
    .mint-navbar{
        margin-top: .8rem;
    }
    .mint-tab-container{
        /* margin-top: 1rem; */
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