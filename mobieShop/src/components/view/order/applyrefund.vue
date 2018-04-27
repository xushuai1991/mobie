<template>
    <div class='applyrefund-xs'>
        <ul class='goods-xs'>
            <li v-for="(item,index) in dataorder.orderDetails" :key="index">
                <div class='goods'>
                    <div class='left'>
                        <img :src='"http://"+hostName+":"+port+"/api"+item.image' alt="">
                        <div class='infor'>
                            <p class='name'>{{item.categoryName}}</p>
                            <!-- <P class='subname'>{{item.subame}}</P> -->
                            <p class='color'>{{item.condition1Name}}</p>
                            <p class='size'>{{item.condition2Name}}</p>
                        </div>
                    </div>
                    <div class='right'>
                        <p class='price'>￥{{item.price}}</p>
                        <p class='num'>x{{item.saleNumber}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class='operation' v-show='false'>
            <div class='refund' @click='refundmoney'>
                <div class='icon-left'>
                    <i class='icon iconfont icon-tuikuan'></i>
                </div>
                <div class='tips'>
                    <p class='type'>仅退款</p>
                    <p class='desc'>未收到货，或卖家协商同意前提下</p>
                </div>
                <div class='icon-right'>
                    <i class='icon iconfont icon-arrow-right-copy'></i>
                </div>
            </div>
            <div class='refund' @click='refundall'>
                <div class='icon-left'>
                    <i class='icon iconfont icon-tuikuan1'></i>
                </div>
                <div class='tips'>
                    <p class='type'>退款退货</p>
                    <p class='desc'>已收到货，需要退换已收到的货物</p>
                </div>
                <div class='icon-right'>
                    <i class='icon iconfont icon-arrow-right-copy'></i>
                </div>
            </div>
        </div>
        
        <div class='refundoperation' v-if="true">
            <div class='selectarea' v-if='false'>
                <span class='main'>货物状态</span>
                <span class='select' @click='selectstatus'>{{status}}<i class='icon iconfont icon-arrow-right-copy'></i></span>
            </div>
            <div class='selectarea'>
                <span class='main'>退款原因</span>
                <span class='select' @click='selectreason'>{{reasonrefund}}<i class='icon iconfont icon-arrow-right-copy'></i></span>
            </div>
            <div class='refundabout'>
                <p class='moneys-refund'>退款金额：<span style='color:#f38650;font-size:.4rem;'>￥<input type="text" v-model="moneyrefund" style='color:rgb(243, 134, 80)'> </span></p>
                <p class='moneys-extra'>最多￥{{dataorder.actualMoney}}，含发货邮费￥{{postage}}</p>
                <div class='explain' v-if='false'>
                    <label for="explain">退款说明：</label>
                    <input type="text" id="explain" placeholder="选填" v-model="explain">
                </div>
            </div>
            <div class='uploadimg' v-if='false'>
                <p>上传凭证</p>
                <ul class='imgs'>
                    <li class='upload'>
                        <input type="file" name='upload' class='imgupload' accept="image/*" @change='uploadimg'  multiple='true'>
                        <i class='icon iconfont icon-xiangji'></i>
                        <div class='tip'>
                            <p>上传凭证</p>
                            <p>（最多3张）</p>
                        </div>
                    </li>
                    <li v-for='(item,index) in imglist' :key='index'>
                        <i class='icon iconfont icon-close close' @click='removeImg(index)'></i>
                        <img :src="item.imgurl" alt="图片丢失">
                    </li>
                </ul>
            </div>
            <div class='submit'>
                <button @click="submitData">提交</button>            
            </div>
        </div>
        <!-- 货物状态弹窗 -->
        <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-radio
            title="货物状态"
            v-model="status"
            align='right'
            :options="goodsstatus">
            </mt-radio>
        </mt-popup>
        <!-- 退款原因弹窗 -->
        <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="popup" style='width:80%;padding:.2rem 0;'>
            <mt-radio
            v-model="reasonrefund"
            align='right'
            :options="refundreason">
            </mt-radio>
        </mt-popup>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            goodslist:[
                // {
                //     imgurl:'',
                //     name:'FASHION',
                //     subame:'这里是副标题',
                //     condition1Name:'颜色：这里是颜色',
                //     condition2Name:'尺码：这里是尺码',
                //     price_uint:'200',
                //     nums:'2'
                // },
                // {
                //     imgurl:'',
                //     name:'FASHION',
                //     subame:'这里是副标题',
                //     color:'这里是颜色',
                //     size:'这里是尺码',
                //     price_uint:'200',
                //     nums:'2'
                // }
            ],
            status:'请选择',
            reasonrefund:'请选择',
            popupVisible:false,
            popupVisible2:false,
            goodsstatus:['已收货','未收货'],
            refundreason:['拍错了信息填写错误','不想买了','未收到货','和商家协商一致','收到商品破损','其他'],
            showopera:true,
            showstatus:true,
            postage:0,
            imglist:[{'imgurl':''},{},{}],
            dataorder:null,
            explain:'',
            moneyrefund:0
        }
    },
    computed:{
        // moneyrefund(){
        //     let money=0;
        //     this.goodslist.forEach(item=>{
        //         money+=item.price_uint*item.nums
        //     });
        //     return money;
        // },
        // moneyrefundmost(){
        //     return this.moneyrefund+this.postage;
        // }
    },
    created(){
        // console.log(location.hostname);
        this.$root.$emit('header','申请退款');
        let orderdetail=sessionStorage.getItem('orderdetail');
        if(orderdetail!=null){
            let detail=JSON.parse(orderdetail);
            this.dataorder=detail;
            this.goodslist=[];
            detail.orderDetails.forEach(item=>{
                let json={
                    imgurl:item.image,
                    name:item.name,
                    condition1Name:item.condition1Name,
                    condition2Name:item.condition2Name,
                    price_uint:item.price,
                    nums:item.saleNumber
                };
                this.goodslist.push(json);
            });
            console.log(detail);
            // detail.forEach();
        }
        this.hostName = location.hostname;
        this.port = location.port;
        this.moneyrefund=this.dataorder.actualMoney;
    },
    methods:{
        refundmoney(){
            this.showopera=false;
            this.showstatus=true
        },
        refundall(){
            this.showopera=false;
            this.showstatus=false
        },
        // 选择货物状态
        selectstatus(){
            this.popupVisible=true;
        },
        // 选择退款原因
        selectreason(){
            this.popupVisible2=true;
        },
        uploadimg(){
            let length=this.imglist.length;
            if(length>=3){
                Toast('最多上传3张图片');
                return;
            }
            let that=this;
            let fileObject=document.querySelector('.imgupload').files[0];
            if(!fileObject||!window.FileReader){
                return;
            };
            if (/^image/.test(fileObject.type)) {
                let fd=new FormData();
                fd.append('fileUpload',fileObject);
                fd.append('type','product');
                that.upfile(fd);
            }
            else{
                Toast('只能上传图片');
                return;
            }
        },
        upfile(file){
            console.log(file)
            Indicator.open('上传中。。。');
            let that=this;
            this.$http({
                url: '/api/zuul/sms/file/fileUpload',
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'multipart/form-data'},
                data:file
            })
            .then(res=>{
                Indicator.close();
                if(res.data.status==200){
                    let url=res.data.info;
                    let imgurl=location.hostname+'/api/'+url;
                    this.imglist.push({'imgurl':url});
                }
                else{
                    Toast(res.data.msg);
                }
            })
            .catch(err=>{
                Indicator.close();
                Toast('上传失败！');
                
            })

        },
        // 删除图片
        removeImg(index){
            MessageBox.confirm('确定删除图片?').then(() => {
                let list=this.imglist;
                list.splice(index,1);
            }).catch(()=>{});
        },
        submitData(){
            let that=this;
            this.$http.post('/api/product/order/mall/refund',
            {
                orderNumber:that.dataorder.number,
                refundMoney:that.moneyrefund,
                refundExplanation:that.reasonrefund=='请选择'?'':that.reasonrefund
            })
            .then(res=>{
                if(res.data.status==401){
                    Toast('请先登录！');
                    return;
                }
                if(res.data.status==200){
                    Toast({
                        message: '申请已提交！正在跳转...',
                        iconClass: 'icon icon-success',
                        duration: 500
                    });
                    that.$router.push('/order');
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
                Toast('申请提交失败！');
            })
        }
    }
}
</script>
<style lang="less" scoped>
.applyrefund-xs{
    // margin-top:.9rem;
    background-color: #f5f5f5;
    .goods-xs li{
        margin-bottom: .2rem;
        background-color: #fff;
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
    .selectarea{
        height:1rem;
        background-color: #fff;
        text-align: left;
        padding:0 .2rem;
        border-bottom: 1px solid #e9e9e9;
        position: relative;
        .main{
            font-size: .3rem;
            position: absolute;
            top:.4rem;
        }
        .select{
            font-size: .28rem;
            position: absolute;
            right:0;
            top:.2rem;
            color:#787878;
            i{
                font-size: .5rem;
                position: relative;
                top:.08rem;
                
            }
        }
        
    }
    .operation{
        background-color: #fff;
        .refund{
            overflow: hidden;
            position: relative;
            padding: .3rem .2rem;
            border-bottom: 1px solid #e9e9e9;
        }
        // .refund:nth-child(1){
        //     border-bottom: 1px solid #e9e9e9;
        // }
        .icon-left,.icon-right{
            width:fit-content;
        }
        .icon-left{
            float: left;
            i{
                font-size: .4rem;
                color: #26a2ff;
                top:.22rem;
                position: absolute;
            }
        }
        .refund:nth-child(1) .icon-left i{
            font-size: .45rem;
        }
        .icon-right{
            float: right;
            i{
                font-size: .5rem;
                color:#787878;
                top:.4rem;
                right:.2rem;
                position: absolute;
            }
        }
        .tips{
            width: 4rem;
            padding-left: .6rem;
            float: left;
            text-align: left;
            .type{
                font-size: .3rem;
                padding-bottom: .2rem;
            }
            .desc{
                font-size: .2rem;
                color: #787878;
            }
        }
    }
    .refundabout{
        font-size: .3rem;
        text-align: left;
        background-color: #fff;
        margin-top: .2rem;
        // padding:0 .2rem;
        p{
            padding:.3rem .2rem;
        }
        .moneys-extra{
            font-size: .25rem;
            color: #787878;
            background-color: #f5f5f5;
        }
        .explain{
            padding: .3rem .2rem;
            #explain{
                width: 5.5rem;
                height:.5rem;
                outline: none;
                // border:none;
            }
        }
    }
    .uploadimg{
        font-size: .3rem;
        background-color: #fff;
        margin-top:.2rem;
        padding: .3rem .2rem;
        text-align: left;
        overflow: hidden;
        .vue-file-upload{
            width:100%;
            height:100%;
            position: absolute;
            opacity: 0;
            z-index: 999;
        }
        
        .imgs{
            padding-top: .2rem;
            overflow: hidden;
            li{
                width: 1.58rem;
                height:1.58rem;
                float: left;
                position: relative;
                img{
                    width:1.58rem;
                    height:1.58rem;
                }
            }
            li+li{
                margin-left: .2rem;
                background-color: #f5f5f5;
                position: relative;
                img{
                    width:1.58rem;
                    height:1.58rem;
                    font-size:.2rem;
                    text-align: center;
                    line-height: 1.58rem;
                    display: block;
                }
                .close{
                    line-height: .3rem;
                    color:red;
                    font-size:.3rem;
                    border-radius: 50%;
                    text-align: center;
                    line-height: .2rem;
                    right:-.1rem;
                    top:-.05rem;
                    position: absolute;
                    display: block;
                }
            }
            .upload{
                border:1px dotted;
                .icon{
                    font-size: .6rem;
                    color:#dbdbdb;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top:.2rem;
                    text-align: center
                }
                .tip{
                    margin-top: .8rem;
                    color:#787878;
                }
                p{
                    font-size: .25rem;
                    text-align: center;
                }
            }
        }
    }
    .submit{
        background-color: #fff;
        padding-bottom: .3rem;
        button{
            width:80%;
            height:1rem;  
            font-size: .3rem;
            color: #fff;
            background: linear-gradient(180deg,#11bcbc, #46c5d9);
            border:none;
            border-radius: 30px; 
            outline: none;
        }
    }
}
</style>
<style lang="less">
.applyrefund-xs{
    .popup{
        width:100%;
        .mint-cell{
            text-align: left;
        }
        .mint-radiolist-title{
            font-size:.3rem;
        }
        .mint-cell{
            text-align: left;
        }
        
    }
    .imgupload{
        width:100%;
        height:100%;
        position: absolute;
        z-index: 999;
        opacity: 0;
    }
}
</style>
