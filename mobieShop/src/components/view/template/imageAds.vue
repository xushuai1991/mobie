<template>
  <div class="page-swipe">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for='(item,index) in imgArr' :key='index'>
                <a :href="item.url" class="bannerLink">
                    <img :src="imageUrl+item.imgSrc" class="bannerImg">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imgArr:'',
                imageUrl:''
            };
        },
        props:['templateData'],
        created() {
           // console.log(this.templateData)
            this.imgArr = this.templateData.ImgArr;
            let hostName = location.hostname;
            let port = location.port;
            this.imageUrl = 'http://' + hostName + ':' + port + '/api/sms';
           // console.log(this.imageUrl)
        }
    };
</script>
<style>
 #templatePage .page-swipe {
        height: 3.56rem;
        margin-top: 0.2rem;
    }
</style>
<style scoped>
 .bannerLink{
     width:100%;
     height: 100%;
     display: inline-block;
 }
 .bannerImg{
      width:100%;
     height: 100%;
 }
</style>
