<template >
    <div class='details'>
    <div class='heardImg clearfloat'>
        <div class='imgLeft'>
            <img src='./sofa.jpg'>
        </div>
        <div class='textInfo'>
            <div class='clearfloat'><h3 class='floatLeft'>净润加</h3> <span class='floatRight'>￥299</span></div>
            <p>家居保养沙发家居保养沙发家居保养沙发家居保养沙发</p>
        </div>
    </div>
        <ul class='clearfloat Ulstar'>
            <li :class="{li1:1,bg1:index%2}" v-for="(value,index) in list" :key="index">
                <div v-for="(item,index1) in value.classs.zh" class="stu_div" :id="index" :key="index1">
                    <span class="stu_title">{{item.title}}</span>
                    <span class="stu_bgstar" :id="index1">
                    <span class="stu_bgstar1" :title="value.classs.title1"></span>
                    <span class="stu_bgstar1" :title="value.classs.title1"></span>
                    <span class="stu_bgstar1" :title="value.classs.title1"></span>
                    <span class="stu_bgstar1" :title="value.classs.title1"></span>
                    <span class="stu_bgstar1" :title="value.classs.title1"></span>
                    </span>
                    <span class="stu_bgstar2" @mousemove="pingjia($event)" :title="value.classs.title1" @click="pingjia1($event)" @mouseleave="pingjia2($event)"></span>
                </div>
            </li>
        </ul>
        <ol class='commnet clearfloat'>
            <li class='active'>上门及时</li>
            <li>服务质量高</li>
            <li>客服态度好</li>
            <li>客服态度非常好</li>
        </ol>
        <div class="shopCommnet">
            <span>评价商品</span>
            <textarea>

            </textarea>
        </div>
        <div class="shopCommnet">
            <span>评价商品</span>
        </div>
    </div>
</template>
<style>
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0} 
    .textInfo div:nth-child(1){
        margin-top:0.4rem;
        margin-bottom:0.25rem;
        padding-right:0.3rem;
    }
    .commnet .active{
        border:1px solid #fff;
        color:#fff;
        background:#27a1f2;
    }
    .shopCommnet{
        
        text-align:left;
        padding-left:0.4rem;
    }
    .shopCommnet span{
        vertical-align:top;
        padding-top:0.7rem;
        display:inline-block;
    }
    .shopCommnet textarea{
        margin-left:0.2rem;
        margin-top:0.5rem;
        width:70%;
        height:1.5rem;
        resize:none;
        border-radius:0.1rem;
    }
    .commnet{
        border-bottom:1px solid #d2d2d2;
    }
    .commnet li{
        border-radius:0.1rem;
        float:left;
        margin-left:0.5rem;
        padding:0.2rem;
        border:1px solid #d2d2d2;
        margin-bottom:0.2rem;
        margin-top:0.2rem;
    }
    .Ulstar{
        padding-left:0.4rem;
        margin-top:0.6rem;
        border-bottom:1px solid #d2d2d2;
        padding-bottom:0.2rem;
    }
    .textInfo p:nth-child(2){
        padding-right:0.3rem;
    }
    .floatRight{
        float:right;
    }
    .floatLeft{
        float:left;
    }
    .details{
        font-size: 0.2rem;
    }
    .textInfo h3{
        display:inline-block;
        font-size:0.3rem;
    }
    .li1 {
        width: 100%;
    }
    .bg1 {
        background: #00A2D4;
    }
    .heardImg{
        padding-top:0.3rem;
    }
    .heardImg .imgLeft{
        width:2.36rem;
        height:2.16rem;
        float:left;
        margin-left:0.3rem;
        border-radius:0.2rem;
        -webkit-box-shadow: 1px 1px 5px; -moz-box-shadow: 1px 1px 5px; box-shadow: 1px 1px 5px;
        overflow:hidden;
    }
    .heardImg .imgLeft img{
        width:100%;
        height:100%;
    }
    .heardImg .textInfo{
        float:left;
        width:60%;
        text-align:left;
        margin-left:0.3rem;
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
        line-height:0.5rem;
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
        margin-left:0.2rem;
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
        margin-left:0.2rem;
    }
    .stu_li_text {
        width: 95%;
        height: 100px;
        border: 1px solid #000000;
        resize: none;
    }
</style>
<script>
    　　
    export default {　　　　
        data() {　　　　　　
            return {　　　　　　　　
                list: [{
                    classs: {
                        major: "数学",
                        title1: 0,
                        zh: [{
                                title: "形象态度",
                                d: 0,
                                lastD: 0
                            },
                            {
                                title: "服务质量",
                                d: 0,
                                lastD: 0
                            }
                        ],
                        text: "好"
                    }
                }]　　　　　　
            }　　　　
        },
        methods: {　　　　
            pingjia($event) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                let a = parseInt($event.offsetX / 200 *100);
                let c = parseFloat($event.offsetX /40);
                this.list[wei].classs.zh[b].d = Math.ceil(c);
                this.list[wei].classs.title1 = a;
                for (let i = 0; i < 5; i++) {
                    if (i < this.list[wei].classs.zh[b].d) {
                        $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                    } else {
                        $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                    }
                }
                if (a == 0) {
                    $event.target.previousElementSibling.children[0].classList.remove('stu_bgstar3');
                }
            },
            pingjia1($event) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                this.list[wei].classs.zh[b].lastD = this.list[wei].classs.zh[b].d;
            },
            pingjia2($event) {
                let wei = $event.target.parentNode.id;
                let b = $event.target.previousElementSibling.id;
                for (let i = 0; i < 5; i++) {
                    if (i < this.list[wei].classs.zh[b].lastD) {
                        $event.target.previousElementSibling.children[i].classList.add('stu_bgstar3');
                    } else {
                        $event.target.previousElementSibling.children[i].classList.remove('stu_bgstar3');
                    }
                }
            },
           
        }　　
    }
</script>