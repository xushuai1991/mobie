<template>
    <section class='Cactive'>
        <h3 class='tipname'>新品热卖活动</h3>
        <mt-loadmore :bottom-method="loadMore"  :bottom-all-loaded="loading" ref="loadmore" :autoFill='false'>
            <div class='ImbBox'>
                <div v-for='(item,index) in list_activiety' :key='index'>
                    <div class='imgBox'>
                        <img :src='item.imgurl' alt='图片丢失' />
                    </div>
                    <div class='titleInof'>
                        <p><i class='icon iconfont icon-xiaohuomiao hots'></i><span class='textSpace'>{{item.title}}</span> <a :href='item.activityLink+"&activeId="+item.activeId+"&companyId="+item.companyId'><span class='flortRight'>go <i class="icon iconfont icon-youshuangjiantou ritJtou"></i></span></a> </p>
                        <p>关注人数 {{item.registeredNumber}} <span class='flortRight'>{{item.startTime}}</span></p> 
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <div style="background-color:#fff;font-size:.4rem;padding-top:3rem;" v-if='list_activiety.length==0'>
            <p>暂无数据</p>
        </div>
    </section>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            list_activiety:[],
            loading:false,
            pagenum:1,
            pagesize:0,
            overload:false
        }
    },
    created(){
        // this.$root.$emit('header','活动列表');
        this.hostName = location.hostname;
        this.port = location.port;
        this.getActivitylist();
    },
    methods:{
        getActivitylist(){
            let that=this;
            let companyId = sessionStorage.getItem("companyId");
            this.$http.post('/api/product/activity/find?pageSize=5&pageNo='+this.pagenum,{
                'activityStatus':1,
                "companyId":companyId
            })
            .then(res=>{
                if(res.data.status==200){
                    that.pagesize=res.data.info.pages;
                    if(that.pagenum<that.pagesize){
                        that.pagenum++;
                    }
                    // 数据加载完成
                    else{
                        that.overload=true;
                    }
                    res.data.info.list.forEach(item=>{
                        let json={
                            title:item.activityTitle,
                            imgurl:"http://"+that.hostName+":"+that.port+"/api"+item.image,
                            startTime:item.startTime,
                            activityLink:item.activityLink,
                            registeredNumber:item.registeredNumber,
                            activeId:item.id,
                            companyId:item.companyId
                        };
                        that.list_activiety.push(json);
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
                Toast('数据载入失败，请稍后尝试。');
            })
        },
        loadMore(){
            if(this.overload){
                setTimeout(() => {
                    this.$refs.loadmore.onBottomLoaded();
                    Toast('数据已加载完');
                }, 1000);
            }
            else{
                this.getActivitylist();
                setTimeout(() => {
                    this.$refs.loadmore.onBottomLoaded();
                }, 1000);
            }
            
            
            // console.log(value);
        }
    }
}
</script>

<style lang="less" scoped>
    .Cactive {
        height:100vh;
        overflow:auto;
        font-size: 0.2rem;
        // margin-top: 0.9rem;
        background: #ebebeb6e;
        .tipname{
            line-height: 1rem;
            text-align: left;
            font-size: 0.3rem;
            background-color: #fff;
            padding-left: .3rem;
        }
    }
    .ImbBox {
        // padding: 0.2rem;
        // height:100vh;
        overflow:hidden;
        min-height:75vh;
        >div {
            background: #fff;
            padding: 2% 4% 0 4%;
            margin-bottom: .2rem;
            // width: 92%;
            height: 5rem;
            .imgBox{
                height:4rem;
            }
            
            img {
                width: 100%;
                height: 4rem;
                display:block;
            }
        }
    }
    .hots {
        color: #2aa3f2;
    }
    .textSpace {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:5rem;
        display:inline-block;
        position:relative;
        top:0.1rem;
    }
    .ritJtou {
        font-size: 0.1rem;
        color: #ccc;
    }
    .titleInof {
        text-align: left;
        p {
            line-height: 0.4rem;
            .flortRight {
                float: right;
            }
            &:nth-child(2){
                padding-left:0.3rem;
            }
        }
    }
</style>