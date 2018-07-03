<template>
    <section class='Cactive'>
        <h3 class='tipname'>新品热卖活动</h3>
        <mt-loadmore :bottom-method="loadMore"  :bottom-all-loaded="loading" ref="loadmore" :autoFill='false'>
            <div class='ImbBox'>
                <div v-for='(item,index) in list_activiety' :key='index' class="ImbBoxList" >
                    <div class='imgBox'>
                        <img :src='item.imgurl' alt='图片丢失' />
                    </div>
                    <div class='titleInof'>
                        <p><i class='icon iconfont icon-xiaohuomiao hots'></i><span class='textSpace'>{{item.title}}</span> <a :href='item.activityLink+"&activeId="+item.activeId+"&companyId="+item.companyId'><span class='flortRight'>go <i class="icon iconfont icon-youshuangjiantou ritJtou"></i></span></a> </p>
                        <p style="overflow: hidden;">
                            <!-- <i class="icon iconfont icon-daojishi"></i> -->
                            <span class='flortRight lastDataArrow'></span>
                            <span class='flortRight lastDataRed'>最后 {{ lastData(item.endTime) }}天 </span>
                            <!-- {{item.endTime}} -->
                            <span class='flortRight lastDataBlack'>关注人数 {{item.registeredNumber}}</span></p>
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
                            endTime:item.endTime,
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
        },
        lastData(datas){
            if(datas){
                 var d1 = new Date().getTime();
                var d2 = new Date(datas).getTime();
            //     console.log(d1)
            //     console.log(d2)
            // console.log(parseInt(d2 - d1));//两个时间相差的毫秒数
            // console.log(parseInt(d2 - d1) / 1000);//两个时间相差的秒数
            // console.log(parseInt(d2 - d1) / 6000 );//两个时间相差的分钟数
            // console.log(parseInt(d2 - d1) / 3600000 );//两个时间相差的小时数
                let time = parseInt((d2 - d1)) / 3600000 / 24
                console.log(time)
                let times;
                if(time.toString().split(".")[1] <= 9){
                times = time.toString().split(".")[0]+1
                }else{
                    times = time.toString().split(".")[0]
                }
                return times
            }
        }
    }
}
</script>

<style lang="less" scoped>
.icon-daojishi{color: #0e0e0e;float: right;font-size: 0.35rem;font-weight: 600;margin-left: 0.1rem;}
    .Cactive {
        height:100vh;
        overflow:auto;
        font-size: 0.2rem;
        // margin-top: 0.9rem;
        background: #ebebeb6e;
        .tipname{
            line-height: 0.9rem;
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
           
            margin: 2% 2% 0;
            margin-bottom: .2rem;
            // width: 92%;
            height: 5.4rem;
            .imgBox{ 
                padding: 2% 4% 0 4%;
                height:4rem;
            }
            
            img {
                width: 100%;
                height: 4rem;
                display:block;
            }
        }
    }
    .ImbBoxList{
        box-shadow: 0 0 0.1rem #ccc;
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
         padding: 2% 4% 0 4%;
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
    .lastDataArrow{
        display: inline-block;
        background: #ff0000;
        color: #f7f0f0;
        position: relative;
        height: 0px;
        width: 0px;
        border-top: 0.22rem solid #f92e2e;
        border-right: 0.18rem solid #ffffff;
        border-bottom: 0.22rem solid #f92e2e;
    }
    .lastDataRed{
        display: inline-block;
        padding: 0.02rem 0.2rem 0.02rem 0.14rem;
        background: #ff0000;
        color: #f7f0f0;
    }
    .lastDataBlack{
        display: inline-block;
        padding: 0.02rem 0.18rem 0.02rem 0.18rem;
        background: #484848;
        color: #f7f0f0;
    }
</style>