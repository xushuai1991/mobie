<template>
    <div id="invite-register">
        <ul class="invite-top">
            <li :style="{backgroundImage: 'url(' + imgSrc + ')' }"></li>
            <li @click="WXScan">微信扫一扫</li>
            <li>邀请好友获5元无门槛优惠券</li>
            <li>邀请码 : <span>025645889</span></li>
            <li @click="inviteRegular">
                <router-link to=''>邀请规则 >></router-link>
            </li>
        </ul>
        <div class="invite-bottom">
            <p class="bottom-title">分享到</p>
            <ul class="invite-bottom-share">
                <li>
                    <div class="imgDiv imgDiv1" @click="shareToWX">
                        <p class="icon iconfont icon-ai-weixin"></p>
                    </div>
                    <p>微信</p> 
                </li>
                <li>
                    <div class="imgDiv imgDiv2" @click="shareToQQ">
                        <p class="icon iconfont icon-iconfonticon6"></p>
                    </div>
                    <p>QQ</p> 
                </li>
                <li>
                    <div class="imgDiv imgDiv3" @click="shareToWXSpace">
                        <p class="icon iconfont icon-friends"></p>
                    </div>
                    <p>朋友圈</p> 
                </li>
                <li>
                    <div class="imgDiv imgDiv4" @click="shareToQQSpace">
                        <p class="icon iconfont icon-qqkongjian"></p>
                    </div>
                    <p>QQ空间</p> 
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default {
    data () {
        return {
            imgSrc:require('../../../../static/images/bgimg.png')
        }
    },
    created(){

    },
    methods:{
        WXScan(){
            console.log("打开微信扫一扫!")
        },
        inviteRegular(){
            console.log("跳转到规则页面了!")
        },
        shareToWX(){ 
            MessageBox.confirm('确定分享到微信吗?').then(action => {
                console.log("分享成功!");
            }).catch(err => {
                console.log("取消分享");
            })
        },
        shareToQQ(){
            MessageBox.confirm('分享到QQ?').then(action => {
                console.log("分享成功!");
            }).catch(err => {
                console.log("取消分享");
            })
        },
        shareToWXSpace(){
            MessageBox.confirm('分享到微信朋友圈?').then(action => {
                console.log("分享成功!");
            }).catch(err => {
                console.log("取消分享");
            })
        },
        shareToQQSpace(){
            MessageBox.confirm('分享到QQ空间?').then(action => {
                console.log("分享成功!");
            }).catch(err => {
                console.log("取消分享");
            })
        },
    }
}
</script>
<style>
html,body{
    height:100%;
}
</style>
<style lang="less" scoped>
#invite-register{
    height:100%;
    background: #409EFF;
    font-size:.24rem;
    padding-top:.5rem;
    letter-spacing: 0.01rem;
}
.invite-top{
    background: #fff;
    margin:.0 0.2rem;
    padding:0.8rem 0 0.6rem;
    border-radius:.08rem;
    li:nth-child(1){
        width:3.3rem;
        height:3.3rem;
        margin: auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    li:nth-child(2){
        width:1.5rem;
        margin: .3rem auto .55rem;
        cursor: pointer;
    }
    li:nth-child(3){
        font-size: .3rem;
    }
    li:nth-child(4){
        font-size: .3rem;
        margin: .45rem 0 .6rem 0;
        span{
            color:#409EFF;
        }
    }
    li:nth-child(5){
        width:1.5rem;
        opacity: 0.5;
        cursor: pointer;
        margin:auto;
    }
}
.invite-bottom{
    margin-top:.6rem;
    padding:0.2rem;
    background: #fff;
    padding-top:.5rem;
    p.bottom-title{
        font-size: .3rem;
        opacity: 0.8;
    }
    p.bottom-title::before{
        display:inline-block;
        content:'';
        width: 2.5rem;
        background:#eee;
        height: 0.04rem;
        vertical-align:40%;
        margin-right:0.5rem;
    }
    p.bottom-title::after{
        display:inline-block;
        content:'';
        width: 2.5rem;
        height: 0.04rem;
        background:#eee;
        vertical-align:40%;
        margin-left:0.5rem;
    }
    .invite-bottom-share{
        padding-top:0.35rem;
        display:flex;
        justify-content: space-around;
        li{
            border-radius:50%;
            .imgDiv{
                width:1rem;
                height:1rem;
                line-height: 1rem;
                border-radius:50%;
                margin:0.3rem auto 0.3rem;
                p{
                    color:#fff;
                    font-size:0.7rem;
                }
            }
            .imgDiv1{
                background:green;
                p{
                    font-size:0.55rem;
                }
            }
            .imgDiv2{
                background:#409EFF;
            }
            .imgDiv3{
                background:#32D561;
            }
            .imgDiv4{
                background:#FCBF01;
            }
            p{
                font-size: 0.25rem;
                opacity: 0.8;
            }
        }
    }
}
</style>
