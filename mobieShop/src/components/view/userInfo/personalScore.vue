<template>
  <section class='personalscores' style=''>
      <header class='userinfo' >
          <div class='info_main'>
              <div class='portrait'><img :src="userinfo.avatar" alt=""></div>
              <div class='name_about'>
                  <p class='name'>{{userinfo.nickname==null?'&nbsp;':userinfo.nickname}}</p>
                  <p class='exp'>经验值 {{userinfo.experience}}</p>
              </div>
          </div>
          <div class='info_other'>
              <div class='scores'>
                  <p class='title'>积分</p>
                  <p class='content'>{{point}}</p>
              </div>
              <div class='level'>
                  <p class='title'>等级</p>
                  <p class='content'>{{level_name}}</p>
              </div>
          </div>
      </header>
      <div class='content'>
            <mt-navbar v-model="type" class='navbar_type'>
                <mt-tab-item id="积分记录">积分记录</mt-tab-item>
                <mt-tab-item id="积分说明">积分说明</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="type">
                <mt-tab-container-item id="积分记录">
                    <mt-navbar v-model="type_score" class='navbar_select'>
                        <mt-tab-item id="all">全部</mt-tab-item>
                        <mt-tab-item id="get">获取</mt-tab-item>
                        <mt-tab-item id="used">使用</mt-tab-item>
                    </mt-navbar>
                    <mt-tab-container v-model="type_score" class='scorelist'>
                        <mt-tab-container-item id="all">
                            <ul class='score_all_list' 
                                v-infinite-scroll="loadMore1"
                                infinite-scroll-disabled="loading0"
                                infinite-scroll-distance="0"
                                infinite-scroll-immediate-check='false'>
                                <li v-for='(item,index) in list_score[0]' :key='index'>
                                    <!-- <p class='tips' v-if='item.tip_show'>{{item.name?item.name:''}}</p> -->
                                    <div class='left'>
                                        <p>{{item.channel==0?'注册':item.channel==1?'首次填写信息':item.channel==2?'完善个人信息':item.channel==3?'下单':item.channel==4?'绑定微信':item.channel==5?'转发':item.channel==6?'引客购买':item.channel==7?'指定商品购买消费':item.channel==8?'兑换活动':item.channel==9?'兑换优惠券':item.channel==10?'指定营销活动抵扣金额消费':''}}</p>
                                        <p>{{item.createTime.substring(0,10)}}</p>
                                    </div>
                                    <div class='right'>
                                        <span>{{item.status==0?'+':'-'}}{{item.increasedPoints}}{{item.status==1?'(过期)':''}}</span>
                                    </div>
                                </li>
                            </ul>
                            <p class="page-infinite-loading">
                                <mt-spinner type="fading-circle" v-show='!dataovered[0]'></mt-spinner>
                                <span v-show='!dataovered[0]'>加载中...</span>    
                                <span v-show='dataovered[0]'>已全部加载</span>
                            </p>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="get">
                            <ul class='score_get_list' 
                                v-infinite-scroll="loadMore2"
                                infinite-scroll-disabled="loading1"
                                infinite-scroll-distance="0">
                                <li v-for='(item,index) in list_score[1]' :key='index'>
                                    <!-- <p class='tips' v-if='item.tip_show'>{{item.name?item.name:''}}</p> -->
                                    <div class='left'>
                                        <p>{{item.channel==0?'注册':item.channel==1?'首次填写信息':item.channel==2?'完善个人信息':item.channel==3?'下单':item.channel==4?'绑定微信':item.channel==5?'转发':item.channel==6?'引客购买':item.channel==7?'指定商品购买消费':item.channel==8?'兑换活动':item.channel==9?'兑换优惠券':item.channel==10?'指定营销活动抵扣金额消费':''}}</p>
                                        <p>{{item.createTime.substring(0,10)}}</p>
                                    </div>
                                    <div class='right'>
                                        <span>{{item.status==0?'+':'-'}}{{item.increasedPoints}}{{item.status==1?'(过期)':''}}</span>
                                    </div>
                                </li>
                            </ul>
                            <p  class="page-infinite-loading">
                                <mt-spinner type="fading-circle" v-show='!dataovered[1]'></mt-spinner>
                                <span v-show='!dataovered[1]'>加载中...</span>    
                                <span v-show='dataovered[1]'>已全部加载</span>
                            </p>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="used">
                            <ul class='score_all_list' 
                                v-infinite-scroll="loadMore3"
                                infinite-scroll-disabled="loading2"
                                infinite-scroll-distance="0">
                                <li v-for='(item,index) in list_score[2]' :key='index'>
                                    <!-- <p class='tips' v-if='item.tip_show'>{{item.name?item.name:''}}</p> -->
                                    <div class='left'>
                                        <p>{{item.channel==0?'注册':item.channel==1?'首次填写信息':item.channel==2?'完善个人信息':item.channel==3?'下单':item.channel==4?'绑定微信':item.channel==5?'转发':item.channel==6?'引客购买':item.channel==7?'指定商品购买消费':item.channel==8?'兑换活动':item.channel==9?'兑换优惠券':item.channel==10?'指定营销活动抵扣金额消费':''}}</p>
                                        <p>{{item.createTime.substring(0,10)}}</p>
                                    </div>
                                    <div class='right'>
                                        <span>{{item.status==0?'+':'-'}}{{item.increasedPoints}}{{item.status==1?'(过期)':''}}</span>
                                    </div>
                                </li>
                            </ul>
                            <p  class="page-infinite-loading">
                                <mt-spinner type="fading-circle" v-show='!dataovered[2]'></mt-spinner>
                                <span v-show='!dataovered[2]'>加载中...{{dataovered[2]}}</span>    
                                <span v-show='dataovered[2]'>已全部加载</span>
                            </p>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </mt-tab-container-item>
                <mt-tab-container-item id="积分说明" class='level_tabcontainer'>
                    <div class='container' style='margin-top:-.1rem;'>
                        <header>
                            <i class='icon iconfont icon-wenjian font'></i>
                            <span class='title'>积分说明</span>
                        </header>
                        <article>
                            <div class='area'>
                                <p class='title'>一、如何获得积分？</p>
                                <p class='content'>积分：会员通过注册、邀请好友、团购或商城购买均可获得相应积分，并以积分享受不同程度的专属优惠或实物礼品兑换</p>
                            </div>
                            <div class='area'>
                                <p class='title'>二、获得积分规则：</p>
                                <p class='content'>会员注册即可获得20积分；</p>
                                <p class='content'>每邀请一位好友成功注册可获得5积分，邀请50积分为上限；</p>
                                <p class='content'>在商城购买监理服务每消费20元获得1积分，陪签服务每消费10元获得1积分，积分按实际消费取整后金额计算，无封顶；</p>
                            </div>
                            <div class='area'>
                                <p class='title'>三、积分使用注意事项：</p>
                                <p class='content'>（1）不同的账户中的积分不可合并使用；</p>
                                <p class='content'>（2）以积分兑换的代金券或其他凭证，是有使用期限的，您需要在该折价、兑换券或其他凭证所标注的有效期内使用，否则即丧失使用权利，亦无法退换或延续；</p>
                                <p class='content'>（3）如交易款项发生退货，订单金额将不计入积分；</p>
                                <p class='content'>（4）积分是绿城装修管家对用户行为的记录数据，不构成用户资产。</p>
                            </div>
                            <div class='area'>
                                <p class='title'>四、修改及终止：</p>
                                <p class='content'>绿城装修管家保留对本活动细则中条款的解释的权利，并有权根据需要取消本细则或增删、修订（包括但不限于参加资格、积分计算及兑换标准）</p>
                            </div>
                        </article>
                    </div>
                    <div class='container' v-if='false'>
                        <header>
                            <i class='icon iconfont icon-shijian font'></i>
                            <span class='title'>会员有效时间</span>
                        </header>
                        <article>
                            <p>
                                <span class='title'>大众会员：</span>
                                <span class='content'>2017.1.1-2018.1.1</span>
                            </p>
                            <p>
                                <span class='title'>黄金会员：</span>
                                <span class='content'>2017.1.1-2018.1.1</span>
                            </p>
                            <p>
                                <span class='title'>铂金会员：</span>
                                <span class='content'>2017.1.1-2018.1.1</span>
                            </p>
                            <p>
                                <span class='title'>钻石会员：</span>
                                <span class='content'>2017.1.1-2018.1.1</span>
                            </p>
                            <p>
                                <span class='title'>至尊会员：</span>
                                <span class='content'>2017.1.1-2018.1.1</span>
                            </p>
                        </article>
                    </div>
                    <div class='container' v-if='false' style='margin-top:-.1rem;'>
                        <header>
                            <i class='icon iconfont icon-wenjian1 font'></i>
                            <span class='title'>升降级规则</span>
                        </header>
                        <article>
                            <p>
                                <span class='title'>大众会员：</span>
                                <span class='content'>拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理</span>
                            </p>
                            <p>
                                <span class='title'>黄金会员：</span>
                                <span class='content'>拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理</span>
                            </p>
                            <p>
                                <span class='title'>铂金会员：</span>
                                <span class='content'>拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理</span>
                            </p>
                        </article>
                    </div>
                    <div class='container' v-if='false' style='margin-top:-.1rem;'>
                        <header>
                            <i class='icon iconfont icon-rili font'></i>
                            <span class='title'>会员等级对照表</span>
                        </header>
                        <article>
                            <table cellspacing='0' class='vip_table'>
                                <thead>
                                    <tr>
                                        <th>等级</th>
                                        <th>经验对应门槛</th>
                                        <th>积分对应门槛</th>
                                    </tr>
                                </thead>
                                <tbody v-for='(item,index) in list_vipsocre' :key='index'>
                                    <tr>
                                        <td>{{item.levelName}}</td>
                                        <td>{{item.experience}}</td>
                                        <td>{{item.consumptionPoints}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
            
      </div>
  </section>
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import {operatelocalstorage} from '../../../assets/javascript/localstorage_hasdata.js'
export default {
    data(){
        return{
            portrait_img:'',
            name:'名字',
            experience:'300',
            scores:'300',
            level_name:'非会员',
            loading0:true,
            loading1:true,
            loading2:true,
            type:'积分记录',
            type_score:'all',
            list_score:[[],[],[]],
            list_vipsocre:[],
            userinfo:'',
            pagenum:[1,1,1],
            dataovered:[false,false,false],
            point:0
        }
    },
    created(){
        this.$root.$emit('header','积分管理');
        let userinfo=operatelocalstorage('userinfo',null,'get',null);
        this.userinfo=JSON.parse(userinfo);
        this.getVIPs();
        this.getScoreLog(1);
        this.integral();
    },
    watch:{
        type_score(value){
            switch(value){
                case 'all':{
                    this.loading0=this.dataovered[0];
                    this.loading1=true;
                    this.loading2=true;
                    if(this.list_score[0].length==0){
                        this.getScoreLog(1);
                    }
                    break;
                }
                case 'get':{
                    this.loading0=true;
                    this.loading1=this.dataovered[1];
                    this.loading2=true;
                    if(this.list_score[1].length==0){
                        this.getScoreLog(1);
                    }
                    break;
                }
                case 'used':{
                    this.loading0=true;
                    this.loading1=true;
                    this.loading2=this.dataovered[2];
                    if(this.list_score[2].length==0){
                        this.getScoreLog(1);
                    }
                    break;
                }
                default:{
                    break;
                }
            }
        }
    },
    mounted(){
        let that=this;
        // console.log(this.userinfo);
        this.$http.post('/api/customer/customerLevelComputing/query',{
            level:that.userinfo.level
        })
        .then(function(response){
            if(response.data.status==200){
                that.level_name=response.data.info.length==0?'非会员':response.data.info[0].levelName
            }
            else{
                console.log(response);
            }
        })
        .catch(function(response){
            console.log(response);
        });
    },
    methods:{
        // 查询会员总积分
        integral(){
            let that = this;
            this.$http.post(
                '/api/customer/consumption/points/find?pageSize=1',
            ).then(res => { 
                if(res.data.status == 200){
                    console.log(res)
                    that.point = res.data.info.list[0].effectivePoints
                }else{
                    Toast(res.data.msg);
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 查询积分记录
        getScoreLog(pagenum){
            let data={};
            let index=this.type_score=='all'?0:this.type_score=='get'?1:2;
            if(pagenum==1){
                Indicator.open();
            }
            switch(this.type_score){
                case 'all':{
                    data={
                        customerId:this.userinfo.id
                    };
                    break;
                }
                case 'get':{
                    data={
                        customerId:this.userinfo.id,
                        status:0
                    }
                    break;
                }
                case 'used':{
                    data={
                        customerId:this.userinfo.id,
                        status:2
                    }
                    break;
                }
            }
            this.changeStatus(index,true);
            let that=this;
            this.$http.post('/api/customer/consumption/points/find?pageSize=20&pageNo='+pagenum,data)
            .then(res=>{
                if(res.data.status==200){
                    let length=res.data.info.list.length;
                    if(length<20){
                        that.$set(that.dataovered,index,true);
                    }
                    else if(length==20){
                        that.pagenum[index]+=1;
                    }
                    res.data.info.list.forEach(item=>{
                        // that.$set(that.list_score,index,);
                        that.list_score[index].push(item);
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                if(!that.dataovered[index]){
                    that.changeStatus(index,false);
                }
                else{
                    Toast('数据已加载完');
                }
                Indicator.close();
                console.log(res);
            })
            .catch(err=>{
                if(!that.dataovered[index]){
                    that.changeStatus(index,false);
                }
                else{
                    Toast('数据已加载完');
                }
                console.log(err);
                Indicator.close();
                Toast('数据载入出错！');
            })
        },
        // 改变触发状态
        changeStatus(index,flag){
            switch(index){
                case 0:{
                    this.loading0=flag;
                    break;
                }
                case 1:{
                    this.loading1=flag;
                    break;
                }
                case 2:{
                    this.loading2=flag;
                    break;
                }
                default:{
                    break;
                }
            }
        },
        // 载入全部
        loadMore1(){
            console.log(111);
            if(this.dataovered[0]){
                Toast('数据已加载完');
            }
            else{
                this.getScoreLog(this.pagenum[0]);
            }
        },
        // 载入获取积分的记录
        loadMore2(){
            console.log(222);
            if(this.dataovered[1]){
                Toast('数据已加载完');
            }
            else{
                this.getScoreLog(this.pagenum[1]);
            }
        },
        // 载入使用的积分记录
        loadMore3(){
            console.log(33);
            if(this.dataovered[2]){
                Toast('数据已加载完');
            }
            else{
                this.getScoreLog(this.pagenum[2]);
            }
        },
        // 获取会员计算方式
        getVIPs(){
            let that=this;
            this.$http.post('/api/customer/customerLevelComputing/query',{})
            .then(function(response){
                if(response.data.status==200){
                    that.list_vipsocre=response.data.info;
                }
                else{
                    Toast(response.data.msg);
                }
                console.log(response);
            })
            .catch(function(response){
                console.log(response);
                Toast('会员计算方式查询失败');
            })
        }
    },
    // computed:{
    //     ...mapState({
    //         userinfo:function(state){
    //             if(JSON.stringify(state.userinfo.userinfo)=='{}'){
    //                 let data=JSON.parse(sessionStorage.getItem('userinfo'));
    //                 this.$store.commit('login',data)
    //                 return data;
    //             }
    //             else{
    //                 return state.userinfo.userinfo
    //             }
    //         }
    //     })
    // }
}
</script>

<style scoped lang='less'>
.personalscores{
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-image:url("/static/images/background_scores.png");
}
.personalscores .userinfo{
    height: 3.75rem;
}
.personalscores .info_main{
    padding: .4rem .4rem;
    overflow:hidden;
    color:#fff;
}
.personalscores .portrait{
    width: 1.1rem;
    height:1.1rem;
    border-radius: 50%;
    float: left;
    background-color: #C4C4C4;
    img{
        width:100%;
        height:100%;
        border-radius: 50%;
    }
}
.name_about{
    overflow:hidden;
    float: left;
    margin-left: .3rem;
    margin-top: .2rem;
}
.name_about .name{
    width:fit-content;
    line-height: .5rem;
    font-size: .35rem;
}
.name_about .exp{
    width: fit-content;
    line-height: .3rem;
    font-size: .25rem;
    color: #effaff;
} 
.info_other{
    padding: 0 .6rem;
    margin-top: -.15rem;
    overflow: hidden;
    color:#fff;
}
.info_other p{
    width: fit-content;
}
.info_other .title{
    font-size: .25rem;
    line-height: .5rem;
    color: #effaff;
}
.info_other .content{
    font-size: .35rem;
    line-height: .5rem;
}
.info_other .scores{
    width:2.5rem;
    overflow:hidden;
    float: left;
}
.info_other .level{
    overflow:hidden;
    float: left;
}
.navbar_type{
    width:90%;
    border-radius: .1rem;
    box-shadow:0 .05rem 0.1rem #effaff;
    margin:-.7rem auto 0 auto;
}

.navbar_select{
    margin-top: .035rem;
}
.scorelist li{
    padding:0.1rem .4rem;
    font-size: .25rem;
    overflow: hidden;
}
.scorelist li .left{
    overflow: hidden;
    float: left;
    color: #939393;
}
.scorelist li .right{
    float: right;
    padding:.2rem 0;
    font-size: .3rem;
}
.scorelist li p{
    width:fit-content;
    padding: .05rem 0;
}
.scorelist .tips{
    text-align: left;
    font-size: .25rem;
    padding:.1rem 0;
}
.level_tabcontainer .container{
    padding:0 .4rem;
    border-top:.1rem solid #eeeeee;
}
.level_tabcontainer header{
    text-align: left;
}
.level_tabcontainer header .icon{
    font-size: .4rem;
    color:#26a2ff
}
.level_tabcontainer .container:nth-child(4) header .icon{
    font-size: .5rem !important;
}
.level_tabcontainer header .title{
    font-size: .3rem;
    margin-left: -.2rem;
    bottom: .05rem;
    position: relative;
}
.level_tabcontainer article{
    padding:.2rem .4rem 2rem .4rem;
    font-size: .26rem;
}
.level_tabcontainer article .area{
    margin-bottom: .2rem;
}
.level_tabcontainer article p{
    text-align: left;
    line-height: .5rem;
}
.level_tabcontainer article .content{
    color:#939393;
}
.level_tabcontainer .vip_table{
    width:100%;
    border:0;
    border-left: 1px solid #939393;
    border-bottom: 1px solid #939393;
}
.level_tabcontainer .vip_table td,
.level_tabcontainer .vip_table th{
    padding: .2rem 0;
    border-right: 1px solid #939393;
    border-top: 1px solid #939393;
}
.level_tabcontainer .vip_table td{
    color: #939393;
}
</style>
<style>
.navbar_type .mint-tab-item{
    padding-bottom:5px;
}
.navbar_type .mint-tab-item-label{
    width:fit-content;
    margin:0 auto;
    font-size: .3rem !important;
}
.navbar_type.mint-navbar .mint-tab-item.is-selected{
    border:none;
    margin-bottom:0;
}
.navbar_type.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
    padding-bottom:.3rem;
    border-bottom:1px solid #26a2ff;
}
.navbar_select{
    border-bottom:.01rem solid #dcdcdc;
}
.navbar_select .is-selected{
    border-bottom:none !important;
}
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
.navbar_select .mint-tab-item{
    padding-bottom:15px;
} 
</style>
