<template>
    <div id='detailTemplatePage'>
        <div class="productDetailSwitch">
            <span class="productDetailBtn1" :class="productDetailBack" @click="productDetailBtn1">商品</span>
            <span class="productDetailBtn2" :class="productDetailBacks" @click="productDetailBtn2">评论</span>
            <!-- <i class='icon iconfont icon-fenxiang productDetailIcon' @click="showShare"></i> -->
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft">
            <div v-if="show1" class="proDetail">
                <div class="page-swipe">
                    <mt-swipe :auto="4000" :show-indicators="bannerArr2.length == 1?false:true">
                        <mt-swipe-item v-for='(item,index) in bannerArr2' :key='index'>
                            <img :src="'http://'+hostName+':8887'+item.url" class="bannerImg">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <productDetail :zbdCommodityInfo="commodityInfo" :evaluationTotals="evaluationTotal" :zbdHostName="hostName" :zbdPort="port" :zbdCommodityId="commodityId" :zbdBannerArr2="bannerArr2"></productDetail>
                <div class="zbd-coupon" @click="getcoupon" v-show="couponShow">
                </div>
                <div id="zbd-preferences" class="clear">
                    <p>已选<span>{{ commodityInfo.name }}</span><i style="overflow:hidden;"><i v-for="(item,index) in areadyValue" :key="index">&ensp;{{ item.value }}</i></i><i>&ensp;{{ specificationNum }}件</i></p>
                    <p @click="showServer">选择规格&ensp;></p>
                </div>
                <!--<div id="zbd-productDescription" class="clear">
                                    <p >包邮<span>上海市满60.00元包邮</span></p>
                                    <p >产地<span>唐山市</span></p>
                                </div>
                                <div id="zbd-baozhang" class="clear">
                                    <span><i class="icon iconfont icon-iconset0126"></i>全面质检</span>
                                    <span><i class="icon iconfont icon-iconset0126"></i>资深买手</span>
                                    <span><i class="icon iconfont icon-iconset0126"></i>原产地直采</span>
                                    <span><i class="icon iconfont icon-more"></i></span>
                                </div>
                                <div id="zbd-Tips" class="clear">
                                    <p class="clear"><span>温馨提示</span><i class="icon iconfont icon-xiajiantou"></i></p>
                                     transform: rotate(180deg);
                                </div> -->
                <!-- <div id="zbd-TipsContent">
                                    <span>温馨提示：</span>1.该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1
                                </div> -->
                <div id="zbd-commodityInfoTitle">商品信息</div>
                <keep-alive v-for='(item,index) in comlists' :key='index'>
                    <components :templateData='item.componentsData' :is='item.componentsName' :type='item.componentsName'></components>
                </keep-alive>
                <div v-show="evaluationListNoShow" style="color: #bfbfbf;font-size: .26rem;text-align: center;margin-top:0.3rem;">暂无评论！</div>
                <div id="zbd-customerReviews" class="clear" v-show="evaluationListShows">
                    <p class="zbd-reviewsTitle">顾客评价</p>
                    <div class="zbd-customerReviewContent">
                        <div class="commentHeaderInfo clear">
                            <span class="commentNickname">{{ nickname }}</span>
                            <span class="commentStar" v-show="evaluationStarShow">
                                                <img v-for="(item,index) in starLevel" :key="index" src="./../evaluate/star.png">
                                                <img v-for="(item,index) in (5-starLevel)" :key="index" src="./../evaluate/star1.png">
                                            </span>
                            <span class="userCommentTime">{{ (evaluationListOne.createTime+'').split(" ")[0] }}</span>
                        </div>
                        <div class="commentContent">
                            <p class="userCommentContent">{{ evaluationListOne.comment==''?'该用户未填写评论文字':evaluationListOne.comment }}</p>
                            <ul class="clear userCommentImg" v-show="evaluationListOne.images==''?false:true">
                                <li v-for='(item,index) in (evaluationListOne.images+"").replace(/\"/g,"").replace(/\[|]/g,"").split(",")' :key="index">
                                    <img :src='item'>
                                </li>
                            </ul>
                            <div class="merchantReply" v-show="evaluationListOne.reply == null?false:true">
                                <span class="merchantReplyTitle">商家回复：</span>
                                <span class="merchantReplyTime">{{ evaluationListOne.replyTime == null?"":(evaluationListOne.replyTime+'').split(" ")[0] }}</span>
                                <p class="merchantReplyContent">{{ evaluationListOne.reply == null?'':evaluationListOne.reply}}</p>
                            </div>
                            <div class="seeAllReview">
                                <p class="clear"><span style="text-align: center;">查看全部<span>{{ evaluationTotal }}</span>条评论</span>&ensp;<i class='icon iconfont icon-arrow-right' @click="productDetailBtn2"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
                <mt-popup v-model="popupVisible" position="bottom" style='width:100%;font-size:0.28rem;'>
                    <div id="zbd-commodityInformation" class="clear">
                        <div class="zbd_commodityImg"><img :src="commodityImageOne"></div>
                        <div class="zbd_commodityInfo">
                            <p>￥{{ commodityInfo.price == ''?0:commodityInfo.price }}</p>
                            <p>{{ commodityInfo.name }}</p>
                            <p>库存量：{{ commodityInfo.displayQuantity
                                <1||commodityInfo.displayQuantity==''?0:commodityInfo.displayQuantity }}</p>
                        </div>
                        <div class='commodityInfoCloseBtn' @click="btnClose">&times;</div>
                        <!-- <div class="commodityInfoLine"></div> -->
                    </div>
                    <div id="zbd-commoditySpecification" v-show="specificationArr.length == 0?false:true" style="height: 5rem;overflow-y: auto;" class="clear">
                        <ul>
                            <li v-for="(item,index) in specificationArr" :key="index" style="position: relative;    margin-bottom: 0.3rem;">
                                <div class="commodityInfoLines"></div>
                                <div style="    padding-top: 0.2rem;
                                    padding-bottom: 0.2rem;
                                    text-align: left;
                                    padding-left: 0.3rem;">{{ item.text }}</div>
                                <ul  class="clear" style="margin-left: 0.3rem;">
                                    <li v-for="(items,indexs) in item.value" :key="indexs" @click="checkedSpecification(indexs,index,item.text,items,items.value.id)" :class="items.valueClass" class="zbd-checkedSpecification" >{{ items.value.text }}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div style="position: relative;">
                        <div class="commodityInfoLine"></div>
                    </div>
                    <p class="zbd-commodityInfoNums">数量</p>
                    <div class="zbd-num">
                        <div class="zbd-numLess" :class="numLessBackground?'numLessNo':'numLessYes'" @click="lessClick">-</div>
                        <input type="number" @change="numInputChange" class="zbd-numInput" v-model="specificationNum">
                        <div class="zbd-numPlus" @click="plusClick">+</div>
                    </div>
                    <div class="zbd-Confirmation" @click="confirmPurchaseClick">
                        <p class='button'>确认</p>
                    </div>
                </mt-popup>
                <mt-popup v-model="receiveCoupons" position="bottom" style='width:100%;'>
                    <p class='shopBxo'>领取优惠劵</p>
                    <ul class='shopBox'>
                        <li v-for='(item,index) in coupon' :key='index' v-if='item.couponInfo'>
                             <div class='shopFont'>
                                <p>{{ item.couponInfo?item.couponInfo.couponMoney:"" }}元</p>
                                <p>{{ item.couponInfo?item.couponInfo.couponName:"" }}</p>
                                <p>使用期限 {{ item.couponInfo?item.couponInfo.starTime.split(" ")[0]:"" }}—{{ item.couponInfo?item.couponInfo.endTime.split(" ")[0]:"" }}</p>
                            </div>
                            <button @click='okcoupon(item.couponId)' :disabled='item.couponAmount==0' :class='item.couponAmount==0?"noButton":""'>领取</button>
                        </li>
                    </ul>
                    <div class='zbd_closeBtn' @click="closeCoupon">关闭</div>
                </mt-popup>
            </div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft">
            <div v-if="show2" class="commentDetail">
                <div class="zbd-evalua" v-show="evaluationListNoShow">
                    <p><img src="/static/images/nodata.png"></p>
                    <p>暂无评论！</p>
                </div>
                <div v-show="evaluationListShows">
                    <div class="userAvatarList">
                        <ul class="clear">
                            <li v-for="(item,index) in evaluationList" :key="index" v-if="(index<13)">
                                <img :src="item.customerAccount.avatar">
                            </li>
                            <li v-show="evaluationList.length > 13?true:false" style="line-height: 0.5rem;background-color: #fff;font-size: 0.45rem;">...</li>
                        </ul>
                    </div>
                    <div class="userReviewList">
                        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="2">
                            <li v-for="(item,indexs) in evaluationList" :key="indexs">
                                <div class="commentHeaderInfo clear">
                                    <span class="commentNickname">{{ item.customerAccount.nickname==null?'匿名买家':item.customerAccount.nickname }}</span>
                                    <span class="commentStar" v-show="item.commodityEvaluationLabels.length ==0?false:true">
                                                        <img v-for="item in item.commodityEvaluationLabels.length ==0?starLevel:item.commodityEvaluationLabels[0].level"  style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star.png">
                                                        <img v-for="item in item.commodityEvaluationLabels.length ==0?starLevel:(5-item.commodityEvaluationLabels[0].level)"  style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star1.png">
                                                    </span>
                                    <span class="userCommentTime">{{ (item.createTime+'').split(" ")[0] }}</span>
                                </div>
                                <div class="commentContent">
                                    <p class="userCommentContent">{{ item.comment==''?'该用户未填写评论文字':item.comment }}</p>
                                    <ul class="clear userCommentImg" v-show="item.images==''?false:true">
                                        <li v-for='(item,index) in (item.images+"").replace(/\"/g,"").replace(/\[|]/g,"").split(",")' :key="index">
                                            <img :src='item'>
                                        </li>
                                    </ul>
                                    <div class="merchantReply" v-show="item.reply == null?false:true">
                                        <span class="merchantReplyTitle">商家回复：</span>
                                        <span class="merchantReplyTime">{{ item.replyTime == null?"":(item.replyTime+'').split(" ")[0] }}</span>
                                        <p class="merchantReplyContent">{{ item.reply == null?'':item.reply}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <mt-spinner v-show="commentLoading" :type="2" :size="25" color="#26a2ff"></mt-spinner>
            </div>
        </transition>
        <div class='detailBottom'>
            <ul>
                <li>
                    <i class='icon iconfont icon-tubiaolunkuo-'></i>
                    <p>客服</p>
                </li>
                <li @click="collectionStar">
                    <i class="icon iconfont" :class="starXingXing" :style="starXingXingColor"></i>
                    <p>收藏</p>
                </li>
                <li style="position: relative;" @click="goToList">
                    <i class='icon iconfont icon-gouwuche'></i>
                    <p>购物车</p>
                    <div v-show="shopCarNumShow" style="position: absolute;
                                    top: 0.04rem;
                                    right: 0.2rem;
                                        padding: 0.02rem;
                                        min-width: 0.28rem;
                                    height: 0.28rem;
                                    line-height: 0.28rem;
                                    border-radius: 25px;
                                    background: #ff2500;
                                    color: #fff;">{{ shopNum>=100?"99+":shopNum }}</div>
                </li>
                <li @click='addShopCar' class='font border'>
                    <p class='font'>加入购物车</p>
                </li>
                <li @click='buyNow' class='border'>
                    <p class='button'>立即购买</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    import {
        Toast
    } from 'mint-ui'
    import {
        InfiniteScroll
    } from 'mint-ui'
    import {
        Spinner
    } from 'mint-ui'
    // import { mapState,mapMutations,mapGetters } from 'vuex'
    import imageAds from '@/components/view/template/imageAds.vue'
    import classification from '@/components/view/template/classification.vue'
    import titles from '@/components/view/template/titles.vue'
    import commodity from '@/components/view/template/commodity.vue'
    import detailsImage from '@/components/view/template/detailsImage.vue'
    import window from '@/components/view/template/window.vue'
    import window2 from '@/components/view/template/window2.vue'
    import productDetail from './productDetail.vue'
    export default {
        data() {
            return {
                selected: '1',
                value: '',
                comlists: '',
                bannerArr2: '',
                detailTemplateUrl: '',
                show1: true,
                show2: false,
                commodityInfo: '',
                productDetailBack: {
                    button: true,
                    productDetailBack1:true,
                    productDetailBack2: false
                },
                productDetailBacks: {
                    button: false,
                    productDetailBack1:false,                    
                    productDetailBack2: true
                },
                popupVisible: false,
                shareVisible: false,
                coupon:[],
                receiveCoupons: false,
                couponShow: false,
                shopNum: '',
                shopCarNumShow: false,
                specificationNum: 1,
                numLessBackground: true,
                commodityId: '',
                customerId: '',
                starXingXing: {
                    "icon-shoucang": true,
                    "icon-xingxing1": false
                },
                starXingXingColor: {
                    "color": "#838d98"
                },
                isStar:false,
                starId:'',
                commentLoading:false,
                confirmPurchase:false,
                evaluationList:'',
                evaluationListOne:'',
                evaluationStarShow:false,
                starLevel:'',
                evaluationListShows:true,
                evaluationListNoShow:false,
                nickname:'',
                evaluationTotal:'',
                evaluationNum:'1',
                stopLoadMore:true,
                commodityImageOne:'',
                hostName:'',
                port:'',
                isFunctionBtn:'',
                isLogins:'',
                specificationArr:'',
                specification:'',
                areadyValue:'',
                areadyId:'',
                appid:''
            };
        },
        
        created() {
            let companyid=this.$route.query.companyId;
            if(companyid!=null){
                sessionStorage.setItem('companyId',companyid);
            }
            // 
            this.$root.$emit('header', '商品详情');
            this.hostName = location.hostname;
            this.port = location.port;
            //console.log(this.comlist)
            ///////////////////////（详情模板）/////////////////////////////
            //浏览状态 和 手机状态显示的不同详情页 
            let isBrowse;
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                isBrowse = false;
            } else {
                isBrowse = true;
            }
            if (isBrowse) { //后台管理浏览效果
               // this.detailTemplateUrl = sessionStorage.getItem("detailTemplateUrl");
                let companyId = sessionStorage.getItem("companyId");
                let id = this.getURLparms("id");
              //  console.log(id) //详情模板ID
                let that = this;
                this.$http.post('/api/product/mall/template/queryMap/mall', {
                        'templateID': id,
                        'templateType': 3,
                        'companyId': companyId
                    })
                    .then(function(response) {
                        // console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                        // console.log(comlists)
                        that.comlists = comlists
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
            } else{ //移动端浏览效果
                let id = this.getURLparms("id"); //详情模板ID
                //console.log(id)
                if (id == null) {
                    let that = this;
                    //模板ID 为空的情况下，先取商品ID 根据商品ID 查询模板ID
                    let commodityId = this.getURLparms("commodityId");
                    let companyId = this.getURLparms("companyId");
                    if(companyId == null || companyId == 'null'){
                       companyId = sessionStorage.getItem("companyId");
                    }
                    this.commodityId = commodityId
                    //根据商品ID 查询相关的商品信息(根据商品取模板ID)
                    this.$http.post('/api/product/commodity/info/queryMap/mall', {
                            "companyId": companyId,
                            "id": commodityId
                        })
                        .then(function(response) {
                           // console.log(response)
                            if(response.data.info.length == 0){
                               // console.log(11)
                            }else{
                                let detailTemplateId = response.data.info[0].detailTemplateId
                                let companyId = sessionStorage.getItem("companyId");
                                //根据详情模板ID查询模板信息
                                that.$http.post('/api/product/mall/template/queryMap/mall', {
                                        'templateID': detailTemplateId,
                                        'templateType': 3,
                                        'companyId': companyId
                                    })
                                    .then(function(response) {
                                      //  console.log(response)
                                        if (response.data.info.length == 0) {
                                            console.log('商品没有绑定详情模板')
                                        } else {
                                            let comlists = JSON.parse(response.data.info[0].comlist)
                                             //console.log(comlists)
                                            that.comlists = comlists
                                        }
                                    })
                                    .catch(function(response) {
                                        console.log(response)
                                    })
                            }
                            
                            //商品信息的调用及渲染
                            that.commodityInfo = response.data.info[0]
                           // console.log(that.commodityInfo)
                            that.bannerArr2 = that.commodityInfo.commodityImageList
                           //  console.log(that.bannerArr2)
                            if (that.commodityInfo.commodityImageList.length == 0) {
                                that.commodityImageOne = '/static/images/nodata.png'
                            } else {
                                that.commodityImageOne = "http://"+that.hostName+":8887" + that.commodityInfo.commodityImageList[0].url
                            }
                            //规格渲染
                            
                            // console.log(that.commodityInfo.options)
                            // if(that.commodityInfo.options == "null" || that.commodityInfo.options == null){
                            //     //console.log(1)
                            //     that.specificationArr = []
                            // }else{
                            //     that.specificationArr = JSON.parse(that.commodityInfo.options)
                           
                            //     that.specificationArr.forEach((item,index)=>{
                            //         let lengths = item.value.length
                            //         let arrObj = [];
                                    
                            //         // 
                            //         // objs.value=item.value
                            //         console.log(item)
                            //         item.value.forEach(item=>{
                            //             let objs = {
                            //                 value:'',
                            //                 valueClass:{
                            //                     optionsCheckeds:true,
                            //                     optionsChecked:false
                            //                 }
                            //             }
                            //             console.log(item)
                            //             objs.value = item
                            //             arrObj.push(objs)
                            //         })
                            //         console.log(arrObj)
                            //         item.value = arrObj
                            //         })
                                    
                            //         console.log(that.specificationArr)
                            // }

                            //新规格渲染
                            console.log(that.commodityInfo.commodityConditionKs )
                            if(that.commodityInfo.commodityConditionKs == "null" || that.commodityInfo.commodityConditionKs == null){
                                //console.log(1)
                                that.specificationArr = []
                            }else{
                                that.specificationArr = that.commodityInfo.commodityConditionKs
                           
                                that.specificationArr.forEach((item,index)=>{

                                    let arrObj = [];
                                    
                                    // objs.value=item.commodityConditionVs
                                    console.log(item)
                                    item.commodityConditionVs.forEach(item=>{
                                        let objs = {
                                            value:'',
                                            valueClass:{
                                                optionsCheckeds:true,
                                                optionsChecked:false
                                            }
                                        }
                                        console.log(item)
                                        objs.value = item
                                        arrObj.push(objs)
                                    })
                                    console.log(arrObj)
                                    item.value = arrObj
                                    })
                                    
                                    console.log(that.specificationArr)
                            }
                        })
                        .catch(function(response) {
                            console.log(response)
                        });
                } else {
                    //console.log(this.comlist)
                    let that = this;
                    let companyId = sessionStorage.getItem("companyId");
                    this.$http.post('/api/product/mall/template/queryMap/mall', {
                            'templateID': id,
                            'templateType': 3,
                            'companyId': companyId
                        })
                        .then(function(response) {
                            //console.log(response)
                            let comlists = JSON.parse(response.data.info[0].comlist)
                            // console.log(comlists)
                             that.comlists = comlists
                        })
                        .catch(function(response) {
                            console.log(response)
                        })
                }
            }
            //购物车数量
            let that = this;
            this.$http.post('/api/product/shoppingCart/myShoppingCart', {})
                .then(function(response) {
                    // console.log(response)
                    if (response.data.status == 401) {
                        that.shopCarNumShow = false
                        // console.log(that.shopCarNumShow)
                    }else if(response.data.status == 403){
                        that.shopCarNumShow = false
                    }
                     else {
                        //console.log(response.data.info)
                        if (response.data.info.length == 0) {
                            that.shopCarNumShow = false
                        } else if (response.data.info.length > 0) {
                            that.shopCarNumShow = true
                            let num = null;
                            response.data.info.forEach((element, i) => {
                                //  console.log(element.commodityCount)
                                num += element.commodityCount
                            });
                            that.shopNum = num
                        }
                    }
                })
                .catch(function(response) {
                    console.log(response)
                })
            //查询产品是否收藏
            this.$http.post('/api/product/commodity/favorite/queryOne?commodityId='+that.commodityId)
            .then(function(response){
               // console.log(response)
                if(response.data.status == 201){
                    Toast({
                        message:response.data.msg,
                        duration:1000
                       }
                    );
                }else if(response.data.status == 203){
                    that.starXingXing['icon-shoucang'] = true
                    that.starXingXing['icon-xingxing1'] = false
                    that.starXingXingColor.color = "#838d98"
                    that.isStar = false
                }else if(response.data.status == 200){
                    that.starXingXing['icon-shoucang'] = false
                    that.starXingXing['icon-xingxing1'] = true
                    that.starXingXingColor.color = "#ffa700"
                    that.isStar = true
                    that.starId = response.data.info.id
                }else if(response.data.status == 401){
                    that.isLogins = "no"
                    //console.log(that.isLogins)
                }
            })
            .catch(function(response){
                console.log(response)
            });

            //根据商品ID 查询相关的评论列表
            this.$http.post('/api/product/commodity/evaluation/query/mall?page=1&pageSize=10', {
                    "commodityId": that.commodityId
                })
                .then(function(response) {
                  //  console.log(response)
                    that.evaluationList = response.data.info.list
                    if (that.evaluationList.length == 0) {
                        that.evaluationListShows = false
                        that.evaluationListNoShow = true
                        return false
                    }
                    that.evaluationListOne = that.evaluationList[0]
                   // console.log(that.evaluationListOne)
                    if (that.evaluationListOne.commodityEvaluationLabels.length == 0) {
                        that.evaluationStarShow = false
                    } else {
                        that.evaluationStarShow = true
                        let levels = 0;
                        that.evaluationListOne.commodityEvaluationLabels.forEach((i, d) => {
                            levels += (i.level - 0)
                        })
                       // console.log(levels)
                        that.starLevel = Math.round(levels / that.evaluationListOne.commodityEvaluationLabels.length)
                    }
                    if (that.evaluationListOne.customerAccount.nickname == null) {
                        that.nickname = '匿名买家'
                    } else {
                        that.nickname = that.evaluationListOne.customerAccount.nickname
                    }
                    that.evaluationTotal = response.data.info.total
                })
                .catch(function(response) {
                    console.log(response)
                });
            //根据商品ID 查询相关优惠券列表
            let getcouponData = new Promise(function(rel, rej) {
                let url = '/api/product/coupon/commodity/find/mall';
                that.$http({
                    url: url,
                    method: 'POST',
                    data: {
                        commodityId: that.commodityId
                    }
                }).then(response => {
                    rel(response)
                }).catch(error => {
                    rej(error)
                })
            });
            getcouponData.then(function(result) {
                // console.log(result)
                that.coupon = result.data.info.list
                 // console.log(that.coupon)
                that.coupon.forEach((item, index) =>{
                    if(item.couponInfo == null || item.couponInfo == "null"){
                        that.couponShow = false
                    }else{
                        that.couponShow = true
                    }
                })
                // if (that.coupon.length > 0) {
                //     that.couponShow = true
                // } else {
                //     that.couponShow = false
                // }
            }).catch(function(errmsg) {
                console.log(errmsg)
            })
        },
        methods: {
            // 获取appid
            getAppId(){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    let companyid=sessionStorage.getItem('companyId');
                    if(companyid==null){
                        companyid = this.getURLparms("companyId")
                    }
                    this.$http.get('/api/product/order/weixin/config?companyId='+companyid)
                    .then(res=>{
                        if(res.data.status==200){
                            that.appid=res.data.info.appid;
                            resolve(true);
                        }
                        else{
                            resolve(false);
                            Toast({
                                message: res.data.msg,
                                duration: 1000
                            });
                        }
                    })
                    .catch(err=>{
                        resolve(false);
                        Toast('appid获取失败');
                    })
                }) 
            },
            // 登录
            tologin(){
                this.getAppId().then(flag=>{
                    if(flag){
                        let companyid=sessionStorage.getItem('companyId');
                        if(companyid==null){
                          companyid = this.getURLparms("companyId")
                        }
                        let recommendedTeamId=this.$route.query.recommendedTeamId;
                        let recommendedAdminId=this.$route.query.recommendedAdminId;
                        // alert(recommendedAdminId);
                        // alert(recommendedTeamId);
                        // let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+
                        //     '&redirect_uri=http://pay.jingrunjia.com.cn?company='+companyid
                        //     +'&recommendedTeamId='+recommendedTeamId
                        //     +'&recommendedAdminId='+recommendedAdminId
                        //     +'&response_type=code&scope=snsapi_userinfo&state=STATE';
                        let json={
                            company:companyid,
                            recommendedTeamId:recommendedTeamId,
                            recommendedAdminId:recommendedAdminId
                        };
                            let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+
                            '&redirect_uri=http://pay.jingrunjia.com.cn?json='+JSON.stringify(json)
                            +'&response_type=code&scope=snsapi_userinfo&state=STATE';
                        // let url=
                        //     'http://localhost:8082?company='+companyid
                        //     +'&recommendedTeamId='+recommendedTeamId
                        //     +'&recommendedAdminId='+recommendedAdminId
                        //     +'&response_type=code&scope=snsapi_userinfo&state=STATE';
                        location.href=url;
                    }
                }); 
            },
            //获取地址栏参数，name:参数名称
            getUrlParms(name) {
                let url = this.detailTemplateUrl
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = url.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            },
            getURLparms(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            },
            productDetailBtn1() {
                this.show1 = true
                this.show2 = false
                this.productDetailBack.button = true
                this.productDetailBack.productDetailBack1 = true                
                this.productDetailBack.productDetailBack2 = false
                this.productDetailBacks.button = false
                this.productDetailBacks.productDetailBack1 = false                                
                this.productDetailBacks.productDetailBack2 = true
            },
            productDetailBtn2() {
                this.show1 = false
                this.show2 = true
                this.productDetailBack.button = false
                this.productDetailBack.productDetailBack1 = false                                
                this.productDetailBack.productDetailBack2 = true
                this.productDetailBacks.button = true
                this.productDetailBacks.productDetailBack1 = true                                                
                this.productDetailBacks.productDetailBack2 = false
            },
            btnClose() {
                let type = "^[0-9]*[1-9][0-9]*$";
                let r = new RegExp(type);
                let flag = r.test(this.specificationNum);
                if (!flag) {　　 //alert("数量应为正整数");
                    　　
                    this.confirmPurchase = false
                    this.popupVisible = false
                } else if (this.commodityInfo.displayQuantity < this.specificationNum) {
                    //alert("库存不足");
                    this.confirmPurchase = false
                    this.popupVisible = false
                } else {
                    this.popupVisible = false
                    this.confirmPurchase = false
                    this.shareVisible = false;
                }
            },
            showServer(name) {
                this.popupVisible = true;
                // this.specificationNum = 1
            },
            showShare(name) {
                this.shareVisible = true;
            },
            getcoupon() {
                //获取优惠券
                this.receiveCoupons = true
            },
            closeCoupon() {
                this.receiveCoupons = false
            },
            //领取优惠劵
            okcoupon(id) {
               // console.log(id)
                let that = this
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
                        Toast({
                                message: '领取成功',
                                duration: 500
                            });
                        that.receiveCoupons = false
                    } else {
                        Toast({
                                message: '领取失败',
                                duration: 500
                            });
                        if(response.data.info == "尚未登录"){
                            sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+that.commodityId);
                            // that.$router.push({
                            //     name: 'index',
                            //     params: {
                            //         logining:true
                            //     }
                            // });
                            that.tologin();
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            goToList() {
                let that = this;
                that.$http.post('/api/product/shoppingCart/myShoppingCart', {})
                    .then(function(response) {
                       // console.log(response)
                        if (response.data.status == 401) {
                            Toast({
                                message: '尚未登录',
                                duration: 1000
                            });
                            //that.$router.push('./login')
                            sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+that.commodityId);
                            // that.$router.push({
                            //     name: 'index',
                            //     params: {
                            //         logining:true
                            //     }
                            // });
                             that.tologin();
                        } else {
                            that.$router.push({
                                name: 'index',
                                params: {
                                    direct: "shopcar"
                                }
                            });
                            //that.$router.push({path:'./shopCar',query:{name:'templatePages'}})
                        }
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
            },
            addShopCar() {
           
                this.isFunctionBtn = "0"
                //this.shopNum++;
                if (this.confirmPurchase == false) {
                    this.popupVisible = true
                } else {
                    let commodityId = this.commodityId
                  //  console.log(commodityId)
                    //客户ID 
                    let customer = localStorage.getItem('userinfo')
                   // console.log(customer)
                        if(customer){
                            console.log('已登录')
                        }else{
                            Toast({
                                message:'尚未登录',
                                duration:1000
                            }
                            );
                            //this.$router.push('./login')
                            sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+this.commodityId);
                            // this.$router.push({
                            //     name: 'index',
                            //     params: {
                            //         logining:true
                            //     }
                            // });
                            this.tologin();
                            return false
                        }
                    let customerData = JSON.parse(JSON.parse(customer).data);
                   // console.log(customerData.id)
                    this.customerId = customerData.id
                    if (customerData.id == null) {
                        Toast({
                            message: '尚未登录',
                            duration: 1000
                        });
                        sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+this.commodityId);
                        // this.$router.push({
                        //         name: 'index',
                        //         params: {
                        //             logining:true
                        //         }
                        //     });
                        this.tologin();
                        return false
                    } else {
                        let customerId = this.customerId
                      //  console.log(customerId)
                        let commodityCount = this.specificationNum
                       // console.log(commodityCount)
                        let options = JSON.stringify(this.areadyValue)
                        let optionsId = JSON.stringify(this.areadyId)
                        let that = this;
                        this.$http.post('/api/product/shoppingCart/insertOne', {
                                'commodityId': commodityId,
                                'customerId': customerId,
                                'commodityCount': commodityCount,
                                'options':options,
                                'commodityDetail':optionsId
                            })
                            .then(function(response) {
                              //  console.log(response)
                                if (response.data.status == 401) {
                                    that.shopCarNumShow = false
                                    Toast({
                                        message: '尚未登录',
                                        duration: 1000
                                    });
                                    sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+that.commodityId);
                                    // that.$router.push({
                                    //     name: 'index',
                                    //     params: {
                                    //         logining:true
                                    //     }
                                    // });
                                    that.tologin();
                                } else {
                                    Toast({
                                        message: '加入购物车成功',
                                        duration: 500
                                    });
                                    that.$http.post('/api/product/shoppingCart/myShoppingCart', {})
                                        .then(function(response) {
                                            //console.log(response)
                                            if (response.data.info.length == 0) {
                                                that.shopCarNumShow = false
                                            } else {
                                                that.shopCarNumShow = true
                                                let num = null;
                                                response.data.info.forEach((element, i) => {
                                                //    console.log(element.commodityCount)
                                                    num += element.commodityCount
                                                });
                                                that.shopNum = num
                                            }
                                        })
                                        .catch(function(response) {
                                            console.log(response)
                                        })
                                }
                            })
                            .catch(function(response) {
                                console.log(response)
                            })
                    }
                }
            },
            collectionStar() {
                if (this.isStar == false) {
                    //未收藏状态 调用收藏接口
                    let that = this;
                    this.$http.post('/api/product/commodity/favorite/insertOne', {
                            "commodityId": that.commodityId
                        })
                        .then(function(response) {
                           // console.log(response)
                            if (response.data.status == 401) {
                                Toast({
                                    message: '尚未登录',
                                    duration: 1000
                                });
                                //that.$router.push('./login')
                                sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+that.commodityId);
                                // that.$router.push({
                                //     name: 'index',
                                //     params: {
                                //         logining:true
                                //     }
                                // });
                                that.tologin();
                            } else if (response.data.status == 203) {
                                Toast({
                                    message: response.data.msg,
                                    duration: 1000
                                });
                            } else if (response.data.status == 200) {
                                Toast({
                                    message: response.data.msg,
                                    duration: 1000
                                });
                                that.starXingXing['icon-shoucang'] = false
                                that.starXingXing['icon-xingxing1'] = true
                                that.starXingXingColor.color = "#ffa700"
                                that.isStar = true
                                that.starId = response.data.info.id
                            }
                        })
                        .catch(function(response) {
                            console.log(response)
                        });
                } else if (this.isStar == true) {
                    //收藏状态 调用取消收藏接口
                    let that = this;
                    this.$http.post('/api/product/commodity/favorite/remove?id=' + that.starId)
                        .then(function(response) {
                         //   console.log(response)
                            if (response.data.status == 201) {
                                Toast({
                                    message: response.data.msg,
                                    duration: 1000
                                });
                            } else if (response.data.status == 203) {
                                Toast({
                                    message: response.data.msg,
                                    duration: 1000
                                });
                            } else if (response.data.status == 200) {
                                Toast({
                                    message: response.data.msg,
                                    duration: 1000
                                });
                                that.starXingXing['icon-shoucang'] = true
                                that.starXingXing['icon-xingxing1'] = false
                                that.starXingXingColor.color = "#838d98"
                                that.isStar = false
                            }
                        })
                        .catch(function(response) {
                            console.log(response)
                        });
                    // alert(this.isStar)
                }
            },
            loadMore() {
                //评论滚动到底部自动加载
                let that = this;
                this.loading = true;
                this.commentLoading = true
                setTimeout(() => {
                    if (that.stopLoadMore == true) {
                        this.evaluationNum++
                            //根据商品ID 查询相关的评论列表
                            this.$http.post('/api/product/commodity/evaluation/query/mall?page=' + this.evaluationNum + '&pageSize=10', {
                                "commodityId": that.commodityId
                            })
                            .then(function(response) {
                              //  console.log(response)
                                if (response.data.info.list.length == 0) {
                                    // Toast({
                                    //         message:"没有更多了",
                                    //         duration:500
                                    //     }
                                    //     );
                                    that.stopLoadMore = false
                                } else {
                                    that.evaluationList = that.evaluationList.concat(response.data.info.list)
                                }
                            })
                            .catch(function(response) {
                                console.log(response)
                            });
                        this.loading = false;
                        this.commentLoading = false
                    } else if (that.stopLoadMore == false) {
                        // Toast({
                        //         message:"没有更多了",
                        //         duration:500
                        //     }
                        //     );
                        this.loading = false;
                        this.commentLoading = false
                    }
                }, 2000);
            },
            //选择规格
            checkedSpecification(indexs,index,name,items,id){
                this.specificationArr[index].value.forEach(item=>{
                    item.valueClass.optionsChecked = false
                    item.valueClass.optionsCheckeds = true
                })
                this.specificationArr[index].value[indexs].valueClass.optionsChecked = true
                this.specificationArr[index].value[indexs].valueClass.optionsCheckeds = false

                //规格组合信息
                    var arrs = [] ;
                    var arrId = [] ;
                    this.specificationArr.forEach(item=>{
                        let names = item.text
                        item.value.forEach(item=>{
                            let objs = {
                                name:'',
                                value:''
                            }
                            if(item.valueClass.optionsChecked == false){
                            }else if(item.valueClass.optionsChecked == true){
                                objs.name = names
                                objs.value =  item.value.text
                                arrs.push(objs)
                                arrId.push(item.value.id)
                            }
                            
                        })
                       
                    })
                    // console.log(arrs)
                    this.areadyValue = arrs;
                //规格组ID
                   //  console.log(arrId)
                     if(arrId){
                          var compare = function (x, y) {//比较函数
                            if (x < y) {
                                return -1;
                            } else if (x > y) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                      //  console.log(arrId.sort(compare));
                        let arrIds = arrId.sort(compare)
                        let that = this;
                        this.$http.post('/api/product/commodity/detail/queryList', {
                                "conditionVIds": JSON.stringify(arrIds)
                            })
                            .then(function(response) {
                                console.log(response)
                                if (response.data.status == 401) {
                                    Toast({
                                        message: '尚未登录',
                                        duration: 1000
                                    });
                                    
                                } else if (response.data.status == 203) {
                                    Toast({
                                        message: response.data.msg,
                                        duration: 1000
                                    });
                                } else if (response.data.status == 200) {
                                   if(response.data.info[0]){
                                       let datas =  response.data.info[0];
                                       that.commodityInfo.price = datas.commodityPrice;
                                       that.commodityInfo.displayQuantity = datas.displayQuantity;
                                       let commodityInfos = new Object;
                                       commodityInfos["id"] = datas.id;
                                       commodityInfos["commodityId"] = datas.commodityId;
                                       commodityInfos["commodityPrice"] = datas.commodityPrice;
                                       commodityInfos["displayQuantity"] = datas.displayQuantity;
                                      // console.log(commodityInfos)
                                       that.areadyId = commodityInfos
                                   }
                                }
                            })
                            .catch(function(response) {
                                console.log(response)
                            });
                     }
            },
            lessClick() {
                if (this.specificationNum == 1) {
                    this.numLessBackground = true
                    return false
                } else if (this.specificationNum > 1) {
                    this.numLessBackground = false
                    this.specificationNum = this.specificationNum - 1
                    if (this.specificationNum == 1) {
                        this.numLessBackground = true
                        return false
                    }
                }
            },
            plusClick() {
                if (this.specificationNum == 1) {
                    this.numLessBackground = true
                    this.specificationNum++
                        if (this.specificationNum > 1) {
                            this.numLessBackground = false
                        }
                    }else if(this.specificationNum > 1){
                        this.numLessBackground = false
                        this.specificationNum++
                    }
                },
                numInputChange(){
                    if(this.specificationNum == 1){
                        this.numLessBackground = true
                    }else if(this.specificationNum > 1){
                        this.numLessBackground = false
                    }
                },
                confirmPurchaseClick(){
                    var arrs = [] ;
                   // console.log(this.specificationArr)
                   if(this.specificationArr.length == 0){
                       //console.log(1)
                       
                   }else{
                       
                        this.specificationArr.forEach(item=>{
                            let names = item.name
                            item.value.forEach(item=>{
                                let objs = {
                                    name:'',
                                    value:''
                                }
                                if(item.valueClass.optionsChecked == false){
                                }else if(item.valueClass.optionsChecked == true){
                                    objs.name = names
                                    objs.value =  item.value
                                    arrs.push(objs)
                                }
                                
                            })
                        
                        })
                    // console.log(arrs)
                   }
                     if(arrs.length != this.specificationArr.length){
                        Toast({
                            message: "有未选择的规格值",
                            duration: 500
                        });
                     　　return false;
                    }
                    let type="^[0-9]*[1-9][0-9]*$"; 
                    let r=new RegExp(type); 
                    let flag=r.test(this.specificationNum);
                    if(!flag){
                        Toast({
                            message: "数量应为正整数",
                            duration: 500
                        });
                    　　return false;
                    }else if(this.commodityInfo.displayQuantity<this.specificationNum){
                        Toast({
                            message: "库存不足",
                            duration: 500
                        });
                    }else{
                        this.popupVisible = false
                        this.confirmPurchase = true
                        if(this.isFunctionBtn == "0"){
                            this.addShopCar()
                            this.confirmPurchase = false
                        }else if(this.isFunctionBtn == "1"){
                            this.buyNow()
                            this.confirmPurchase = false
                        }
                    }
                },
                buyNow(){
                    this.isFunctionBtn = "1"
                    if(this.confirmPurchase == false){
                        this.popupVisible = true
                    }else{
                        if(this.isLogins == 'no'){
                           // this.$router.push('./login')
                           sessionStorage.setItem('fromgo','/detailTemplate?commodityId='+this.commodityId);
                        //    this.$router.push({
                        //         name: 'index',
                        //         params: {
                        //             logining:true
                        //         }
                        //     });
                            this.tologin();
                            return false
                        }
                         let commodityInfo = [];
                         let commodityInfos = this.commodityInfo
                         commodityInfos.nums = this.specificationNum
                         commodityInfos.options = this.areadyValue
                         commodityInfos.commodityDetail = JSON.stringify(this.areadyId)
                         commodityInfo.push(commodityInfos)
                         localStorage.setItem('commodityInfo',JSON.stringify(commodityInfo))
                         this.$router.push('./ordercertain')
                    }
                }
            },
        components: {
            imageAds,
            classification,
            titles,
            commodity,
            detailsImage,
            window,
            window2,
            productDetail
        },
    };
</script>
<style>
.mint-toast ,.is-placemiddle{
    z-index:10000000000;
}
    .clear:after {
        content: "";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }
    #detailTemplatePage .mint-searchbar-inner .mintui-search {
        color: #fff;
        font-size: 0.4rem;
        padding: 0 0.2rem;
    }
    #detailTemplatePage .mint-searchbar-inner {
        background: rgba(100, 100, 100, 0.2);
    }
    #detailTemplatePage .mint-searchbar {
        background: #fff;
    }
    #detailTemplatePage .mint-searchbar-core {
        color: #fff;
        background: rgba(50, 50, 50, 0);
    }
    #detailTemplatePage .page-swipe {
        height: 6.8rem;
    }
    /* new style */
    .productDetailSwitch {
        font-size: 0;
        margin-top: 0.1rem;
        margin-bottom: 0.05rem;
        position: relative;
    }
    .productDetailBack1 {
        color: rgb(255, 255, 255);
        background-color: rgb(39, 161, 242);
    }
    .productDetailBack2 {
        color: rgb(66, 66, 66);
        background-color: rgb(255, 255, 255);
    }
    .productDetailBtn1 {
        padding: 0.2rem 0.5rem;
        display: inline-block;
        border-radius: 5px 0 0 5px;
        border: 0.01rem solid #cccccc;
        font-size: 0.28rem;
    }
    .productDetailBtn2 {
        padding: 0.2rem 0.5rem;
        display: inline-block;
        border-radius: 0 5px 5px 0;
        border: 1px solid #cccccc;
        border-left: none;
        font-size: 0.28rem;
    }
    .productDetailIcon {
        font-size: 0.42rem;
        position: absolute;
        right: 0.14rem;
        top: 0.13rem;
    }
    #detailTemplatePage .proDetail {
        margin-bottom: 1.3rem;
    }
    #detailTemplatePage .commentDetail {
        font-size: 0.25rem;
        padding-left: 0.37rem;
        padding-right: 0.37rem;
        margin-bottom: 1.3rem;
    }
    #detailTemplatePage .userAvatarList {
        border: 1px solid #cccccc;
    }
    #detailTemplatePage .userAvatarList ul {
        margin-top: 0.2rem;
        margin-left: 0.2rem;
    }
    #detailTemplatePage .userAvatarList ul li {
        float: left;
        height: 0.7rem;
        width: 0.7rem;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        border-radius: 50%;
        background-color: #cccccc;
    }
    #detailTemplatePage .userAvatarList ul li img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    #detailTemplatePage .userReviewList {
        border: 1px solid #cccccc;
        border-top: none;
        border-bottom: none;
    }
    #detailTemplatePage .userReviewList li {
        padding: 0.2rem 0.2rem;
        border-bottom: 1px solid #cccccc;
    }
    #detailTemplatePage .commentHeaderInfo {
        height: 0.5rem;
        margin-bottom: 0.2rem;
        padding: 0.2rem 0.2rem 0rem 0.2rem;
    }
    #detailTemplatePage .commentNickname {
        display: inline-block;
        float: left;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    #detailTemplatePage .commentStar {
        width: 2rem;
        height: 0.5rem;
        float: left;
        padding-top: 0.07rem;
        margin-left: 0.1rem;
    }
    #detailTemplatePage .userCommentTime {
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        float: right;
        text-align: right;
    }
    #detailTemplatePage .userCommentContent {
        text-align: left;
        line-height: 0.37rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
    }
    #detailTemplatePage .userCommentImg li {
        float: left;
        float: left;
        padding: 0;
        margin-top: 0.1rem;
        margin-right: 0.1rem;
        width: 1rem;
        border: 0.01rem solid #cccccc;
        height: 1rem;
    }
    #detailTemplatePage .userCommentImg li img {
        width: 100%;
        height: 100%;
    }
    #detailTemplatePage .merchantReply {
        padding: 0.2rem;
        background-color: rgba(232, 231, 231, 0.8);
        margin-top: 0.1rem;
    }
    #detailTemplatePage .merchantReplyTitle {
        display: inline-block;
        text-align: left;
        float: left;
    }
    #detailTemplatePage .merchantReplyTime {
        display: inline-block;
        width: 75%;
        text-align: right;
    }
    #detailTemplatePage .merchantReplyContent {
        line-height: 0.35rem;
        text-align: left;
        margin-top: 0.2rem;
    }
</style>
<style lang="less" scoped>
 .noButton{
        background:gray !important;
    }
    .numLessNo {
        background-color: #f3f1f1;
    }
    .numLessYes {
        background-color: #ffffff;
    }
    .bannerImg {
        width: 100%;
        height: 100%;
    }
    #detailTemplatePage {
        // margin-top:1rem;
    }
    .clear:after {
        content: "";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }
    #detailTemplatePage .code,
    #detailTemplatePage .notice {
        width: 10%;
        float: left;
    }
    #detailTemplatePage .code i,
    #detailTemplatePage .notice i {
        font-size: 0.55rem;
        position: relative;
        top: -0.1rem;
    }
    #detailTemplatePage .mint-search {
        height: 100%;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
    }
    #detailTemplatePage .page-search {
        width: 80%;
        float: left;
    }
    .detailBottom {
        font-size: 0.20rem;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .detailBottom li {
        float: left;
        background-color: #dddddd;
        height: 1rem;
        line-height: 0.7rem;
    }
    .detailBottom p {
        line-height: 0;
    }
    .detailBottom li:nth-child(1),
    .detailBottom li:nth-child(2),
    .detailBottom li:nth-child(3) {
        width: 1rem;
        border-top: 0.01rem solid #ddd;
        background-color: #fff;
        border-bottom: 0.03rem solid #ffffff;
    }
    .detailBottom li:nth-child(1)::after,
    .detailBottom li:nth-child(2)::after {
        display: inline-block;
        content: "";
        height: 0.4rem;
        border-right: 0.02rem solid #dddddd;
        position: relative;
        top: -0.5rem;
        right: -0.46rem;
    }
    .detailBottom li:nth-child(4),
    .detailBottom li:nth-child(5) {
        width: 2.2rem;
        border: 0.01rem solid #6ab4ff;
    }
    .detailBottom li:nth-child(4) {
        border: 0.02rem solid #6ab4ff;
    }
    .detailBottom li:nth-child(5) {
        border-bottom: 0.03rem solid #6ab4ff;
    }
    .detailBottom li:nth-child(4) p,
    .detailBottom li:nth-child(5) p {
        line-height: 1rem;
    }
    .detailBottom li:nth-child(5) p {
        color: #ffffff;
        font-weight: 600;
        font-size: 0.3rem;
        background: #6ab4ff;
        letter-spacing: 0.005rem;
    }
    .detailBottom li:nth-child(4) p {
        color: #6ab4ff;
        font-weight: 600;
        font-size: 0.3rem;
        background: #ffffff;
        letter-spacing: 0.005rem;
    }
    .shopBxo {
        font-size: 0.3rem;
        padding-top: 0.1rem;
    }
    .shopBox {
        height: 7rem;
        overflow-y: auto;
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
            border-radius: 0.05rem;
        }
    }
    .shopBox li {
        position: relative;
        height: 0.5rem;
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #ddd;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .shopBox li:last-child {
        border-bottom: none;
    }
    .shopBox li {
        height: 1.26rem;
        line-height: 1.26rem;
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
    .zbd_closeBtn {
        background: #26a2ff;
        background: #26a2ff;
        line-height: 0.9rem;
        font-size: 0.34rem;
        color: #fff;
    }
    .zbd-coupon {
        font-size: 0.25rem;
        height: 1.8rem;
        padding: 0.1rem 0.1rem 0.3rem 0.3rem;
        background: url('./coupon.png') no-repeat;
        background-size: 91%;
        background-position: 0.3rem 0rem;
    }
    .zbd-coupon img {
        width: 95%;
    }
    #zbd-preferences {
        font-size: 0.25rem;
        text-align: left;
            padding: 0.4rem 0.1rem 0.3rem 0.3rem;
        border-top: 0.12rem solid #efefef;
    }
    #zbd-preferences p:nth-child(1) {
        width: 5.5rem;
        overflow: hidden;
        float: left;
        color: #7b7b7b;
       line-height: 0.38rem;
    height: 0.38rem;
    }
    #zbd-preferences p:nth-child(1) span {
        margin-left: 0.1rem;
        color: #1d1d1d;
    }
    #zbd-preferences p:nth-child(1) i {
        color: #1d1d1d;
        font-style:normal
    }
    #zbd-preferences p:nth-child(2) {
        float: right;
        margin-right: 0.1rem;
        color: #7b7b7b;
    }
    #zbd-productDescription {
        font-size: 0.25rem;
        text-align: left;
        padding: 0.4rem 0.1rem 0rem 0.3rem;
        border-top: 0.12rem solid #efefef;
    }
    #zbd-productDescription p:nth-child(1) {
        padding-bottom: 0.2rem;
        color: #7b7b7b;
    }
    #zbd-productDescription p:nth-child(1) span {
        padding-left: 0.1rem;
        color: #1d1d1d;
    }
    #zbd-productDescription p:nth-child(2) {
        padding-top: 0.2rem;
        padding-bottom: 0.4rem;
        color: #7b7b7b;
    }
    #zbd-productDescription p:nth-child(2) span {
        padding-left: 0.1rem;
        color: #1d1d1d;
    }
    #zbd-baozhang {
        font-size: 0.3rem;
        text-align: left;
        padding: 0.4rem 0.1rem 0.4rem 0.3rem;
        border-top: 0.02rem solid #efefef;
    }
    #zbd-baozhang span:nth-child(1) {
        padding-right: 0.3rem;
    }
    #zbd-baozhang span:nth-child(1) i {
        color: #27a1f2;
        font-weight: 600;
        padding-right: 0.04rem;
    }
    #zbd-baozhang span:nth-child(2) {
        padding-right: 0.3rem;
    }
    #zbd-baozhang span:nth-child(2) i {
        color: #27a1f2;
        font-weight: 600;
        padding-right: 0.04rem;
    }
    #zbd-baozhang span:nth-child(3) {
        padding-right: 0.3rem;
    }
    #zbd-baozhang span:nth-child(3) i {
        color: #27a1f2;
        font-weight: 600;
        padding-right: 0.04rem;
    }
    #zbd-baozhang span:nth-child(4) {
        padding-left: 0.6rem;
    }
    #zbd-baozhang span:nth-child(4) i {
        color: #b1b1b1;
        font-weight: 700;
        padding-right: 0.04rem;
    }
    #zbd-Tips {
        font-size: 0.3rem;
        text-align: left;
        padding: 0.2rem 0.1rem 0rem 0.3rem;
        border-top: 0.12rem solid #efefef;
    }
    #zbd-Tips p {
        padding-top: 0.1rem;
        padding-bottom: 0.3rem;
    }
    #zbd-Tips i {
        font-size: 0.4rem;
        color: #b1b1b1;
        float: right;
        transition: transform .3s;
        transform: rotate(0deg);
    }
    #zbd-TipsContent {
        font-size: 0.25rem;
        text-align: left;
        height: 0.1rem;
        line-height: 0.5rem;
        overflow: hidden;
        padding: 0.2rem 0.2rem 0.4rem 0.3rem;
        border-top: 0.02rem solid #efefef;
    }
    #zbd-commodityInfoTitle {
        font-size: 0.32rem;
        padding: 0.32rem 0.1rem 0.32rem 0.3rem;
        border-top: 0.12rem solid #efefef;
    }
    #zbd-customerReviews {
        font-size: 0.25rem;
        text-align: left;
        border-top: 0.12rem solid #efefef;
    }
    .zbd-reviewsTitle {
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 0.1rem;
        font-size: 0.3rem;
    }
    .zbd-customerReviewContent {
        margin: 0.3rem 0.1rem 1.3rem 0.1rem;
        -webkit-box-shadow: 0px 0px 2px #f4f4f4;
        box-shadow: 0px 0px 0.2rem #f4f4f4;
    }
    .commentNickname {
        text-align: center;
    }
    .commentStar img {
        width: 0.3rem;
        height: 0.3rem;
    }
    .userCommentImg {
        padding-left: 0.2rem;
        padding-right: 0.2rem;
    }
    .seeAllReview {
        padding: 0.3rem 0.1rem 0.2rem 0.2rem;
    }
    .seeAllReview i {
        float: right;
        padding-right: 0.1rem;
        font-size: 0.25rem;
    }
    #zbd-commodityInformation {
        margin-top: 0.1rem;
        position: relative;
        height: 1.8rem;
    }
    .zbd_commodityImg {
        width: 2rem;
        height: 2rem;
        border: 1px solid #ddd;
        border-radius: 0.05rem;
        position: absolute;
        top: -0.4rem;
        left: 0.3rem;
        background-color: #fff;
    }
    .zbd_commodityImg img {
        width: 1.9rem;
        height: 1.97rem;
        padding-top: 0.02rem;
    }
    .zbd_commodityInfo {
        width: 4rem;
        float: left;
        margin-left: 2.6rem;
        text-align: left;
    }
    .zbd_commodityInfo p:nth-child(1) {
        margin-top: 0.2rem;
    }
    .zbd_commodityInfo p:nth-child(2) {
        margin-top: 0.1rem;
    }
    .zbd_commodityInfo p:nth-child(3) {
        margin-top: 0.1rem;
    }
    .commodityInfoCloseBtn {
        width: 0.7rem;
        float: right;
        color: #7b7b7b;
        font-size: 0.54rem;
    }
    .commodityInfoLine {
        width: 6.8rem;
        position: absolute;
        bottom: 0px;
        left: 0.3rem;
        border-bottom: 1px solid rgb(221, 221, 221);
    }
    .commodityInfoLines {
        width: 6.8rem;
        position: absolute;
            top: 0rem;
        left: 0.3rem;
        border-bottom: 1px solid rgb(221, 221, 221);
    }
    .zbd-commodityInfoNums {
        padding-left: 0.4rem;
        padding-top: 0.2rem;
        text-align: left;
    }
    .zbd-num {
        position: relative;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.4rem;
        margin-top: 0.18rem;
        margin-bottom: 0.18rem;
    }
    .zbd-numLess {
        float: left;
        font-size: 0.5rem;
        color: #ff3b30;
        border: 1px solid #c1c0c0;
        width: 0.6rem;
        height: 0.43rem;
        line-height: 0.38rem;
    }
    .zbd-numInput {
        float: left;
        border: 1px solid #ddd;
        width: 0.6rem;
        height: 0.43rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        text-align: center;
        -webkit-appearance: none;
    }
    .zbd-numPlus {
        float: left;
        font-size: 0.35rem;
        color: #ff3b30;
        border: 1px solid #c1c0c0;
        width: 0.6rem;
        height: 0.43rem;
        line-height: 0.43rem;
    }
    .zbd-Confirmation {
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .zbd-Confirmation p {
        background: #26a2ff;
        background: #26a2ff;
        line-height: 0.9rem;
        font-size: 0.34rem;
        color: #fff;
    }
     .zbd-checkedSpecification{
      float: left;
        border: 0.02rem solid #f5f5f5;
        background-color: #f5f5f5;
        padding: 0.1rem 0.17rem;
        border-radius: 0.08rem;
        font-size: 0.24rem;
        margin: 0 0.3rem 0.08rem 0;
        color: #555;
    }
    
    .optionsChecked{
        border-color: #27a1f2; 
        background-color: #27a1f2; 
        color: #fff; 
    }
    .optionsCheckeds{
        border-color: #f5f5f5;
        background-color:  #f5f5f5;
        color: #555;
    }
    .zbd-evalua {
        padding-top: 2.5rem;
    }
    .zbd-evalua p {
        color: #bfbfbf;
        font-size: .26rem;
        text-align: center;
    }
    .zbd-evalua p img {
        display: inline-block;
        width: 2.9rem;
        height: 3.32rem;
        opacity: .5;
    }
</style>
