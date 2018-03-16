<template>
    <div id="invite-gift">
        <ul class="gift-top" :style="{backgroundImage: 'url(' + imgSrc + ')' }">
            <li class="top-headerImg">
                <div>
                    <img src="./invite-gift.png" alt="">
                </div>
            </li>
            <li>接受绿城小伙伴的邀请</li>
            <li>首单立减5元</li>
            <li><span>5</span>元</li>
        </ul>
        <div class="gift-bottom">
            <mt-field label="" placeholder="输入手机号接受邀请" type="tel" v-model="phone"></mt-field>
            <mt-button type="primary">领取优惠券</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            imgSrc:require('./invite-gift.png'),
            phone:''
        }
    },
    methods:{

    }
}
</script>
<style lang="less">
html,body{
    height:100%;
    .gift-bottom{
        .mint-field{
            justify-content: center;
            .mint-cell-wrapper{
                width:80% !important;
                border:1px solid #eee;
                text-align: center;
                .mint-cell-value{
                    input{
                        text-align: center;
                    }
                    input::-webkit-input-placeholder{
                        
                    }
                }
            }
        }
        .mint-button--normal{
            width:80%;
            height:1rem;
            letter-spacing: 1px;
            margin-top:0.6rem;
            .mint-button-text{
                font-weight: bold;
            }
        }
    }
}
</style>
<style lang="less" scoped>
#invite-gift{
    width: 100%;
    .gift-top{
        width: 100%;
        margin-top:0.8rem;
        padding:0.8rem 0 0.8rem;
        background-repeat:no-repeat;
        background-size:100% 100%;
        background-position:center center;
        color:#fff;
        letter-spacing:1px;
        .top-headerImg{
            div{
                width: 2.5rem;
                height:2.5rem;
                border-radius:50%;
                background: #fff;
                margin:auto;
                position: relative;
                img{
                    display:block;
                    width: 2rem;
                    height: 2rem;
                    border-radius:50%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;    
                    right: 0;   
                    margin:auto;
                }
            }
        }
        li:nth-child(2){
            margin:0.6rem 0 0.3rem;
            font-size: 0.4rem;
        }
        li:nth-child(3){
            font-size: 0.5rem;
        }
        li:nth-child(4){
            width:80%;
            font-size: 0.5rem;
            margin:0.6rem auto 0;
            text-align:right;
            span{
                font-size: 2rem;
            }
        }
    }
    .gift-bottom{
        margin-top:0.8rem;
    }
}
</style>
