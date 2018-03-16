<template>
    <div id="invite-gift">
        <ul class="gift-top" :style="{backgroundImage: 'url(' + imgSrc + ')' }">
            <li ><p class="icon iconfont"></p></li>
            <li>接受绿城小伙伴的邀请</li>
            <li>首单立减5元</li>
            <li><span>5</span>元</li>
        </ul>
        <div class="gift-bottom">
            
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            imgSrc:require('../../../../static/images/bgimg.png'),
        }
    },
    methods:{

    }
}
</script>
<style lang="less">
html,body{
    height:100%;
}
</style>
<style lang="less" scoped>
#invite-gift{
    // height:100%;
}
</style>
