<template>
    <div class='contain'>
        <img class='logo' src="static/images/logo.png" alt="">
        <!-- 登录 -->
        <div class='form login' v-show='loginflag'>
            <div class="phone">
                <input type="tel" placeholder="手机号码" v-model="phone" key='phone_login' @change='checkphone()'>
                <p class='error'>{{phonejson.msg}}</p>
            </div>
            <div class="psw">
                <input type="password" placeholder="密码" v-model="psw" @change='checkpsw()'>
                <p class='error'>{{pswjson.msg}}</p>
            </div>
            <div class="verificationcode">
                <input type="text" class='codeinput' placeholder="验证码" v-model="code" @change='checkcode()'>
                <p class='error'>{{codejson.msg}}</p>
                <div id='codeimg' class='codeimg' @click='yzn'>{{codehas}}</div>
            </div>
            <mt-button type="default" class='btn-login' @click="login">登录</mt-button>
            <p class='opera_quick'>
                <router-link to='' class='forgetpsw'>忘记密码？</router-link>
                <router-link to='' class='quicklogin' @click.native='switch_quick'>快速登录</router-link>
            </p>
            <mt-button type="default" class='btn-resign'  @click.native='switch_resign'>注册</mt-button>
        </div>
        <!-- 快速登录 -->
        <div class='form loginquick' v-show='loginquickflag'>
            <div class="phone">
                <input type="tel" placeholder="手机号码" v-model="phone" @change='checkphone()'>
                <p class='error'>{{phonejson.msg}}</p>
            </div>
            <div class="verificationcode">
                <input type="text" class='codeinput' placeholder="验证码" v-model="code">
                <p class='error'></p>
                <router-link to='' style='position:absolute;font-size:.3rem;top:.6rem;right:.2rem;'  @click.native='getcode(2)'>获取验证码</router-link>
            </div>
            <mt-button type="default" class='btn-login' @click="loginquick">登快速录</mt-button>
            <p class='opera_quick'>
                <router-link to='' class='forgetpsw' @click.native='switch_login'>密码登录</router-link>
            </p>
        </div>
        <!-- 注册 -->
        <div class='form login' v-show='resignflag'>
            <div class="phone">
                <input type="tel" placeholder="手机号码" v-model="phone" key='phone_login' @change='checkphone()'>
                <p class='error'>{{phonejson.msg}}</p>
            </div>
            <div class="verificationcode">
                <input type="text" class='codeinput' placeholder="验证码" v-model="code">
                <p class='error'></p>
                <router-link to='' style='position:absolute;font-size:.3rem;top:.6rem;right:.2rem;'  @click.native='getcode(1)'>获取验证码</router-link>
            </div>
            <div class="psw">
                <input type="password" placeholder="密码" v-model="psw" @change='checkpsw()'>
                <p class='error'>{{pswjson.msg}}</p>
            </div>
            <div class="psw">
                <input type="password" placeholder="确认密码" v-model="pswtwice" @change='pswcertain()'>
                <p class='error'>{{pswcertainjson.msg}}</p>
            </div>
            <mt-button type="default" class='btn-login' @click="resign">注册</mt-button>
            <div class='agreement'>
                <mt-checklist
                    v-model="agreement"
                    :options="['用户协议书']">
                </mt-checklist>
            </div>
            <mt-button type="default" class='btn-resign' @click='switch_login'>已有账号，立即登录</mt-button>
        </div>
    </div>
</template>
<script>
import {checkClass} from '../../../assets/javascript/checkClass.js'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            phone:'',
            psw:'',
            pswtwice:'',
            code:'',
            codehas:'',
            agreement:['用户协议书'],
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
            codejson:{
                status:false,
                msg:''
            },
            loginflag:true,
            loginquickflag:false,
            resignflag:false
        }
    },
    mounted(){
        this.yzn();
    },
    methods:{
        // 登录
        login(){
            if(this.phonejson.status&&this.pswjson.status&&this.codejson.status){
                let that=this;
                this.$http({
                    url: '/api/customer/account/login?mobile='+this.phone+'&&password='+this.psw,
                    method: 'POST',
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(res => {
                    console.log(res);
                    var msg = res.data.msg
                    if (msg !== '登录成功') {
                        Toast(res.data.info);
                        this.cleardata();
                    } else {
                        this.$store.commit('login',res.data)
                        setTimeout(() => {
                            Toast({
                                message: '登录成功正在为你跳转请稍后...',
                                iconClass: 'icon icon-success',
                                duration: 500
                            });
                            this.$router.push('/userinfo');
                        }, 1000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else{
                this.checkphone();
                this.checkpsw();
                this.checkcode();
            }
        },
        // 快速登录
        loginquick(){
            if(this.phonejson.status){
                if(this.code==''){
                    Toast('请输入验证码');
                }
                else{
                    let that=this;
                    this.$http.post('/api/customer/account/quickLogin?mobile='+that.phone+'&code='+that.code)
                    .then(function(response){
                        Toast(response.data.msg);
                        if(response.data.status==200){
                            this.cleardata();
                        }
                    })
                    .catch(function(response){
                        Toast('登录失败');
                    });
                }
            }
            else{
                this.checkphone();
            }
        },
        // 注册
        resign(){
            if(this.phonejson.status&&this.pswjson.status&&this.pswcertainjson.status){
                if(this.code==''){
                    Toast('请输入验证码');
                }
                else if(this.agreement.length==0){
                    Toast('请确认服务条款');
                }
                else{
                    let that=this;
                    this.$http.post('/api/customer/account/register',
                        {
                            mobile:that.phone,
                            password:that.psw,
                            code:that.code
                        }
                    )
                    .then(function(response){
                        Toast(response.data.msg);
                        if(response.data.status==200){
                            that.switch_login();
                        }
                    })
                    .catch(function(response){
                        Toast('注册失败');
                    })
                }
            }
            else{
                this.checkphone();
                this.checkpsw();
                this.pswcertain();
            }
        },
        // 获取验证码
        getcode(type){
            if(this.phonejson.status){
                let that=this;
                this.$http.post('/api/customer/resource/sendSmsCode?mobile='+that.phone+'&type='+type)
                .then(function(response){
                    Toast(response.data.msg);
                })
                .catch(function(response){
                    Toast('验证码获取失败');
                });
            }
            else{
                Toast('请输入正确的手机号');
                this.checkphone();
            }
        },
        switch_quick(){
            this.loginflag=false;
            this.loginquickflag=true;
            this.resignflag=false;
            this.cleardata();
        },
        switch_login(){
            this.loginflag=true;
            this.loginquickflag=false;
            this.resignflag=false;
            this.cleardata();            
        },
        switch_resign(){
            this.loginflag=false;
            this.loginquickflag=false;
            this.resignflag=true;
            this.cleardata();    
        },
        // 清空数据
        cleardata(){
            this.phone='';
            this.psw='';
            this.pswtwice='';
            this.code='';
            this.phonejson.status=false;
            this.phonejson.msg='';
            this.pswjson.status=false;
            this.pswjson.msg='';
            this.codejson.status=false;
            this.codejson.msg='';
        },
        // 手机号验证
        checkphone(){
            let result=checkClass.checkTel(this.phone);
            this.phonejson.status=result.flag;
            this.phonejson.msg=result.flag?'':result.error;
        },
        // 密码验证
        checkpsw(){
            let result=checkClass.checkNumAndLetters(this.psw);
            this.pswjson.status=result.flag;
            this.pswjson.msg=result.flag?'':result.error;
        },
        // 验证码验证
        checkcode(){
            this.codejson.status=this.code.toLocaleLowerCase()==this.codehas.toLocaleLowerCase();
            this.codejson.msg=this.codejson.status?'':'验证码错误';
            if(!this.codejson.status){
                this.yzn();
            }
        },
        // 密码确认
        pswcertain(){
            let flag=this.pswtwice==this.psw;
            this.pswcertainjson.status=flag;
            this.pswcertainjson.msg=flag?'':'两次密码不一致';
        },
        getAllLetter() {
            var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
            return letterStr.split(",");
        },
        /**生成一个随机数**/
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        yzn() {
            let letterlist=this.getAllLetter();
            let [num1,num2,num3,num4]=[this.randomNum(0,51),this.randomNum(0,9),this.randomNum(0,51),this.randomNum(0,51)];
            this.codehas=letterlist[num1]+num2+letterlist[num3]+letterlist[num4];
        },
    }
}
</script>
<style scoped>
.contain{
    height: 13.4rem;
    /* background: url(/static/images/bgimg.png) no-repeat round; */
}
.form{
    background-color: rgba(255,255,255,.9);
    padding:1rem; 
    position: relative;
}
.phone,.psw,.verificationcode{
    margin-top: -.3rem;
    position: relative;
}
.phone input,.psw input,.verificationcode input{
    width:100%;
    height: 0.75rem;
    border-bottom: 0.01rem solid #c4c4c4;
    outline: none;
    font-size:0.3rem;
}
.verificationcode input{
    /* width: 2rem; */
    margin-top: .4rem;
}
.verificationcode .codeimg{
    width: 2rem;
    height: 0.6rem;
    line-height: .6rem;
    color: rgb(39, 162, 242);
    font-size: .4rem;
    font-style: italic;
    letter-spacing: .1rem;
    right: .1rem;
    bottom:.8rem;
    position: absolute;
    border: 0.01rem solid rgb(39, 162, 242);
    border-radius:20px;
    float: left;
}
.opera_quick{
    font-size: 0.3rem;
    margin-top: .2rem;
}
.forgetpsw{
    float: right;
}
.quicklogin{
    float: left;
}
.btn-login{
    width: 100%;
    margin: 0rem  auto;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .3rem;
    color: #fff;
    border-radius: 5px;
    background:rgb(39, 162, 242);
}
.btn-resign{
    width:100%;
    height: 1rem;
    background-color: #fff;
    left: 0;
    font-size: 0.3rem;
    position: fixed;
    bottom: 0;
    display: block;
}
.error{
    height: .2rem;
    font-size: .3rem;
    text-align: left;
    padding: .2rem 0;
    color: red;
}
.agreement{
    text-align: right;
    font-size: .3rem;
    line-height: .35rem;
}
.agreement label{
    float: right;
}
.agreement input[type='checkbox']{
    width:.35rem;
    height:.35rem;
    background-color: #fff;
    appearance: none;
    border:1px solid rgb(39, 162, 242);
    margin-right: .2rem;
}
</style>
<style>
.mint-cell{
    display: inline;
}
</style>

