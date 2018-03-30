<template>
    <div class='contain-xs'>
        <ul class='collection-xs'>
            <li v-for="(item,index) in collectionlist" :key="index">
                <p class='Coupon'>
                    <span>领券<i class='icon iconfont icon-arrow-right-copy'></i></span>
                </p>
                <div class='goods'>
                    <div class='left'>
                        <img src="" alt="">
                        <div class='infor'>
                            <p class='name'>{{item.name}}</p>
                            <P class='subname'>{{item.subame}}</P>
                            <p class='color'>颜色：{{item.color}}</p>
                            <p class='size'>尺码：{{item.size}}</p>
                        </div>
                    </div>
                    <div class='right'>
                        <p class='price'>￥{{item.price_uint}}</p>
                        <p class='num'>x{{item.nums}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            collectionlist:[
                {
                    imgurl:'',
                    name:'FASHION',
                    subame:'这里是副标题',
                    color:'这里是颜色',
                    size:'这里是尺码',
                    price_uint:'200',
                    nums:'2'
                },
                {
                    imgurl:'',
                    name:'FASHION',
                    subame:'这里是副标题',
                    color:'这里是颜色',
                    size:'这里是尺码',
                    price_uint:'200',
                    nums:'2'
                }
            ]
        }
    },
    created(){
        this.$root.$emit('header','我的收藏');
    }
}
</script>
<style scoped lang="less">
.contain-xs{
    margin-top:.8rem;
    background-color: #f5f5f5;
    .collection-xs li{
        margin-bottom: .2rem;
        background-color: #fff;
    }
    .Coupon{
        font-size:.3rem;
        color:#0cbbb9;
        padding: .3rem .2rem;
        text-align: right;
        border-bottom:1px solid #cdcdcd;
    }
    .goods{
        padding: .2rem 0;
        overflow: hidden;
        position: relative;
        .left{
            width: fit-content;
            overflow: hidden;
            float: left;
            img{
                width:2.12rem;
                height:1.9rem;
                margin:0 .2rem;
                box-shadow: 0 0 0.1rem #cdcdcd;
                border:1px solid #cdcdcd;
                display: block;
                float: left;
            }
            .infor{
                width:fit-content;
                float: left;
                text-align: left;
                .name{
                    font-size:.3rem;
                    padding:.2rem 0;
                }
                .subname,.color,.size{
                    font-size:.25rem;
                    color: #787878
                }
                .color{
                    padding: .35rem 0 .15rem 0
                }
            }
        }
        .right{
            width: fit-content;
            float: right;
            .price{
                font-size: .3rem;
                color: #f38650;
                position: absolute;
                top:.5rem;
                right:.2rem;
            }
            .num{
                font-size:.35rem;
                position: absolute;
                bottom: .3rem;
                right:.2rem;
            }
        }
    }
}

</style>
