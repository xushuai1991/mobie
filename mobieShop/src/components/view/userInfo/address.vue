<template>
    <section>
        <div class="edit">
            收件人：<input type="text" class="input_edit input1">
        </div>
        <div class="edit">
            手机号：<input type="text" class="input_edit input2">
        </div>
        <div class="edit edit_addr">
            <p class="addr_new">省市区：</p>
            <p class="address_now"></p>
            <div class="location_addr" @click='locationaddr'><img src="static/HMMobilePhone/dsit/img/position.png" alt=""><span id="position">定位</span></div>
        </div>
        <div class="edit">
            详细地址：<input type="text" class="input_edit input3">
        </div>
        <div class="take_place"></div>
        <div class="pre_content"></div>
        <div class="add_click">保存地址</div>	
    </section>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            position:'',
            address:''
        }
    },
    created(){
        this.$root.$emit('header','添加地址');
    },
    methods:{
        getLocation(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    let lat=position.coords.latitude;//经度
                    let lag=position.coords.longitude;//纬度
                    this.position={lat,lag};
                    // let local={lat:lat,lag:lag};
                    // return local;
                    // alert(lat);
                },(err)=>{
                    console.log(err);
                    switch(err.code) { 
                        case err.PERMISSION_DENIED: 
                            Toast("定位失败,用户拒绝请求地理定位"); 
                            break; 
                        case err.POSITION_UNAVAILABLE: 
                            Toast("定位失败,位置信息是不可用"); 
                            break; 
                        case err.TIMEOUT: 
                            Toast("定位失败,请求获取用户位置超时"); 
                            break; 
                        case err.UNKNOWN_ERROR: 
                            Toast("定位失败,定位系统失效"); 
                            break; 
                    } 
                    // Toast(err);
                    // return;
                });
            }
            else{
                Toast('请开启定位功能');
                // return;
            }
        },
        locationaddr(){
            this.getLocation();
            // console.log(local.lat);
        }
    }
}
</script>

<style lang="" scoped>
    body{
    font-size: .12rem;
}
.edit{
    width: 100%;
    height: 1.01rem;
    border-bottom: .01rem solid #dcdcdc;
    line-height: 1rem;
    font-size: .26rem;
    padding-left: .24rem;
    color: #333;
    text-align:left;
    background: white;
}
.input_edit{
    width: 5rem;
    height: .8rem;
    outline: none;
    border: none;
    padding-left: .2rem;
    font-size: .26rem;
}

.edit_addr{
    position: relative;
}
.addr_new{
    display: inline-block;
    vertical-align: top;
}
.address_now{
    display: inline-block;
    max-width: 4.55rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
.location_addr{
    width: 1.5rem;
    height: .6rem;
    line-height: .6rem;
    border-left: .01rem solid #dcdcdc;
    position: absolute;
    right: .2rem;
    top: 0.2rem;
}
.location_addr span{
    color: #e47524;
}
.location_addr img{
    width: .32rem;
    height: .4rem;
    vertical-align: middle;
    margin: 0 .2rem;
}
.take_place{
    width: 100%;
    height: .12rem;
    background: #EBEBEB;
}
.address_choice{
    width: 100%;
    height: 4.36rem;
    border-top: .01rem solid #dcdcdc;
    position: absolute;
    bottom: 0;
}

 .toolbar{
     font-size: .24rem;
 }
 .picker-items-col{
     width: 33%;
     text-align: center;
     margin-top: -5.2rem;
 }
 section{
 	position:relative;
 }
.pre_content{
	width:100%;
	height:3.6rem;
	position:absolute;
	bottom:-3.6rem;
}
.add_click{
    width: 5.6rem;
    height: .9rem;
    border-radius: 1.9rem;
    font-size: .3rem;
    color: white;
    text-align: center;
    line-height: .9rem;
    background: linear-gradient(to bottom,  #0CBBB9 0%,#4AC6DC 100%);
    position:absolute;
    bottom:-1.3rem;
    left:50%;
    margin-left:-2.8rem;
}
</style>