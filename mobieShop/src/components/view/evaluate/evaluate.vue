<template>
    <div class='details'>
        <div v-for='(item,indexs) in shopList' :key='indexs'>
            <div class='heardImg clearfloat'>
                <div class='imgLeft'>
                    <img src='./sofa.jpg'>
                </div>
                <div class='textInfo'>
                    <div class='clearfloat'>
                        <h3 class='floatLeft'>{{item.name}}</h3> <span class='floatRight'>￥{{item.num}}</span></div>
                    <p>{{item.text}}</p>
                </div>
            </div>
            <ul class='clearfloat Ulstar'>
                <li :class="{li1:1,bg1:index%2}" v-for="(value,index) in item.list" :key="index">
                    <div v-for="(item,index1) in value.classs.zh" class="stu_div" :id="index" :key="index1">
                        <span class="stu_title">{{item.title}}</span>
                        <span class="stu_bgstar" :id="index1">
                            <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        <span class="stu_bgstar1 stu_bgstar3" :title="value.classs.title1"></span>
                        </span>
                        <span class="stu_bgstar2" @mousemove="pingjia($event,index1)" :title="value.classs.title1" @click="pingjia1($event,index1)" @mouseleave="pingjia2($event,index1)"></span>
                    </div>
                </li>
            </ul>
            <ol class='commnet clearfloat'>
                <li v-for='(items,markIndx) in item.textMark' :id='markIndx' :key='markIndx' @click='markTitle($event,indexs)'>{{items}}</li>
            </ol>
            <div class="shopCommnet">
                <span>评价商品</span>
                <textarea class='MarkInfo' v-model='item.MarkInfo'></textarea>
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
                    <li v-for='(item,index) in item.imglist' :key='index'>
                        <i class='icon iconfont icon-close close' @click='removeImg(index,indexs)'></i>
                        <img :src="item.imgurl" alt="图片丢失">
                    </li>
                </ul>
            </div>
        </div>
        <p>
            <button class='saveInfo' @click="saveInfo">保存</button>
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
                shopList: [{
                    name: '商品名称',
                    num: 18,
                    text: "家居保养沙发家居保养沙发家居保养沙发家居保养沙发",
                    textMark: ['上门及时', '客服态度好', '客服态度好', '客服态度非常好'],
                    textMarkId: [],
                    MarkInfo: '',
                    list: [{
                        classs: {
                            major: "数学",
                            title1: 0,
                            zh: [{
                                    title: "形象态度",
                                    d: 0,
                                    lastD: 5
                                },
                                {
                                    title: "服务质量",
                                    d: 0,
                                    lastD: 5
                                }
                            ],
                            text: "好"
                        }
                    }],
                    imglist: [],
                }, {
                    name: '商品名称',
                    num: 18,
                    text: "家居保养沙发家居保养沙发家居保养沙发家居保养沙发",
                    textMark: ['上门及时', '客服态度好', '客服态度好', '客服态度非常好'],
                    textMarkId: [],
                    MarkInfo: '',
                    list: [{
                        classs: {
                            major: "数学",
                            title1: 0,
                            zh: [{
                                    title: "形象态度",
                                    d: 0,
                                    lastD: 5
                                },
                                {
                                    title: "服务质量",
                                    d: 0,
                                    lastD: 5
                                }
                            ],
                            text: "好"
                        }
                    }],
                    imglist: [],
                }]　　　　
            }　　　　
        },
        methods: {　　
            getDataInfo() {
                let url = '/api/product/commodity/evaluation/queryByIds';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        data: ["7bda1bc6-3c93-11e8-b8d4-88d7f652f92c", "6446efb7-3c92-11e8-b8d4-88d7f652f92c"]
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            　　
            pingjia($event, index1) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                let a = parseInt($event.offsetX / 200 * 100);
                let c = parseFloat($event.offsetX / 38);
                this.shopList[index1].list[wei].classs.zh[b].d = Math.ceil(c);
                this.shopList[index1].list[wei].classs.title1 = a;
                for (let i = 0; i < 5; i++) {
                    if (i < this.shopList[index1].list[wei].classs.zh[b].d) {
                        $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                    } else {
                        $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                    }
                }
                if (a == 0) {
                    $event.target.previousElementSibling.children[0].classList.remove('stu_bgstar3');
                }
            },
            pingjia1($event, index1) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                this.shopList[index1].list[wei].classs.zh[b].lastD = this.shopList[index1].list[wei].classs.zh[b].d;
            },
            pingjia2($event, index1) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                for (let i = 0; i < 5; i++) {
                    if (i < this.shopList[index1].list[wei].classs.zh[b].lastD) {
                        $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                    } else {
                        $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                    }
                }
            },
            uploadimg(index) {
                let length = this.shopList[index].imglist.length;
                console.log(length)
                if (length >= 5) {
                    Toast('最多上传5张图片');
                    return;
                }
                let that = this;
                let fileObject = document.querySelector('.imgupload').files[0];
                if (!fileObject || !window.FileReader) {
                    return;
                };
                if (/^image/.test(fileObject.type)) {
                    let fd = new FormData();
                    fd.append('fileUpload', fileObject);
                    fd.append('type', 'product');
                    that.upfile(fd, index);
                } else {
                    Toast('只能上传图片');
                    return;
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
                        console.log(res)
                        Indicator.close();
                        if (res.data.status == 200) {
                            let hostName = location.hostname;
                            let port = location.port;
                            let url = res.data.info;
                            let imageUrl = 'http://' + hostName + ':' + port + '/api' + url; //  后台返
                            that.shopList[index].imglist.push({
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
                    let list = this.shopList[indexs].imglist;
                    list.splice(index, 1);
                });
            },
            markTitle($event, indexs) { //编辑
                if ($event.target.classList.value == 'active') {
                    $event.target.classList.remove("active")
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                        }
                    };
                    this.shopList[indexs].textMarkId.remove($event.target.id);
                } else {
                    $event.target.classList.add("active");
                    this.shopList[indexs].textMarkId.push($event.target.id);
                }
                console.log(this.shopList[indexs].textMarkId)
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
            saveInfo() {
                // console.log(this.shopList[0].MarkInfo)
                this.shopList.forEach((item, index) => {
                    console.log(item)
                    console.log(item.MarkInfo)
                })
            }
        },
        created() {
            this.getDataInfo()
        }
    }
</script>

<style scoped lang='less'>
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