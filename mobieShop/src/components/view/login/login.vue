<template>
    <div class='contain'>
        <mt-header title="登录">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <transition name="move" mode="out-in">
            <div>
                <img class='logo' src="static/images/logo.png" alt="">
            </div>
            
            <div class='form'>
                <mt-field v-validatename='{set:setstate,data:username}' class='input' :state='statename'  placeholder="姓名" type='text' v-model="username"></mt-field>
                <mt-field v-validatephone='{set:setstate,data:phone}' class='input' :state='statephone' placeholder="手机号" type='tel' :attr="{ maxlength: 11 }" v-model="phone"></mt-field>
                <mt-field class='input' :state='statecatcha' placeholder="验证码" type='text' :attr="{ maxlength: 6 }" v-model="captcha">
                    <img src="" height="45px" width="100px">
                </mt-field>
                <mt-button type="primary" size='large' @click.native="login">登录</mt-button>
                <router-link to='' class='quicklogin'>快速登录</router-link>
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
                alert('验证通过！');
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
}
.contain{
    height: 13rem;
    background: url(/static/images/bgimg.png) no-repeat round;
}
.title{
    font-size: 30px;
}
.form{
    width: 5.4rem;
    /* margin: 0 auto; */
    border-radius: .12rem;
    background-color: rgba(255,255,255,.9);
    padding-top: .1rem;
    padding-bottom:1rem;
    
}
.quicklogin{
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
    display: block;
    color:black;
}
</style>
<style>
.form .input .mint-cell-wrapper{
    border: 1px solid;
    margin-bottom:20px; 
    border-radius:10px;
}
</style>

