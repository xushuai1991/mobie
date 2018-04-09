<template>
    <section class='accountMangagement'>
        <div class="portrait">
            <div class="my_portrait">头像
                <div class="check">
                    <div class="check_img"><img src="static/HMMobilePhone/dsit/img/headPortrait2.png" alt=""></div>
                </div>
            </div>
        </div>
        <div class="meaningless"></div>
        <div class="user_name" @click="handleClick(item)" v-for='(item,index) in userIfo' :key='index'>{{item.name}}<span><i class='icon iconfont icon-arrow-right-copy fontSize'></i></span></div>
        <!--<div class="true_name">真实姓名<span><i class='icon iconfont icon-arrow-right-copy fontSize'></i></span></div>
                    <div class="sex">性别<span><i class='icon iconfont icon-arrow-right-copy fontSize'></i></span></div>
                    <div class="meaningless "></div>
                    <div class="contact">
                        <div class="my_contact">联系方式
                            <div class="check check_num"></div>
                            <span><i class='icon iconfont icon-arrow-right-copy fontSize'></i></span>
                        </div>
                    </div>
                    <div class="address">地址<span><i class='icon iconfont icon-arrow-right-copy fontSize'></i></span></div>
                    <div class="meaningless "></div>
                    <div class="account_safety">密码修改 <span><i class='icon iconfont icon-arrow-right-copy fontSize'></i></span></div>!-->
        <mt-popup v-model="popupVisible" position="right">
            <div class='userInfoBox'>
                <h1>{{userName}}</h1>
                <div>{{listName}}<input type='text' placeholder='请输入'></div>
                <div>{{listName2}}<input type='text' placeholder='请输入'></div>
                <div v-show='isShow'>{{listName2}}<input type='text'></div>
                <div class='isOk'>
                    <input type='button' class='orderOk' value='确认'/>
                    <input type='button' @click='clearBox' value='取消'/>
                </div>
            </div>
        </mt-popup>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                popupVisible: false,
                userName: '',
                listName: '',
                listName2: '',
                isShow: false,
                userIfo: [{
                        name: '昵称',
                        listname1: '用户姓名:',
                        listname2: '用户姓名1:',
                        isShow: false
                    },
                    {
                        name: '真实姓名'
                    },
                    {
                        name: '性别'
                    },
                    {
                        name: '联系方式'
                    },
                    {
                        name: '地址'
                    },
                    {
                        name: '修改密码'
                    },
                ]
            }
        },
        created(){
            this.$root.$emit('header','账号管理');
        },
        methods: {
            handleClick: function(name) {
                this.popupVisible = true;
                this.userName = name.name;
                this.listName = name.listname1;
                this.listName2 = name.listname2;
                this.isShow = name.isShow;
            },
            clearBox(){
                this.popupVisible=false
            }
        },
    }
</script>
<style>
    #app {
        overflow: hidden;
    }
</style>
<style lang="less" scoped>
input[type=button]{
	-webkit-appearance:none;
	outline:none
}
    .userInfoBox {
        text-align: center;
        h1 {
            width: 100%;
            height: 1rem;
            background: #26a2ff;
            color: #fff;
            line-height: 1rem;
            font-size: 0.3rem;
        }
        div {
            height:1rem;
            line-height: 1.32rem;
            width: 80%;
            margin-left: 10%;
            border-bottom: 1px solid #ddd;
            text-align: left;
            font-size: 0.25rem;
        }
        input {
            outline: none;
            padding: 0.1rem;
        }
        .isOk {
            border: none;
            text-align:center;
            margin-top: 0.2rem;
            input {
                padding:0.1rem 0.3rem;
                border:1px solid #ddd;
                :nth-child(1){
                    background:red;
                }
            }
            .orderOk{
               background:#26a2ff; 
               color:#fff;
               border:1px solid #26a2ff;
               margin-right:0.2rem;
            }
        }
    }
    .mint-popup-right {
        overflow: hidden;
        position: absolute;
        width: 80%;
        padding-bottom:0.4rem;
        left: 10%;
        top: -3rem;
        border-radius: 0.4rem;
        font-size: 0.2rem;
    }
    .accountMangagement {
        margin-top: 0.8rem;
        text-align: left;
        div {
            position: relative;
        }
        div span {
            position: absolute;
            right: 0.3rem;
        }
    }
    div p {
        position: absolute;
        right: 14px;
        width: 1rem;
        text-align: center;
    }
    .my_portrait {
        width: 100%;
        height: 1.8rem;
        line-height: 1.8rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .26rem;
        position: relative;
    }
    .check {
        float: right;
        margin-right: .9rem;
    }
    .check_img {
        display: inline-block;
        width: 1.11rem;
        height: 1.11rem;
        border-radius: 50%;
    }
    .check_img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
    }
    .my_portrait:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .my_portrait {
        padding-left: 0.2rem;
    }
    .user_name,
    .true_name,
    .sex,
    .my_contact,
    .address,
    .account_safety {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .26rem;
        padding-left: 0.2rem;
        position: relative;
    }
    .user_name p img,
    .true_name p img,
    .sex p img,
    .my_contact p img,
    .address p img,
    .account_safety p img {
        display: inline-block;
        width: .15rem;
        height: .26rem;
        position: absolute;
        right: .48rem;
        top: .36rem;
    }
    .my_portrait p img {
        display: inline-block;
        width: .15rem;
        height: .26rem;
        position: absolute;
        right: .48rem;
        top: .8rem;
    }
    .meaningless {
        height: .15rem;
        width: 100%;
        background: #EBEBEB;
    }
    .shade {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 499;
        -moz-opacity: 0.5;
        opacity: .3;
        filter: alpha(opacity=80);
    }
    .side_menu {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -3.2rem;
        margin-top: -.8rem;
        width: 6.4rem;
        height: 2rem;
        border-radius: .05rem;
        background-color: white;
        _position: absolute;
        z-index: 500;
        font-size: .3rem;
    }
    .side_menu li {
        width: 100%;
        height: 1rem;
    }
    .shot {
        border-bottom: .01rem solid #dcdcdc;
    }
    .shot,
    .choose {
        position: relative;
    }
    .shot span,
    .choose span {
        display: inline-block;
        margin: .3rem 0 0 .2rem;
    }
</style>