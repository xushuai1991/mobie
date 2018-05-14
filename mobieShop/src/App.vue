<template>
  <div id="app" :class='{"style-two":styletwo}'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      styletwo:false
    }
  },
  mounted(){
    if(sessionStorage.getItem('companyId')==92){
        this.styletwo=true;
    }
  },
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

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding-top: 0;
}
.style-one{}
.style-two{
  .font,{
    color:#f1c885 !important;
  }
  .font::after{
      background-color:#f1c885 !important;
    }
  .border{
    border-color:#f1c885 !important;
  }
  .button{
    background: -webkit-linear-gradient(90deg,#a77d38,#f1c885) !important;
    border:none !important;
    color: #fff;
  }
  .mint-radio-input:checked + .mint-radio-core,.mint-checkbox-input:checked + .mint-checkbox-core{
    background: #f1c885 !important;
    border-color:#f1c885 !important;
  }
  .is-selected,{
    color:#f1c885 !important;
    border-color:#f1c885 !important;
  }
  .background{
    background-color: #f1c885 !important;
  }
  .navbar_type.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
      border-color:#f1c885;
  }

}
.style-two~.mint-msgbox-wrapper .confirmButton{
  color:#f1c885 !important;
}
</style>
