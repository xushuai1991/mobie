<template>
    <div id='detailTemplatePage'>
            <div class="productDetailSwitch">
                <span class="productDetailBtn1" :class="productDetailBack" @click="productDetailBtn1">商品</span>
                <span class="productDetailBtn2" :class="productDetailBacks" @click="productDetailBtn2">评论</span>
                <i class='icon iconfont icon-fenxiang productDetailIcon' @click="showShare"></i>
            </div>
            <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInLeft"
            >
                <div v-if="show1" class="proDetail">
                        <keep-alive v-for='(item,index) in bannerArr1' :key='index'>
                        <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
                        </keep-alive>
                        <productDetail :zbdCommodityInfo="commodityInfo"></productDetail>
                        <div v-show="couponShow" style="font-size:0.25rem;padding:0.1rem 0.1rem 0.3rem 0.3rem;">
                            <img @click="getcoupon" src="./coupon.png" style="width:95%;">
                        </div>
                        <div id="zbd-preferences" class="clear" style="font-size:0.25rem;text-align:left;padding:0.4rem 0.1rem 0.4rem 0.3rem;border-top:0.12rem solid #efefef;">
                            <p style="float:left;    color: #7b7b7b;">已选<span style="margin-left: 0.1rem;    color: #1d1d1d;">唯润俏枝头18头</span></p>
                            <p style="float: right;margin-right: 0.1rem; color: #7b7b7b;" @click="showServer">其他规格&ensp;></p>
                        </div>  
                        <div id="zbd-productDescription" class="clear" style="font-size:0.25rem;text-align:left;padding:0.4rem 0.1rem 0rem 0.3rem;border-top:0.12rem solid #efefef; ">
                            <p style="    padding-bottom: 0.2rem;
    color: #7b7b7b;">包邮<span style="padding-left: 0.1rem;
    color: #1d1d1d;">上海市满60.00元包邮</span></p>
                            <p style="    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
    color: #7b7b7b;">产地<span style="padding-left: 0.1rem;
    color: #1d1d1d;">唐山市</span></p>
                        </div>
                        <div id="zbd-baozhang" class="clear" style="font-size:0.3rem;text-align:left;padding:0.4rem 0.1rem 0.4rem 0.3rem;   border-top: 0.02rem solid #efefef;">
                            <span style="padding-right: 0.3rem;"><i class="icon iconfont icon-iconset0126" style="color: #27a1f2;
    font-weight: 600;    padding-right: 0.04rem;"></i>全面质检</span>
                            <span style="padding-right: 0.3rem;"><i class="icon iconfont icon-iconset0126" style="color: #27a1f2;
    font-weight: 600;    padding-right: 0.04rem;"></i>资深买手</span>
                            <span style="padding-right: 0.3rem;"><i class="icon iconfont icon-iconset0126" style="color: #27a1f2;
    font-weight: 600;    padding-right: 0.04rem;"></i>原产地直采</span>
                            <span style="padding-left: 0.6rem;"><i class="icon iconfont icon-more" style="color: #b1b1b1;
    font-weight: 700;    padding-right: 0.04rem;"></i></span>
                        </div>
                        <div id="zbd-Tips" class="clear" style="font-size: 0.3rem;text-align:left;    padding: 0.2rem 0.1rem 0rem 0.3rem;border-top:0.12rem solid #efefef;">
                            <p class="clear" style="
    padding-top: 0.1rem;
    padding-bottom: 0.3rem;"><span>温馨提示</span><i class="icon iconfont icon-xiajiantou" style="font-size: 0.4rem;color: #b1b1b1;float:right;transition: transform .3s;
    transform: rotate(0deg);"></i></p>
    <!-- transform: rotate(180deg); -->
                        </div>
                        <div id="zbd-TipsContent" style="font-size: 0.25rem;text-align:left;    height: 0.1rem;
    line-height: 0.5rem;
    overflow: hidden;padding:0.2rem 0.2rem 0.4rem 0.3rem;border-bottom: 0.12rem solid #efefef;border-top:0.02rem solid #efefef;">
                            <span>温馨提示：</span>1.该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1该商品为原产地（厂家）发货，每日1
                        </div>
                        <div id="zbd-commodityInfoTitle" style="font-size:0.32rem;padding:0.32rem 0.1rem 0.32rem 0.3rem;">商品信息</div>
                        <keep-alive v-for='(item,index) in detailImgArr1' :key='index'>
                        <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
                        </keep-alive>
                        <div id="zbd-customerReviews" class="clear" style="font-size:0.25rem;text-align:left;border-top:0.12rem solid #efefef;">
                            <p style="text-align: center;
    padding-top: 0.3rem;
    padding-bottom: 0.1rem;
    font-size: 0.3rem;">顾客评价</p>
                            <div class="zbd-customerReviewContent" style="margin:0.3rem 0.1rem 0rem 0.1rem;-webkit-box-shadow: 0px 0px 2px #f4f4f4;
    box-shadow: 0px 0px 0.2rem #f4f4f4;">
                                <div class="commentHeaderInfo clear">
                                    <span class="commentNickname" style="text-align: center;">用户昵称</span>
                                    <span class="commentStar">
                                        <!-- <img v-for="(item,index) in 3" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star.png">
                                        <img v-for="(item,index) in 2" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star1.png"> -->
                                    </span>
                                    <span class="userCommentTime">2016-7-7</span>
                                </div>
                                <div class="commentContent">
                                    <p class="userCommentContent">我只想说，特别的好！！！！！！！！！说点什么好呢，凑足十个字！</p>
                                    <ul class="clear userCommentImg" style="padding-left: 0.2rem;
    padding-right: 0.2rem;">
                                        <!-- <li v-for="(item,index) in 2" :key="index">
                                            <img src="./test.jpg">
                                        </li> -->
                                    </ul>
                                    <div class="merchantReply">
                                        <span class="merchantReplyTitle">商家回复：</span>
                                        <span class="merchantReplyTime">2016-7-4</span>
                                        <p class="merchantReplyContent">谢谢光顾！欢迎下次再来！谢谢光顾！欢迎下次再来！谢谢光顾！欢迎下次再来！</p>
                                    </div>
                                    <div style="padding: 0.2rem 0.1rem 0.2rem 0.2rem;">
                                        <p class="clear"><span style="text-align: center;">查看全部<span>48</span>条评论</span>&ensp;<i class='icon iconfont icon-arrow-right' style="float:right;padding-right:0.1rem;    font-size: 0.25rem;"></i></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;font-size:0.28rem;'>
                            <div class="clear" style="margin-top: 0.1rem;position: relative;    height: 1.8rem;">
                                <div style="    width: 2rem;
    border: 1px solid #ddd;
    border-radius: 0.05rem;
    position: absolute;
    top: -0.4rem;
    left: 0.3rem;
    background-color: #fff;"><img src="./test.jpg" style="        width: 1.9rem;
    padding-top: 0.02rem;"></div>
                                 <div style="width: 4rem;
    float: left;
    margin-left: 2.6rem;
    text-align: left;"><p style="margin-top: 0.2rem;">￥299</p><p style="margin-top: 0.1rem;">唯润俏枝头</p></div>
                                 <div style="    width: 0.7rem;
    float: right;
    color: #7b7b7b;
    font-size: 0.54rem;" class='closeBtn' @click="btnClose">&times;</div>
    <div style="    width: 6.8rem;
    position: absolute;
    bottom: 0px;
    left: 0.3rem;
    border-bottom: 1px solid rgb(221, 221, 221);"></div>
                            </div>
                            <p style="padding-left: 0.4rem;
    padding-top: 0.2rem;
    text-align: left;">数量</p>
                            <div style="    position: relative;
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.4rem;
    margin-top: 0.18rem;">
                                <div style="float: left;
    font-size: 0.5rem;
    color: #ff3b30;
    border: 1px solid #c1c0c0;
    width: 0.6rem;
    height: 0.43rem;
    line-height: 0.38rem;">-</div>
                                <input type="number" style="    float: left;
    border: 1px solid #ddd;
    width: 0.6rem;
    height: 0.43rem;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    text-align: center;">
                                <div style="float: left;
    font-size: 0.35rem;
    color: #ff3b30;
    border: 1px solid #c1c0c0;
    width: 0.6rem;
    height: 0.43rem;
    line-height: 0.43rem;">+</div>
                            </div>
                            <div style="height: 0.8rem;
    line-height: 0.8rem;"><p>确认</p></div>
                        </mt-popup>
                        <mt-popup v-model="shareVisible" position="bottom" style='width:100%;'>
                            <div class='closeBtn' @click="btnClose">分享</div>
                        </mt-popup>
                        <!-- <mt-popup v-model="receiveCoupons" position="bottom" style='width:100%;'>
                            <p class='shopBxo'>领取优惠劵</p>
                            <ul class='shopBox'>
                                <li v-for='(item,index) in coupon' :key='index'>
                                    <div class='shopFont'>
                                        <p>{{item.couponMoney}}元</p>
                                        <p>{{item.couponName}}</p>
                                        <p>使用期限 {{item.starTime.split(" ")[0]}}—{{item.endTime.split(" ")[0]}}</p>
                                    </div><button @click='okcoupon(item.id)'>领取</button>
                                </li>
                            </ul>
                            <div class='closeBtn' @click="closeCoupon">关闭</div>
                        </mt-popup> -->
                </div>
            </transition>
             <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInLeft"
            >
            <div v-if="show2" class="commentDetail">
                            <div class="userAvatarList">
                                <ul class="clear">
                                    <!-- <li v-for="(item,index) in 13" :key="index">
                                        <img src="./test.jpg" >
                                    </li> -->
                                    <li style="line-height: 0.5rem;background-color: #fff;font-size: 0.45rem;">...</li>
                                </ul>
                            </div>
                            <div class="userReviewList">
                                <ul v-infinite-scroll="loadMore"
                                    infinite-scroll-disabled="loading"
                                    infinite-scroll-distance="2"
                                >
                                    <li v-for="(item,index) in commentList" :key="index">
                                        <div class="commentHeaderInfo clear">
                                            <span class="commentNickname" >用户昵称</span>
                                            <span class="commentStar">
                                                <!-- <img v-for="(item,index) in 3" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star.png">
                                                <img v-for="(item,index) in 2" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star1.png"> -->
                                            </span>
                                            <span class="userCommentTime">2016-7-7</span>
                                        </div>
                                        <div class="commentContent">
                                            <p class="userCommentContent">{{ item }}我只想说，特别的好！！！！！！！！！说点什么好呢，凑足十个字！</p>
                                            <ul class="clear userCommentImg" style="padding-left: 0.2rem;
    padding-right: 0.2rem;">
                                                <!-- <li v-for="(item,index) in 2" :key="index">
                                                    <img src="./test.jpg">
                                                </li> -->
                                            </ul>
                                            <div class="merchantReply">
                                                <span class="merchantReplyTitle">商家回复：</span>
                                                <span class="merchantReplyTime">2016-7-4</span>
                                                <p class="merchantReplyContent">谢谢光顾！欢迎下次再来！谢谢光顾！欢迎下次再来！谢谢光顾！欢迎下次再来！</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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
                            width: 0.28rem;
                            height: 0.28rem;
                            line-height: 0.28rem;
                            border-radius: 25px;
                            background: #ff2500;
                            color: #fff;">{{ shopNum }}</div>
                    </li>
                    <li @click='addShopCar'>
                        <p>加入购物车</p>
                    </li>
                    <li @click='buyNow'>
                        <router-link to='ordercertain'>
                            <p>立即购买</p>
                        </router-link>
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
    import { Toast } from 'mint-ui'
    import { InfiniteScroll } from 'mint-ui'
    import { Spinner } from 'mint-ui'
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
                comlist:'',
                bannerArr1:'',
                detailImgArr1:'',
                detailTemplateUrl:'',
                show1:true,
                show2:false,
                commodityInfo:'',
                productDetailBack:{
                    productDetailBack1:true,
                    productDetailBack2:false
                },
                productDetailBacks:{
                    productDetailBack1:false,
                    productDetailBack2:true
                },
                popupVisible:false,
                shareVisible:false,
                coupon:[],
                receiveCoupons:false,
                couponShow:false,
                shopNum:'',
                shopCarNumShow:false,
                commodityId:'bb561d8f-3ad8-11e8-8c86-88d7f652f92c',
                customerId:'',
                starXingXing:{
                    "icon-shoucang":true,
                    "icon-xingxing1":false
                },
                starXingXingColor:{
                    "color":"#838d98"
                },
                isStar:false,
                starId:'',
                commentList:['1','2','3','4','5','6','7','8','9','10'],
                commentLoading:false
            };
        },
        created(){
            //客户ID 
            let customer = sessionStorage.getItem('userinfo')
            this.customerId = JSON.parse(customer).id

            //console.log(this.comlist)
            ///////////////////////（详情模板）/////////////////////////////

            //浏览状态 和 手机状态显示的不同详情页 
            let isBrowse = sessionStorage.getItem ("isBrowse");
            console.log(isBrowse)
            if(isBrowse == true){ //后台管理浏览效果
                this.detailTemplateUrl = sessionStorage.getItem ("detailTemplateUrl");
                let id = this.getUrlParms("id")
                 console.log(id)//详情模板ID
                  let that=this;
                    this.$http.post('/api/product/mall/template/queryMap',
                        {
                            'templateID':id,
                            'templateType':3
                        }
                    )
                    .then(function(response){
                       // console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                       // console.log(comlists)
                         //that.comlist = comlists
                        let bannerArr = [];
                        bannerArr.push(comlists[0])
                        console.log(bannerArr)
                        that.bannerArr1 = bannerArr
                    })
                    .catch(function(response){
                        console.log(response)
                    })
            }else if(isBrowse == null){ //移动端浏览效果
                let id = this.getURLparms("id");
                console.log(id)
                if(id == null){
                    let that=this;
                    //模板ID 为空的情况下，先取商品ID 根据商品ID 查询模板ID
                    let commodityId = this.getURLparms("commodityId");
                    let companyId = this.getURLparms("companyId");
                    this.commodityId = commodityId
                    //根据商品ID 查询相关的商品信息(根据商品取模板ID)
                    this.$http.post('/api/product/commodity/info/queryMap',{
                        "companyId":1,
                        "id":commodityId

                    })
                    .then(function(response){
                        console.log(response)
                        let detailTemplateId = response.data.info[0].detailTemplateId
                        //根据详情模板ID查询模板信息
                        that.$http.post('/api/product/mall/template/queryMap',
                                {
                                    'templateID':detailTemplateId,
                                    'templateType':3
                                }
                            )
                            .then(function(response){
                                console.log(response)
                                if(response.data.info.length == 0){
                                    alert('商品没有绑定详情模板')
                                }else{
                                    let comlists = JSON.parse(response.data.info[0].comlist)
                                    // console.log(comlists)
                                    // that.comlist = comlists
                                    let bannerArr = [];
                                    bannerArr.push(comlists[0])
                                    let detailImgArr = [];
                                    for(let i = 1;i<comlists.length;i++){
                                        detailImgArr.push(comlists[i])
                                    }
                                    //console.log(detailImgArr)
                                    that.bannerArr1 = bannerArr
                                    that.detailImgArr1 = detailImgArr
                                }
                            })
                            .catch(function(response){
                                console.log(response)
                            })
                        //商品信息的调用及渲染
                        that.commodityInfo = response.data.info[0]
                        console.log(that.commodityInfo)
                    })
                    .catch(function(response){
                        console.log(response)
                    });
                }else{
                    //console.log(this.comlist)
                    let that=this;
                    this.$http.post('/api/product/mall/template/queryMap',
                        {
                            'templateID':id,
                            'templateType':3
                        }
                    )
                    .then(function(response){
                        console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                        // console.log(comlists)
                        // that.comlist = comlists
                        let bannerArr = [];
                        bannerArr.push(comlists[0])
                        let detailImgArr = [];
                        for(let i = 1;i<comlists.length;i++){
                            detailImgArr.push(comlists[i])
                        }
                        //console.log(detailImgArr)
                        that.bannerArr1 = bannerArr
                        that.detailImgArr1 = detailImgArr
                    })
                    .catch(function(response){
                        console.log(response)
                    })
                }
            }

            //购物车数量
            let that=this;
            this.$http.post('/api/product/shoppingCart/myShoppingCart',{})
            .then(function(response){
                console.log(response)
                if(response.data.status == 401){
                    that.shopCarNumShow = false
                    console.log(that.shopCarNumShow)
                }else{
                    if(response.data.info.length == 0){
                        that.shopCarNumShow = false
                    }else if(response.data.info.length > 0){
                        that.shopCarNumShow = true
                        let num = null;
                        response.data.info.forEach((element,i) => {
                            console.log(element.commodityCount)
                            num += element.commodityCount
                        });
                        that.shopNum =num
                    }
                }
            })
            .catch(function(response){
                console.log(response)
            })
            
            //查询产品是否收藏
            this.$http.post('/api/product/commodity/favorite/queryOne?commodityId='+that.commodityId)
            .then(function(response){
                console.log(response)
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
                }
            })
            .catch(function(response){
                console.log(response)
            });

            //根据商品ID 查询相关的评论列表
            this.$http.post('/api/product/commodity/evaluation/query?page=1&pageSize=10',{
                "commodityId":that.commodityId
            })
            .then(function(response){
                console.log(response)
            })
            .catch(function(response){
                console.log(response)
            });
            
            //根据商品ID 查询相关优惠券列表
            //  this.$http.post('/api/product/coupon/commodity/find/mall',{
            //     "commodityId":that.commodityId
            // })
            // .then(function(response){
            //     console.log(response)
            // })
            // .catch(function(response){
            //     console.log(response)
            // });
            let getcouponData = new Promise(function(rel,rej){
                let url = '/api/product/coupon/commodity/find/mall';
                that.$http({
                    url:url,
                    method:'POST',
                    data:{
                        commodityId:that.commodityId
                    }
                }).then(response => {
                    rel(response)
                }).catch(error => {
                    rej(error)
                })
            });
            getcouponData.then(function(result){
                console.log(result)
                that.coupon = result.data.info.list
                console.log(that.coupon)
                if(that.coupon.length == 0){
                    that.couponShow = false
                }else{
                    that.couponShow = true
                }
            }).catch(function(errmsg){
                console.log(errmsg)
            })
        },
        methods:{
                //获取地址栏参数，name:参数名称
                getUrlParms(name){
                    let url = this.detailTemplateUrl
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = url.substr(1).match(reg);
                    if(r!=null)
                    return unescape(r[2]);
                    return null;
                },
                getURLparms(name){
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = location.search.substr(1).match(reg);
                    if(r!=null)
                    return unescape(r[2]);
                    return null;
                },
                productDetailBtn1(){
                    this.show1 = true
                    this.show2 = false
                    this.productDetailBack.productDetailBack1 = true
                    this.productDetailBack.productDetailBack2 = false
                    this.productDetailBacks.productDetailBack1 = false
                    this.productDetailBacks.productDetailBack2 = true
                },
                productDetailBtn2(){
                    this.show1 = false
                    this.show2 = true
                    this.productDetailBack.productDetailBack1 = false
                    this.productDetailBack.productDetailBack2 = true
                    this.productDetailBacks.productDetailBack1 = true
                    this.productDetailBacks.productDetailBack2 = false
                },
                btnClose() {
                    this.popupVisible = false;
                    this.shareVisible = false;
                },
                showServer(name) {
                    this.popupVisible = true;
                },
                showShare(name){
                    this.shareVisible = true;
                },
                getcoupon(){
                    //获取优惠券
                    this.receiveCoupons = true
                },
                closeCoupon(){
                    this.receiveCoupons = false
                },
                goToList(){
                    let that=this;
                    that.$http.post('/api/product/shoppingCart/myShoppingCart',{})
                            .then(function(response){
                                console.log(response)
                                if(response.data.status == 401){
                                    Toast({
                                        message:'尚未登录',
                                        duration:1000
                                    }
                                    );
                                }else{
                                    that.$router.push('./shopCar')
                                }
                            })
                            .catch(function(response){
                                console.log(response)
                            })
                },
                addShopCar(){
                    //this.shopNum++;
                   
                    let commodityId = this.commodityId
                    console.log(commodityId)
                    let customerId = this.customerId
                    console.log(customerId)
                    let commodityCount = 1
                    console.log(commodityCount)
                     let that=this;
                    this.$http.post('/api/product/shoppingCart/insertOne',
                        {
                            'commodityId':commodityId,
                            'customerId':customerId,
                            'commodityCount':commodityCount
                        }
                    )
                    .then(function(response){
                        console.log(response)
                        if(response.data.status == 401){
                        that.shopCarNumShow = false
                        Toast({
                            message:'尚未登录',
                            duration:1000
                        }
                        );
                       }else{
                           that.$http.post('/api/product/shoppingCart/myShoppingCart',{})
                            .then(function(response){
                                console.log(response)
                                if(response.data.info.length == 0){
                                    that.shopCarNumShow = false
                                }else{
                                    that.shopCarNumShow = true
                                    let num = null;
                                    response.data.info.forEach((element,i) => {
                                        console.log(element.commodityCount)
                                        num += element.commodityCount
                                    });
                                    that.shopNum =num
                                }
                            })
                            .catch(function(response){
                                console.log(response)
                            })
                       }
                    })
                    .catch(function(response){
                        console.log(response)
                    })
                },
                collectionStar(){
                    if(this.isStar == false){
                        //未收藏状态 调用收藏接口
                        let that=this;
                        this.$http.post('/api/product/commodity/favorite/insertOne',{
                            "commodityId":that.commodityId
                        })
                        .then(function(response){
                            console.log(response)
                            if(response.data.status == 401){
                                Toast({
                                    message:'尚未登录',
                                    duration:1000
                                }
                                );
                            }else if(response.data.status == 203){
                                Toast({
                                    message:response.data.msg,
                                    duration:1000
                                }
                                );
                            }else if(response.data.status == 200){
                                Toast({
                                    message:response.data.msg,
                                    duration:1000
                                }
                                );
                                that.starXingXing['icon-shoucang'] = false
                                that.starXingXing['icon-xingxing1'] = true
                                that.starXingXingColor.color = "#ffa700"
                                that.isStar = true
                                that.starId = response.data.info.id
                            }
                        })
                        .catch(function(response){
                            console.log(response)
                        });
                    }else if(this.isStar == true){
                        //收藏状态 调用取消收藏接口
                         let that=this;
                        this.$http.post('/api/product/commodity/favorite/remove?id='+that.starId)
                        .then(function(response){
                            console.log(response)
                            if(response.data.status == 201){
                                Toast({
                                    message:response.data.msg,
                                    duration:1000
                                }
                                );
                            }else if(response.data.status == 203){
                                Toast({
                                    message:response.data.msg,
                                    duration:1000
                                }
                                );
                            }else if(response.data.status == 200){
                                Toast({
                                    message:response.data.msg,
                                    duration:1000
                                }
                                );
                                that.starXingXing['icon-shoucang'] = true
                                that.starXingXing['icon-xingxing1'] = false
                                that.starXingXingColor.color = "#838d98"
                                that.isStar = false
                            }
                        })
                        .catch(function(response){
                            console.log(response)
                        });
                        // alert(this.isStar)
                    }
                },
                loadMore() {
                    //评论滚动到底部自动加载
                    this.loading = true;
                    this.commentLoading = true
                    setTimeout(() => {
                        let last = this.commentList[this.commentList.length - 1];
                        for (let i = 1; i <= 2; i++) {
                        this.commentList.push(last + i);
                        }
                        this.loading = false;
                        this.commentLoading = false
                    }, 2500);
                },
                buyNow(){
                    localStorage.setItem('commodityInfo','11')
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
    #detailTemplatePage .page-swipe{
            height: 5.56rem;
    }
/* new style */
.productDetailSwitch{font-size: 0;
    margin-top: 0.1rem;
    margin-bottom: 0.05rem;
    position: relative;}
.productDetailBack1{
    color: rgb(255, 255, 255);
    background-color: rgb(39, 161, 242);
}
.productDetailBack2{
    color: rgb(66, 66, 66);
    background-color: rgb(255, 255, 255);
}
.productDetailBtn1{padding: 0.2rem 0.5rem;
    display: inline-block;
    border-radius: 5px 0 0 5px;
    border: 1px solid #cccc;
    font-size: 0.28rem;}
.productDetailBtn2{ padding: 0.2rem 0.5rem;
    display: inline-block;
    border-radius: 0 5px 5px 0;
    border: 1px solid #cccc;
    border-left: none;
    font-size: 0.28rem;}
.productDetailIcon{
    font-size: 0.42rem;
    position: absolute;
    right: 0.14rem;
    top: 0.13rem;
}
#detailTemplatePage .proDetail{
     margin-bottom: 1.3rem;
}
#detailTemplatePage .commentDetail{
    font-size: 0.25rem;
    padding-left: 0.37rem;
    padding-right: 0.37rem;
    margin-bottom: 1.3rem;
}
#detailTemplatePage .userAvatarList{
    border: 1px solid #cccc;
}
#detailTemplatePage .userAvatarList ul{
    margin-top: 0.2rem;margin-left: 0.2rem;
}
#detailTemplatePage .userAvatarList ul li{
    float: left;
    height: 0.7rem;
    width: 0.7rem;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 50%;
    background-color: #cccc;
}
#detailTemplatePage .userAvatarList ul li img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
#detailTemplatePage .userReviewList{
    border: 1px solid #cccc;
    border-top: none;border-bottom: none;
}
#detailTemplatePage .userReviewList li{
    padding: 0.2rem 0.2rem;
                border-bottom: 1px solid #cccc;
}
#detailTemplatePage .commentHeaderInfo{
    height: 0.5rem;
    margin-bottom: 0.2rem;
    padding: 0.2rem 0.2rem 0rem 0.2rem;
}
#detailTemplatePage .commentNickname{
    display: inline-block;
    float: left;
    height: 0.5rem;
    line-height: 0.5rem;
}
#detailTemplatePage .commentStar{
    width: 2rem;
    height: 0.5rem;
    float: left;
        padding-top: 0.07rem;
}
#detailTemplatePage .userCommentTime{
        display: inline-block;
    height: 0.5rem;
    line-height: 0.5rem;
    float: right;
    text-align: right;}
#detailTemplatePage .userCommentContent{text-align: left;line-height: 0.37rem;    padding-left: 0.2rem;
    padding-right: 0.2rem;}
#detailTemplatePage .userCommentImg li{float:left;float: left;
    padding: 0;
    margin-top: 0.1rem;
    margin-right: 0.1rem;
    width: 1rem;
    border: 1px solid #cccc;
    height: 1rem;}
#detailTemplatePage .userCommentImg li img{width:100%;height:100%;}
#detailTemplatePage .merchantReply{
    padding: 0.2rem;
    background-color: rgba(232, 231, 231, 0.8);
    margin-top: 0.1rem;}
#detailTemplatePage .merchantReplyTitle{
    display: inline-block;
    text-align: left;
    float: left;}
#detailTemplatePage .merchantReplyTime{
    display: inline-block;
    width: 75%;
    text-align: right;}
#detailTemplatePage .merchantReplyContent{
    line-height: 0.35rem;
    text-align: left;
    margin-top: 0.2rem;}
</style>
<style lang="less" scoped>
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
    .detailBottom{
        font-size:0.20rem;
        position: fixed;
        bottom: 0;
        width:100%;
    }
    .detailBottom li{
        float: left;
        background-color: #dddddd;
        height: 1rem;
        line-height:0.7rem;
    }
    .detailBottom p{
        line-height:0;
    }
    .detailBottom li:nth-child(1),.detailBottom li:nth-child(2),.detailBottom li:nth-child(3){
        width:1rem;
        border-top:0.01rem solid #ddd;
        background-color:#fff;
         border-bottom:0.03rem solid #ffffff;
    }
    .detailBottom li:nth-child(1)::after,.detailBottom li:nth-child(2)::after{
                display: inline-block;
    content: "";
    height: 0.4rem;
    border-right: 0.02rem solid #dddddd;
    position: relative;
    top: -0.5rem;
    right: -0.46rem;
    }
    .detailBottom li:nth-child(4),.detailBottom li:nth-child(5){
        width:2.21rem;
        border:0.01rem solid #6ab4ff;
    }
    .detailBottom li:nth-child(4){
        border:0.02rem solid #6ab4ff;
    }
    .detailBottom li:nth-child(5){
       border-bottom: 0.03rem solid #6ab4ff;
    }
    
    .detailBottom li:nth-child(4) p,.detailBottom li:nth-child(5) p{
        line-height:1rem;
    }
    .detailBottom li:nth-child(5) p{
        color: #ffffff;
        font-weight:600;
        font-size:0.3rem;
        background: #6ab4ff;
            letter-spacing: 0.005rem;
    }
    .detailBottom li:nth-child(4) p{
        color: #6ab4ff;
        font-weight:600;
        font-size:0.3rem;
        background: #ffffff;
            letter-spacing: 0.005rem;
    }
    .shopBxo {
        font-size: 0.3rem;
        padding-top: 0.1rem;
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
            background: linear-gradient(to bottom, #0CBBB9 0%, #4AC6DC 100%);
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
</style>
