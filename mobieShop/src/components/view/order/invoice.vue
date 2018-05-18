<template>
    <div class='contain invoice_xs'>
        <div class='area'>
            <p>{{invoicetype==22?'专用发票':'电子发票'}}</p>
        </div>
        <div class='area'>
            <p style='height:.5rem;line-height:.5rem;'>
                <span class='tip'>发票抬头</span>
                <span class='right' @click="popupVisible = true">
                                                <span>{{invoicetype==''?'请选择':invoicetype==11?'个人发票':invoicetype==21?'单位发票':'专用发票'}}</span>
                <i class='icon iconfont icon-arrow-right-copy'></i>
                </span>
            </p>
            <mt-popup v-model="popupVisible" position="bottom" class="popup">
                <mt-radio title="发票抬头" align="right" v-model="invoicetype" :options="options">
                </mt-radio>
                <button class='close' @click='closepopup'>确认</button>
            </mt-popup>
        </div>
        <div class='area width_all'>
            <p class='inputs' v-if='invoicetype==11'>
                <span style="color:red;">*</span>
                <label for="name_com">姓名：</label>
                <input type="text" class='input_1' v-model="taxpayername" placeholder="请填写纳税人姓名">
            </p>
            <p class='inputs' v-if='invoicetype==21'>
                <span style="color:red;">*</span>
                <label for="name_com">单位名称：</label>
                <input type="text" class='input_1' v-model="compname" placeholder="单位名称">
            </p>
            <p class='inputs' v-if='invoicetype==21'>
                <span style="color:red;">*</span>
                <label for="name_com">纳税人识别号：</label>
                <input type="text" class='input_1' placeholder="纳税人识别号" v-model="taxpayernum">
            </p>
            <div v-show='invoicetype==22'>
                <p class='inputs'>
                    <span style="color:red;">*</span>
                    <label for="name_com">公司名称：</label>
                    <input type="text" class='input_1' v-model="company" placeholder="公司名称">
                </p>
                <p class='inputs'>
                    <span style="color:red;">*</span>
                    <label for="name_com">税号：</label>
                    <input type="text" class='input_1' v-model="paragraph" placeholder="税号">
                </p>
                <p class='inputs'>
                    <span style="color:red;">*</span>
                    <label for="name_com">开户银行：</label>
                    <input type="text" class='input_1' v-model="bank" placeholder="开户银行">
                </p>
                <p class='inputs'>
                    <span style="color:red;">*</span>
                    <label for="name_com">银行账户：</label>
                    <input type="text" class='input_1' v-model="bankAccount" placeholder="开户银行">
                </p>
                <p class='inputs'>
                    <span style="color:red;">*</span>
                    <label for="name_com">注册地址：</label>
                    <input type="text" class='input_1' v-model="address" placeholder="注册地址">
                </p>
                <p class='inputs'>
                    <span style="color:red;">*</span>
                    <label for="name_com">公司电话：</label>
                    <input type="text" class='input_1' v-model="tel" placeholder="公司电话">
                </p>
                <div class='uploadimg'>
                    <p>上传凭证</p>
                    <ul class='imgs'>
                        <li class='upload'>
                            <input type="file" name='upload' class='imgupload' accept="image/*" @change='uploadimg' multiple='true'>
                            <i class='icon iconfont icon-xiangji'></i>
                            <div class='tip'>
                                <p>上传凭证</p>
                                <p>（最多3张）</p>
                            </div>
                        </li>
                        <li v-for='(item,index) in imglist' :key='index'>
                            <i class='icon iconfont icon-close close' @click='removeImg(index)'></i>
                            <img :src="item" alt="图片丢失" @click='imgShow(item)'>
                        </li>
                    </ul>
                </div>
            </div>
            <p class='inputs'>
                <span class='tip'>发票金额：<span class='warning money'>￥{{money}}</span></span>
            </p>
        </div>
        <div class='area'>
            <p>发票内容</p>
            <p class='detail'>
                明细
            </p>
            <p>
                <label for="name_com">备注：</label>
                <textarea class='input_1' v-model="Remarks" placeholder="备注"></textarea>
            </p>
        </div>
        <mt-popup v-model="popupVisibles" position="middle">
            <div style="height:4rem;width:6rem;">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for='(item,index) in imglist' :key='index'>
                        <img :src="item" alt="图片丢失" class='ImgBoxSize'></mt-swipe-item>
                </mt-swipe>
            </div>
        </mt-popup>
        <div class='area'>
            <button class='submit button' @click='submit'>提交</button>
        </div>
    </div>
</template>
<script>
    import {
        Indicator
    } from 'mint-ui';
    import {
        MessageBox
    } from 'mint-ui';
    import {
        checkClass
    } from '../../../assets/javascript/checkClass.js'
    import {
        Toast
    } from 'mint-ui'
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        data() {
            return {
                popupVisibles: false,
                popupVisible: false,
                invoicetype: '',
                imglist: [],
                options: [{
                        value: '11',
                        label: '个人发票'
                    },
                    {
                        value: '21',
                        label: '单位发票'
                    },
                    {
                        value: '22',
                        label: '专用发票'
                    }
                ],
                money: '200',
                taxpayername: '',
                compname: '',
                taxpayernum: '',
                company: '',
                paragraph: '',
                bank: '',
                address: '',
                bankAccount:'',
                tel: '',
                Remarks: ''
            }
        },
        created: function() {
            this.$root.$emit('header', '开票申请');
            this.money = this.urlArgs().totalprice
        },
        methods: {
            urlArgs() {
                var args = {};
                var query = location.search.substring(1);
                var pairs = query.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    var pos = pairs[i].indexOf("=");
                    if (pos == -1) continue;
                    var name = pairs[i].substring(0, pos);
                    var value = pairs[i].substring(pos + 1);
                    value = decodeURIComponent(value);
                    args[name] = value;
                }
                return args;
            },
            imgShow(item) {
                console.log(this.imglist)
                this.popupVisibles = true
            },
            closepopup() {
                this.popupVisible = false;
            },
            checkNum() {
                let result = checkClass.checkNumAndLetters(this.personalnum);
                return result.flag;
                this.pswjson.status = result.flag;
                this.pswjson.msg = result.flag ? '' : result.error;

            },
            submit() {
                let that = this;
                if (this.invoicetype == '') {
                    Toast('请选择发票抬头');
                } else {
                    // compname: '',
                    // taxpayernum: '',
                    // company:'',
                    // paragraph:'',
                    // bank:'',
                    // address:'',
                    // tel:''
                    let obj = {};
                    if (this.invoicetype == 11) {
                        if (this.taxpayername == '') {
                            Toast("请将信息填写完整")
                            return false
                        }
                        obj = {
                            "orderId": this.urlArgs().orderid,
                            category: this.invoicetype,
                            title: this.taxpayername,
                            remark: this.Remarks
                        }
                    }
                    if (this.invoicetype == 21) {
                        if (this.compname == '' || this.taxpayernum == '') {
                            Toast("请将信息填写完整")
                            return false
                        }
                        obj = {
                            "orderId": this.urlArgs().orderid,
                            category: this.invoicetype,
                            title: this.compname,
                            taxIdentity: this.taxpayernum,
                            remark: this.Remarks
                        }
                    }
                    if (this.invoicetype == 22) {
                        if (this.company == '' || this.paragraph == '' || this.bank == '' || this.address == '' || this.tel == '') {
                            Toast("请将信息填写完整")
                            return false
                        }
                        obj = {
                            "orderId": this.urlArgs().orderid,
                            category: this.invoicetype,
                            title: this.company,
                            taxIdentity: this.paragraph,
                            bankName: this.bank,
                            bankAccount:this.bankAccount,
                            companyAddress: this.address,
                            companyTelephone: this.tel,
                            taxpayerCertificate: (this.imglist + '').replace(/\[|]/g, ''),
                            remark: this.Remarks
                        }
                    }
                    let url = '/api/product/order/invoice/insertOne'
                    this.$http({
                        url: url,
                        method: 'post',
                        data: obj
                    }).then((res) => {
                        if (res.data.status == 200) {
                            console.log(res.data)
                            Toast(res.data.msg)
                            setTimeout(() => {
                                that.$router.push({
                                    // path:"./order",
                                    name: 'order',
                                    // params: {
                                    //     index: this.serverState
                                    // }
                                });
                            }, 500)
                            this.taxpayername = ''
                            this.compnamee = ''
                            this.taxpayernume = ''
                            this.companye = ''
                            this.paragraphe = ''
                            this.banke = ''
                            this.addresse = ''
                            this.tele = ''
                            this.Remarkse = ''
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                    console.log(obj)
                }
            },
            uploadimg() {
                
                let length = this.imglist.length;
                if (length >= 3) {
                    Toast('最多上传3张图片');
                    return;
                }
                let that = this;
                let fileObject = document.querySelector('.imgupload').files[0];
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
                        Indicator.close();
                        if (res.data.status == 200) {
                            let hostName = location.hostname;
                            let port = location.port;
                            let url = res.data.info;
                            // let imageUrl = 'http://' + hostName + ':' + port + '/api' + url; //  后台返
                            // let url = res.data.info;
                            let imgurl = 'http://' + hostName + ':' + port + '/api/' + url;
                            console.log(imgurl)
                            this.imglist.push(
                                imgurl
                            );
                        } else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(err => {
                        Indicator.close();
                        Toast('上传失败！');
                    })
            },
            // 删除图片
            removeImg(index) {
                MessageBox.confirm('确定删除图片?').then(() => {
                    let list = this.imglist;
                    list.splice(index, 1);
                }).catch(() => {});
            },
        }
    }
</script>

<style lang="less" scoped>
    .ImgBoxSize {
        width: 100%;
        height: 100%;
    }
    .contain {
        font-size: .28rem;
        text-align: left;
        background-color: #f5f5f5;
        margin-top: 40px;
        .area {
            padding: .4rem .2rem;
            background-color: #fff;
            margin-bottom: .2rem;
            .right {
                position: relative;
                padding-right: .5rem;
                float: right;
            }
            .icon {
                font-size: .5rem;
                position: absolute;
                top: 0;
                right: 0;
            }
            .popup {
                width: 100%;
                .mint-radiolist {
                    margin-bottom: 1.2rem;
                }
                .mint-checklist-title {
                    font-size: .3rem;
                    text-align: center;
                    padding: .4rem;
                }
                .close {
                    width: 80%;
                    font-size: .32rem;
                    color: #fff;
                    background-color: #26c0c8;
                    border-radius: .5rem;
                    padding: .2rem 0;
                    border: none;
                    outline: none;
                    position: absolute;
                    bottom: .2rem;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                }
            }
            .input_1 {
                border: 1px solid #d9d9d9;
                padding: .1rem .2rem;
                border-radius: .1rem;
            }
            .inputs {
                padding: .3rem .2rem;
                border-bottom: 1px solid #d9d9d9;
                label {
                    width: 2rem;
                    display: inline-block; // text-align: center;
                }
                .warning {
                    font-size: .4rem;
                    color: #f48f60;
                }
            }
            .inputs:nth-child(1) {
                padding-top: 0;
            }
            .detail {
                padding-top: .2rem;
                color: #d9d9d9;
            }
            .submit {
                width: 80%;
                font-size: .3rem;
                margin: 2rem auto 0 auto;
                display: block;
                padding: .2rem;
                outline: none;
                border: none;
                color: #fff;
                border-radius: 1.5rem;
                ;
                background: linear-gradient(180deg, #11bcbc, #46c5d9);
            }
        }
        .width_all {
            padding: .4rem 0 0 0;
        }
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
    .imgupload {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 999;
        opacity: 0;
    }
</style>
<style lang="less">
    .invoice_xs {
        .picker-items {
            margin-bottom: 1rem !important;
        }
        .popup {
            .mint-radiolist-title {
                font-size: .3rem;
                text-align: center;
                color: black;
                padding: .4rem;
            }
            .mint-radio-input:checked+.mint-radio-core {
                background-color: #00a09e;
                border-color: #00a09e;
            }
        }
    }
</style>
