<template>
<div>
    <div class="scroBox">
          <div class="classNameContent" v-bind:style="classNameContent" style="overflow:hidden;margin-top: 0.12rem;">
              <ul class='clearfloat classlistUl'>
                  <li class="className" v-for='(item,index) in imgArr' :key="index">
                      <div class="classNameTitle">{{ item.classTitle }}</div>
                      <a :href="item.url" class="bannerLink">
                          <img :src="item.imgSrc !== ''?imageUrl+item.imgSrc:imageUrls+removeDian(item.img)" @load="imageLoaded">
                      </a>
                  </li>
              </ul>
          </div>
       </div>
</div>
</template>
<script>
export default {
        data() {
            return {
                imageUrl:'',
                imgArr:'',
                classNameContent:{
                    width:''
                },
                imageUrls:''
            };
        },
        props:['templateData'],
        created() {
            alert("..")
            //console.log(this.templateData)
            this.imgArr = this.templateData.ImgArr;
            let hostName = location.hostname;
            let port = location.port;
            this.imageUrl = 'http://'+hostName+'/api';
            this.imageUrls = 'http://' + hostName + ':' + port;
           // console.log(this.imageUrl)
            this.$root.$on("searchVal",(val)=>{
                console.log(val)
            })
        },
        methods:{
            imageLoaded(){
                let classNames = document.querySelectorAll('.className');
                let length = this.imgArr.length;
                //console.log(length)
                let classNameWidth =  classNames[0].offsetWidth;
                //console.log(classNameWidth)
                let classNameWidths = classNameWidth + 18
                let allWidth = classNameWidths * length;
               // console.log(allWidth)
                this.classNameContent.width = allWidth/50 + 2 + 'rem';
            },
            removeDian(str){
                //alert(str)
                return str.replace(/(^)\./,'$1')
            }
        }
    };
</script>
<style>
</style>
<style lang="" scoped>
#templatePage .classlistUl li{
    float: left;
    font-size: 0.2rem;
    margin-top: 0.2rem;
    margin-left: 0.31rem;
}
#templatePage .classlistUl li img{
    height: 1.12rem;
}
#templatePage .classNameTitle{
    padding-bottom:0.05rem;
}
.bannerLink{
     width:100%;
     height: 100%;
}
#templatePage .scroBox{
    overflow-x: scroll;
    height: 2rem;
}
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0} 
.clearfloat{zoom:1} 
</style>