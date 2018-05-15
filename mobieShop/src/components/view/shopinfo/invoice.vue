
<template>
    <section class='CInvoice background'>
        <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
            <li class="mui-table-view-cell" v-for='(item,index) in list' :key='index' @click='goinvoicInfo(item)'>
                <div class='radioBox colormore'></div>
                <div class='boxCompany backgroundextra'>
                    <h2>{{item.category==11?'个人普通发票':item.category==21?'单位普通发票':"单位专用发票"}}</h2>
                    <p>付款方：{{item.title}}</p>
                    <p class='daoJia font'>到家服务</p>
                    <p>发票金额：<span>￥{{item.orderInfo.paidMoney}}</span></p>
                    <p>开票时间：<span>{{item.finishTime}}</span></p>
                    <div v-if='item.category==22'>
                        <p>物流公司名称：<span>{{item.logisticsCompany}}</span></p>
                        <p>物流单号：<span>{{item.logisticsNumber}}</span></p>
                    </div>
                    <p>驳回状态：<span>{{item.isDisallowance==true?"驳回":"无驳回"}}</span></p>
                </div>
                <li class="more_loading" v-show="!queryLoading">
                    <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
                    <span v-show="allLoaded">已全部加载</span>
                </li>
            </li>
        </ul>
    </section>
</template>
<script>
    import {
        MessageBox
    } from 'mint-ui';
    import {
        Popup
    } from 'mint-ui'
    export default {
        data() {
            return {
                selected: '1',
                queryLoading: false,
                moreLoading: false,
                allLoaded: false,
                totalNum: 0,
                pageSize: 10,
                pageNum: 0,
                list: []
            }
        },
        computed: {
            params() {
                return {
                    pageSize: this.pageSize
                }
            }
        },
        created() {
            this.loadMore();
        },
        methods: {
            goinvoicInfo(item) {
                this.$router.push({
                    "name": "invoiceInfo",
                    params: {
                        "val": item
                    }
                })
                sessionStorage.setItem("invoiceInfo", JSON.stringify(item))
            },
            loadMore() {
                if (this.allLoaded) {
                    this.moreLoading = true;
                    return;
                }
                if (this.queryLoading) {
                    return;
                }
                this.moreLoading = !this.queryLoading;
                this.pageNum++;
                console.log(this.pageNum)
                this.$http({
                    url: "/api/product/order/invoice/query?page=" + this.pageNum + "&pageSize=" + this.pageSize,
                    method: "post",
                    data: {}
                }).then((res) => {
                    console.log(res.data.info)
                    if (res.data.info && res.data.info.list) {
                        res.data.info.list.forEach((item, i) => {
                            console.log(item)
                            if (item) {
                                this.list = this.list.concat(item);
                            }
                        })
                        console.log(this.list.length)
                        if (this.list.length <= 0) {
                            this.loadMore();
                        }
                        console.log(this.list)
                        this.allLoaded = this.list.length == res.data.info.total;
                    }
                    this.moreLoading = this.allLoaded;
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .CInvoice {
        min-height: 14rem;
        background: #4ab6f7;
    }
    .CInvoice {
        font-size: 0.2rem; // margin-top: 0.8rem;
        .radioBox {
            width: 100%;
            height: 0.2rem;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 0.2rem;
            &:after {
                content: '';
                display: block;
                width: 92%;
                height: 0.08rem;
                position: relative;
                top: 0.05rem;
                background: #26a2ff;
                margin: auto;
            }
        }
        ul {
            padding-top: 0.2rem;
        }
        li {
            padding-top: 0.2rem;
            width: 90%;
            margin: auto;
        }
    }
    .boxCompany {
        position: relative;
        padding-bottom: 0.2rem;
        z-index: 10;
        top: -0.1rem;
        width: 90%;
        background: #fff;
        margin: auto;
        background-image: -webkit-gradient( linear, 50% 0, 0 100%, from(transparent), //起点的颜色
        color-stop(.7, transparent), //中间某一个点必须达到这个颜色，表示变化过程  .5b表示这个渐变范围长度的总长的50%
        color-stop(.7, #4ab6f7), //同上
        to(#4ab6f7)), //结束段的颜色
        //一个背景块的分为两个15X 15  组成。
        -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(.7, transparent), color-stop(.7, #4ab6f7), to(#4ab6f7));
        background-size: 0.3rem 0.15rem;
        background-repeat: repeat-x;
        background-position: 0 100%;
        h2 {
            font-size: 0.3rem;
            line-height: 0.8rem;
        }
        p {
            text-align: left;
            padding: 0 8%;
            line-height: 0.6rem;
            font-size: 0.25rem;
        }
        .daoJia {
            font-size: 0.3rem;
            color: #4ab6f7;
            font-weight: 700;
        }
    }
</style>