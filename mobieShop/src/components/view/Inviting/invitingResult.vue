<template>
    <div id="invite-result">
        <div class="result-top" ></div>
        <div class="result-explain font" ref="changeText">{{msg}}</div>
        <div class="result-bottom">
            <img class='ImgBox' :src='wxSrc' />
            <p>扫描二维码,前往商城</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            bgSrc:require('./invite-result.png'),
            wxSrc:'http://sss.itchun.com/api/static/weixin/78.jpg',
            msg:''
        }
    },
    created(){
        let companyId=this.$route.query.companyId;
        switch(companyId){
            case '78':{
                this.wxSrc='http://sss.itchun.com/api/static/weixin/78.jpg';
                break;
            }
            case '79':{
                this.wxSrc='http://sss.itchun.com/api/static/weixin/79.jpg';
                break;
            }
            case '92':{
                this.wxSrc='http://sss.itchun.com/api/static/weixin/92.jpg';
                break;
            }
            default:{
                this.wxSrc='http://sss.itchun.com/api/static/weixin/78.jpg';
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
