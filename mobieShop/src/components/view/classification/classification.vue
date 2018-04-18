<template >
    <div class="page-navbar" id="classification">
        <div class="page-search">
            <mt-search  v-model="value_search" :show='true'></mt-search>
        </div>
        <div class='nav-bar'>
            <ul class='list'>
                <li class='active' @click='changestatus($event,"classify")'>
                    <span>{{classifyname}}</span>
                    <i class='icon iconfont icon-sanjiaoxing-up'></i>
                </li>
                <li @click='changestatus($event,"price")' class='price'>
                    <span>价格</span>    
                    <i class='icon iconfont icon-jiantouarrow503'></i>
                </li>
                <li @click='changestatus($event,"sale")' class='sale'>
                    <span>销量</span>    
                    <i class='icon iconfont icon-jiantouarrow503'></i>
                </li>
            </ul>
            <div class='showmask' @click='hidemask($event)'>
                <ul class='classify'>
                    <li v-for='(item,index) in classifylist' :key='index' class='classify-li' @click='changeclassify(item)'>{{item.name}}</li>
                </ul>
            </div>
        </div>
        <mt-loadmore :bottom-method="loadMore"  :bottom-all-loaded="loading" ref="loadmore" :autoFill='false'>
            <div class='commoditylist'>
                <div class='commodity' v-for='(item,index) in commoditylist' :key='index' >
                    <a :href="item.url">
                        <img :src="item.imgurl" alt="图片丢失">
                        <p class='name'>{{item.name}}</p>
                        <p class='other'>
                            <span class='price'>￥{{item.price}}</span>
                            <span class='nums'>已卖出{{item.nums}}件</span>
                        </p>
                    </a>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'; 
import { Indicator } from 'mint-ui';
    export default {
        name: 'page-navbar',
        data() {
            return {
                value_search:'',
                classifyname:'全部',
                maxpagenum:0,
                classifyid:null,
                classifylist:[
                    {
                        id:'',
                        name:'全部'
                    }
                ],
                commoditylist:[],
                imglist:[],
                loading:false,
                pagenum:[],
                companyId:''
            };
        },
        created(){
            this.$root.$on('classification',(data)=>{
                // console.log(11);
                this.companyId=data.companyId;
                
                // 首次加载商品分类函数
                if(this.classifylist.length==1){
                    // this.getImgall().then(completed=>{
                    //     if(completed){
                    //         this.getClassify();
                    //     }
                    // });
                    this.getClassify();
                }
            });
            
        },
        methods:{
            changestatus(event,type,data){
               
                let dom=document.querySelector('.nav-bar').querySelector('.active');
                dom.removeAttribute('class');
                event.currentTarget.setAttribute('class','active');
                // 当前点击的选项之前是否已选中
                let iscurrent=dom==event.currentTarget;
                let dom_i=event.currentTarget.querySelector('i');
                let class_before=dom_i.getAttribute('class');
                // 是否从小到大排序
                let isup=class_before=='icon iconfont icon-jiantouarrow503';
                console.log(class_before);
                switch(type){
                    case 'classify':{
                        document.querySelector('.showmask').style.display='block';
                        event.currentTarget.querySelector('i').setAttribute('class','icon iconfont icon-sanjiaoxing-up on');
                        break;
                    }
                    case 'price':{
                        document.querySelector('.showmask').style.display='none';
                        if(iscurrent){
                            if(isup){
                                dom_i.setAttribute('class','icon iconfont icon-jiantouarrow503 on');
                                isup=false;
                            }
                            else{
                                dom_i.setAttribute('class','icon iconfont icon-jiantouarrow503');
                                isup=true;
                            }
                        }
                        this.OrderBy(isup,'price');
                        break;
                    }
                    case 'sale':{
                        document.querySelector('.showmask').style.display='none';
                        if(iscurrent){
                            if(isup){
                                dom_i.setAttribute('class','icon iconfont icon-jiantouarrow503 on');
                                isup=false;
                            }
                            else{
                                dom_i.setAttribute('class','icon iconfont icon-jiantouarrow503');
                                isup=true;
                            }
                        }
                        this.OrderBy(isup,'sale');
                        break;
                    }
                    default:break;
                }
            },
            changeclassify(data){
                document.querySelector('.showmask').style.display='none';
                document.querySelector('.list').querySelector('.icon').setAttribute('class','icon iconfont icon-sanjiaoxing-up');
                this.classifyname=data.name;
                this.classifyid=data.id;
                this.getCommoditylist(1,true);
            },
            hidemask(event){
                let domclassname=event.target.getAttribute('class');
                if(domclassname!='classify-li'&&domclassname!='classify'){
                    document.querySelector('.showmask').style.display='none';
                    document.querySelector('.list').querySelector('.icon').setAttribute('class','icon iconfont icon-sanjiaoxing-up');
                }
            },
            // 从小到大排序价格
            sortupprice(a,b){
                return a.price-b.price;
            },
            // 从大到小排序价格
            sortdownprice(a,b){
                return b.price-a.price;
            },
            // 从小到大排序销量
            sortupsale(a,b){
                return a.nums-b.nums;
            },
            // 从大到小排序销量
            sortdownsale(a,b){
                return b.nums-a.nums;
            },
            // 排序
            OrderBy(isup,type){
                console.log(isup,type);
                Indicator.open('排序中');
                switch(type){
                    case 'price':{
                        this.commoditylist.sort(isup?this.sortupprice:this.sortdownprice);
                        break;
                    }
                    case 'sale':{
                        this.commoditylist.sort(isup?this.sortupsale:this.sortdownsale);
                        break;
                    }
                    default:break;
                }
                setTimeout(() => {
                    Indicator.close();
                }, 500);
               
            },
            // 获取商品分类
            getClassify(){
                let that=this;
                console.log(this.companyId);
                this.$http.post('/api/product/commodity/category/query?pageSize=50',{companyId:this.companyId})
                .then(res=>{
                    if(res.data.status==200){
                        res.data.info.list.forEach((item,index)=>{
                            that.classifylist.push({'id':item.id,'name':item.name});
                        });
                        if(that.classifylist.length>1){
                            that.pagenum=1;
                            that.getCommoditylist(1,true);
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
            getCommoditylist(pagenum,loading){
                // 首次加载当前分类商品数据
                if(loading){
                    Indicator.open();
                }
                let that=this;
                this.$http.post('/api/product/commodity/info/query/mall?pageSize=10&page='+pagenum,
                {
                    isOnSale:true,
                    categoryId:this.classifyid,
                    companyId:this.companyId
                })
                .then(res=>{
                    that.maxpagenum=res.data.info.pages;
                    if(pagenum==1){
                        that.commoditylist=[];
                    }
                    if(res.data.status==200){
                        res.data.info.list.forEach(commodity=>{
                            let json={
                                id:commodity.id,
                                imgurl:commodity.commodityImageList.length==0?'':commodity.commodityImageList[0],
                                name:commodity.name,
                                url:'/detailTemplate?commodityId='+commodity.id,
                                price:commodity.priceRule==1?commodity.originalPrice:commodity.priceRule==2?commodity.discountPrice:commodity.currentPrice,
                                nums:commodity.totalSales
                            };
                            that.commoditylist.push(json);
                        });
                        // that.commoditylist.push(res.data.info.list);
                        let length=res.data.info.list.length;
                        if(length!=0){
                            that.pagenum=length>=10?pagenum+1:pagenum;
                        }
                        else{
                            setTimeout(() => {
                                this.$refs.loadmore.onBottomLoaded();
                                Toast('数据已加载完');
                            }, 1000);
                        }
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
            // getImgall(){
            //     return new Promise((resolve,reject)=>{
            //         let that=this;
            //         this.$http.post('/api/product/commodity/image/queryMap',{})
            //         .then(res=>{
            //             if(res.data.status==200){
            //                 this.imglist=res.data.info;
            //             }
            //             resolve(true);
            //         })
            //         .catch(err=>{
            //             console.log(err);
            //             resolve(true);
            //         });
            //     });
                
            // },
            loadMore(index) {
                this.getCommoditylist(this.pagenum,false);
                setTimeout(() => {
                    this.$refs.loadmore.onBottomLoaded();
                }, 1000);
                // console.log(this.pagenum,this.maxpagenum);
                // if(this.pagenum<this.maxpagenum){
                //     // this.pagenum+=1;
                //     this.getCommoditylist(this.pagenum+1,false);
                //     setTimeout(() => {
                //         this.$refs.loadmore.onBottomLoaded();
                //     }, 1000);
                // }
                // else{
                //     setTimeout(() => {
                //         this.$refs.loadmore.onBottomLoaded();
                //         Toast('数据已加载完');
                //     }, 1000);
                // }
                
                
            }
        }
    };
</script>
<style lang="less">
    #classification{
        .mint-tab-item{
            float:left;
            width:100%;
            // position: fixed;
        }
        .page-search {
            width:100%;
            z-index: 99;
            font-size: 0.2rem;
            position: fixed;
            top:0;
        }
        .mint-searchbar{
            background-color:#fff;
        }
        .mint-searchbar-inner{
            border:1px solid #787878;
            border-radius:15px;
        }
        .mint-search {
            height:auto;
            margin-bottom: 0.2rem;
            font-size: .3rem;
        }
        .mint-searchbar-inner .mintui-search {
            font-size: 0.4rem;
            padding: 0 0.2rem;
            // color:#0dbbb9;
        }
        .mint-searchbar-cancel{
            color:#787878;
        }
        .mint-loadmore-bottom{
            font-size: .3rem;
        }
    }
    
</style>
<style lang='less' scoped>
.nav-bar{
    margin-top:1.1rem;
    font-size:.3rem;
    padding-bottom:.1rem;
    border-bottom:1px solid #e9e9e9;
    box-shadow:0 1px 5px #e9e9e9;
    position: fixed;
    width:100%;
    top:0;
    z-index:99;
    background-color:#fff;
    .list{
        display:flex;
        justify-content: flex-start;
        padding-top:.2rem;
        // border:1px solid;
        color:#787878;
        li{
            display: block;
            width:20%;
            height:fit-content;
            position: relative;
            i{
                position: absolute;
            }
            i.on{
                transform:rotate(180deg);
            }
        }
        li.active{
            color:#0dbbb9;
        }
        li.active::after{
            content:'';
            width:50%;
            height:2px;
            background-color:#0dbbb9;
            display: block;
            margin:0 auto;
            margin-top:.1rem;
        }  
    }
    .showmask{
        width:100%;
        height:100%;
        position: fixed;
        background:transparent;
        background-color:rgba(0, 0, 0, 0.5);
        display: none;
        .classify{
            padding:.2rem 0 .1rem 0;
            background-color:#fff;
            li{
                width:100%;
                text-align:left;
                padding:.1rem .4rem;
                color:#787878;
            }
        }
    }
    
}
.commoditylist{
    min-height:75vh;
    overflow: hidden;
    // display:flex;
    // justify-content: space-between;
    // flex-wrap:wrap ;
    padding:.2rem;
    background-color:#f5f5f5;
    margin-top:1.9rem;
    .commodity{
        width:49%;
        height:min-content;
        background-color:#fff;
        margin-bottom:.1rem;
        margin-left:.07rem;
        float: left;
        img{
            display: block;
            width:100%;
            height:3rem;
            margin:0 auto;
            font-size:.3rem;
        }
        .name{
            font-size:.3rem;
            text-align:left;
            padding:.1rem;
            color:#555;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .other{
            font-size:.3rem;
            overflow: hidden;
            padding:.05rem .1rem .1rem .1rem;
            .price{
                float: left;
                color:red;
            }
            .nums{
                float: right;
            }
        }
        
    }
    // .commodity+.commodity{
    //     margin-left:10px;
    // }
}
</style>
