<template>
    <div class="page-navbar" id='templatePage'>
        <div class="searchTop clear">
            <div class='code'><i data-v-13ee4bcf="" class="icon iconfont icon-erweima "></i></div>
            <div class="page-search">
                <mt-search autofocus v-model="value"></mt-search>
            </div>
            <div class='notice'><i data-v-13ee4bcf="" class="icon iconfont icon-tongzhi "></i></div>
        </div>
            <!-- 轮播开始 -->
            <adImage></adImage>
            <!-- 轮播结束 -->

            <!-- 分类开始 -->
            <classification></classification>
            <!-- 分类结束 -->

            <!-- 标题开始 -->
            <title></title>
            <!-- 标题结束 -->

            <!-- 商品开始 -->
            <commodity></commodity>
            <!-- 商品结束 -->

            <!-- 详情图片开始 -->
            <detailsImage></detailsImage>
            <!-- 详情图片结束 -->

            <!-- 橱窗1开始 -->
            <window></window>
            <!-- 橱窗1结束 -->

            <!-- 橱窗2开始 -->
            <windows></windows>
            <!-- 橱窗2结束 -->
    </div>
</template>

<script>
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    import adImage from '@/components/view/template/adImage.vue'
    import classification from '@/components/view/template/classification.vue'
    import title from '@/components/view/template/title.vue'
    import commodity from '@/components/view/template/commodity.vue'
    import detailsImage from '@/components/view/template/detailsImage.vue'
    import window from '@/components/view/template/window.vue'
    import windows from '@/components/view/template/windows.vue'
    export default {
        data() {
            return {
                selected: '1',
                value: ''
            };
        },
        components: {
            adImage,
            classification,
            title,
            commodity,
            detailsImage,
            window,
            windows
        },
    };
</script>
<style>
    #templatePage .mint-searchbar-inner .mintui-search {
        color: #fff;
        font-size: 0.4rem;
        padding: 0 0.2rem;
    }
    #templatePage .mint-searchbar-inner {
        background: rgba(100, 100, 100, 0.2);
    }
    #templatePage .mint-searchbar {
        background: #fff;
    }
    #templatePage .mint-searchbar-core {
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
    #templatePage .code,
    #templatePage .notice {
        width: 10%;
        float: left;
    }
    #templatePage .code i,
    #templatePage .notice i {
        font-size: 0.55rem;
        position: relative;
        top: -0.1rem;
    }
    #templatePage .mint-search {
        height: 100%;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #templatePage .page-search {
        width: 80%;
        float: left;
    }
</style>
