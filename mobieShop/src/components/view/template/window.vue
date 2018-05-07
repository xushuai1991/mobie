<template>
<div>
    <ul class='clear listUl'>
            <li v-for='(item,index) in imgArr' :key='index'>
                <a :href="item.url" style="display: inline-block;width: 100%;">
                    <div class="imgConet">
                        <div style="z-index:99;;width: 100%;">
                                <img :src='item.imgSrc !== ""?imageUrl+item.imgSrc:imageUrls+removeDian(item.img)' class="windowImg">
                        </div>
                        <div class="boxesDiv" v-bind:class="item.boxesDivStyle"></div>
                        <div class="lineDiv" v-bind:class="item.lineDivStyle"></div>
                    </div>
                 </a>
            </li>
        </ul>
</div>
</template>
<script>
export default {
        data() {
            return {
                imgArr:'',
                imageUrl:'',
                imageUrls:''
            };
        },
        props:['templateData'],
        created(){
            //console.log(this.templateData)
            this.imgArr = this.templateData.ImgArr;
            let hostName = location.hostname;
            let port = location.port;
            this.imageUrl = 'http://'+ hostName +'/api';
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
    float: left;
    font-size: 0.25rem;
    width: 40%;
    margin-left: 7%;
}
#templatePage .listUl li img{
    /* border-radius:0.2rem; */
    width: 100%;
    height: 2.72rem;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
}
#templatePage .imgConet{
    position: relative;
}
#templatePage .windowImg{
    width: 100%;
    height: 100%;
}
#templatePage .boxesDiv{
    position: absolute;
    width: 92%;
    height: 83%;
    top: 4%;
    left: 0%;
}
#templatePage .lineDiv{
    position: absolute;
    width: 80%;
    height: 73%;
    top: 12%;
    left: 9%;
}
#templatePage .boxesBorShow{
    border: 7px solid #eeeeee
    }
#templatePage .boxesBorHide{
    border: 0px solid #eeeeee
    }
#templatePage .lineBorShow{
    border: 1px solid #eeeeee
    }
#templatePage .lineBorHide{
    border: 0px solid #eeeeee
    }
</style>