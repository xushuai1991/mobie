<template>
    <div class='logistics-xs'>
        <div class='goods'>
            <img :src="orderinfo.imgur" alt="">
            <div class='infor'>
                <p class='name'>{{orderinfo.name}}</p>
                <P class='subname'>{{orderinfo.subname}}</P>
                <p class='color'>运单号：{{orderinfo.waybillNumber}}</p>
                <p class='size'>信息来源：{{orderinfo.from}}</p>
            </div>
        </div>
        <ul class='logistics-pass'>
            <li v-for='(item,index) in logisticslist' :key='index'>
                <p>{{item.content}}</p>
                <p class='date'>{{item.date}}</p>
            </li>
        </ul>
        <div class='kefu-online'>
            <button>在线客服</button>
        </div>
        
    </div>
</template>
<script>

export default {
    data(){
        return {
            id:'',
            orderinfo:{
                name:'FASHION',
                subname:'休闲时尚 潮男标品 SM1004D',
                waybillNumber:'asasa',
                from:'申通快递',
                imgur:''
            },
            logisticslist:[
                {
                    content:'您的快递已经背快递柜签收，请注意取件， 如果有疑问请联系快递员    王富贵： 14328174657 ',
                    date:'2018-3-30 09:00:00'
                },
                {
                    content:'上海市浦东公司派件员：赵拴柱维和部队 13483298473正在为您派件',
                    date:'2018-3-30 09:00:00'
                },
                {
                    content:'上海市浦东公司派件员：赵拴柱维和部队 13483298473正在为您派件',
                    date:'2018-3-30 09:00:00'
                },
                {
                    content:'上海市浦东公司派件员：赵拴柱维和部队 13483298473正在为您派件',
                    date:'2018-3-30 09:00:00'
                },
                {
                    content:'上海市浦东公司派件员：赵拴柱维和部队 13483298473正在为您派件',
                    date:'2018-3-30 09:00:00'
                }
                
            ]
        }
    },
    created(){
        this.$root.$emit('header','物流详情');
        this.id=this.$route.params.id;
    }
}
</script>
<style lang="less" scoped>
.logistics-xs{
    margin-top: .8rem;
    background-color: #e9e9e9;
    .goods{
        // width: fit-content;
        overflow: hidden;
        position: relative;
        background-color: #fff;
        padding: .2rem .4rem;
        img{
            width:2.12rem;
            height:1.9rem;
            // margin:0 .2rem;
            margin-right: .4rem;
            box-shadow: 0 0 0.1rem #cdcdcd;
            border:1px solid #cdcdcd;
            display: block;
            float: left;
        }
        .infor{
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
                padding: .3rem 0 .15rem 0
            }
        }
    }
    .logistics-pass{
        background-color: #fff;
        margin-top:.2rem;
        padding-top: .4rem;
        padding-left: .4rem;
        position: relative;
        li{
            font-size: .25rem;
            position: relative;
            padding:0 0 .2rem .6rem;
            color: #787878;
            text-align: left;
            line-height: .5rem;
            .date{
                padding-bottom: .1rem;
                border-bottom: 1px solid #e9e9e9;
            }
        }
        li:nth-child(1){
            color:#26a2ff;
        }
        li::before{
            width:10px;
            height:10px;
            content: '';
            background-color: #e9e9e9;
            display: block;
            border-radius:50%;
            top:0;
            left: 0;
            position: absolute;
        }
        li:nth-child(1)::before{
            width:15px;
            height:15px;
            left: -.04rem;
            background-color: #26a2ff;
        }
    }
    .logistics-pass::before{
        content: '';
        width:1px;
        display: block;
        top:.4rem;
        bottom:.2rem;
        left: .5rem;
        position: absolute;
        background-color: #e9e9e9;
    }
    .kefu-online{
        height:.6rem;
        background-color: #fff;
        padding: .3rem 0;
        position: relative;
        button{
            width: 2rem;
            height:.6rem;
            right:.4rem;
            border-radius: 5px;
            color:#26a2ff;
            background-color: #fff; 
            border: 1px solid #b9b9b9;;
            outline: none;
            position: absolute;
        }
    }
}
</style>
