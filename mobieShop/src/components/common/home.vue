<template>
    <div class="wrapper">

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
