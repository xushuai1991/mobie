
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
          <classification></classification>
        </mt-tab-container-item>  
        <mt-tab-container-item id="购物车">  
          <shopCar></shopCar>
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
import shopCar from '@/components/view/userInfo/shopCar.vue'
export default {  
  name: 'page-tabbar',  
  data() {  
    return {  
      selected: '首页',
      isTrue:true,
      templateUrl:''
    };  
  },
  created(){
     // 浏览状态（PC浏览）：根据'ID'和'商城模板类型'查询首页模板数据  。并将默认首页设置消失  isTrue = true
    let isBrowse;
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
       isBrowse = false;
    }else{
       isBrowse = true;
    }
    if(isBrowse){
      //alert('现在浏览状态')
      this.isTrue = true;
      let that=this;
      let id;
        //从后台取要浏览的ID
        this.$http.post('/api/product/mall/template/getString'
        ).then(function(response){
          //console.log(response)
          id = response.data.msg
          that.$http.post('/api/product/mall/template/queryMap',
            {
                'templateID':id,
                'templateType':1
            }
        )
        .then(function(response){
          //console.log(response)
          // if(response.data.info == "尚未登录"){
          //   that.$router.push({ path: '/login' })
          // }
          let comlists = JSON.parse(response.data.info[0].comlist)
        // console.log(comlists)
          that.$store.commit('getTemplateData',comlists)//对应组件的标识
        })
        .catch(function(response){
          console.log(response)
        })
      }).catch(function(response){
        console.log(response)
      });
    }else{
      // 非浏览状态(手机状态)：根据'启用中'和'商城模板类型'字段，查询首页模板数据。 启用中：查询启用中那一项 isTrue = true  ,  不启用：设置 isTrue = false
      let that=this;
      this.$http.post('/api/product/mall/template/queryMap',
          {
             'templateType':1,
              'isEnabled':true
          }
      )
      .then(function(response){
       // console.log(response)
        if(response.data.info.length == 0){
          this.isTrue = false
        }else{
           if(response.data.info == "尚未登录"){
            that.$router.push({ path: '/login' })
            }
            let comlists = JSON.parse(response.data.info[0].comlist)
          //  console.log(comlists)
            that.$store.commit('getTemplateData',comlists)//对应组件的标识
        }
      })
      .catch(function(response){
        console.log(response)
      })
    }
  },
  components: {
    userInfo,
    homepage,
    templatePages,
    classification,
    shopCar
  },
};  
</script>  
  
<style> 
 li{
   list-style: none;
 } 
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