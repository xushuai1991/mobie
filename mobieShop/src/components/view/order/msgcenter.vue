<template>
    <div class='Ccontain'>
        <ul class='list-msg' v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" :infinite-scroll-immediate-check='false'>
            <li @click='tolick("activity")'>
                <img class='icon-list' src="static/images/activicon.png" alt="">
                <div class='words'>
                    <p class='title'>活动专区</p>
                    <p class='msg'>{{data1.msg}}</p>
                </div>
                <div class='tip'>
                    <i class='roundtip' v-if='data1.isshow'></i>
                    <i class='icon iconfont icon-arrow-right-copy righticon'></i>  
                </div>
            </li>
            <!-- <li>
                <img class='icon-list' src="static/images/noticeicon.png" alt="">
                <div class='words'>
                    <p class='title'>商品降价通知</p>
                    <p class='msg'>{{data2.msg}}</p>
                </div>
                <div class='tip'>
                    <i class='roundtip' v-if='data2.isshow'></i>
                    <i class='icon iconfont icon-arrow-right-copy righticon'></i>  
                </div>
            </li>
            <li>
                <img class='icon-list' src="static/images/couponicon.png" alt="">
                <div class='words'>
                    <p class='title'>优惠券领取</p>
                    <p class='msg'>{{data3.msg}}</p>
                </div>
                <div class='tip'>
                    <i class='roundtip' v-if='data3.isshow'></i>
                    <i class='icon iconfont icon-arrow-right-copy righticon'></i>  
                </div>
            </li> -->
            <li @click='tolick("service")'>
                <img class='icon-list' src="static/images/serviceicon.png" alt="">
                <div class='words'>
                    <p class='title'>服务报告更新</p>
                    <p class='msg'>{{data4.msg}}</p>
                </div>
                <div class='tip'>
                    <i class='roundtip' v-if='data4.isshow'></i>
                    <i class='icon iconfont icon-arrow-right-copy righticon'></i>  
                </div>
            </li>
            <!-- 消息列表数据 -->
            <li v-for='(item,index) in list' :key='index' class='msglist'>
                <div class='words p'>
                    <p class='title'>{{item.title}}</p>
                    <p class='msg'>{{item.content}}</p>
                </div>
                <p class='other'>
                    <span class='left'>来自：{{item.sendername}}</span>
                    <span class='right'>{{item.date}}</span>
                </p>
            </li>
            <p v-show="!loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
            </p>
            <p v-show='dataover' class="page-over">无新消息</p>
        </ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            loading:false,
            dataover:false,
            pagenum:1,
            list:[],
            data1:{
                isshow:false,
                msg:'有商家推荐的一些活动'
            },
            data2:{
                isshow:false,
                msg:'您关注的商品降价了'
            },
            data3:{
                isshow:false,
                msg:'您有新的优惠券可以领取'
            },
            data4:{
                isshow:false,
                msg:'您有新的服务报告更新信息'
            }
        }
    },
    created(){
        this.getData();
    },
    methods:{
        tolick(type){
            switch(type){
                case 'activity':{
                    this.$router.push('/active');
                    break;
                }
                case 'service':{
                    Toast('该功能正在开发，请耐心等待。。。');
                }
                default:{
                    break;
                }
            }
        },
        // 载入未读的消息列表
        getData(){
            this.loading=true;
            let that=this;
            Indicator.open('数据载入中...');
            this.$http.post('/api/public/message/record/query?pageSize=12&page='+this.pagenum,{isRead:0})
            .then(res=>{
                if(res.data.status==200){
                    let idlist=[];
                    res.data.info.list.forEach(item=>{
                        let json={
                            id:item.id,
                            title:item.title,
                            content:item.content,
                            date:item.createTime,
                            sendername:(item.sender==null||item.sender=='')?'系统':item.sender.adminName
                        }
                        that.list.push(json);
                        idlist.push(item.id);
                    });
                    if(idlist.length!=0){
                        that.changeMsgStatus(idlist);
                    }
                    let length=res.data.info.list.length;
                    if(length>=0&length<12){
                        that.dataover=true;
                        that.loading=true;
                    }
                    else{
                        that.pagenum+=1;
                        that.loading=false;
                    }
                }
                else{
                    Toast(res.data.msg);
                    that.loading=false;
                }
                Indicator.close();
                console.log(res);
            })
            .catch(err=>{
                Indicator.close();
                console.log(err);
                Toast('消息列表失败');
                that.loading=false;
            })
        },
        // 修改消息状态（变为已读消息）
        changeMsgStatus(idlist){
            let that=this;
            this.$http.post('/api/public/message/record/bulkUpdateIsRead?isRead=1',idlist)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        loadMore(){
            console.log(111);
            // 数据未读取完
            if(!this.dataover){
                this.getData();
            }
        }
    }
}
</script>

<style scoped>
.Ccontain{
    /* margin-top:0.8rem; */
}
.list-msg{
    /* padding:0 .2rem; */
    text-align: left;
}
.list-msg li{
    border-bottom: 1px solid #cdcdcd;
    padding:.4rem .2rem;
    overflow: hidden;
    position: relative;
}
.list-msg .msglist{
    padding-bottom: .2rem;
}
.list-msg .icon-list{
    width:.8rem;
    height: .8rem;
    float: left;
}
.list-msg .words{
    margin-left: .2rem;
    float: left;
}
.list-msg .words .title{
    font-size: .28rem;
    /* font-weight: bold; */
}
.list-msg .words .msg{
    font-size: .25rem;
    color: #787878;
    padding-top: .2rem;
}
.list-msg .p{
    width: 100%;
    float: none;
}
.list-msg .other{
    color: #787878;
    overflow: hidden;
    font-size: .2rem;
    padding:.2rem .2rem 0rem .2rem;
}
.list-msg .other .right{
    float: right;
}
.list-msg .other .left{
    float: left;
}
.list-msg .tip{
    float: right;
}
.list-msg .tip .roundtip{
    width: .2rem;
    height:.2rem;
    right: .7rem;
    top: .2rem;
    border-radius: 50%;
    background-color:#e47524; 
    display: block;
    position: absolute;
} 
.list-msg .tip .righticon{
    font-size: .5rem;
    margin-top: 0.2rem;
    display: block;
    color: #787878;
}

</style>
<style lang='less'>
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
.page-over{
    font-size: .3rem;
    text-align: center;
    padding:.2rem 0;
}
</style>
