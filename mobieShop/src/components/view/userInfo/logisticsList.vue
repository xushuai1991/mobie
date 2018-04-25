<template>
    <div class='logisticsList-xs'>
        <ul class='logisticslist'>
            <li v-for='(item,index) in logisticslist' :key='index'>
                <div class='top'>
                    <span class='status'>{{item.status}}</span>
                    <button class='checkdetail' @click='checkdetail(item.id)'>查看物流</button>
                </div>
                <div class="goods">
                    <div class='good' v-for='(item1,index1) in item.goods' :key='index1'>
                        <div class='left'>
                            <img src="" alt="">
                            <div class='infor'>
                                <p class='name'>{{item1.name}}</p>
                                <P class='subname'>{{item1.subname}}</P>
                                <p class='color'>颜色：{{item1.color}}</p>
                                <p class='size'>尺码：{{item1.size}}</p>
                            </div>
                        </div>
                        <div class='right'>
                            <p class='price'>￥{{item1.price_unint}}</p>
                            <p class='num'>x{{item1.nums}}</p>
                        </div>
                    </div>
                </div>
                <div class='statistics'>
                    <span>全国包邮 合计：<span class='warning'>￥{{countlist[index]}}</span></span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            logisticslist:[
                {
                    id:'1',
                    status:'等待收货',
                    
                    goods:[
                        {
                            name:'商品一',
                            subname:'休闲时尚 潮男标品 SM1004D',
                            color:'黑色+白色',
                            size:"12-13-14",
                            price_unint:'20',
                            nums:'2'
                        },
                        {
                            name:'商品一',
                            subname:'休闲时尚 潮男标品 SM1004D',
                            color:'黑色+白色',
                            size:"12-13-14",
                            price_unint:'20',
                            nums:'2'
                        }
                    ]
                },
                {
                    id:'',
                    status:'等待收货',
                    goods:[
                        {
                            name:'商品一',
                            subname:'休闲时尚 潮男标品 SM1004D',
                            color:'黑色+白色',
                            size:"12-13-14",
                            price_unint:'20',
                            nums:'2'
                        }
                    ]
                }
            ]
        }
    },
    created(){
        this.$root.$emit('header','物流更新');
    },
    computed:{
        countlist(){
            let list=[];
            this.logisticslist.forEach(item=>{
                let count=0;
                item.goods.forEach(good=>{
                    count+=good.price_unint*good.nums;
                });
                list.push(count);
            });
            return list;
        }
    },
    methods:{
        checkdetail(id){
            this.$router.push({name:'logistics',params:{id:id}});
        }
    }
}
</script>
<style lang="less" scoped>
.logisticsList-xs{
    background-color: #e9e9e9;
    margin-top: .8rem;
    .logisticslist li{
        margin-bottom: .2rem;
        background-color: #fff;
        .top{
            font-size: .25rem;
            padding:.25rem .2rem;
            overflow: hidden;
            border-bottom: 1px solid #e9e9e9;
            .status{
                color:#26a2ff;
                padding-top: .16rem;
                float: left;
            }
            button{
                font-size: .25rem;
                color: #787878;
                padding: .1rem .2rem;
                background-color: #fff;
                border:1px solid #26a2ff;
                border-radius: 5px;
                outline: none;
                float: right;
            }
        }
        .goods{
            padding-top: .2rem;
            border-bottom:1px solid #e9e9e9;
            overflow: hidden;
            position: relative;
            .good{
                overflow:hidden;
                margin-bottom:.2rem;
                position:relative;
            }
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
                        padding:.2rem 0 .2rem 0;
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
        .statistics{
            font-size: .3rem;
            padding: .3rem .2rem;
            text-align: right;
            .warning{
                color:#f38650
            }
        }
    }
}
</style>
