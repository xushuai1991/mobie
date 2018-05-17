<template>
    <div class="page-navbar" id='activitytemplatePage'>
        <!-- <div class="searchTop clear">
            <div class='code'><i data-v-13ee4bcf="" class="icon iconfont icon-erweima "></i></div>
            <div class="page-search">
                <mt-search autofocus v-model="value"></mt-search>
            </div>
            <div class='notice'><i data-v-13ee4bcf="" class="icon iconfont icon-tongzhi "></i></div>
        </div> -->
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
    import {
        Toast
    } from 'mint-ui'
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
                eventTemplateUrl:'',
                hostName:'',
                port:''
            };
        },
        created(){
            this.hostName = location.hostname;
            this.port = location.port;
            ///////活动模板///////
            //浏览状态 / 手机显示状态
            let isBrowse = sessionStorage.getItem ("isBrowse");
            console.log(isBrowse)
            if(isBrowse == true){
                this.eventTemplateUrl = sessionStorage.getItem ("eventTemplateUrl");
                let companyId = sessionStorage.getItem("companyId");
                let id = this.getUrlParms("id")
                 console.log(id)
                  let that=this;
                    this.$http.post('/api/product/mall/template/queryMap/mall',
                        {
                            'templateID':id,
                            'templateType':2,
                            'companyId': companyId
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
                let id = this.getURLparms("templateId");
                console.log(id)
                let companyId = this.getURLparms("companyId");
                if(companyId == null || companyId == 'null'){
                    companyId = sessionStorage.getItem("companyId");
                }
                let that=this;
                this.$http.post('/api/product/mall/template/queryMap/mall',
                    {
                        'templateID':id,
                        'templateType':2,
                        'companyId': companyId
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
        beforeUpdate(){
            this.share();
        },
        methods:{
                //获取地址栏参数，name:参数名称
                getUrlParms(name){
                    let url = this.eventTemplateUrl
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
    #activitytemplatePage .mint-searchbar-inner .mintui-search {
        color: #fff;
        font-size: 0.4rem;
        padding: 0 0.2rem;
    }
    #activitytemplatePage .mint-searchbar-inner {
        background: rgba(100, 100, 100, 0.2);
    }
    #activitytemplatePage .mint-searchbar {
        background: #fff;
    }
    #activitytemplatePage .mint-searchbar-core {
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
    #activitytemplatePage .code,
    #activitytemplatePage .notice {
        width: 10%;
        float: left;
    }
    #activitytemplatePage .code i,
    #activitytemplatePage .notice i {
        font-size: 0.55rem;
        position: relative;
        top: -0.1rem;
    }
    #activitytemplatePage .mint-search {
        height: 100%;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #activitytemplatePage .page-search {
        width: 80%;
        float: left;
    }
</style>
