<template>
    <div class='contain invoice_xs'>
        <div class='area'>
            <p>纸质发票</p>
        </div>
        <div class='area'>
            <p style='height:.5rem;line-height:.5rem;'>
                <span class='tip'>发票抬头</span>
                <span class='right' @click="popupVisible = true">
                    <span>{{invoicetype==''?'请选择':invoicetype}}</span>
                    <i class='icon iconfont icon-arrow-right-copy' ></i>
                </span>
            </p>
            <mt-popup v-model="popupVisible" position="bottom" class="popup">
                <mt-radio
                title="发票抬头"
                align="right"
                v-model="invoicetype"
                :options="options">
                </mt-radio>
                <button class='close' @click='closepopup'>关闭</button>
            </mt-popup>
        </div>
        <div class='area width_all'>
            <p class='inputs'>
                <label for="name_com">单位名称：</label>
                <input type="text" class='input_1' id='name_com' placeholder="单位名称">
            </p>
            <p class='inputs'>
                <label for="name_com">纳税人识别号：</label>
                <input type="text" class='input_1' id='name_com' placeholder="纳税人识别号" v-model="personalnum">
            </p>
            <p class='inputs'>
                <span class='tip'>发票金额：<span class='warning money'>￥{{money}}</span></span>
            </p>
        </div>
        <div class='area'>
            <p>发票内容</p>
            <p class='detail'>
                明细
            </p>
        </div>
        <div class='area'>
            <button class='submit' @click='submit'>提交</button>
        </div>
    </div>
</template>
<script>
import {checkClass} from '../../../assets/javascript/checkClass.js'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            popupVisible:false,
            invoicetype:'',
            options:['个人发票','单位发票'],
            money:'200',
            personalnum:''
        }
    },
    created:function(){
        this.$root.$emit('header','开票申请');
    },
    methods:{
        closepopup(){
            this.popupVisible=false;
        },
        checkNum(){
            let result=checkClass.checkNumAndLetters(this.personalnum);
            return result.flag;
            this.pswjson.status=result.flag;
            this.pswjson.msg=result.flag?'':result.error;
        },
        submit(){
            if(this.invoicetype==''){
                Toast('请选择发票抬头');
            }
            else if(!this.checkNum()){
                Toast('请输入正确的识别码');
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .contain{
        font-size: .28rem;
        text-align: left;
        background-color: #e9e9e9;
        margin-top:40px;
        .area{
            padding:.4rem .2rem;
            background-color: #fff;
            margin-bottom: .2rem;
            .right{
                position: relative;
                padding-right: .5rem;
                float: right;
            }
            .icon{
                font-size: .5rem;
                position: absolute;
                top:0;
                right:0;
            }
            .popup{
                width:100%;
                .mint-radiolist{
                    margin-bottom: 1.2rem;
                }
                .mint-checklist-title{
                    font-size: .3rem;
                    text-align: center;
                    padding:.4rem;
                }
                
                .close{
                    width:80%;
                    font-size: .32rem;
                    color:#fff;
                    background-color: #26c0c8;
                    border-radius: .5rem;
                    padding: .2rem 0;
                    border:none;
                    outline: none;
                    position: absolute;
                    bottom: .2rem;
                    left: 0;
                    right:0;
                    margin: 0 auto;
                }
                
            }
            .input_1{
                border:1px solid #d9d9d9;
                padding: .1rem .2rem;
                border-radius: .1rem;
            }
            .inputs{
                padding:.3rem .2rem;
                border-bottom: 1px solid #d9d9d9;
                label{
                    width:2rem;
                    display: inline-block;
                }
                .warning{
                    font-size: .4rem;
                    color:#f48f60;
                }
            }
            .inputs:nth-child(1){
                padding-top:0;
            }
            .detail{
                padding-top:.2rem;
                color:#d9d9d9;
            }
            .submit{
                width:80%;
                font-size:.3rem;
                margin: 2rem auto 0 auto;
                display: block;
                padding: .2rem;
                outline: none;
                border:none;
                color: #fff;
                border-radius:1.5rem;;
                background:linear-gradient(180deg,#11bcbc, #46c5d9);
            }
        }
        .width_all{
            padding: .4rem 0 0 0;
        }
    }
</style>
<style lang="less">
.invoice_xs {
    .picker-items{
        margin-bottom: 1rem !important;
    }
    .popup{
        .mint-radiolist-title{
            font-size: .3rem;
            text-align: center;
            color:black;
            padding:.4rem;
        }
        .mint-radio-input:checked + .mint-radio-core{
            background-color:#00a09e;
            border-color:#00a09e;
        }
        
    }
}
</style>
