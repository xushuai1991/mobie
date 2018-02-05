
<template>  
  <div class="page-tabbar">  
    <div class="page-wrap">  
    <!-- tabcontainer -->  
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
         
        </mt-tab-container-item>  
        <mt-tab-container-item id="商品分类">  
          
        </mt-tab-container-item>  
        <mt-tab-container-item id="消息提醒">  
          
        </mt-tab-container-item>  
        <mt-tab-container-item id="个人中心">  
            <userInfo></userInfo>
        </mt-tab-container-item>  
      </mt-tab-container>  
    </div>  
    <div class='navBar'>
    <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="首页">  
      <i class='icon iconfont icon-shouye'></i>
      </mt-tab-item>  
      <mt-tab-item id="商品分类">  
        商品分类
      </mt-tab-item>  
      <mt-tab-item id="消息提醒">  
       消息提醒
      </mt-tab-item>  
      <mt-tab-item id="个人中心">  
        个人中心
      </mt-tab-item>  
    </mt-tabbar>  
    </div>
  </div>  
</template>  
  
<script>  
import userInfo from '@/components/view/userInfo/userInfo.vue'
export default {  
  name: 'page-tabbar',  
  data() {  
    return {  
      selected: '个人中心'  
    };  
  },
  components: {
    userInfo
  },
};  
</script>  
  
<style>  
  .disblock{
    display: block;
    margin-bottom:0.2rem;
  }
  .page-tabbar {  
    overflow: hidden;  
    height: 100vh;  
  }  
  .navBar .mint-tab-item{
      height:0.6rem;
      line-height:0.6rem;
  }
  .navBar .mint-tab-item-label{
       line-height:0.6rem;
  }
  .page-wrap {  
    overflow: auto;  
    height: 100%;  
    padding-bottom: 100px;  
  }  
</style>