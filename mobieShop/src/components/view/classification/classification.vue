<template >
    <div class="page-navbar" id="classification">
        <div class="page-search">
            <mt-search  v-model="value"></mt-search>
        </div>
        <mt-navbar class="page-part float with20" v-model="selected">
            <mt-tab-item v-for='(item,index) in classifylist' :key='index' :id="index" :classifyid='item.id'>{{item.name}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" class='float with80'>
            <mt-tab-container-item v-for='(commodity,index) in commoditylist' :key='index'  :id="index">
                <ul class='ctionUl clearfloat'>
                    <li v-for='(item,index1) in commodity' :key='index1'>
                        <a :href="item.url">
                            <img src='./sofa.jpg' />
                            <p>{{item.name}}</p>
                        </a>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- <buttomNav></buttomNav> -->
    </div>
</template>

<script>
// import buttomNav from '@/components/common/buttomNav.vue'
import { Toast } from 'mint-ui'; 
import { Indicator } from 'mint-ui';
    export default {
        name: 'page-navbar',
        data() {
            return {
                selected: 0,
                value: '',
                classifylist:[],
                commoditylist:[],
                imglist:[]
            };
        },
        computed: {},
        created(){
            this.$root.$on('loadclassify',()=>{
                // 首次加载商品分类函数
                if(this.classifylist.length==0){
                    this.getImgall().then(completed=>{
                        if(completed){
                            this.getClassify();
                        }
                    });
                }

            });
            
        },
        watch:{
            selected(index){
                let dom=document.querySelector('.mint-navbar').querySelectorAll('a')[index];
                // 当前商品分类id
                let classifyid=dom.getAttribute('classifyid');
                // 首次加载当前分类商品
                if(this.commoditylist[index]==undefined){
                    this.getCommoditylist(classifyid,1,index,true);
                }
            }
        },
        methods:{
            // 获取商品分类
            getClassify(){
                let that=this;
                this.$http.post('/api/product/commodity/category/query?pageSize=50',{})
                .then(res=>{
                    if(res.data.status==200){
                        res.data.info.list.forEach((item,index)=>{
                            that.classifylist.push({'id':item.id,'name':item.name});
                        });
                        if(that.classifylist.length>0){
                            that.getCommoditylist(that.classifylist[0].id,1,0,true);
                        }
                    }
                    else{
                        console.log(res.data.msg);
                    }
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                    Toast('数据获取失败');
                });
            },
            // 获取商品列表
            getCommoditylist(classifyid,pagenum,index,loading){
                // 首次加载当前分类商品数据
                if(loading){
                    Indicator.open();
                }
                let that=this;
                this.$http.post('/api/product/commodity/info/query?page='+pagenum,
                {
                    isOnSale:true,
                    categoryId:classifyid
                })
                .then(res=>{
                    console.log(res);
                    if(res.data.status==200){
                        let list=[];
                        res.data.info.list.forEach(commodity=>{
                            let json={
                                id:commodity.id,
                                imgurl:'',
                                name:commodity.name,
                                url:'/commodity?id='+commodity.id
                            };
                            for(item of this.imglist){
                                if(item.commodityId==commodity.id){
                                    json.imgurl=item.url;
                                    break;
                                }
                            }
                            list.push(json);
                        });
                        this.$set(this.commoditylist,index,list);
                        // this.commoditylist[index]=list;
                    }
                    else{
                        console.log(res);
                    }
                    Indicator.close();
                })
                .catch(err=>{
                    Indicator.close();
                    console.log(err);
                });
            },
            // 获取所有商品图片
            getImgall(){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    this.$http.post('/api/product/commodity/image/queryMap',{})
                    .then(res=>{
                        if(res.data.status==200){
                            this.imglist=res.data.info;
                        }
                        resolve(true);
                    })
                    .catch(err=>{
                        console.log(err);
                        resolve(true);
                    });
                });
                
            }
        }
    };
</script>
<style lang="less">
    #classification{
        .mint-tab-item{
            float:left;
            width:100%;
        }
        .page-search {
            font-size: 0.2rem;
        }
        .mint-search {
            height:auto;
            margin-bottom: 0.2rem;
        }
        .mint-navbar{
            display: block;
        }
        .mint-navbar{
            margin-top:0;
        }
        .float {
            float: left;
        }
        .with80 {
            width: 80%;
        }
        .with20 {
            width: 20%;
        }
        .mint-navbar .mint-tab-item.is-selected {
            width: 100%;
        }
        .mint-navbar {
            display: block;
        }
        .mint-navbar .mint-tab-item.is-selected {
            border: none;
            margin-bottom: 0;
        }
        .mint-searchbar-inner .mintui-search {
            font-size: 0.4rem;
            padding: 0 0.2rem;
        }
    }
    
</style>
<style scoped>
    .clearfloat:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }
    .clearfloat {
        zoom: 1
    }
    .ctionUl {
        padding-left: 6%;
    }
    #classification .ctionUl li {
        float: left;
        font-size: 0.2rem;
        width: 30%;
    }
    .ctionUl li img {
        width: 100%;
    }
    .imgSize {
        width: 90%;
        padding: 0 5%;
    }
    .imgSize img {
        width: 100%;
    }

</style>
