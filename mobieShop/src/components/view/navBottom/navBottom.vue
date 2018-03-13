
<template>  
  <div class="page-tabbar">  
    <div class="page-wrap">  
    <!-- tabcontainer -->  
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
          <div v-if='isTrue'>
            <!-- isTrue true的话 为模板首页 false为默认首页 -->
            <templatePages></templatePages>
          </div>
          <div v-else>
            <homepage></homepage>
          </div>
        </mt-tab-container-item>  
        <mt-tab-container-item id="商品分类">  
          <!-- <classification></classification> -->
        </mt-tab-container-item>  
        <mt-tab-container-item id="购物车">  
          
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
        <p>首页</p>
      </mt-tab-item>  
      <mt-tab-item id="商品分类">  
        <i class='icon iconfont icon-shouye'></i>
        <p>分类</p>
      </mt-tab-item>  
      <mt-tab-item id="购物车">  
        <i class='icon iconfont icon-gouwuche'></i>
        <p>购物车</p>
      </mt-tab-item>  
      <mt-tab-item id="个人中心">  
        <i class='icon iconfont icon-gouwuche'></i>
        <p>我的</p>
      </mt-tab-item>  
    </mt-tabbar>  
    </div>
  </div>  
</template>  
  
<script>  
import userInfo from '@/components/view/userInfo/userInfo.vue'
import homepage from '@/components/view/homepage/homepage.vue'
import templatePages from '@/components/view/template/templatePages.vue'
import classification from '@/components/view/classification/classification.vue'
export default {  
  name: 'page-tabbar',  
  data() {  
    return {  
      selected: '首页',
      isTrue:true 
    };  
  },
  components: {
    userInfo,
    homepage,
    templatePages,
    classification
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
    height: 94vh;  
  }  
  .navBar .mint-tab-item{
    padding:0;
      /* height:0.6rem; */
      /* line-height:0.6rem; */
  }
  .navBar .iconfont{
    font-size: 20px;
  }
  .navBar .mint-tab-item-label{
       line-height:0.6rem;
  }
  .navBar .mint-tab-item-label p{
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: -3px;
  }
  .page-wrap {  
    overflow: auto;  
    height: 100%;  
    padding-bottom: 100px;  
  }  
</style>