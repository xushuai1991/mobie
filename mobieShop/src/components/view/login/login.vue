<template>
    <div class='contain'>
        <mt-header title="登录">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <img class='logo' src="static/images/logo.png" alt="">
        <transition name="move" mode="out-in">
            <div class='form'>
                <div class="login_word">LOGIN</div>
                <div class="users">
                    <img src="static/images/user.png" alt="">
                    <input type="text" placeholder="用户名/手机号码">
                </div>
                <div class="lock">
                    <img src="static/images/lock.png" alt="">
                    <input type="password" placeholder="密码">
                </div>
                <router-link to='' class='forgetpsw'>忘记密码</router-link>
                <mt-button type="default" class='btn-login'>登录</mt-button>
                <router-link to='' class='resign'>立即注册</router-link>
                <!-- <mt-cell title="快速登录" to=""  ></mt-cell> -->
            </div>
        </transition>
        <!-- <div class='title'>登 录</div> -->
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            username:'',
            phone:'',
            captcha:'',
            statename:'',
            statephone:'',
            statecatcha:''
        }
    },
    methods:{
        setstate(name,value){
            this[name]=value;
        },
        login(){
            let vaildate=this.statename=='success'&&this.statephone=='success'&&this.statecatcha=='success';
            if(vaildate){
                alert("验证通过！");
            }
        }
    },
    directives:{
        validatename(el,binding) {
            let oInput = el.querySelector('input');
            oInput.onblur = function(value) {
                if(binding.value.data.trim('')!=''){
                    binding.value.set('statename','success');
                }
                else{
                    Toast('姓名不能为空');
                    binding.value.set('statename','error');
                }
            };
        },
        validatephone(el,binding) {
            let oInput = el.querySelector('input');
            oInput.onblur = function(value) {
                let patt=/^1[3|4|5|7|8][0-9]{9}$/g;
                if(patt.test(binding.value.data.trim(''))){
                    binding.value.set('statephone','success');
                }
                else{
                    Toast('请输入正确的号码');
                    binding.value.set('statephone','error');
                }
            };
        }
    }
}
</script>
<style scoped>
.mint-header{
    background-color: black;
}
.logo{
    width: 3em;
    display: block;
    margin: 0 auto .36rem auto;
    padding-top: .5rem;
}
.contain{
    height: 13.4rem;
    background: url(/static/images/bgimg.png) no-repeat round;
}
.title{
    font-size: 30px;
}
.form{
    width: 5.4rem;
    margin: 0 auto;
    border-radius: .12rem;
    background-color: rgba(255,255,255,.9);
    padding-top: .1rem;
    padding-bottom:1rem;
}
.login_word{
    width: 100%;
    font-size: .4rem;
    text-align: center;
    font-weight: bolder;
    margin-bottom: 0;
    color: #666666;
    margin-top: 10%;
    margin-bottom: 20%;
}
.users,.lock{
    width: 4.25rem;
    margin: .4rem auto;
    height: 0.75rem;
    position: relative;
}
.users img{
    width: .28rem;
    position: absolute;
    top: .71rem;
    left: .22rem;
}
.lock img{
    width: .25rem;
    position: absolute;
    top: .65rem;
    left: .18rem;
}
.users input,.lock input{
    width: 3.55rem;
    height: 0.75rem;
    border-radius: .1rem;
    border: 0.01rem solid #c4c4c4;
    outline: none;
    padding-left: .7rem;
    font-size:0.24rem;
}
.forgetpsw{
    font-size: 0.24rem;
    color:#31B1B0;
    margin-top: 0.2rem;
    margin-right: 0.6rem;
    float: right;
}
.quicklogin{
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
    display: block;
    color:black;
}
.btn-login{
    width: 4.25rem;
    margin: 0.5rem auto .75rem auto;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .3rem;
    color: #fff;
    border-radius: .8rem;
    background: linear-gradient(to bottom,  #0CBBB9 0%,#4AC6DC 100%);
}
.resign{
    font-size: 0.24rem;
    color:#31B1B0;
    display: block;
}
</style>
<style>
.form .input .mint-cell-wrapper{
    margin-bottom:20px; 
    border-radius: .1rem;
    border: 0.01rem solid #c4c4c4;
    outline: none;
    padding-left: .7rem;
    font-size:0.24rem;
     background-color: white;
}
.form .mint-cell{
    background-color: rgba(255,255,255,0);
}
.mint-field{
    padding:0 0.5rem;
}
</style>

