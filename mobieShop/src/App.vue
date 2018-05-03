<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch:{
      '$route'(to,from){
        // 监听从登录页跳转到商品详情页的返回事件，定向到首页index
        if(to.name=='login'&&from.name=='detailTemplate'){
          this.$router.push('/index');
        }
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding-top: 0;
}
</style>
