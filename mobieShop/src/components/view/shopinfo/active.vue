<template>
    <section class='Cactive'>
        <ul class='ImbBox'>
            <li>
                <h3>新品热卖活动</h3>
                <div class='imgBox'>
                    <img src='./invite-gift.png' />
                </div>
                <div class='titleInof'>
                    <p><i class='icon iconfont icon-xiaohuomiao hots'></i><span class='textSpace'>享受最贵的服务，体验优质生活，还原一个享受最贵的服务，体验优质生活，还原一个...</span> <span class='flortRight'>go <i class="icon iconfont icon-youshuangjiantou ritJtou"></i></span></p>
                    <p>已经售 1552 <span class='flortRight'>2018-03-04</span></p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>

</script>
<style lang="less" scoped>
    .Cactive {
        font-size: 0.2rem;
        margin-top: 0.8rem;
        background: #ebebeb6e;
    }
    .ImbBox {
        padding: 0.2rem;
        li {
            background: #fff;
            padding: 2% 4%;
            width: 92%;
            height: 5.4rem;
            h3 {
                line-height: 0.6rem;
                text-align: left;
                font-size: 0.3rem;
            }
            img {
                width: 100%;
                height: 4rem;
            }
        }
    }
    .hots {
        color: #2aa3f2;
    }
    .textSpace {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:5rem;
        display:inline-block;
        position:relative;
        top:0.1rem;
    }
    .ritJtou {
        font-size: 0.1rem;
        color: #ccc;
    }
    .titleInof {
        text-align: left;
        p {
            line-height: 0.4rem;
            .flortRight {
                float: right;
            }
            &:nth-child(2){
                padding-left:0.3rem;
            }
        }
    }
</style>