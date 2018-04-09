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
                <ul  v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading[0]" infinite-scroll-distance="10" class='orderlist'>
                    <li v-for="item in list1" :key="item">
                        <pendpay></pendpay>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
            <!-- 待付款 -->
            <mt-tab-container-item id="willpay">
                <ul v-infinite-scroll="loadMore1" :infinite-scroll-disabled="loading[1]" infinite-scroll-distance="10" class='orderlist'>
                    <li v-for="item in list2" :key="item">
                        <pendpay></pendpay>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
            <!-- 待服务 -->
            <mt-tab-container-item id="willservice">
                <ul v-infinite-scroll="loadMore2" :infinite-scroll-disabled="loading[2]" infinite-scroll-distance="10" class='orderlist'>
                    <li v-for="item in list2" :key="item">
                        <inservice></inservice>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
            <!-- 服务中 -->
            <mt-tab-container-item id="inservice">
                <ul v-infinite-scroll="loadMore3" :infinite-scroll-disabled="loading[3]" infinite-scroll-distance="10" class='orderlist'>
                    <li v-for="item in list2" :key="item">
                        <willservice></willservice>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
            <!-- 待评价 -->
            <mt-tab-container-item id="willevaluate">
                <ul v-infinite-scroll="loadMore4" :infinite-scroll-disabled="loading[4]" infinite-scroll-distance="10" class='orderlist'>
                    <li v-for="item in list2" :key="item">
                        <willevaluate></willevaluate>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import pendpay from './pendpay.vue'
import inservice from './inservice.vue'
import willevaluate from './willevaluate.vue'
import willservice from './willservice.vue'
export default {
    components:{pendpay,inservice,willevaluate,willservice},
    data() {
        return {
            selected: 'all',
            list1:[1,2,3,4],
            list2:[1,2,3,4],
            list3:[1,2,3,4],
            list4:[1,2,3,4],
            list5:[1,2,3,4],
            loading:[false,false,false,false]
        };
    },
    created(){
        this.$root.$emit('header','我的订单');
        this.selected=this.$route.params.type==undefined?'all':this.$route.params.type;
        this.getOrderList(1);
    },
    methods:{
        getOrderList(pagenum){
            let that=this;
            this.$http.post('/api/product/order/queryPageList',
            {
                pageSize:10,
                pageNum:pagenum
            })
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        loadMore() {
            console.log(111);
            this.loading[0] = true;
            setTimeout(() => {
                let last = this.list1[this.list1.length - 1];
                for (let i = 1; i <= 2; i++) {
                this.list1.push(last + i);
                }
                this.loading[0] = false;
            }, 2500);
        },
        loadMore1(){},
        loadMore2(){},
        loadMore3(){},
        loadMore4(){}
    },
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
    margin-top: 1.5rem;
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
        border-bottom: 3px solid #31B1B0;
        color: #31B1B0;
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
}


</style>