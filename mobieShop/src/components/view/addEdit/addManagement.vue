<template>
    <div>
        <div class="page-loadmore-wrapper addManage" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore @translate-change="translateChange" :autoFill='false' :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div v-for="(item,index) in list" :key='index' style='overflow: hidden;'>
                    <div class='header'>
                        <p class='userName'><span v-text='item.consigneeName'></span><span v-text='item.consigneeMobilePhone'>15800000000</span></p>
                        <p class='p2'><i class='icon iconfont icon-dizhi1'></i><span>
                        {{item.area.regionName+'区'+item.province.regionName+item.city.regionName+item.region.regionName+item.address}}
                        </span></p>
                    </div>
                    <div class='footer'>
                        <span><input type='checkbox' v-model='item.isDefaultAddress' @change='routeTo(item)'>设为默认</span>
                        <div class='operation'>
                            <span @click='editAdd(item)'><i class='icon iconfont icon-bianji'></i> 编辑</span>
                            <span @click='delAdd(item.id,index)'><i class='icon iconfont icon-lajitong'></i>删除</span>
                        </div>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <div class="addaddress" @click='addAdd()'>
            <i class='icon iconfont icon-addads'></i> 添加地址
        </div>
    </div>
</template>
<script>
import {operatelocalstorage} from '../../../assets/javascript/localstorage_hasdata.js'
    export default {
        data() {
            return {
                list: [],
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: 0,
                topStatus: '',
                translate: 0,
                moveTranslate: 0,
                listpages: '',
                newlist: 0,
                goName:''
            }
        },
        created() {
            this.$root.$emit('header','地址管理');
            this.getAddInfo();
            // let routerParams = this.$route.params;
            this.goName = this.nameurlArgs().name
            // console.log(this.goName)
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
            routeTo(value){
                console.log(value)
                let url = '/api/customer/account/update';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {
                            id:value.customerId,
                            defaultAddressId:value.id
                        }
                    })
                    .then(response => {
                        console.log(response)
                        // if(response.data.info.msg='新增成功'){
                        //     this.$toast(response.data.info.msg);
                        //     this.$router.push('./addManagement')
                        // }

                    })
                    .catch(error => {
                        console.log(error)
                    })
                    this.$router.push({
                        path:'/'+this.goName,
                        name: this.goName,
                        params: { 
                            direct: 'userinfo', 
                            dataObj:value
                        }
                    });
            },
            addAdd(){//新增地址
                this.$router.push({
                        path:'/addEdit',
                        name: 'addEdit',
                        params: { 
                            name: 'addManagement'
                        }
                    });
            },
            editAdd(val){//编辑地址
                this.$router.push({
                        path:'/addEdit',
                        name: 'addEdit',
                        params: { 
                            name: 'addManagement', 
                            dataObj:val
                        }
                    });
            },
            delAdd(id,index){//删除地址
            let url = '/api/customer/address/removeByIds';
            this.$http({
                    url: url,
                    method: 'post',
                    data:[id]
                }).then(res => {
                    if(res.data.msg=='删除成功'){
                         this.list.splice(index,1);
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            getAddInfo() {
                let data = operatelocalstorage('userinfo',null,'get',null);
                data = JSON.parse(data);
                // console.log(data);
                let url = '/api/customer/address/query';
                this.$http({
                    url: url,
                    method: 'post',
                    data: {
                        'customerId': data.id
                    }
                }).then(res => {
                    this.list = res.data.info.list
                    this.listpages = res.data.info.pages;
                    // console.log(res.data.info.list.isDefaultAddress)
                    
                }).catch(error => {
                    console.log(error)
                })
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                alert(111);
                setTimeout(() => {
                    let lastValue = this.list.length;
                    console.log(lastValue)
                    if (this.newlist <= this.listpages) {
                        this.newlist++
                            let data = sessionStorage.getItem("userinfo");
                        data = JSON.parse(data);
                        let url = '/api/customer/address/query?page=' + this.newlist + '&pageSize=10';
                        this.$http({
                            url: url,
                            method: 'post',
                            data: {
                                'customerId': data.id
                            }
                        }).then(res => {
                            if (!res.data.info.list) {
                                for (var i = 0; i < res.data.info.list.length; i++) {
                                    this.list.push(res.data.info.list[i])
                                }
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded();
                }, 3000);
            },
            translateChange(translate) {
                const translateNum = +translate;
                this.translate = translateNum.toFixed(2);
                this.moveTranslate = (1 + translateNum / 70).toFixed(2);
            },
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>
<style lang="less" scoped>
    .page-loadmore-wrapper {
        overflow-y: scroll
    }
    .mint-loadmore-bottom span {
        display: inline-block;
        -webkit-transition: .2s linear;
        transition: .2s linear;
        vertical-align: middle
    }
    .mint-loadmore-bottom span.is-rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
    .addaddress {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background: #fff;
        text-align: center;
        font-size: 0.25rem;
        i {
            padding-right: 0.2rem;
        }
    }
    .footer {
        line-height: 1rem;
        vertical-align: bottom;
        padding: 0 0.3rem 0 0.1rem;
        input {
            margin-right: 0.2rem;
            margin-left: 0.2rem;
        }
    }
    .operation {
        float: right;
        span {
            padding-left: 0.2rem;
        }
        i {
            padding-right: 0.1rem;
        }
    }
    .addManage {
        margin-top: 0.8rem;
        font-size: 0.25rem;
        padding: 0.2rem;
        background: #fff;
        text-align: left;
        margin-bottom: 1rem; // overflow: hidden;
        .header {
            border-bottom: 1px solid #ddd;
            .p2 i {
                padding-left: 0.2rem;
            }
            .p2 span {
                color: #b8bbbf;
                padding-left: 0.2rem;
            }
            p:nth-child(1) {
                span {
                    padding-left: 0.2rem;
                }
            }
        }
        .header p {
            line-height: 0.5rem;
        }
    }
</style>