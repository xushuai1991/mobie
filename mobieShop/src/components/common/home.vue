<template>
    <div class="wrapper">
        <mt-header title="">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>  
<style scoped>
.mint-header{
    background-color: black;
}
</style>
