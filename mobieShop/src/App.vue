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
  beforeUpdate(){
    if(sessionStorage.getItem('companyId')==92){
        this.styletwo=true;
    }
  },
  watch:{
      '$route'(to,from){
        console.log(to,from);
        // 监听从登录页跳转到商品详情页的返回事件，定向到首页index
        if(to.name=='login'&&from.name=='detailTemplate'){
          this.$router.push('/index');
        }
        // 监听从地址编辑页跳转到地址列表页的返回事件，定向到首页
        if(to.name=='addEdit'&&from.name=='addManagement'&&to.params.flag!='addaddress'){
          this.goName = sessionStorage.getItem("from")
          this.$router.push({
              path: '/' + this.goName,
              name: this.goName
          });
          // this.$router.push('/index');
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
    color:#edc278 !important;
  }
  .font-extra{
    background:linear-gradient(to bottom,#99521f,#6f3f17) !important;
    color: transparent;
    -webkit-background-clip: text !important;
  }
  .font::after{
      background-color:#f1c885 !important;
  }
  .border{
    border-color:#f1c885 !important;
  }
  .button{
    background: -webkit-linear-gradient(90deg,#ecc076,#f1c885) !important;
    border:none !important;
    color: #fff;
  }
  .mint-radio-input:checked + .mint-radio-core,.mint-checkbox-input:checked + .mint-checkbox-core{
    background: #f1c885 !important;
    border-color:#f1c885 !important;
  }
  .is-selected,{
    color:#edc278 !important;
    border-color:#f1c885 !important;
  }
  .background{
    background-color: #ecc076 !important;
  }
  .navbar_type.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
      border-color:#f1c885;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
      color:#edc278 !important;
  }
  // 邀请注册
  #invite-register{
    .background-tip{
      background-image:url("/static/images/back_tip.png") !important;
    }
  }
  
  // 日历
  .wh_container{
    background: #f1c885 !important;
    .wh_content_all{
      background: #f1c885 !important;
    }
    .wh_content_item div .wh_isToday{
        color:#f1c885;
    }
  }
  // 个人中心
  .userinfo{
    .infoBottom{
      background-image:url("/static/images/style2-background_info.jpg") !important;
    }
    .account_info{
      box-shadow: 0.05rem 0.05rem 0.15rem #f1c885 !important;
    }
  }
  // 发票
  .colormore::after{
    background:#f1c885 !important;
  }
  .backgroundextra{
    background-image: -webkit-gradient( linear, 50% 0, 0 100%, from(transparent), //起点的颜色
        color-stop(.7, transparent), //中间某一个点必须达到这个颜色，表示变化过程  .5b表示这个渐变范围长度的总长的50%
        color-stop(.7, #f1c885), //同上
        to(#f1c885)), //结束段的颜色
        //一个背景块的分为两个15X 15  组成。
        -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(.7, transparent), color-stop(.7, #ecc076), to(#f1c885)) !important;
  }
  // 个人积分
  .personalscores{
    background-image:url("/static/images/style2-scores.jpg") !important;
  }
  // 邀请结果
  #invite-result .result-top{
    background-image:url('/static/images/style2-inviteresult.png') !important;
  }
  // 邀请注册
    #invite-register{
        .icon{
          background-image: url("/static/images/style2-icon.png");
        }
    }
  // 邀请规则
  #invite-regular {
    .topimg{
      background-image:url('/static/images/style2-inviteresult.png') !important;
    }
    .regular-top li p.top-title::before{
      background:#edc278 !important;
    }
    .regular-bottom .bottom{
        background-image:url('/static/images/style2-icon.png') !important;
        div{
          width:4rem;
          height:1.3rem;
        }
    }
  }
  

}
.style-two~.mint-msgbox-wrapper .confirmButton{
  color:#edc278 !important;
}
</style>
