<template>
    <div class='contain'>
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待付款</mt-tab-item>
            <mt-tab-item id="3">待服务</mt-tab-item>
            <mt-tab-item id="4">服务中</mt-tab-item>
            <mt-tab-item id="5">待评价</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in list1" :key="item">
                        <pendpay></pendpay>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in list2" :key="item">
                        <inservice></inservice>
                    </li>
                </ul>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :key="n" :title="'content ' + n" />
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
            selected: '1',
            list1:[1,2,3,4],
            list2:[1,2,3,4],
            list3:[1,2,3,4],
            list4:[1,2,3,4],
            list5:[1,2,3,4],
            loading:false
        };
    },
    methods:{
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list1[this.list1.length - 1];
                for (let i = 1; i <= 2; i++) {
                this.list1.push(last + i);
                }
                this.loading = false;
            }, 2500);
        }
    }
}
</script>
<style>
.contain {
     margin-top: 1.5rem;
}
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

</style>