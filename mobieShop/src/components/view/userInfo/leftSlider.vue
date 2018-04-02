<template>  
  <ul class="list">  
    <li class="item" v-for="section in sectionList">  
        <mt-cell-swipe  
            :right="[  
                {  
                    content: '删除',  
                    style: { background: '#ff7900', color: '#fff'},  
                    handler: () => deleteSection(section.PartId)  
                }  
            ]">  
           
        </mt-cell-swipe>  
    </li>  
</ul>  
</template>  
  
<script>  
  export default {  
    data(){
        return{
            sectionList:[
                {PartName:1},
                {PartName:1},
                {PartName:1},
                {PartName:1},
                {PartName:1},
                {PartName:1},
                {PartName:1},
                {PartName:1},{PartName:1},
                {PartName:1},
                {PartName:1},

                {PartName:1},
                {PartName:1},
                {PartName:1},
                {PartName:1},
            ]
        }
    } , 
    methods: {  
      deleteSection(evt) {  
        console.log(123);  
      }  
    }  
  };  
</script> 