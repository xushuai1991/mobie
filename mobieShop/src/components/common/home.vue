<template>
    <div class="wrapper" style="z-index:9999;">
        <mt-header fixed  :title="title">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="goback" ></mt-button>
            </router-link>
        </mt-header>
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>  
<script>
export default {
    data(){
        return{
            title:''
        }
    },
    created(){
        this.$root.$on('header',(title)=>{
            this.title=title;
        })
    },
    methods:{
        goback(){
            this.$router.go(-1);
        }
    },
    beforeDestroy:function(){
        this.$root.$off('header');
    }
}
</script>

<style scoped>
.mint-header{
    background-color: black;
}

</style>
<style lang="less">
.mint-header-title{
    font-size: .35rem !important;
}
</style>

