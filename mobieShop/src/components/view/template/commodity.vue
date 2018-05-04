<template>
<div>
    <ul class='clear listUl'>
            <li v-bind:style="commodityBigImg">
                <a :href="templateData.productImgURL1" style="display: inline-block;width: 100%;">
                    <img :src='templateData.productImgSrc1 == "./static/img/window1-1.7c51e07.jpg"?templateData.productImgSrc1:removeDian(templateData.productImgSrc1)' v-bind:style="commodityImg1">
                </a>
            </li>
            <li v-bind:style="commoditySmallImg">
                <a :href="templateData.productImgURL2" style="display: inline-block;width: 100%;">
                    <img :src='templateData.productImgSrc2 == "./static/img/window1-2.8aa779d.jpg"?templateData.productImgSrc2:removeDian(templateData.productImgSrc2)' v-bind:style="commodityImg2">
                </a>
            </li>
            <li v-bind:style="commodityBigsImg">
                <a :href="templateData.productImgURL3" style="display: inline-block;width: 100%;">
                   <img :src='templateData.productImgSrc3 == "./static/img/window1-3.f446519.jpg"?templateData.productImgSrc3:removeDian(templateData.productImgSrc3)' v-bind:style="commodityImg3">
                </a>
            </li>
        </ul>
</div>
</template>
<script>
export default {
        data() {
            return {
                imageUrl:'',
                imageUrls:'',
                commodityBigImg:{
                    width:'',
                    margin:''
                },
                commoditySmallImg:{
                    width:'',
                    margin:''
                },
                commodityBigsImg:{
                    width:'',
                    margin:''
                },
                commodityImg1:{
                    width:''
                },
                commodityImg2:{
                    width:''
                },
                commodityImg3:{
                    width:''
                },
            };
        },
        props:['templateData'],
        created() {
           // console.log(this.templateData)
            if(this.templateData.bigImg == 24){
                this.commodityBigImg.width = '100%'
                this.commodityBigImg.margin == '0% 0% 0% 0%'
                this.commodityImg1.width = '88%'
            }else if(this.templateData.bigImg == 12){
                this.commodityBigImg.width = '41%'
                this.commodityBigImg.margin = '0% 0% 0% 6%'
                this.commodityImg1.width = '100%'
            }
            if(this.templateData.smallImg == 24){
                this.commoditySmallImg.width = '100%'
                this.commoditySmallImg.margin = '0% 0% 0% 0%'
                this.commodityImg2.width = '88%'
            }else if(this.templateData.smallImg == 12){
                this.commoditySmallImg.width = '41%'
                this.commoditySmallImg.margin = '0% 0% 0% 6%'
                this.commodityImg2.width = '100%'
            }
            if(this.templateData.bigsImg == 24){
                this.commodityBigsImg.width = '100%'
                this.commodityBigsImg.margin = '0% 0% 0% 0%'
                this.commodityImg3.width = '88%'
            }else if(this.templateData.bigsImg == 12){
                this.commodityBigsImg.width = '41%'
                this.commodityBigsImg.margin = '0% 0% 0% 6%'
                this.commodityImg3.width = '100%'
            }
            let hostName = location.hostname;
            let port = location.port;
            this.imageUrl = 'http://'+ hostName;
            this.imageUrls = 'http://' + hostName + ':' + port;
           // console.log(this.imageUrl)
        },
        methods:{
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
 .clear:after {
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
#templatePage .listUl li{
        float: left;
    font-size: 0.25rem;
}
#templatePage .listUl li img{
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
}
</style>