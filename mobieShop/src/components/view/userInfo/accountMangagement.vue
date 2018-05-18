<template>
    <section class='accountMangagement'>
        <div class="portrait">
            <div class="my_portrait">头像
                <div class='upImgs'>
                    <div style="padding:20px;width:0.5rem;;">
                        <div class="show">
                            <div class="picture" ><img :src='headerImage' style="width:100%;height:100%;"/></div>
                        </div>
                        <div style="margin-top:20px;">
                            <!--<input type="file"  accept="image" @change="upload">!-->
                            <input type="file" name='upload' id="upload" class='imgupload' accept="image/*" @change='uploadimg' multiple='true'>
                            <label for="upload"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="meaningless"></div>
        <div class="user_name" @click="handleClick(item)" v-for='(item,index) in userIfo' :key='index'>{{item.name}}<span>{{item.names}}   <i class='icon iconfont icon-arrow-right-copy fontSize'></i></span></div>
        <mt-popup v-model="popupVisible" position="right">
            <div class='userInfoBox'>
                <h1 class='background'>{{userName}}</h1>
                <div v-if='inputShow'>
                    <div v-if='israido'>
                        <div class='textinfo'>{{listName}}<input type='text' placeholder='请输入' :disabled='isTtrue' v-model='userInput1'></div>
                        <div class='textinfo'>{{listName2}}<input type='text' placeholder='请输入' v-model='userInput2' style='width: 2.2rem;'></div>
                    </div>
                    <div v-else class='radios'>
                        <mt-radio title="单项选择" v-model="value" :options="options" @change="check">
                        </mt-radio>
                    </div>
                </div>
                <div class='isOk'>
                    <input type='button' class='orderOk button border' value='确认' @click='upData' />
                    <input type='button' @click='clearBox' value='取消' />
                </div>
            </div>
        </mt-popup>
    </section>
</template>
<script>
    import {
        Indicator
    } from 'mint-ui';
    import {
        Toast
    } from 'mint-ui';
    import {
        operatelocalstorage
    } from '../../../assets/javascript/localstorage_hasdata.js'
    import Exif from 'exif-js'
    export default {
        data() {
            return {
                headerImage: '',
                popupVisible: false,
                uerserInfo: '',
                isTtrue: false,
                israido: true,
                userName: '',
                userInput1: '',
                userInput2: '',
                userInput3: '',
                inputShow: true,
                listName: '',
                listName2: '',
                isShow: false,
                value: "0",
                options: [{
                        label: '女',
                        value: '0'
                    },
                    {
                        label: '男',
                        value: '1'
                    }
                ],
                userIfo: [{
                        name: '昵称',
                        listname1: '用户姓名:',
                        listname2: '用户姓名1:',
                        isShow: false,
                        names: '',
                    },
                    {
                        name: '性别',
                        names: '',
                    },
                    {
                        name: '联系方式',
                        listname1: '手机号:',
                        listname2: '修改手机号',
                        names: '',
                    },
                    {
                        name: '地址',
                        names: '',
                    },
                    {
                        name: '修改密码',
                        isShow: true,
                        listname1: '新密码',
                        listname2: '重复新密码',
                        names: '',
                    },
                    {
                        name: '安全退出',
                    },
                ]
            }
        },
        created() {
            this.$root.$emit('header', '账号管理');
            this.getUserInfo();
        },
        methods: {
            check: function() {
                console.log(this.value)
            },
            getUserInfo() {
               
                let that = this;
                let data = operatelocalstorage('userinfo', null, 'get', null);
                if (data == null) {
                    Toast('请登录！');
                    return;
                }
                
                data = JSON.parse(data);
                console.log(data);
                let getdata = new Promise(function(rel, rej) {
                    let url = '/api/customer/account/query';
                    that.$http({
                        url: url,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            id: data.id
                        }
                    }).then(response => {
                        rel(response)
                    }).catch(error => {
                        rej(error)
                    })
                })
                getdata.then(function(result) {

                    that.uerserInfo = (result)
                    if (that.uerserInfo.data.info.list[0]) {
                        that.headerImage = that.uerserInfo.data.info.list[0].avatar;
                        that.userIfo[0].names = that.uerserInfo.data.info.list[0].nickname
                        that.userIfo[1].names = that.uerserInfo.data.info.list[0].gender == true ? '男' : "女"
                        that.userIfo[2].names = that.uerserInfo.data.info.list[0].mobile
                    }
                }).catch(function(errmsg) {
                    console.log(errmsg)
                })
            },
            upData() {
                let url = '/api/customer/account/update';
                let dataInfo = {}
                if (this.userName == '昵称') {
                    dataInfo = {
                        nickname: this.userInput2
                    }
                }
                if (this.userName == '性别') {
                    dataInfo = {
                        gender: this.value - 0
                    }
                }
                if (this.userName == '联系方式') {
                    dataInfo = {
                        mobile: this.userInput2
                    }
                }
                if (this.userName == '修改密码') {
                    console.log(this.userInput1 != this.userInput2)
                    if (this.userInput2.length < 6) {
                        Toast("密码长度小于6");
                        return false
                    }
                    if (this.userInput2 != this.userInput1) {
                        Toast("两次密码不一支");
                        return false
                    }
                    dataInfo = {
                        password: this.userInput2
                    }
                    this.$http({
                        url: url,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(dataInfo)
                    }).then(response => {
                        if (response.data.msg == '修改成功') {
                            Toast("修改成功")
                            this.userInput2 = '';
                            this.$router.push('/login');
                            this.clearBox()
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
                if (this.userName == '安全退出') {
                    let url = '/api/public/logout';
                    this.$http({
                            url: url,
                            method: 'get',
                            // 请求体重发送的数据
                            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            //  data:qs.stringify( {
                            //  }),
                        })
                        .then(response => {
                            console.log(response)
                            if (response.data.msg == "ok") {
                                let companyid = sessionStorage.getItem('companyId');
                                localStorage.clear();
                                sessionStorage.clear();
                                sessionStorage.setItem('select_index', '我的');
                                this.$router.push("/index?company=" + companyid)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
                    // alert("退出");
                    return false;
                }
                this.$http({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(dataInfo)
                }).then(response => {
                    if (response.data.msg == '修改成功') {
                        this.getUserInfo();
                        this.userInput2 = '';
                        this.clearBox()
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            handleClick: function(name) {
                this.inputShow = true;
                let data = this.uerserInfo.data.info.list[0];
                let orderOk = document.querySelector(".orderOk");
                this.israido = true
                if (name.name == '昵称') {
                    this.userInput1 = data.nickname;
                    this.isTtrue = true
                }
                if (name.name == '性别') {
                    console.log(data.gender)
                    this.value = data.gender ? '1' : "0";
                    this.israido = false
                }
                if (name.name == '联系方式') {
                    this.userInput1 = data.mobile;
                    this.isTtrue = true;
                    // if(this.userInput2){
                    //     upData('mobile',this.userInput2)
                    // }
                }
                if (name.name == '修改密码') {
                    this.userInput1 = '';
                    this.isTtrue = false;
                    // if(this.userInput2){
                    //     upData('password',this.userInput2)
                    // }
                }
                if (name.name == '地址') {
                    sessionStorage.setItem("from", 'accountMangagement')
                    this.$router.push({
                        path: '/addManagement',
                        name: 'addManagement',
                        params: {
                            name: 'accountMangagement',
                            dataObj: '1111'
                        }
                    });
                    return false
                }
                if (name.name == '安全退出') {
                    this.inputShow = false;
                }
                this.popupVisible = true;
                this.userName = name.name;
                this.listName = name.listname1;
                this.listName2 = name.listname2;
                this.listName3 = name.listname3;
                this.isShow = name.isShow;
            },
            clearBox() {
                this.popupVisible = false
            },
            uploadimg() {
                let that = this;
                let fileObject = document.querySelector('.imgupload').files[0];
                if (!fileObject || !window.FileReader) {
                    return;
                };
                this.photoCompress(fileObject, {
                    quality: 0.2
                }, function(base64Codes) {
                    var bl = that.convertBase64UrlToBlob(base64Codes);
                    if (/^image/.test(fileObject.type)) {
                        let fd = new FormData();
                        fd.append('fileUpload', bl);
                        fd.append('type', 'product');
                        that.upfile(fd);
                    } else {
                        Toast('只能上传图片');
                        return;
                    }
                })
            },
            convertBase64UrlToBlob(urlData) {
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
            upfile(file) {
                console.log(file)
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
                            let imageUrl = 'http://' + hostName + ':' + port + '/api/sms' + url+"?"+new Date().getTime(); //  后台返
                            console.log(imageUrl)
                            that.headerImage = imageUrl;
                            that.postImg(imageUrl)
                            // that.dataArr[index].shopList.imglist.push({
                            //     'imgurl': imageUrl
                            // });
                        } else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(err => {
                        Indicator.close();
                        Toast('上传失败！');
                    })
            }, 
            postImg(data) {
                let dataInfo = {
                    avatar: data
                }
                //这里写接口 
                let url = '/api/customer/account/update';
                this.$http({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(dataInfo)
                }).then(response => {
                    console.log(response)
                    if (response.data.status == 200) {
                        this.getUserInfo();
                        this.userInput2 = '';
                        this.clearBox()
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
            // upload(e) {
            //     let files = e.target.files || e.dataTransfer.files;
            //     if (!files.length) return;
            //     this.picValue = files[0];
            //     this.imgPreview(this.picValue);
            // },
            // imgPreview(file) {
            //     console.log(file)
            //     let self = this;
            //     let Orientation;
            //     //去获取拍照时的信息，解决拍出来的照片旋转问题 
            //     Exif.getData(file, function() {
            //         Orientation = Exif.getTag(this, 'Orientation');
            //     });
            //     // 看支持不支持FileReader 
            //     if (!file || !window.FileReader) return;
            //     if (/^image/.test(file.type)) {
            //         // 创建一个reader 
            //         let reader = new FileReader();
            //         // 将图片2将转成 base64 格式 
            //         reader.readAsDataURL(file);
            //         // 读取成功后的回调 
            //         reader.onloadend = async function() {
            //             let result = this.result;
            //             let img = new Image();
            //             img.src = result;
            //             //判断图片是否大于100K,是就直接上传，反之压缩图片 
            //             console.lg
            //             if (this.result.length <= (100 * 1024)) {
            //                 self.headerImage = this.result;
            //                 self.postImg(self.headerImage);
            //             } else {
            //                 img.onload = function() {
            //                     let data = self.compress(img, Orientation);
            //                     self.headerImage = data;
            //                     self.postImg(data);
            //                 }
            //             }
            //         }
            //     }
            // },
            // postImg(data) {
            //     let dataInfo = {
            //         avatar: data
            //     }
            //     //这里写接口 
            //     let url = '/api/customer/account/update';
            //     this.$http({
            //         url: url,
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         data: JSON.stringify(dataInfo)
            //     }).then(response => {
            //         console.log(response)
            //         if (response.data.msg == '修改成功') {
            //             this.getUserInfo();
            //             this.userInput2 = '';
            //             this.clearBox()
            //         }
            //     }).catch(error => {
            //         console.log(error)
            //     })
            // },
            // rotateImg(img, direction, canvas) {
            //     //最小与最大旋转方向，图片旋转4次后回到原方向 
            //     const min_step = 0;
            //     const max_step = 3;
            //     if (img == null) return;
            //     //img的高度和宽度不能在img元素隐藏后获取，否则会出错 
            //     let height = img.height;
            //     let width = img.width;
            //     let step = 2;
            //     if (step == null) {
            //         step = min_step;
            //     }
            //     if (direction == 'right') {
            //         step++;
            //         //旋转到原位置，即超过最大值 
            //         step > max_step && (step = min_step);
            //     } else {
            //         step--;
            //         step < min_step && (step = max_step);
            //     }
            //     //旋转角度以弧度值为参数 
            //     let degree = step * 90 * Math.PI / 180;
            //     let ctx = canvas.getContext('2d');
            //     switch (step) {
            //         case 0:
            //             canvas.width = width;
            //             canvas.height = height;
            //             ctx.drawImage(img, 0, 0);
            //             break;
            //         case 1:
            //             canvas.width = height;
            //             canvas.height = width;
            //             ctx.rotate(degree);
            //             ctx.drawImage(img, 0, -height);
            //             break;
            //         case 2:
            //             canvas.width = width;
            //             canvas.height = height;
            //             ctx.rotate(degree);
            //             ctx.drawImage(img, -width, -height);
            //             break;
            //         case 3:
            //             canvas.width = height;
            //             canvas.height = width;
            //             ctx.rotate(degree);
            //             ctx.drawImage(img, -width, 0);
            //             break;
            //     }
            // },
            // compress(img, Orientation) {
            //     let canvas = document.createElement("canvas");
            //     let ctx = canvas.getContext('2d');
            //     //瓦片canvas 
            //     let tCanvas = document.createElement("canvas");
            //     let tctx = tCanvas.getContext("2d");
            //     let initSize = img.src.length;
            //     let width = img.width;
            //     let height = img.height;
            //     //如果图片大于四百万像素，计算压缩比并将大小压至400万以下 
            //     let ratio;
            //     if ((ratio = width * height / 4000000) > 1) {
            //         console.log("大于400万像素")
            //         ratio = Math.sqrt(ratio);
            //         width /= ratio;
            //         height /= ratio;
            //     } else {
            //         ratio = 1;
            //     }
            //     canvas.width = width;
            //     canvas.height = height;
            //     // 铺底色 
            //     ctx.fillStyle = "#fff";
            //     ctx.fillRect(0, 0, canvas.width, canvas.height);
            //     //如果图片像素大于100万则使用瓦片绘制 
            //     let count;
            //     if ((count = width * height / 1000000) > 1) {
            //         console.log("超过100W像素");
            //         count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片 
            //         //  计算每块瓦片的宽和高 
            //         let nw = ~~(width / count);
            //         let nh = ~~(height / count);
            //         tCanvas.width = nw;
            //         tCanvas.height = nh;
            //         for (let i = 0; i < count; i++) {
            //             for (let j = 0; j < count; j++) {
            //                 tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            //                 ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            //             }
            //         }
            //     } else {
            //         ctx.drawImage(img, 0, 0, width, height);
            //     }
            //     //修复ios上传图片的时候 被旋转的问题 
            //     if (Orientation != "" && Orientation != 1) {
            //         switch (Orientation) {
            //             case 6: //需要顺时针（向左）90度旋转 
            //                 this.rotateImg(img, 'left', canvas);
            //                 break;
            //             case 8: //需要逆时针（向右）90度旋转 
            //                 this.rotateImg(img, 'right', canvas);
            //                 break;
            //             case 3: //需要180度旋转 
            //                 this.rotateImg(img, 'right', canvas); //转两次 
            //                 this.rotateImg(img, 'right', canvas);
            //                 break;
            //         }
            //     }
            //     //进行最小压缩 
            //     let ndata = canvas.toDataURL('image/jpeg', 0.1);
            //     console.log('压缩前：' + initSize);
            //     console.log('压缩后：' + ndata.length);
            //     console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
            //     tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            //     return ndata;
            // },
        },
    }
</script>
<style>
    .upImgs {
        width: 5rem;
        z-index: 100;
        top: -2.1rem;
    }
    #upload {
        position: absolute;
        top: -1.85rem;
        left: 0.3rem;
        opacity: 0;
        height: 1.5rem;
        width: 1.5rem;
    }
    .show {
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        border: 1px solid #d5d5d5;
        margin-left: 0.3rem;
    }
    .picture {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
<style lang="less" scoped>
    input[type=button] {
        -webkit-appearance: none;
        outline: none
    }
    .userInfoBox {
        text-align: center;
        h1 {
            width: 100%;
            height: 1rem;
            background: #26a2ff;
            color: #fff;
            line-height: 1rem;
            font-size: 0.3rem;
        }
        .textinfo {
            height: 1rem;
            line-height: 1.32rem;
            width: 80%;
            margin-left: 10%;
            border-bottom: 1px solid #ddd;
            text-align: left;
            font-size: 0.25rem;
        }
        input {
            outline: none;
            padding: 0.1rem;
            width: 2.2rem;
        }
        .isOk {
            border: none;
            text-align: center;
            margin-top: 0.2rem;
            input {
                padding: 0.1rem 0.3rem;
                border: 1px solid #ddd;
                 :nth-child(1) {
                    background: red;
                }
            }
            .orderOk {
                background: #26a2ff;
                color: #fff;
                border: 1px solid #26a2ff;
                margin-right: 0.2rem;
            }
        }
    }
    .mint-popup-right {
        overflow: hidden;
        position: absolute;
        width: 80%;
        padding-bottom: 0.4rem;
        left: 10%;
        top: -3rem;
        border-radius: 0.4rem;
        font-size: 0.2rem;
    }
    .accountMangagement {
        // margin-top: 0.8rem;
        text-align: left;
        overflow: hidden;
        div {
            position: relative;
        }
        div span {
            position: absolute;
            right: 0.3rem;
        }
    }
    div p {
        position: absolute;
        right: 14px;
        width: 1rem;
        text-align: center;
    }
    .my_portrait {
        overflow: hidden;
        width: 97%;
        height: 1.8rem;
        line-height: 1.8rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .26rem;
        position: relative;
    }
    .check {
        float: right;
        margin-right: .9rem;
    }
    .check_img {
        display: inline-block;
        width: 1.11rem;
        height: 1.11rem;
        border-radius: 50%;
    }
    .check_img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
    }
    .my_portrait:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .my_portrait {
        padding-left: 0.2rem;
    }
    .user_name,
    .true_name,
    .sex,
    .my_contact,
    .address,
    .account_safety {
        width: 97%;
        height: 1rem;
        line-height: 1rem;
        border-bottom: .01rem solid #dcdcdc;
        font-size: .26rem;
        padding-left: 0.2rem;
        position: relative;
    }
    .user_name p img,
    .true_name p img,
    .sex p img,
    .my_contact p img,
    .address p img,
    .account_safety p img {
        display: inline-block;
        width: .15rem;
        height: .26rem;
        position: absolute;
        right: .48rem;
        top: .36rem;
    }
    .my_portrait p img {
        display: inline-block;
        width: .15rem;
        height: .26rem;
        position: absolute;
        right: .48rem;
        top: .8rem;
    }
    .meaningless {
        height: .15rem;
        width: 100%;
        background: #EBEBEB;
    }
    .shade {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 499;
        -moz-opacity: 0.5;
        opacity: .3;
        filter: alpha(opacity=80);
    }
    .side_menu {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -3.2rem;
        margin-top: -.8rem;
        width: 6.4rem;
        height: 2rem;
        border-radius: .05rem;
        background-color: white;
        _position: absolute;
        z-index: 500;
        font-size: .3rem;
    }
    .side_menu li {
        width: 100%;
        height: 1rem;
    }
    .shot {
        border-bottom: .01rem solid #dcdcdc;
    }
    .shot,
    .choose {
        position: relative;
    }
    .shot span,
    .choose span {
        display: inline-block;
        margin: .3rem 0 0 .2rem;
    }
</style>