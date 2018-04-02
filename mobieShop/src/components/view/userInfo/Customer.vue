<template>  
  <div class="page-navbar Ccustomer">  
    <!-- navbar -->  
    <mt-navbar class="page-part" v-model="selected">  
      <mt-tab-item id="1">完成订单</mt-tab-item>  
      <mt-tab-item id="2">已关闭订单</mt-tab-item>  
    </mt-navbar>  
  
    
    <!-- tabcontainer -->  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="1">  
            <overOrder></overOrder>
      </mt-tab-container-item>  
      <mt-tab-container-item id="2">  
            <closeOrder></closeOrder>
      </mt-tab-container-item>  
    </mt-tab-container>  
  </div>  
</template>  
  
<script>  
import overOrder from './overOrder.vue';
import closeOrder from './closeOrder.vue'
export default {  
  name: 'page-navbar',  
  
  data() {  
    return {  
      selected: '1'  
    };  
  },
  components:{
      overOrder:overOrder,
      closeOrder:closeOrder
  }
  ,
};  
</script> 
<style lang='less'scoped>
.Ccustomer{
    margin-top:0.8rem;
}
</style>