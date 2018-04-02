<template>
    <div id='detailTemplatePage'>
            <div class="productDetailSwitch">
                <span class="productDetailBtn1" :class="productDetailBack" @click="productDetailBtn1">商品</span>
                <span class="productDetailBtn2" :class="productDetailBacks" @click="productDetailBtn2">评论</span>
                <i class='icon iconfont icon-fenxiang productDetailIcon'></i>
            </div>
            <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInLeft"
            >
                <div v-if="show1" class="proDetail">
                        <keep-alive v-for='(item,index) in comlist' :key='index'>
                        <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
                        </keep-alive>
                        <productDetail></productDetail>
                        <div id="zbd-preferences" class="clear" style="font-size:0.25rem;text-align:left;padding:0.3rem 0.1rem 0.3rem 0.3rem;border-top:0.12rem solid #efefef;">
                            <p style="float:left;">已选<span style="margin-left: 0.1rem;">唯润俏枝头18头</span></p>
                            <p style="float: right;margin-right: 0.1rem;" @click="showServer">其他规格&ensp;></p>
                        </div>  
                        <div id="zbd-productDescription" class="clear" style="font-size:0.25rem;text-align:left;padding:0.3rem 0.1rem 0.3rem 0.3rem;border-top:0.12rem solid #efefef;">
                            <p>包邮<span>上海市满60.00元包邮</span></p>
                            <p>产地<span>唐山市</span></p>
                            <div>
                                <span><i></i>全面质检</span>
                                <span><i></i>资深买手</span>
                                <span><i></i>原产地直采</span>
                                <span><i></i>...</span>
                            </div>
                        </div>
                        <div id="zbd-Tips" class="clear" style="font-size:0.25rem;text-align:left;padding:0.3rem 0.1rem 0.3rem 0.3rem;border-top:0.12rem solid #efefef;border-bottom:0.12rem solid #efefef;">
                            <p><span>温馨提示</span><i></i></p>
                            <p><span>温馨提示：</span>1.该商品为原产地（厂家）发货，每日1...</p>
                        </div>
                        <keep-alive v-for='(item,index) in comlist' :key='index'>
                        <components :templateData='item.componentsData' :is='item.componentsName'  :type='item.componentsName'></components>
                        </keep-alive>
                        <div id="zbd-customerReviews" class="clear" style="font-size:0.25rem;text-align:left;padding:0.3rem 0.1rem 0.3rem 0.3rem;border-top:0.12rem solid #efefef;">
                            <p>顾客评价</p>
                            <div class="commentHeaderInfo clear">
                                <span class="commentNickname" >用户昵称</span>
                                <span class="commentStar">
                                    <img v-for="(item,index) in 3" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star.png">
                                    <img v-for="(item,index) in 2" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star1.png">
                                </span>
                                <span class="userCommentTime">2016-7-7</span>
                            </div>
                            <div class="commentContent">
                                <p class="userCommentContent">我只想说，特别的好！！！！！！！！！说点什么好呢，凑足十个字！</p>
                                <ul class="clear userCommentImg">
                                    <li v-for="(item,index) in 2" :key="index">
                                        <img src="./test.jpg">
                                    </li>
                                </ul>
                                <div class="merchantReply">
                                    <span class="merchantReplyTitle">商家回复：</span>
                                    <span class="merchantReplyTime">2016-7-4</span>
                                    <p class="merchantReplyContent">谢谢光顾！欢迎下次再来！谢谢光顾！欢迎下次再来！谢谢光顾！欢迎下次再来！</p>
                                </div>
                                <div>
                                    <p>查看全部<span>48</span>条评论<i>></i></p>
                                </div>
                            </div>
                        </div>
                        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;'>
                            <div class='closeBtn' @click="btnClose">关闭</div>
                        </mt-popup>
                </div>
            </transition>
             <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInLeft"
            >
            <div v-if="show2" class="commentDetail">
                            <div class="userAvatarList">
                                <ul class="clear">
                                    <li v-for="(item,index) in 13" :key="index">
                                        <img src="./test.jpg" >
                                    </li>
                                    <li style="line-height: 0.5rem;background-color: #fff;font-size: 0.45rem;">...</li>
                                </ul>
                            </div>
                            <div class="userReviewList">
                                <ul>
                                    <li v-for="(item,index) in 5" :key="index">
                                        <div class="commentHeaderInfo clear">
                                            <span class="commentNickname" >用户昵称</span>
                                            <span class="commentStar">
                                                <img v-for="(item,index) in 3" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star.png">
                                                <img v-for="(item,index) in 2" :key="index" style="width: 0.3rem;height: 0.3rem;" src="./../evaluate/star1.png">
                                            </span>
                                            <span class="userCommentTime">2016-7-7</span>
                                        </div>
                                        <div class="commentContent">
                                            <p class="userCommentContent">我只想说，特别的好！！！！！！！！！说点什么好呢，凑足十个字！</p>
                                            <ul class="clear userCommentImg">
                                                <li v-for="(item,index) in 2" :key="index">
                                                    <img src="./test.jpg">
                                                </li>
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
                        </div>
            </transition>
            <div class='detailBottom'>
                <ul>
                    <li>
                        <i class='icon iconfont icon-tubiaolunkuo-'></i>
                        <p>客服</p>
                    </li>
                    <li>
                        <i class='icon iconfont icon-shoucang'></i>
                        <p>收藏</p>
                    </li>
                    <li>
                        <i class='icon iconfont icon-gouwuche'></i>
                        <p>购物车</p>
                    </li>
                    <li>
                        <p>加入购物车</p>
                    </li>
                    <li>
                        <p>立即购买</p>
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
                detailTemplateUrl:'',
                show1:true,
                show2:false,
                productDetailBack:{
                    productDetailBack1:true,
                    productDetailBack2:false
                },
                productDetailBacks:{
                    productDetailBack1:false,
                    productDetailBack2:true
                },
                popupVisible:false
            };
        },
        created(){
            //console.log(this.comlist)
            let isBrowse = sessionStorage.getItem ("isBrowse");
            console.log(isBrowse)
            if(isBrowse == true){
                this.eventTemplateUrl = sessionStorage.getItem ("eventTemplateUrl");
                let id = this.getUrlParms("id")
                 console.log(id)
                  let that=this;
                    this.$http.post('/api/product/mall/template/queryMap',
                        {
                            'templateID':id,
                            'templateType':2
                        }
                    )
                    .then(function(response){
                        console.log(response)
                        let comlists = JSON.parse(response.data.info[0].comlist)
                        console.log(comlists)
                        that.comlist = comlists
                        // 假设你对扩展原生 JavaScript 不反感,那么能够将这种方法加入到数组原型(Array prototype)中:
                        // Array.prototype.insert = function (index, item) {
                        // this.splice(index, 0, item);
                        // };

                        // 此时,能够这样调用:
                        // var nums = ["one", "two", "four"];
                        // nums.insert(2, 'three'); // 注意数组索引, [0,1,2..]
                        // array	// ["one", "two", "three", "four"]
                    })
                    .catch(function(response){
                        console.log(response)
                    })
            }else if(isBrowse == null){
                let id = this.getURLparms("id");
                console.log(id)
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
                     console.log(comlists)
                    that.comlist = comlists
                })
                .catch(function(response){
                    console.log(response)
                })
            }
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
                },
                showServer(name) {
                    this.popupVisible = true;
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
    width: 100%;
    height: 0.5rem;
    margin-bottom: 0.2rem;
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
#detailTemplatePage .userCommentContent{text-align: left;line-height: 0.37rem;}
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
<style lang="" scoped>
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
        border-top:1px solid #ddd;
        background-color:#fff;
         border-bottom:1px solid #ffffff;
    }
    .detailBottom li:nth-child(1)::after,.detailBottom li:nth-child(2)::after{
            display: inline-block;
            content: "";
            height: 0.4rem;
            border-right: 1px solid #dddddd;
            position: relative;
            top: -0.5rem;
            right: -0.42rem;
    }
    .detailBottom li:nth-child(4),.detailBottom li:nth-child(5){
        width:2.2rem;
        border:1px solid #6ab4ff;
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
</style>
