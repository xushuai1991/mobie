<template>
<div>
    <div class="line">
        <div class="line-s"></div>
    </div>
    <div v-show="titlesDate.mainTitle==''?false:true">
        <p class="mainTitles" v-bind:style="titlesDate.mainTitleStyle">{{ titlesDate.mainTitle }}</p>
    </div>
    <div v-show="titlesDate.subtitle==''?false:true">
        <p class="subTitles" v-bind:style="titlesDate.subTitleStyle">{{ titlesDate.subtitle }}</p>
    </div>
</div>
</template>
<script>
export default {
        data() {
            return {
                titlesDate:''
            };
        },
        props:['templateData'],
        created:function(){
          //console.log(this.templateData)
          this.titlesDate = this.templateData;
         // console.log(this.titlesDate)
        },
    };
</script>
<style>
</style>
<style lang="" scoped>
.line{
  background-color: #cdcdcd;
    height: 0.01rem;
    margin:0.1rem 0.06rem 0.3rem 0.06rem;
}
.line-s{
  background:#1e2d38;
  width:0.6rem;
  height:0.03rem;
  margin:0 auto;
  }
.mainTitles{
    margin-bottom: 0.25rem;
    text-align: center;
    font-size: 0.3rem;
    overflow: hidden;
    }
.subTitles{    
    text-align: center;
    overflow: hidden;
    font-size: 0.2rem;
    padding-bottom: 0.1rem;
    padding-top: 0.1rem;
    }
</style>