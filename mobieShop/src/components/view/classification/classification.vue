<template>
  <div class="page-navbar">
   <div class="page-search">
    <mt-search autofocus v-model="value" ></mt-search>
  </div>
    <mt-navbar class="page-part float with20" v-model="selected">
      <mt-tab-item id="1">推荐</mt-tab-item>
      <mt-tab-item id="2">家电保养</mt-tab-item>
      <mt-tab-item id="3">家居保养</mt-tab-item>
      <mt-tab-item id="4">空气净化</mt-tab-item>
      <mt-tab-item id="5">净水</mt-tab-item>
    </mt-navbar>

   

    <mt-tab-container v-model="selected" class='float with80'>
      <mt-tab-container-item id="1">
       <div class='imgBox'>
       <div class='imgSize'>
         <img src='./bgs.jpg' />
       </div>
          
          <ul class='ctionUl clearfloat'>
            <li>
                <img src='./sofa.jpg'/>
                <p>商品组件</p>
            </li>
            <li>
                <img src='./sofa.jpg'/>
                <p>商品组件</p>
            </li>
            <li>
                <img src='./sofa.jpg'/>
                <p>商品组件</p>
            </li>
            <li>
                <img src='./sofa.jpg'/>
                <p>商品组件</p>
            </li>
            <li>
                <img src='./sofa.jpg'/>
                <p>商品组件</p>
            </li>
          </ul>
       </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
       
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
       
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'page-navbar',

  data() {
    return {
      selected: '1',
      value: ''
    };
  },
   computed: {
  }
};
</script>
<style lang="">
.page-search{
    font-size:0.2rem;
}
.mint-search{
    height:100%;
    margin-bottom:0.2rem;
}
   .float{
       float:left;
   }
   .with80{
       width:80%;
   }
   .with20{
       width:20%;
   }
   .mint-navbar .mint-tab-item.is-selected{
       width:100%;
   }
   .mint-navbar{
       display:block;
   }
   .mint-navbar .mint-tab-item.is-selected{
       border:none;
       margin-bottom:0;
   }
   .mint-searchbar-inner .mintui-search{
       font-size:0.4rem;
       padding:0 0.2rem;
   }
</style>
<style scoped>
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0} 
.clearfloat{zoom:1} 
.ctionUl{
    padding-left:6%;
}
    .ctionUl li{
        float:left;
        font-size:0.2rem;
        width:30%;
    }
    .ctionUl li img{
        width:100%;
    }
    .imgSize{
        width:90%;
        padding:0 5%;
    }
    .imgSize img{
        width:100%;
    }
</style>