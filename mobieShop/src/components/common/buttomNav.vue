<template>
    <div class='navBar'>
        <ul class='carBox'>
            <li @click="goPage('/navBottom')">
                <i class='icon iconfont icon-solid-home'></i>
                <p>首页</p>
            </li>
            <li @click="goPage('/classification')">
                <i class='icon iconfont icon-leimupinleifenleileibie2'></i>
                <p>分类</p>
            </li>
            <li @click="goPage('/shopCar')">
                <i class='icon iconfont icon-gouwuche1'></i>
                <p>购物车</p>
            </li>
            <li @click="goPage('/userInfo')">
                <i class='icon iconfont icon-wode'></i>
                <p>我的</p>
            </li>
        </ul>
        
    </div>
</template>
<style scoped>
    .navBar {
        position: fixed;
        bottom: 0;
        width:100%;
        overflow:hidden;
    }
    .navBar ul{
        overflow: hidden;
        border-top:1px solid #ddd;
    }
    .navBar .carBox li i{
        font-size:0.35rem;
        line-height:0.6rem;
        color:#cdcdcd;
    }
    .navBar .carBox li {
        line-height:0.2rem;
        font-size:0.25rem;
        float: left;
        width: 25%;
        height: 0.9rem;
        background: #fff;
    }
    .navBar .carBox li:after{
        content:'';
        position:relative;
        border-right:1px solid #ddd;
        top:-0.4rem;
        right:-1rem;
    }
    .navBar li {
        font-size: 20px;
    }

    .navBar .mint-tab-item-label p {
        font-size: 12px;
        margin-top: -10px;
        margin-bottom: -3px;
        color:#6c6c6c;
    }
</style>
<script>
    export default {
        data() {
            return {
                title: ''
            }
        },
        created() {
            this.$root.$on('header', (title) => {
                this.title = title;
            })
        },
        methods: {
            goback() {
                this.$router.go(-1);
            },
            goPage(id) {
                this.$router.push({
                    path: id
                })
            }
        },
        beforeDestroy: function() {
            this.$root.$off('header');
        }
    }
</script>