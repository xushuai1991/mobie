<template>
    <div id="invite-regular">
        <div class="regular-title" >
            <h3>邀请规则</h3>
            <div class='topimg'>
            </div>
        </div>
        <ul class="regular-top">
            <li class="top-fir-des">
                <p class="top-title">积分邀请</p>
                <p>会员通过邀请好友注册活动，成功邀请注册一个新会员，每个会员可以获得<span class='font'>5个积分</span>（限额20人）；</p>
            </li>
            <li class="top-sec-process">
                <p class="top-title">参与流程</p>
                <div class=" process-fir">
                    <div class="process bottom-fir-left"><p>进入绿城</p><p>"邀请有礼"</p></div>
                    <div class="bottom-fir-middle">或</div>
                    <div class="process bottom-fir-right"><p>进入绿城</p><p>"邀请有礼链接"</p></div>
                </div>
                <div class="process0 process process-sec">根据页面提示获取您的专属邀请有礼链接</div>
                <div class="process0 process process-thi">分享给您的好友</div>
                <div class="process0 process process-fou">1位好友领取<span class='font'> 5积分</span></div>
                <div class="process0 process process-fif">该好友完成1次订单并<span class='font'>支付订单</span></div>
                <div class="process0 process process-six">您获得推荐奖励 : <span class='font'>5积分</span></div>
            </li>
        </ul>
        <div class="regular-explain" v-if='false'>
            <p>活动说明</p>
            <p class="explain-text">拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理，拿商品经济的视角去解读，顾名思义是某一类志趣相。</p>
            <p class="explain-text">拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理，拿商品经济的视角去解读。</p>
            <p class="explain-text">拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理，拿商品经济的视角去解读，顾名思义是某一类志趣相。</p>
            <p class="explain-text">拿商品经济的视角去解读，顾名思义是某一类志趣相同、取向一致的消费人群，被商家归类梳理，拿商品经济的视角去解读。</p>
        </div>
        <div class="regular-bottom">
            <div class='bottom'></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            bgSrc:require('./invite-regular.png'),
            logoSrc:require('@/assets/logo.png')
        }
    },
    methods:{
        
    }
}
</script>
<style lang="less">
html,body{
    height:100%;
}
</style>
<style scoped lang="less">
#invite-regular{
    width:100%;
    height:100%;
    // padding-top:0.7rem;
    .regular-title{
        padding:0.6rem 1rem 0.8rem;
        text-align:center;
        .topimg{
            background-image:url('/static/images/style1-inviteresult.png');
        }
        h3{
            font-size:0.6rem;
            opacity: 0.6;
            letter-spacing:0.05rem;
            margin-bottom:0.6rem;
        }
        div{
            width: 100%;
            height:4rem;
            background-size:100% 100%;
            background-repeat:no-repeat;
            background-position:center center;
            position: relative;
            p{
                width:30%;
                font-size: 2.5rem;
                color:#fff;
                position: absolute;
                right:0.5rem;
                top: 1.4rem;
                span{
                    font-size: 0.5rem;
                    position: absolute;
                    top:0.3rem;
                }
            }
        }
    }
    .regular-top{
        padding:0 0.4rem 0.2rem 0.7rem;
        li{
            margin-bottom:0.6rem;
            p.top-title{
                font-size:0.5rem;
                text-align:left;
                margin-bottom:0.4rem;
            }
            p.top-title::before{
                display:inline-block;
                content:'';
                width:0.1rem;
                height:0.5rem;
                background: #409EFF;
                border-radius:0.1rem;
                vertical-align:top;
                margin:0 0.3rem 0 -0.4rem ;
            }
        }
        .top-fir-des{
            p:nth-child(n+2){
                width:90%;
                font-size:0.22rem;
                text-align:left;
                line-height:0.4rem;
                letter-spacing:0.01rem;
                span{
                    color:#409EFF;
                }
            }
        }
        .top-sec-process{
            font-size:0.22rem;
            letter-spacing:0.01rem;
            .process0{
                width:80%;
                border:1px solid #aaa;// 测试样式
                margin:auto;
                border-radius:0.1rem;
            }
            .process-fir{
                width:80%;
                margin:auto;
                display:flex;
                opacity: 0.8;
                justify-content: space-between;
                align-items:center;
                .bottom-fir-left,.bottom-fir-right{
                    width:31%;
                    padding:0.15rem 0.15rem;
                    border:1px solid #aaa;
                    border-radius:0.1rem;
                    p:nth-child(1){
                        margin-bottom:0.1rem;
                    }
                }
                .bottom-fir-middle{
                    padding:0.15rem 0.15rem;
                    border-radius:50%;
                    background: #ddd;
                    color:#fff;
                }
            }
            .process-sec,.process-sec,.process-thi,.process-fou,.process-fif,.process-six{
                padding:0.2rem 0;
                margin-top: 0.6rem;
                opacity: 0.8;
                span{
                    color:#409EFF;
                    font-size:0.23rem;
                }
            }
        }
    }
    .regular-explain{
        background: #F6F6F6;
        padding:0.8rem 0.4rem 0.6rem 0.7rem;
        letter-spacing:0.02rem;
        p{
            width:80%;
            margin:auto;
            font-size: 0.22rem;
        }
        p:nth-child(1){
            font-size: 0.6rem;
            color:#646464;
            margin-bottom: 0.8rem;
        }
        p.explain-text{
            text-align:left;
            opacity: 0.8;
            line-height:0.35rem;
            position: relative;
            margin-bottom:0.2rem;
        }
        p.explain-text::before{
            display:inline-block;
            content:'';
            width:0.1rem;
            height:0.03rem;
            background: #aaa;
            position: absolute;
            top:0.15rem;
            left:-0.2rem;
        }
    }
    .regular-bottom{
        // background:#eff;
        width:80%;
        margin:0 auto;
        border-top:1px solid #aaa;
        padding:0.4rem 0 .4rem 0;
        .bottom{
            background-image:url('/static/img/logo.365ceed.png');
        }
        div{
            width: 3rem;
            height: 1rem;
            margin:auto;
            background-size:100% 100%;
            background-position:center center;
            background-repeat:no-repeat;
        }
    }
}
</style>

