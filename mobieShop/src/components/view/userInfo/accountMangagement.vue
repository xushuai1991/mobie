<template>
    <section class='accountMangagement'>
        <div class="portrait">
            <div class="my_portrait">头像
                <div class="check">
                    <div class="check_img"><img src="static/HMMobilePhone/dsit/img/headPortrait2.png" alt=""></div>
                </div>
                <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p>
            </div>
        </div>
        <div class="meaningless"></div>
        <div class="user_name">用户名<p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="true_name">真实姓名<p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="sex">性别<p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="meaningless "></div>
        <div class="contact">
            <div class="my_contact">联系方式
                <div class="check check_num"></div>
                <p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p>
            </div>
        </div>
        <div class="address">地址<p><i class='icon iconfont icon-arrow-right-copy fontSize'></i></p></div>
        <div class="meaningless "></div>
        <div class="account_safety">密码修改</div>
    </section>
</template>
<script>
    
</script>
<style lang="" scoped>
    .accountMangagement{
        text-align:left;
    }
    div p{
     position: absolute;
     right: 14px;
     width:1rem;
     text-align:center;
    }
    .my_portrait{
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    border-bottom: .01rem solid #dcdcdc;
    font-size: .26rem;
    padding-left: .24rem;
    position: relative;
}
.check{
    float: right;
    margin-right: .9rem;
}
.check_img{
    display: inline-block;
    width: 1.11rem;
    height: 1.11rem;
    border-radius: 50%;
}
.check_img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
}
.my_portrait:after{
    content:"";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
}
.user_name,.true_name,.sex,.my_contact,.address,.account_safety{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    border-bottom: .01rem solid #dcdcdc;
    font-size: .26rem;
    padding-left: .24rem;
    position: relative;
}
.user_name p img,.true_name p img,.sex p img,.my_contact p img,.address p img,.account_safety p img{
    display: inline-block;
    width: .15rem;
    height: .26rem;
    position: absolute;
    right: .48rem;
    top: .36rem;
}
.my_portrait p img{
    display: inline-block;
    width: .15rem;
    height: .26rem;
    position: absolute;
    right: .48rem;
    top: .8rem;
}
.meaningless{
    height: .15rem;
    width: 100%;
    background: #EBEBEB;
}
.shade{
     display: none; 
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    z-index:499;
    -moz-opacity: 0.5;
    opacity:.3;
    filter: alpha(opacity=80);
}
.side_menu{
	 display: none; 
    position: fixed;
    top: 50%;
    left:50%;
    margin-left: -3.2rem;
    margin-top: -.8rem;
    width: 6.4rem;
    height: 2rem;
    border-radius:.05rem;
    background-color: white;
    _position:absolute;
    z-index:500;
    font-size:.3rem;
}
.side_menu li{
	width:100%;
	height:1rem;
}
.shot{
	border-bottom:.01rem solid #dcdcdc;	
}
.shot,.choose{
	position:relative;
}
.shot span,.choose span{
	display:inline-block;
	margin:.3rem 0 0 .2rem;
}
</style>