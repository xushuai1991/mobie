<template>
    <div>
        <div class='addManage'>
            <div class='header'>
                <p class='userName'><span>郭相君</span></span><span>15800000000</span></p>
                <p class='p2'><i class='icon iconfont icon-dizhi1'></i><span>上海市浦东新区</span></p>
            </div>
            <div class='footer'>
                <span><input type='checkbox'>设为默认</span>
                <div class='operation'>
                    <span><i class='icon iconfont icon-bianji'></i> 编辑</span>
                    <span><i class='icon iconfont icon-lajitong'></i>删除</span>
                </div>
            </div>
        </div>
        <div class="addaddress">
            <i class='icon iconfont icon-addads'></i> 添加地址
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="less" scoped>
    .addaddress {
        text-align: center;
        font-size:0.25rem;
        i{
            padding-right:0.2rem;
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
        overflow: hidden;
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