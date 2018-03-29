<template>
    
<section class='addressManage'>
    <ul class="addr_manage">
        <li>
        <div class="personal_info">
        <p class="personal_detail">
        <span>姓名</span>手机号
        <p class="position"><b><i class='icon iconfont icon-dingwei fontSize'></i></b><span>这是一个地址</span></p></div>
        <div class="personal_edit"><div>
        <i class="input_model bg_color" data-id='+newData.addressId+'>
        <img src="static/HMMobilePhone/dsit/img/tick.png" alt=""></i>设为默认
        <input type="checkbox" class="check_select" checked data-id='+newData.addressId+' id="sid1"></div>
        <div class="edit_add">
        <p class="edit_p" data-id='+newData.addressId+'>
        <b><i class='icon iconfont icon-edit_icon fontSize'></i></b>
        <span class="address_edit">编辑</span></p>
        <p class="remove_p remove_default" data-id='+newData.addressId+'>
        <b><i class='icon iconfont icon-lajitong fontSize'></i></b>
        <span class="address_remove">删除</span>
        </p></div></div>
        </li>
    </ul>
    <div class="addr_add">
        <p><i class='icon iconfont icon-dizhi fontSize'></i><span class="address_add">添加地址</span></p>
    </div>
</section>
</template>
<script>
export default {
    data(){
        return{}
    },
    created(){
        this.$root.$emit('header','地址管理');
    }
}
</script>

<style lang="" scoped>
.addressManage{
    text-align:left;
}
.address_edit,.address_remove{
    position: relative;
    top: -0.05rem;
}
.fontSize{
    margin-right:0.2rem;
}
.addr_manage{
    width: 100%;
    margin-top: .2rem;
}
.addr_manage li{
    width: 7rem;
    margin: 0 auto;
    height: 2.4rem;
    padding: .3rem 0 0 .15rem;
    font-size: .24rem;
    color: #333;
    background: white;
}
.personal_info{
    border-bottom: .01rem solid #d6d6d6;
}
.position{
    margin: .3rem  0;
    color: #939393;
    width:100%;
    overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.position b{
    display: inline-block;
    width: .2rem;
    height: .24rem;
    padding-right: .15rem;
}
.position b img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.personal_detail span{
    font-size: .26rem;
    padding-right: .3rem;
}
.personal_edit{
    height: .95rem;
    position: relative;
    line-height: .95rem;
    color: #333;
}
.personal_edit div:first-child {
    text-indent: .8rem;
    float: left;
}
.check_select,.input_model{
    width: .45rem;
    height: .45rem;
    border-radius: 50%;
    position: absolute;
    top: .24rem;
    left: .24rem;
    border: .01rem solid #bfbfbf;
}
.check_select{
    opacity: 0;
}
.bg_color{
    background: #31B1B0;
    border: .01rem solid #31B1B0;
}
.input_model img{
    width: .26rem;
    height: .18rem;
    display: block;
    margin: .15rem .1rem ;
}
.edit_add{
    float: right;
}
.edit_add p{
    display: inline-block;
    padding: 0 .1rem;
}
.edit_add p img{
    display: inline-block;
    width: .45rem;
    height: .45rem;
    vertical-align: middle;
    padding: 0 .2rem;
}
.addr_add{
    width: 1.8rem;
    height: .6rem;
    margin: .5rem auto;
}
.addr_add p{
    font-size: .24rem;
    color: #333;
}
.addr_add p img{
    display: inline-block;
    width: .45rem;
    height: .4rem;
    vertical-align: middle;
    padding-right: .2rem;
}
.remove_default{
	pointer-events: none;
    cursor: default;
    opacity: 0.6;
    color:#333;
}
</style>

