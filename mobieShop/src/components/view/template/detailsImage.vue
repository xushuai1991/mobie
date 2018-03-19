<template>
<div>
    <ul class='clear listUl'>
            <li v-for='(item,index) in imgArr' :key='index'>
                <div class="imgConet" style="font-size: 0;">
                    <a :href="item.url" style="display: inline-block;width: 100%;">
                        <img :src='imageUrl+item.imgSrc' class="windowImg">
                    </a>
                </div>
                 
            </li>
        </ul>
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
        created(){
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
.clear:after {
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
</style>
<style lang="" scoped>
#templatePage .listUl li{
    font-size: 0.25rem;
}
#templatePage .listUl li img{
    width: 100%;
}
#templatePage .windowImg{
    width: 100%;
    height: 100%;
}
</style>