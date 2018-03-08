<template>
  <section class='personalscores' style='background-image:url("static/images/background_scores.png")'>
      <header class='userinfo' >
          <div class='info_main'>
              <div class='portrait'><img :src="portrait_img" alt=""></div>
              <div class='name_about'>
                  <p class='name'>{{name}}</p>
                  <p class='exp'>经验值 {{experience}}</p>
              </div>
          </div>
          <div class='info_other'>
              <div class='scores'>
                  <p class='title'>积分</p>
                  <p class='content'>{{scores}}</p>
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
                <mt-tab-item id="等级规划">等级规划</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="type">
                <mt-tab-container-item id="积分记录">
                    <mt-navbar v-model="type_score" class='navbar_select'>
                        <mt-tab-item id="全部">全部</mt-tab-item>
                        <mt-tab-item id="获取">获取</mt-tab-item>
                        <mt-tab-item id="使用">使用</mt-tab-item>
                    </mt-navbar>
                    <mt-tab-container v-model="type_score" class='scorelist'>
                        <mt-tab-container-item id="全部">
                            <ul class='score_all_list' 
                                v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="loading"
                                infinite-scroll-distance="10">
                                <li v-for='(item,index) in list_score' :key='index'>
                                    <p class='tips' v-if='item.tip_show'>{{item.name?item.name:''}}</p>
                                    <div class='left' v-if='!item.tip_show'>
                                        <p>{{item.from}}</p>
                                        <p>{{item.date}}</p>
                                    </div>
                                    <div class='right' v-if='!item.tip_show'>
                                        <span>{{item.type=='add'?'+':'-'}}{{item.num}}</span>
                                    </div>
                                </li>
                            </ul>
                            <p v-show="loading" class="page-infinite-loading">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                加载中...
                            </p>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="获取">
                            <ul class='score_get_list' 
                                v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="loading"
                                infinite-scroll-distance="10">
                                <li v-for='(item,index) in list_score' :key='index'>
                                    <p class='tips' v-if='item.tip_show'>{{item.name?item.name:''}}</p>
                                    <div class='left' v-if='!item.tip_show'>
                                        <p>{{item.from}}</p>
                                        <p>{{item.date}}</p>
                                    </div>
                                    <div class='right' v-if='!item.tip_show'>
                                        <span>{{item.type=='add'?'+':'-'}}{{item.num}}</span>
                                    </div>
                                </li>
                            </ul>
                            <p v-show="loading" class="page-infinite-loading">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                加载中...
                            </p>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="使用">
                            <ul class='score_all_list' 
                                v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="loading"
                                infinite-scroll-distance="10">
                                <li v-for='(item,index) in list_score' :key='index'>
                                    <p class='tips' v-if='item.tip_show'>{{item.name?item.name:''}}</p>
                                    <div class='left' v-if='!item.tip_show'>
                                        <p>{{item.from}}</p>
                                        <p>{{item.date}}</p>
                                    </div>
                                    <div class='right' v-if='!item.tip_show'>
                                        <span>{{item.type=='add'?'+':'-'}}{{item.num}}</span>
                                    </div>
                                </li>
                            </ul>
                            <p v-show="loading" class="page-infinite-loading">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                加载中...
                            </p>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </mt-tab-container-item>
                <mt-tab-container-item id="等级规划" class='level_tabcontainer'>
                    <div class='container' style='margin-top:-.1rem;'>
                        <header>
                            <i class='icon iconfont icon-wenjian'></i>
                            <span class='title'>会员等级介绍</span>
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
                    <div class='container'>
                        <header>
                            <i class='icon iconfont icon-shijian'></i>
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
                    <div class='container' style='margin-top:-.1rem;'>
                        <header>
                            <i class='icon iconfont icon-wenjian1'></i>
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
                    <div class='container' style='margin-top:-.1rem;'>
                        <header>
                            <i class='icon iconfont icon-rili'></i>
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
                                        <td>{{item.name}}</td>
                                        <td>{{item.exp}}</td>
                                        <td>{{item.score}}</td>
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
export default {
    data(){
        return{
            portrait_img:'',
            name:'名字',
            experience:'300',
            scores:'300',
            level_name:'钻石会员',
            loading:false,
            type:'积分记录',
            type_score:'全部',
            list_score:[
                {
                    from:'',
                    date:'',
                    type:'',
                    num:'',
                    name:'本月',
                    tip_show:true
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'delete',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                 {
                    from:'',
                    date:'',
                    type:'',
                    num:'',
                    name:'2月',
                    tip_show:true
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                },
                {
                    from:'转发有礼',
                    date:'2018-3-8',
                    type:'add',
                    num:'300',
                    tip_show:false
                }

            ],
            list_vipsocre:[
                {
                    name:'大众会员',
                    exp:'0',
                    score:'0'
                },
                {
                    name:'黄金会员',
                    exp:'500',
                    score:'1000'
                },
                {
                    name:'铂金会员',
                    exp:'2000',
                    score:'30000'
                },
                {
                    name:'钻石会员',
                    exp:'8000',
                    score:'100000'
                },
                {
                    name:'至尊会员',
                    exp:'20000',
                    score:'150000'
                }
            ]
        }
    },
    created(){
        this.$root.$emit('header','积分管理');
    },
    methods:{
        loadMore(){
            this.loading = true;
            console.log(111);
        }
    }
}
</script>

<style scoped>
.personalscores{
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: .8rem;
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
.level_tabcontainer header .title{
    font-size: .3rem;
    margin-left: -.2rem;
    bottom: .05rem;
    position: relative;
}
.level_tabcontainer article{
    padding:.2rem .4rem;
    font-size: .26rem;
}
.level_tabcontainer article p{
    text-align: left;
    line-height: .35rem;
    margin-bottom: .2rem;
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
