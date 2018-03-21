<template>
    <div class="page-navbar" id='homepage'>
        <div class="searchTop clear">
            <div class='code'><i data-v-13ee4bcf="" class="icon iconfont icon-erweima "></i></div>
            <div class="page-search">
                <mt-search  v-model="value"></mt-search>
            </div>
            <div class='notice'><i data-v-13ee4bcf="" class="icon iconfont icon-tongzhi "></i></div>
        </div>
        <div class="page-navbar">
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">推荐</mt-tab-item>
                <mt-tab-item id="2">家电保养</mt-tab-item>
                <mt-tab-item id="3">家居保养</mt-tab-item>
                <mt-tab-item id="4">空气净化</mt-tab-item>
                <mt-tab-item id="5">净水</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                         <recommend></recommend>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
import recommend from '@/components/view/homepage/recommend/recommend.vue'
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        data() {
            return {
                selected: '1',
                value: ''
            };
        },
        computed: {},
        components: {
            recommend
        },
    };
</script>
<style>
    #homepage .mint-searchbar-inner .mintui-search {
        color: #fff;
        font-size: 0.4rem;
        padding: 0 0.2rem;
    }
    #homepage .mint-searchbar-inner {
        background: rgba(100, 100, 100, 0.2);
    }
    #homepage .mint-searchbar {
        background: #fff;
    }
    #homepage .mint-searchbar-core {
        color: #fff;
        background: rgba(50, 50, 50, 0);
    }
</style>
<style lang="" scoped>
    .clear:after {
        content: "";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }
    #homepage .code,
    #homepage .notice {
        width: 10%;
        float: left;
    }
    #homepage .code i,
    #homepage .notice i {
        font-size: 0.55rem;
        position: relative;
        top: -0.1rem;
    }
    #homepage .mint-search {
        height: 100%;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #homepage .page-search {
        width: 80%;
        float: left;
    }
</style>
