<template>
    <div id="invite-gift" @click="hideDiag($event)" style="height:100%;">
        <ul class="gift-top personalscores" >
            <li class="top-headerImg" style='padding-top:.5rem;'>
                <div>
                    <img :src="headimg"  alt="">
                </div>
            </li>
            <li class='font-extra'>接受绿城小伙伴的邀请</li>
            <li style='font-size:.4rem'>可以获得20个积分</li>
        </ul>
        <div class="gift-bottom">
            <mt-field label="" placeholder="输入手机号接受邀请" type="tel" v-model="formData.phone"></mt-field>
            <mt-button type="primary" class='button' @click.native="handleClick" style='margin-bottom:0.5rem;'>领取积分</mt-button>
        </div>
        <div class="register-diag" v-show="isShow" @touchmove.prevent>
            <div class="invite-register" id="myPanel">
                <ul class="form-data">
                    <li>
                        <span>验证码</span>
                        <input type="text" v-model="formData.checkCode" name="checkCode" placeholder="请输入验证码">
                        <p :disabled="isClcik" id="resend" ref="message" @click="resendMessage">{{message}}</p>
                    </li>
                    <li>
                        <span>注册密码</span>
                        <input type="password" v-model="formData.password" @blur="checkpsw" name="password" placeholder="字母开头,且只能输入6-12位">
                    </li>
                    <li>
                        <span>确认密码</span>
                        <input type="password" v-model="formData.surePassword" @blur="pswcertain" name="surePassword" placeholder="请确认密码">
                    </li>
                    <li>
                        <mt-button type="primary" class='button' style='padding:0 1rem;' @click="registerOk">确认</mt-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {checkClass} from '../../../assets/javascript/checkClass.js'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import {operatelocalstorage} from '../../../assets/javascript/localstorage_hasdata.js'
export default {
    data () {
        return {
            imgSrc:require('./invite-gift.png'),
            isRight:'',
            message:60,
            paramData:'',
            type:'',
            dataInfo:[
                {id:0,data:'recommendedTeamId',des:'推荐来源渠道（团队）id'},
                {id:1,data:'recommendedCustomerId',des:'推荐来源客户id'},
                {id:2,data:'recommendedAdminId',des:'推荐来源后台用户id'},
                {id:3,data:'recommendedDepartmentId',des:'推荐来源部门id'},
                {id:4,data:'recommendedSourceId',des:'推荐来源种类'},
            ],
            formData:{
                checkCode:'',password:'',
                phone:'',surePassword:''
            },
            phonejson:{
                status:false,
                msg:''
            },
            pswjson:{
                status:false,
                msg:''
            },
            pswcertainjson:{
                status:false,
                msg:''
            },
            isClcik:true,
            isShow:false,
            companyId:null,
            headimg:'/static/images/default-headimg.png'
        }
    },
    created(){
        this.shareUrlFn()
        this.$root.$emit('header','邀请有礼');
        let companyId=sessionStorage.getItem('companyId');
        if(companyId==null){
            companyId=this.$route.query.companyId;
            sessionStorage.setItem('companyId',companyId);
            let timestamp= Date.parse(new Date());
            window.location.href= window.location.href+'&'+timestamp
        } 
        this.companyId=companyId;
        // let userinfo_location=operatelocalstorage('userinfo',null,'get',null);
        // if(userinfo_location!=null){
        //     let data = JSON.parse(userinfo_location);
        //     // this.headimg=data.avatar;
        // }
    },
    methods:{
        shareUrlFn(){
            let data = ''
            this.dataInfo.forEach((e,i) => {
                data = this.getQueryString(e.data)
                if(data != null){
                    this.paramData = data
                    this.type = e.data
                }
            })
            // console.log(this.paramData,this.type)
        },
        handleClick(){  //  点击领取发送短信验证码,验证手机号
            this.checkphone();
            if(!this.phonejson.status){
                Toast(this.phonejson.msg)
                this.cleardata()
                return
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            })
            this.sendMessage()
        },
        sendMessage(){
            let that = this
            this.$http.post('/api/customer/resource/sendSmsCode?mobile='+that.formData.phone+'&type=1'
            ).then(function(response){
                Toast({
                    message:response.data.msg,
                    position:'top'
                })
                if(response.data.status==200){
                    Indicator.close()
                    that.isShow = true
                    that.countTime()
                }
            }).catch(function(response){
                Toast({
                    message: '发送失败',
                    position: 'bottom',
                    duration:'1000'
                })
            })
        },
        countTime(){
            this.message=60;
            let timer1 = setInterval(() => {
                this.message--
                if(this.message == 0){
                    clearInterval(timer1);
                    this.isClick = false
                    this.message ='重新发送';
                }else{
                    this.isClcik = true
                }
                
            }, 1000)
            
        },
        resendMessage(){//  重新发送短信验证码
            this.sendMessage()
        }, 
        registerOk(){
            let that = this
            let data = {
                code:that.formData.checkCode,
                mobile:that.formData.phone,
                password:that.formData.password,
            }
            data[this.type] = this.paramData
            this.$http.post('/api/customer/account/register',
                data
            ).then(function(response){
                Toast(response.data.msg);
                if(response.data.status==200){ 
                    that.$router.push({path:'/InvitingResult?companyId='+that.companyId,query:{text:'恭喜你 ! 已成功领取积分'}})
                }else if(response.data.status==300){
                    if(response.data.msg=='账号已被注册'){
                        that.$router.push({path:'/InvitingResult?companyId='+that.companyId,query:{text:'老朋友,您已是会员,领取失败'}})
                    }
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        // 清空数据
        cleardata(){
            this.formData.password='';
            this.formData.surePassword='';
            this.formData.checkCode='';
            this.phonejson.status=false;
            this.phonejson.msg='';
            this.pswjson.status=false;
            this.pswjson.msg='';
            this.pswcertainjson.status=false;
            this.pswcertainjson.msg='';
        },
        // 手机号验证
        checkphone(){
            let result = checkClass.checkTel(this.formData.phone)
            this.phonejson.status = result.flag
            this.phonejson.msg = result.flag ?'':result.error
        },
        // 密码验证
        checkpsw(){
            let result = checkClass.checkNumAndLetter(this.formData.password);
            if(this.formData.password == ''){
                let flag = false
                this.pswjson.status = result.flag;
                this.pswjson.msg = result.flag ?'':'密码不能为空';
            }else{
                let flag = false
                this.pswjson.status = result.flag;
                this.pswjson.msg = result.flag ?'':result.error;
            }
            if(!this.pswjson.status){
                Toast({
                    message:this.pswjson.msg,
                    duration:1000
                })
                // this.cleardata()
                return
            }
        },
        // 密码确认
        pswcertain(){
            if(this.formData.surePassword == '' && this.formData.password == ''){
                let flag = false
                this.pswcertainjson.status = flag;
                this.pswcertainjson.msg = flag ?'':'密码不能为空';
            }else{
                let flag = this.formData.password == this.formData.surePassword;
                this.pswcertainjson.status = flag;
                this.pswcertainjson.msg = flag ?'':'两次密码不一致';
            }
            if(!this.pswcertainjson.status){
                Toast({
                    message:this.pswcertainjson.msg,
                    duration:1000
                })
                // this.cleardata()
                return
            }
        },
        hideDiag(event){//  隐藏弹出层
            let sp = document.getElementById("myPanel")
            console.log(sp)
            if(sp){
                console.log(sp.contains(event.target))
                if(!sp.contains(event.target)){ //这句是说如果我们点击到了id为myPanel以外的区域
                    this.isShow = false
                }
            }
        },
        getQueryString(name) {  
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');  
            var r = window.location.search.substr(1).match(reg);  
            if (r != null) {  
                return unescape(r[2]);  
            }  
            return null;  
        }
    }
}
</script>
<style lang="less">
html,body{
    height:100%;
    position: relative;
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
    
    .gift-top{
        padding:0 0 0.8rem;
        background-repeat:no-repeat;
        background-size:100% 100%;
        background-position:center center;
        color:#fff;
        letter-spacing:1px;
        background-image:url('/static/images/background_scores.png');
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
    .register-diag{
        position: absolute;
        width:100%;
        height:100%;
        top: 0;
        background: rgba(0,0,0,0.5);
        z-index:5;
        // overflow: hidden;
        .invite-register{
            width:80%;
            top: .5rem;
            left: 0;
            right: 0;
            margin:auto;
            position: fixed;
            background: #fff;
            border-radius:0.2rem;
            .form-data{
                font-size: 0.3rem;
                padding:0.8rem 0.2rem 0.5rem;
                li:nth-child(1),li:nth-child(2),li:nth-child(3){
                    border-bottom:1px solid #eee;
                    padding:0.3rem 0 0.3rem 0.2rem;
                    text-align:left;
                    margin-bottom: 0.5rem;
                    letter-spacing:0.02rem;
                    span{
                        display:inline-block;
                        width:1.3rem;
                        opacity: 0.8;
                    }
                    input{
                        width:70%;
                        margin-left: 0.2rem;
                        opacity:0.8;
                        outline:none;
                    }
                }
                li:nth-child(1){
                    position: relative;
                    p{
                        position: absolute;
                        padding:0.15rem 0.15rem;
                        font-size: 0.3rem;
                        letter-spacing:0.01rem;
                        right:0;
                        top:0.1rem;
                        border:1px solid #aaa;
                        border-radius:0.1rem;
                    }
                }
                li:nth-child(4){
                    font-size: 0.5rem;
                }
            }
        }
    }
}
</style>
