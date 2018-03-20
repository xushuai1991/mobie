<template>
    <div class="page-navbar" id='templatePage'>
            <keep-alive v-for='(item,index) in comlist' :key='index'>
              <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
            </keep-alive>
            <div class='detailBottom'>
                <ul>
                    <li>
                        <i class='icon iconfont icon-gouwuche'></i>
                        <p>客服</p>
                    </li>
                    <li>
                        <i class='icon iconfont icon-gouwuche'></i>
                        <p>收藏</p>
                    </li>
                    <li>
                        <i class='icon iconfont icon-gouwuche'></i>
                        <p>购物车</p>
                    </li>
                    <li>
                        <p>加入购物车</p>
                    </li>
                    <li>
                        <p>立即购买</p>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    // import { mapState,mapMutations,mapGetters } from 'vuex'
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
                value: '',
                comlist:'',
                detailTemplateUrl:''
            };
        },
        created(){
            //console.log(this.comlist)
            let isBrowse = sessionStorage.getItem ("isBrowse");
            console.log(isBrowse)
            if(isBrowse == true){
                this.eventTemplateUrl = sessionStorage.getItem ("eventTemplateUrl");
                let id = this.getUrlParms("id")
                 console.log(id)
                  let that=this;
                    this.$http.post('/api/product/mall/template/queryMap',
                        {
                            'templateID':id,
                            'templateType':2
                        }
                    )
                    .then(function(response){
                        console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                        console.log(comlists)
                        that.comlist = comlists
                    })
                    .catch(function(response){
                        console.log(response)
                    })
            }else if(isBrowse == null){
                let id = this.getURLparms("id");
                console.log(id)
                //console.log(this.comlist)
              // let templateId = sessionStorage.getItem ("eventTemplateID");
                let that=this;
                this.$http.post('/api/product/mall/template/queryMap',
                    {
                        'templateID':id,
                        'templateType':3
                    }
                )
                .then(function(response){
                    console.log(response)
                    let comlists = JSON.parse(response.data.info[0].comlist)
                     console.log(comlists)
                    that.comlist = comlists
                })
                .catch(function(response){
                    console.log(response)
                })
            }
        },
        methods:{
                //获取地址栏参数，name:参数名称
                getUrlParms(name){
                    let url = this.detailTemplateUrl
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = url.substr(1).match(reg);
                    if(r!=null)
                    return unescape(r[2]);
                    return null;
                },
                getURLparms(name){
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = location.search.substr(1).match(reg);
                    if(r!=null)
                    return unescape(r[2]);
                    return null;
                }
        },
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
        width: 80%;
        float: left;
    }
    .detailBottom{
        font-size:0.20rem;
        position: fixed;
        bottom: 0;
        width:100%;
    }
    .detailBottom li{
        float: left;
        background-color: #dddddd;
        height: 1.1rem;
        line-height:0.8rem;
    }
    .detailBottom p{
        line-height:0;
    }
    .detailBottom li:nth-child(1),.detailBottom li:nth-child(2),.detailBottom li:nth-child(3){
        width:12%;
        border-top:1px solid #ddd;
        background-color:#fff;
    }
    .detailBottom li:nth-child(1)::after,.detailBottom li:nth-child(2)::after{
            display: inline-block;
            content: "";
            height: 0.4rem;
            border-right: 1px solid #dddddd;
            position: relative;
            top: -0.5rem;
            right: -0.42rem;
    }
    .detailBottom li:nth-child(4),.detailBottom li:nth-child(5){
        width:31.199%;
        border:1px solid #6ab4ff;
    }
    .detailBottom li:nth-child(4) p,.detailBottom li:nth-child(5) p{
        line-height:1.2rem;
    }
    .detailBottom li:nth-child(5){
        color: #ffffff;
        font-weight:800;
        font-size:0.3rem;
        background: #6ab4ff;
    }
    .detailBottom li:nth-child(4){
        color: #6ab4ff;
        font-weight:800;
        font-size:0.3rem;
        background: #ffffff;
    }
</style>
