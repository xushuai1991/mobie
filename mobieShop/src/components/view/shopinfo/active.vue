<template>
    <section class='Cactive'>
        <h3 class='tipname'>新品热卖活动</h3>
        <ul class='ImbBox'>
            <li v-for='(item,index) in list_activiety' :key='index'>
                <router-link :to='item.activityLink'>
                    <div class='imgBox'>
                        <img :src='item.imgurl' />
                    </div>
                    <div class='titleInof'>
                        <p><i class='icon iconfont icon-xiaohuomiao hots'></i><span class='textSpace'>{{item.title}}</span> <span class='flortRight'>go <i class="icon iconfont icon-youshuangjiantou ritJtou"></i></span></p>
                        <p>关注人数 {{item.registeredNumber}} <span class='flortRight'>{{item.startTime}}</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
        <div style="background-color:#fff;font-size:.4rem;padding-top:3rem;" v-if='list_activiety.length==0'>
            <p>暂无数据</p>
        </div>
    </section>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            list_activiety:[],
        }
    },
    created(){
        this.$root.$emit('header','活动列表');
    },
    methods:{
        getActivitylist(pagenum){
            let that=this;
            this.$http.post('/api/product/activity/find?pageSize=5&pageNo='+pagenum)
            .then(res=>{
                if(res.data.status==200){
                    res.data.info.list.forEach(item=>{
                        let json={
                            title:item.activityTitle,
                            imgurl:item.image,
                            startTime:item.startTime,
                            activityLink:item.activityLink,
                            registeredNumber:item.registeredNumber
                        };
                        that.list_activiety.push(json);
                    });
                }
                else{
                    Toast(res.data.msg);
                }
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
                Toast('活动载入失败，请稍后尝试。');
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .Cactive {
        font-size: 0.2rem;
        // margin-top: 0.9rem;
        background: #ebebeb6e;
        .tipname{
            line-height: 1rem;
            text-align: left;
            font-size: 0.3rem;
            background-color: #fff;
            padding-left: .3rem;
        }
    }
    .ImbBox {
        // padding: 0.2rem;
        li {
            background: #fff;
            padding: 2% 4%;
            margin-bottom: .2rem;
            width: 92%;
            height: 5.4rem;
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