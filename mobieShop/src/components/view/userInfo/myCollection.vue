<template>
    <div class='contain-xs'>
        <ul class='collection-xs'>
            <li v-for="(item,index) in collectionlist" :key="index">
                <p class='Coupon'>
                    <span class='font' @click="getcoupon(item.commodityId)">领券<i class='icon iconfont icon-arrow-right-copy'></i></span>
                </p>
                <div class='goods'>
                    <div class='left'>
                        <img style='width:2.8rem;height:2.8rem;' :src='item.commodityInfo.commodityImageList? "http://"+hostName+":"+port+"/api"+item.commodityInfo.commodityImageList[0].url : ""' alt="暂无图片">
                        <div class='infor' style="margin-left:.2rem;">
                            <p class='name'>{{item.commodityInfo.name}}</p>
                            <!-- <P class='subname'>{{item.commodityInfo.name}}</P> -->
                            <p class='color'>销量：{{item.commodityInfo.totalSales}}</p>
                            <p class='size'>价格：{{item.commodityInfo.price}}</p>
                        </div>
                    </div>
                    <!-- <div class='right'>
                        <p class='price'>￥{{item.commodityInfo.price}}</p>
                        <p class='num'>x{{item.commodityInfo.totalSales}}</p>
                    </div> -->
                </div>
            </li>
        </ul>
        
        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;'>
            <div class='shopBoxS'>{{ShopName}}</div>
            <!--<p class='shopBxo'>领取优惠劵</p>!-->
            <ul class='shopBox'>
                <li v-for='(item,index) in coupon' :key='index'>
                    <div class='shopFont'>
                        <p>{{item.couponMoney}}元</p>
                        <p>{{item.couponName}}</p>
                        <p>使用期限 {{item.starTime.split(" ")[0]}}—{{item.endTime.split(" ")[0]}}</p>
                    </div><button class='button' @click='okcoupon(item.id)'>领取</button>
                </li>
            </ul>
            <div class='closeBtn button' @click="btnClose">关闭</div>
        </mt-popup>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            ShopName:'领取优惠劵',
            collectionlist:[],
            popupVisible:false,
            coupon:[]
        }
    },
    created(){
        this.hostName = location.hostname;
        this.port = location.port;
        this.$root.$emit('header','我的收藏');
        this.getData(1);
    },
    methods:{
        btnClose(){
            this.popupVisible=false
        },
        getData(pagenum){
            let that=this;
            this.$http.post('/api/product/commodity/favorite/queryPageList?pageSize=10&pag='+pagenum,{})
            .then(res=>{
                if(res.data.status==200){
                    that.collectionlist=res.data.info.list;
                    console.log(that.collectionlist)
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            });
        },
        //领取优惠劵
        okcoupon(id) {
            let userInfo = sessionStorage.getItem("userinfo");
            let userInfoId = JSON.parse(userInfo).id
            let url = '/api/product/coupon/customer/insert?couponId=' + id + '&number=1';
            this.$http({
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {}
            }).then(response => {
                if (response.data.status == 200) {
                    Toast(response.data.msg);
                } else {
                    Toast(response.data.msg);
                }
            }).catch(error => {
                console.log(error)
            })
        },
        //获取优惠劵
        getcoupon(commodityid) {
            let that = this;
            this.$http.post('/api/product/coupon/commodity/find/mall',{commodityId:commodityid})
            .then(res=>{
                if(res.data.status==200){
                    res.data.info.list.forEach(item=>{
                        let json={
                            id:item.couponInfo.id,
                            couponMoney:item.couponInfo.couponMoney,
                            couponName:item.couponInfo.couponName,
                            starTime:item.couponInfo.starTime,
                            endTime:item.couponInfo.endTime
                        };
                        that.coupon.push(json);
                    });
                    that.popupVisible=true;
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
    }
}
</script>
<style scoped lang="less">
.contain-xs{
    // margin-top:.8rem;
    background-color: #f5f5f5;
    .collection-xs li{
        margin-bottom: .2rem;
        background-color: #fff;
    }
    .Coupon{
        font-size:.3rem;
        color:#26a2ff;
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
    .shopBox {
        margin-bottom: 0.4rem;
        font-size: 0.2rem;
        button {
            position: absolute;
            right: 0;
            top: 0.2rem;
            border: none;
            padding: 0.15rem;
            background: #26a2ff;
            color: #fff;
            margin-right: 0.2rem;
            font-size: 0.25rem;
            border-radius: 5px;
        }
        li {
            position: relative;
            height: 0.5rem;
            width: 90%;
            margin-left: 5%;
            border-bottom: 1px solid #ddd;
            margin-top: 0.2rem;
            margin-bottom: 0.2rem;
        }
        li:last-child {
            border-bottom: none;
        }
    }
    .shopFont {
        float: left;
        padding-left: 0.2rem;
    }
    .shopFont p {
        font-size: 0.2rem;
        line-height: 0.4rem;
        text-align: left;
    }
    .shopFont p:nth-child(1) {
        font-size: 0.25rem;
        color: #0CBBB9;
    }
    .shopFont p:nth-child(3) {
        font-size: 0.2rem;
        color: #b8bbbf;
    }
    .shopBoxS {
        font-size: 0.35rem;
        padding-top: 0.2rem;
        padding-bottom: 0.1rem;
    }
    .shopBxo {
        font-size: 0.3rem;
        padding-top: 0.1rem;
    }
    .shopBox li {
        height: 1.26rem;
        line-height: 1.26rem;
    }
    .closeBtn {
        background: #26a2ff;
        line-height: 1rem;
        font-size: 0.4rem;
        color: #fff;
    }
}

</style>
