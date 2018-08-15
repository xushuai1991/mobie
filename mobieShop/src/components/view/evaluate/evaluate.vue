<template>
    <div class='details'>
        <div v-for='(item,indexs) in dataArr' :key='indexs'>
            <div class='heardImg clearfloat'>
                <div class='imgLeft'>
                    <img :src='imageUrlss'>
                </div>
                <div class='textInfo'>
                    <div class='clearfloat'>
                        <h3 class='floatLeft'>{{item.commodityName}}</h3> <span class='floatRight'>￥{{item.price}}</span></div>
                    <p>{{item.text}}</p>
                    <p class='floatNum'>{{item.serviceState}}</p>
                </div>
            </div>
            <ul class='clearfloat Ulstar'>
                <li :class="{li1:1,bg1:index%2}" v-for="(value,index) in item.shopList.list" :key="index">
                    <div v-for="(item,index1) in value.classs.zh" class="stu_div" :id="index" :key="index1">
                        <span class="stu_title">{{item.title}}</span>
                        <span class="stu_bgstar" :id="index1">
                                <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        </span>
                        <span class="stu_bgstar2" @mousemove="pingjia($event,index1)" :title="value.classs.title1" @click="pingjia1($event,index1,indexs)" @mouseleave="pingjia2($event,index1)"></span>
                    </div>
                </li>
            </ul>
            <ol class='commnet clearfloat'>
                <li v-for='(items,markIndx) in item.shopList.textMark' :class='{ "active": items.active }' :id='items.id' :key='markIndx' @click='markTitle($event,indexs)'>{{items.text}}</li>
            </ol>
            <div class="shopCommnet">
                <span>评价商品</span>
                <textarea class='MarkInfo' v-model='item.shopList.MarkInfo'></textarea>
            </div>
            <div class='uploadimg'>
                <p>上传凭证</p>
                <ul class='imgs'>
                    <li class='upload'>
                        <input type="file" name='upload' class='imgupload' accept="image/*" @change='uploadimg(indexs)' multiple='true'>
                        <i class='icon iconfont icon-xiangji'></i>
                        <div class='tip'>
                            <p>上传凭证</p>
                            <p>（最多5张）</p>
                        </div>
                    </li>
                    <li v-for='(item,index) in item.shopList.imglist' :key='index'>
                        <i class='icon iconfont icon-close close' @click='removeImg(index,indexs)'></i>
                        <img :src="item.imgurl" alt="图片丢失">
                    </li>
                </ul>
            </div>
        </div>
        <p>
            <button class='saveInfo' @click="saveInfo">提交</button>
        </p>
    </div>
</template>

<script>
    import {
        Indicator
    } from 'mint-ui';
    import {
        Toast
    } from 'mint-ui';
    import {
        MessageBox
    } from 'mint-ui';
    export default {　　　　
        data() {　　　　　　
            return {　　
                // 
                isActive: '',
                dataArr: [],
                shopList: {},
                imageUrlss:'',
                orderId:''
            }　　　　
        },
        methods: {　　
            getDataInfo() {
                //获取订单详情
                let orderdetail = JSON.parse(sessionStorage.getItem("orderdetail"));
                orderdetail.orderDetails.forEach((item, index) => {
                    let hostName = location.hostname;
                    let port = location.port;
                    this.imageUrlss = 'http://' + hostName + ':' + port + '/api' + item.image;
                    console.log(item.image)
                    let shopList = {
                        name: '商品名称',
                        num: 18,
                        text: "家居保养沙发家居保养沙发家居保养沙发家居保养沙发",
                        textMark: [],
                        textMarkId: [],
                        MarkInfo: '',
                        list: [{
                            classs: {
                                major: "数学",
                                title1: 0,
                                zh: [{
                                    title: "服务质量",
                                    d: 0,
                                    lastD: 5
                                }],
                                text: "好"
                            }
                        }],
                        imglist: [],
                    }
                    item['shopList'] = shopList;
                })
                orderdetail.orderDetails.forEach((item, index) => {
                    if (item.evaluation == null) {
                        this.dataArr.push(item)
                    }
                })
                this.orderId = orderdetail.id
                
            },
            　　
            pingjia($event, index1) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                let a = parseInt($event.offsetX / 200 * 100);
                let c = parseFloat($event.offsetX / 38);
                this.dataArr[index1].shopList.list[wei].classs.zh[b].d = Math.ceil(c);
                this.dataArr[index1].shopList.list[wei].classs.title1 = a;
                for (let i = 0; i < 5; i++) {
                    if (i < this.dataArr[index1].shopList.list[wei].classs.zh[b].d) {
                        $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                    } else {
                        $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                    }
                }
                if (a == 0) {
                    $event.target.previousElementSibling.children[0].classList.remove('stu_bgstar3');
                }
            },
            pingjia1($event, index1, index2) {
                let that = this;
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                this.dataArr[index1].shopList.list[wei].classs.zh[b].lastD = this.dataArr[index1].shopList.list[wei].classs.zh[b].d;
                let level = this.dataArr[index1].shopList.list[wei].classs.zh[b].lastD;
                var getUserInfo = new Promise(function(resolve, reject) {
                    let Markurl = '/api/product/commodity/evaluation/label/queryMap';
                    that.$http({
                            url: Markurl,
                            method: 'POST',
                            // 请求体重发送的数据
                            data: {
                                "level": level ? level : 5
                            }
                        })
                        .then(res => {
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                getUserInfo.then(function(ResultJson) {
                    let arr = [];
                    let arrId = [];
                    ResultJson.data.info.forEach((item, index) => {
                        // that.dataArr[index].shopList.textMarkId = []
                        // that.dataArr[index].shopList.textMark = [];
                        item.active = true
                        arr.push(item)
                        arrId.push(item.id)
                        // that.dataArr[index].shopList.textMarkId.push(item.id)
                    })
                    that.dataArr[index2].shopList.textMarkId = arrId
                    that.dataArr[index2].shopList.textMark = arr
                }).catch(function(ErrMsg) {
                    //获取数据失败时的处理逻辑
                })
            },
            pingjia2($event, index1) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                for (let i = 0; i < 5; i++) {
                    if (i < this.dataArr[index1].shopList.list[wei].classs.zh[b].lastD) {
                        $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                    } else {
                        $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                    }
                }
            },
            uploadimg(index) {
                let length = this.dataArr[index].shopList.imglist.length;
                if (length >= 5) {
                    Toast('最多上传5张图片');
                    return;
                }
                let that = this;
                let fileObject = document.querySelectorAll('.imgupload')[index].files[0];
                if (!fileObject || !window.FileReader) {
                    return;
                };
                this.photoCompress(fileObject, {
                    quality: 0.2
                },function(base64Codes){
                    var bl = that.convertBase64UrlToBlob(base64Codes);
                if (/^image/.test(fileObject.type)) {
                    let fd = new FormData();
                    fd.append('fileUpload', bl);
                    fd.append('type', 'product');
                    that.upfile(fd, index);
                } else {
                    Toast('只能上传图片');
                    return;
                }
                })
                
            },convertBase64UrlToBlob(urlData) {
                var arr = urlData.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                    type: mime
                });
            },
            photoCompress(file, w, objDiv) {
                let that = this;
                var ready = new FileReader();
                /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
                ready.readAsDataURL(file);
                ready.onload = function() {
                    var re = this.result;
                    that.canvasDataURL(re, w, objDiv)
                }
            },
            canvasDataURL(path, obj, callback) {
                var img = new Image();
                img.src = path;
                img.onload = function() {
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w;
                    h = obj.height || (w / scale);
                    var quality = 0.7; // 默认图片质量为0.7
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                    anw.nodeValue = w;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    var base64 = canvas.toDataURL('image/jpeg', quality);
                    // 回调函数返回base64的值
                    callback(base64);
                }
            },
            upfile(file, index) {
                Indicator.open('上传中。。。');
                let that = this;
                this.$http({
                        url: '/api/zuul/sms/file/fileUpload',
                        method: 'POST',
                        // 请求体重发送的数据
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: file
                    })
                    .then(res => {
                        let that = this;
                        Indicator.close();
                        if (res.data.status == 200) {
                            let hostName = location.hostname;
                            let port = location.port;
                            let url = res.data.info;
                            let imageUrl = 'http://' + hostName + ':' + port + '/api' + url; //  后台返
                            that.dataArr[index].shopList.imglist.push({
                                'imgurl': imageUrl
                            });
                        } else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(err => {
                        Indicator.close();
                        Toast('上传失败！');
                    })
            },
            removeImg(index, indexs) {
                MessageBox.confirm('确定删除图片?').then(() => {
                    let list = this.dataArr[indexs].shopList.imglist;
                    list.splice(index, 1);
                });
            },
            markTitle($event, indexs) { //编辑
                if ($event.target.classList.value == 'active') {
                    // $event.target.classList.remove("active")
                    // Array.prototype.remove = function(val) {
                    //     var index = this.indexOf(val);
                    //     if (index > -1) {
                    //         this.splice(index, 1);
                    //     }
                    // };
                    // this.shopList[indexs].textMarkId.remove($event.target.id);
                } else {
                    $event.target.classList.add("active");
                    this.dataArr[indexs].shopList.textMarkId.push($event.target.id);
                }
                // console.log(this.dataArr[indexs].shopList.textMarkId)
                // let wei = $event.target.parentNode.id;
                // let b = $event.target.previousElementSibling.id;
                // for (let i = 0; i < 5; i++) {
                //     if (i < this.shopList[index1].list[wei].classs.zh[b].lastD) {
                //         $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                //     } else {
                //         $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                //     }
                // }
            },
            unbind() {
                let that = this;
                const htmls = `确认提交信息？`;
                MessageBox.confirm('', {
                    message: htmls,
                    title: '',
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonClass: 'cancelButton',
                    confirmButtonClass: 'confirmButton',
                    confirmButtonText: '提交',
                    cancelButtonText: '不提交'
                }).then(action => {
                    if (action == 'confirm') {
                        let objArr = [];
                        
                        this.dataArr.forEach((item, index) => {
                            let imgArr = [];
                            item.shopList.imglist.forEach((item, index) => {
                                imgArr.push(item.imgurl)
                            })
                            let objInfo = {
                                "orderId":this.orderId,
                                "score": item.shopList.list[0].classs.zh[0].lastD,
                                "comment": item.shopList.MarkInfo,
                                "commodityId": item.commodityId,
                                "labelIdList": item.shopList.textMarkId,
                                "images": imgArr + ''
                            }
                            objArr.push(objInfo)
                            console.log(objInfo)
                            
                        })
                        let urls = '/api/product/commodity/evaluation/insert';
                        that.$http({
                                url: urls,
                                method: 'POST',
                                // 请求体重发送的数据
                                // headers: {
                                //     'Content-Type': 'multipart/form-data'
                                // },
                                data: objArr
                            })
                            .then(res => {
                                let that = this;
                                if (res.data.status == 200) {
                                    Toast(res.data.msg);
                                    setTimeout(function(){
                                        that.$router.push("/order")
                                    },800)
                                    
                                } else {
                                    Toast(res.data.msg);
                                }
                            })
                            .catch(err => {
                                Indicator.close();
                                Toast('上传失败！');
                            })
                    }
                }).catch(err => {
                    if (err == 'cancel') {}
                });
            },
            saveInfo() {
                this.unbind();
            },
            getMark(evele, index1) {
                let that = this;
                var getUserInfo = new Promise(function(resolve, reject) {
                    let Markurl = '/api/product/commodity/evaluation/label/queryMap';
                    that.$http({
                            url: Markurl,
                            method: 'POST',
                            // 请求体重发送的数据
                            data: {
                                "level": evele ? evele : 5
                            }
                        })
                        .then(res => {
                            resolve(res)
                        })
                        .catch(err => {
                            reject(data.err)
                        })
                })
                getUserInfo.then(function(ResultJson) {
                    let arr = [];
                    let arrId = [];
                    ResultJson.data.info.forEach((item, index) => {
                        that.dataArr[index].shopList.textMarkId = []
                        that.dataArr[index].shopList.textMark = [];
                        item.active = true
                        arr.push(item)
                        arrId.push(item.id)
                    })
                    
                    that.dataArr.forEach((item, index) => {
                        item.shopList.textMark = arr
                        item.shopList.textMarkId = arrId
                    })
                }).catch(function(ErrMsg) {
                    //获取数据失败时的处理逻辑
                })
            }
        },
        created() {
            this.getDataInfo();
            this.getMark();
        },
        
    }
</script>

<style scoped lang='less'>
    .floatNum {
        float: right;
        margin-right: 0.3rem;
    }
    .saveInfo {
        border: 0;
        height: 0.6rem;
        width: 2rem;
        margin: 0.4rem 0;
        border-radius: 0.5rem;
        color: #fff;
        background: #27a1f2;
    }
    .MarkInfo {
        padding: 0.2rem;
        color: #707274;
    }
    .uploadimg {
        font-size: .3rem;
        background-color: #fff;
        margin-top: .2rem;
        padding: .3rem .2rem;
        text-align: left;
        overflow: hidden;
        .vue-file-upload {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            z-index: 999;
        }
        .imgs {
            padding-top: .2rem;
            overflow: hidden;
            li {
                width: 1.58rem;
                height: 1.58rem;
                float: left;
                position: relative;
                img {
                    width: 1.58rem;
                    height: 1.58rem;
                }
            }
            li+li {
                margin-left: .2rem;
                background-color: #f5f5f5;
                position: relative;
                img {
                    width: 1.58rem;
                    height: 1.58rem;
                    font-size: .2rem;
                    text-align: center;
                    line-height: 1.58rem;
                    display: block;
                }
                .close {
                    line-height: .3rem;
                    color: red;
                    font-size: .3rem;
                    border-radius: 50%;
                    text-align: center;
                    line-height: .2rem;
                    right: -.1rem;
                    top: -.05rem;
                    position: absolute;
                    display: block;
                }
            }
            .upload {
                border: 1px dotted;
                .icon {
                    font-size: .6rem;
                    color: #dbdbdb;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: .2rem;
                    text-align: center
                }
                .tip {
                    margin-top: .8rem;
                    color: #787878;
                }
                p {
                    font-size: .25rem;
                    text-align: center;
                }
            }
        }
    }
    .clearfloat:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }
    .textInfo div:nth-child(1) {
        margin-top: 0.4rem;
        margin-bottom: 0.25rem;
        padding-right: 0.3rem;
    }
    .commnet .active {
        border: 1px solid #fff;
        color: #fff;
        background: #27a1f2;
    }
    .shopCommnet {
        text-align: left;
        padding-left: 0.4rem;
    }
    .shopCommnet span {
        vertical-align: top;
        padding-top: 0.7rem;
        display: inline-block;
    }
    .shopCommnet textarea {
        margin-left: 0.2rem;
        margin-top: 0.5rem;
        width: 70%;
        height: 1.5rem;
        resize: none;
        border-radius: 0.1rem;
    }
    .commnet {
        border-bottom: 1px solid #d2d2d2;
    }
    .commnet li {
        border-radius: 0.1rem;
        float: left;
        margin-left: 0.5rem;
        padding: 0.2rem;
        border: 1px solid #d2d2d2;
        margin-bottom: 0.2rem;
        margin-top: 0.2rem;
    }
    .Ulstar {
        padding-left: 0.4rem;
        margin-top: 0.6rem;
        border-bottom: 1px solid #d2d2d2;
        padding-bottom: 0.2rem;
    }
    .textInfo p:nth-child(2) {
        padding-right: 0.3rem;
    }
    .floatRight {
        float: right;
    }
    .floatLeft {
        float: left;
    }
    .details {
        font-size: 0.2rem;
        margin-top: 0.8rem;
    }
    .textInfo h3 {
        display: inline-block;
        font-size: 0.3rem;
    }
    .li1 {
        width: 100%;
    }
    .bg1 {
        background: #00A2D4;
    }
    .heardImg {
        padding-top: 0.3rem;
    }
    .heardImg .imgLeft {
        width: 2.36rem;
        height: 2.16rem;
        float: left;
        margin-left: 0.3rem;
        border-radius: 0.2rem;
        -webkit-box-shadow: 1px 1px 5px;
        -moz-box-shadow: 1px 1px 5px;
        box-shadow: 1px 1px 5px;
        overflow: hidden;
    }
    .heardImg .imgLeft img {
        width: 100%;
        height: 100%;
    }
    .heardImg .textInfo {
        float: left;
        width: 60%;
        text-align: left;
        margin-left: 0.3rem;
    }
    .stu_span1 {
        float: left;
        margin: 0px 25px;
    }
    .stu_teacher {
        float: left;
    }
    .stu_div {
        float: left;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    .stu_title {
        float: left;
    }
    .stu_bgstar {
        width: 5rem;
        height: 0.5rem;
        float: left;
        /*background: url(../image/star.png);*/
        background-size: 50px 50px;
    }
    .stu_bgstar1 {
        width: 0.5rem;
        height: 0.5rem;
        float: left;
        background: url(./star1.png);
        background-size: 0.5rem 0.5rem;
        margin-left: 0.2rem;
    }
    .stu_bgstar2 {
        width: 3.8rem;
        height: 0.5rem;
        float: left;
        /*background: url(../image/star.png);*/
        background-size: 0.5rem 0.5rem;
        margin-left: -5rem;
        opacity: 0;
    }
    .stu_bgstar3 {
        background: url(./star.png);
        background-size: 0.5rem 0.5rem;
        margin-left: 0.2rem;
    }
    .stu_li_text {
        width: 95%;
        height: 100px;
        border: 1px solid #000000;
        resize: none;
    }
    .imgupload {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 999;
        opacity: 0;
    }
</style>