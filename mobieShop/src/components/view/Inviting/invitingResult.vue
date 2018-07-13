<template>
    <div id="invite-result">
        <div class="result-top" ></div>
        <div class="result-explain font" ref="changeText">{{msg}}</div>
        <div class="result-bottom">
            <img class='ImgBox' :src='wxSrc' />
            <p>扫描二维码,前往商城</p>
        </div>
        <div class='backcover' @click.self="closebackcover" v-if='showbackcover'>
            <div class='coupon_cover'>
                <p class='money'><span style='font-size:1.4rem;'>{{coupon.money}}</span>元</p>
                <p class='condition'>单笔订单满{{coupon.condition}}元使用</p>
                <div class='btn' @click="getcoupin"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    data () {
        return {
            bgSrc:require('./invite-result.png'),
            wxSrc:'http://www.itchun.com/api/static/weixin/78.jpg',
            msg:'',
            coupon:{
                id:'347d7ca0-6b04-11e8-b6ac-00163e02c66a',
                money:50,
                condition:300
            },
            showbackcover:true,
            phone:null
        }
    },
    created(){
        let companyId=this.$route.query.companyId;
        let phone=this.$route.query.phone;
        this.phone=phone;
        switch(companyId){
            case '78':{
                this.wxSrc='http://www.itchun.com/api/static/weixin/78.jpg';
                break;
            }
            case '79':{
                this.wxSrc='http://www.itchun.com/api/static/weixin/79.jpg';
                break;
            }
            case '92':{
                this.wxSrc='http://www.itchun.com/api/static/weixin/92.jpg';
                break;
            }
            default:{
                this.wxSrc='http://www.itchun.com/api/static/weixin/78.jpg';
                break;
            }
        }
    },
    mounted(){
        this.changeText();
    },
    methods:{
        changeText(){
            this.msg = this.$router.history.current.query.text
        },
        // 领取优惠券
        getcoupin(){
            let that=this;
            this.$http.post('/api/product/coupon/customer/mall/insert?couponId='+this.coupon.id+'&mobile='+this.phone,{})
            .then(res=>{
                if(res.data.status==200){
                    Toast('领取成功！');
                    that.closebackcover();
                }
                else{
                    Toast(res.data.msg);
                }
            })
            .catch(err=>{
                Toast('领取失败');
                console.log(err);
            })
        },
        // 关闭覆盖层
        closebackcover(){
            this.showbackcover=false;
        }
    }
}
</script>
<style lang="less">
html,body{
    height:100%;
}
</style>
<style lang="less" scoped>
.backcover{
    width:100%;
    height:100%;
    display: flex;
    // justify-content:center;
    // flex-direction:column ;
    position:absolute;
    top:0;
    right:0;
    background: rgba(0, 0, 0, 0.5);
    .coupon_cover{
        width:82%;
        height:4rem;
        background-image:url('/static/images/coup.png');
        background-size:cover;
        position: absolute;
        left:0;
        right:0;
        top:4.5rem;
        margin:auto;
        color:white;
        .money{
            font-size:1rem;
            position: absolute;
            top:.5rem;;
            left: .6rem;;
        }
        .condition{
            font-size:.3rem;
            position: absolute;
            top:2.1rem;;
            left: .6rem;;
        }
        .btn{
            width:1.3rem;
            height:1.3rem;
            position: absolute;
            left:3.6rem;
            top:.9rem;
        }
    }
}
.ImgBox{
        width: 3rem;
    height: 3rem;
    margin: auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 50%;
}
#invite-result{
    .result-top{
        height:5rem;
        background-size:100% 100%;
        background-repeat:no-repeat;
        background-position:center center;
        background-image:url('/static/images/style1-inviteresult.png');
    }
    .result-explain{
        width:5rem;
        font-size:0.35rem;
        margin: 0.8rem auto;
        font-weight: bolder;
        color:#60C5FD;
        letter-spacing:0.01rem;
    }
    .result-bottom{
        div{
            width: 3rem;
            height:3rem;
            margin:auto;
            background-size:100% 100%;
            background-repeat:no-repeat;
            background-position:center center;
        }
        p{
            letter-spacing:0.02rem;
            font-size: 0.3rem;
            margin-top:0.5rem;
            opacity: 0.6;
        }
    }
}
</style>
