<template>
    <section class='accountMangagement'>
        <ul class="">
            <li>
                <div class="boxLeft">
                     <i class='icon iconfont icon-gift_icon fontSize'></i>
                </div>
                <p>
                    活动专区
                </p>
                <p>
                    有商家推荐的一些活动
                </p>
                <div class="boxRight">
                    <i class='icon iconfont icon-arrow-right-copy fontSize'></i>
                </div>
            </li>
            <li>
                <div class="boxLeft oneColor">
                     <i class='icon iconfont icon-laba- fontSize'></i>
                </div>
                <p>
                    商品降价通知
                </p>
                <p>
                    您关注的商品降价了
                </p>
                <div class="boxRight">
                    <i class='icon iconfont icon-arrow-right-copy fontSize'></i>
                </div>
            </li>
            <li>
                <div class="boxLeft twoColor">
                     <i class='icon iconfont icon-wodeyouhuijuan fontSize'></i>
                </div>
                <p>
                    优惠卷领取
                </p>
                <p>
                    您有新的优惠卷可以领取
                </p>
                <div class="boxRight">
                    <i class='icon iconfont icon-arrow-right-copy fontSize'></i>
                </div>
            </li>
            <li>
                <div class="boxLeft threeColor">
                     <i class='icon iconfont icon-huoche01 fontSize'></i>
                </div>
                <p>
                    物料更新
                </p>
                <p>
                    您有新的商品物流更新消息
                </p>
                <div class="boxRight">
                    <i class='icon iconfont icon-arrow-right-copy fontSize'></i>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
    
</script>
<style lang="" scoped>
.boxRight{
    float:left;
}
.accountMangagement{
    font-size:0.2rem;
    margin-top:0.7rem;
}
.accountMangagement li{
    height:1.54rem;
    border-bottom:1px solid #ddd;
}
.accountMangagement p{
    text-align:left;
    float:left;
    width:75%;
    margin-top:0.46rem;
    margin-left:0.2rem;
}
.accountMangagement p:nth-child(3){
    margin-top:0.2rem;
}
.boxLeft{
    float:left;
    width:0.72rem;
    height:0.72rem;
    border-radius:50%;
    background:#f29d6a;
    line-height:0.72rem;
    color:#fff;
    margin-top:0.46rem;
    margin-left:0.24rem;
}
.oneColor{
    background:#40c1ae;
}
.twoColor{
    background:#f4827d;
}
.threeColor{
    background:#73a5e3;
}
</style>