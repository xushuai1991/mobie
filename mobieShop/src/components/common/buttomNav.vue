<template>
    <div class='navBar'>
        <ul class='carBox'>
            <li @click="goPage('/navBottom')">
                <i class='icon iconfont icon-shouye'></i>
                <p>首页</p>
            </li>
            <li @click="goPage('/classification')">
                <i class='icon iconfont icon-shouye'></i>
                <p>分类</p>
            </li>
            <li @click="goPage('/shopCar')">
                <i class='icon iconfont icon-gouwuche'></i>
                <p>购物车</p>
            </li>
            <li @click="goPage('/userInfo')">
                <i class='icon iconfont icon-gouwuche'></i>
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
    }
    .navBar ul{
        overflow: hidden;
    }
    .navBar .carBox li i{
        font-size:0.4rem;
        line-height:0.6rem;
    }
    .navBar .carBox li {
        line-height:0.4rem;
        font-size:0.3rem;
        float: left;
        width: 25%;
        height: 1rem;
        background: #ddd;
    }
    .navBar li {
        font-size: 20px;
    }

    .navBar .mint-tab-item-label p {
        font-size: 12px;
        margin-top: -10px;
        margin-bottom: -3px;
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