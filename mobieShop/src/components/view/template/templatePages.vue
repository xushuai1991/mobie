<template>
    <div class="page-navbar" id='templatePage'>
        <div class="searchTop clear">
            <!-- <div class='code'><i data-v-13ee4bcf="" class="icon iconfont icon-erweima "></i></div> -->
            <div class="page-search">
                <mt-search type="text"  v-model="value" @keyup.enter.native='changeCount(value)' ></mt-search>
            </div>
            <!-- <div class='notice'><i data-v-13ee4bcf="" class="icon iconfont icon-tongzhi "></i></div> -->
        </div>
            <keep-alive v-for='(item,index) in comlist' :key='index'>
              <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
            </keep-alive>
    </div>
</template>

<script>
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    import { mapState,mapMutations,mapGetters } from 'vuex'
    import imageAds from '@/components/view/template/imageAds.vue'
    import classification from '@/components/view/template/classification.vue'
    import titles from '@/components/view/template/titles.vue'
    import commodity from '@/components/view/template/commodity.vue'
    import detailsImage from '@/components/view/template/detailsImage.vue'
    import window from '@/components/view/template/window.vue'
    import window2 from '@/components/view/template/window2.vue'
    export default {
        data() {
            return {
                selected: '1',
                value: ''
            };
        },
        created(){
            console.log(this.comlist)
        },
        methods:{
            changeCount(val){
                if(val){
                    console.log(val)
                    this.$root.$emit("searchVal",val);
                    this.$root.$emit('switchindex','commodity');
                }
                 
            }
        },
        computed:mapState({
            comlist:state => state.templateData.templateDATA
        }),
        components: {
            imageAds,
            classification,
            titles,
            commodity,
            detailsImage,
            window,
            window2
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
        width: 100%;
        float: left;
    }
</style>
