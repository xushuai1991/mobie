<template>
    <div class='contain'>
        <mt-header title="消息中心" fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <ul class='list-msg'>
            <li>
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
            <li>
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
            </li>
            <li>
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
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
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
            },
        }
    }
}
</script>

<style scoped>
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
