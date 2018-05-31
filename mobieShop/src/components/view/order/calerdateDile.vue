
<template>
    <section class='CInvoice background'>
        <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
            <li class="mui-table-view-cell" v-for='(item,index) in list' :key='index' @click='goinvoicInfo(item)'>
                
                <div class='boxCompany'>
                    <div class='Grid-cell'>
                    <p class='colorBlue'>06:08</p>
                    <p>上海虹桥</p>
                    <p>二等座￥10000</p>
                    </div>
                    <div class='Grid-cell'>
                    <div>
                        <div>11时55分</div>
                        <div class="lineBox"></div>
                        <div>D636</div>
                    </div>
                    <div class="listTop">一等座￥10000</div>
                    </div>
                    <div class='Grid-cell'>
                    <p>18:03</p>
                    <p>重庆北</p>
                    <p>无座￥509.5</p>
                    </div>
                    <div class='Grid-cell colorRed'>￥509.5</div>
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
                    "name": "appointment",
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
        background: #fff;
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
          
        }
        li {
           
            width: 100%;
            margin: auto;
            margin-bottom: 0.2rem;
        }
    }
    .boxCompany{
        display: flex;
        border-top:5px solid #ddd;
        border-bottom:5px solid #ddd;
        padding:0.2rem;
    }
    .Grid-cell {
        flex: 1;
        p{
            padding-top:0.1rem;
            padding-bottom:0.1rem;
        }
        .lineBox{
            margin:auto;
            height:0.06rem;
            margin-top:0.08rem;
            margin-bottom:0.08rem;
            width:40%;
            background:#ddd;
            position:relative;
        }
        .lineBox:before{
            content:'';
            display:block;
            position:absolute;
            height:0.1rem;
            width:0.1rem;
            background:#ddd;
            top:-0.025rem;
            left:-0.15rem;
            border-radius:50%;
        }
        .lineBox:after{
            content:'';
            display:block;
            position:absolute;
            height:0.08rem;
            width:0.08rem;
            border:1px solid #ddd;
            top:-0.025rem;
            right:-0.16rem;
            border-radius:50%;
        }
        .listTop{
            margin-top:0.25rem;
        }
        
    }
    .colorRed{
            color:red;
            font-size:0.35rem;
        }
    .colorBlue{
        color:#26a2ff;
        font-size:0.3rem;
        padding-bottom:0.025rem !important;
    }
</style>