<template>
    <div class='pendpay'>
        <div class='title'>
            <span class='tip'>待评价</span>
        </div>
        <div class='content'>
            <div class='detail'>
                <div class='img-goods'>
                    <img src="" alt="">
                </div>
                <div class='detail-goods'>
                    <h3 class='name'>FASHION</h3>
                    <P class='name-sub'>休闲舒适 潮男标配 SM1212</P>
                    <P class='area'>服务区域：萧山区</P>
                    <p class='date'>服务预约时间：2018-2-5</p>
                </div>
                <div class='price'>
                    <p>￥300</p>
                    <p>x1</p>
                </div>
            </div>
            <div class='price-total'>
                <p>合计：<span class='total'>￥300</span></p>
            </div>
            <div class='operation'>
                <button class='prime evaluate'>评价</button>
                <button class='check'>查看报告</button>
                <button class='complaint'>投诉</button>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return{

        }  
    }
}
</script>
<style scoped>
.pendpay{
    margin-top: 0.2rem;
    background-color: #fff;
    overflow: hidden;
}
.title{
    font-size: 0.26rem;
    padding: 0.3rem 0.2rem;
    overflow: hidden;
    border-bottom: 1px solid #e9e9e9;
}
.title .tip{
    float: left;
    color: #31B1B0;
}
.title .time-remain{
    color: #cdcdcd;
    float: right;
}
.detail{
    padding: .2rem 0;
    border-bottom: 1px solid #e9e9e9;
    overflow: hidden;
}
.img-goods{
    width: 2.2rem;
    height: 2rem;
    border-radius: 5%;
    box-shadow: 0 0 0.1rem #e9e9e9;
    border:1px solid #e9e9e9;
    margin-left:.2rem;
    float: left;
}
.detail-goods{
    width: 3.8rem;
    margin-left: .3rem;
    text-align: left;
    float: left;
}
.detail-goods .name{
    font-size: .4rem;
    padding-top: .1rem;
    padding-bottom: .1rem;
}
.detail-goods p{
    color:#787878;
}
.detail-goods p.name-sub{
    font-size: .28rem;
    padding-bottom: .2rem;
}
.detail-goods p.area,
.detail-goods p.date{
    font-size: .22rem;
    padding-bottom: .2rem;
}
.price{
    font-size: .28rem;
    float: right;
    margin-right: .2rem;
    padding-top: .6rem;
}
.price p{
    padding-top: .1rem;
}
.price p:last-child{
    font-size: .25rem;
    color: #787878;
}
.price-total{
    font-size: .35rem;
    padding: .2rem;
    text-align: right;
    border-bottom: 1px solid #e9e9e9;
}
.price-total .total{
    font-size: .5rem;
    color: #f38650;
}
.operation{
    overflow: hidden;
    padding: .2rem 0;
}
.operation button{
    width: 1.8rem;
    float: right;
    padding: .15rem .2rem;
    margin-right: .2rem;
    border:1px solid #31B1B0;
    border-radius: .1rem;
    background-color: #fff;
}
.operation button.prime{
    background-color: #31B1B0;
    color: #fff;
}
/* .price{
    width: 1rem;
    float: left;
} */
</style>

