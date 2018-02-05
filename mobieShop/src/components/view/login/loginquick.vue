<template>
    <div class='contain'>
        <mt-header title="快速登录">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <img class='logo' src="static/images/logo.png" alt="">
        <transition name="move" mode="out-in">
            <div class='form'>
                <div class="login_word">LOGIN</div>
                <div class="phone">
                    <!-- <img src="static/images/lock.png" alt=""> -->
                    <input type="tel" placeholder="手机号码">
                </div>
                <div class="verificationcode">
                    <!-- <img src="static/images/lock.png" alt=""> -->
                    <input type="text" placeholder="验证码">
                    <div class='codeimg'></div>
                </div>
                <!-- <router-link to='' class='forgetpsw'>忘记密码</router-link> -->
                <mt-button type="default" class='login-quick'>快速登录</mt-button>
                <router-link to='' class='login-psw'>密码登录</router-link>
                <!-- <mt-cell title="快速登录" to=""  ></mt-cell> -->
            </div>
        </transition>
    </div>
</template>
<style scoped>
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
}
.users,.phone,.verificationcode{
    width: 4.25rem;
    margin: .4rem auto;
    height: 0.75rem;
    position: relative;
}
.phone input,.verificationcode input{
    width: 3.55rem;
    height: 0.75rem;
    border-radius: .1rem;
    border: 0.01rem solid #c4c4c4;
    outline: none;
    padding-left: .7rem;
    font-size:0.24rem;
}
.verificationcode input{
    width: 2rem;
    float: left;
    margin-top: .4rem;
}
.verificationcode .codeimg{
    width: 1.4rem;
    height: 0.6rem;
    margin-top: .47rem;
    margin-left: 0.1rem;
    border: 0.01rem solid #c4c4c4;
    border-radius: 5%;
    float: left;
}
.login-quick{
    width: 4.25rem;
    margin: 0.2rem auto .3rem auto;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .3rem;
    color: #fff;
    border-radius: .8rem;
    background: linear-gradient(to bottom,  #0CBBB9 0%,#4AC6DC 100%);
}
.login-psw{
    font-size: 0.24rem;
    color:#31B1B0;
    display: block;
}
</style>

