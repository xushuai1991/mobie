
<template>
    <section class='CInvoice'>
        <ul>
            <li>
                <div class='radioBox'></div>
                <div class='boxCompany'>
                    <h2>增值税电子普通发票</h2>
                    <p>付款方：上海天之蓝网络科技有限公司</p>
                    <p>到家服务</p>
                    <p>发票金额 <span>￥2600</span></p>
                    <p>开票时间 <span>2018-03-04</span></p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>

</script>

<style scoped>
    html,
    body {
        height: 100%;
        background: #4ab6f7;
    }
</style>
<style lang="less" scoped>
    .CInvoice {
        font-size: 0.2rem;
        margin-top: 0.8rem;
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
        background-image: -webkit-gradient( linear, 
        50% 0, 
        0 100%, 
        from(transparent), //起点的颜色
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
            &:nth-child(3) {
                font-size: 0.3rem;
                color: #4ab6f7;
                font-weight: 700;
            }
        }
    }
</style>