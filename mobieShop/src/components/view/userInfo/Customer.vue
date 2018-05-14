<template>  
  <div class="page-navbar Ccustomer">  
    <!-- navbar -->  
    <mt-navbar class="page-part" v-model="selected" fixed>  
      <mt-tab-item id="handle">处理中的订单</mt-tab-item>  
      <mt-tab-item id="finished">已完成的订单</mt-tab-item>  
    </mt-navbar>  
  
    
    <!-- tabcontainer -->  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="handle">  
            <handleOrder></handleOrder>
      </mt-tab-container-item>  
      <mt-tab-container-item id="finished">  
            <finishOrder></finishOrder>
      </mt-tab-container-item>  
    </mt-tab-container>  
  </div>  
</template>  
  
<script>  
import handleOrder from './handleOrder.vue';
import finishOrder from './finishOrder.vue';

export default { 
  data() {  
    return {  
      selected: '',
      // hasloaded:[false,false],
      dataover:[false,false],
      pagenums:[1,1],
      orderlist_overed:[],
      orderlist_closed:[]
    };  
  },
  created(){
    this.selected='handle';
    this.$root.$emit('header','售后订单');
    
  },
  watch:{
    selected(value){
      switch(value){
        case 'handle':{
          this.$root.$emit('loadorder_handle');
          // this.hasloaded[0]=true;
          break;
        }
        case 'finished':{
          this.$root.$emit('loadorder_finish');
          break;
        }
        default:{
          break;
        }
      }
      // console.log(value);
      
    }
  },
  methods:{
    
  },
  components:{
      handleOrder,
      finishOrder
  }
  ,
};  
</script> 
<style lang='less'>
.Ccustomer{
  .mint-navbar.is-fixed{
    // top:.8rem;
  }
  .mint-tab-container{
    top: 1rem;
  }
}

</style>

<style lang='less'scoped>
.Ccustomer{
    // margin-top:0.8rem;
}
</style>