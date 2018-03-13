<template>
    <div class='classification'>
        <mt-search
        v-model="value_search"
        cancel-text="取消"
        @keyup.enter.native='search'
        placeholder="搜索">
        </mt-search>
        <div class='tab-contain'>
            <div class='nav-left'>
                <ul class='classfilist'>
                    <li>推荐</li>
                    <li>家电保养</li>
                    <li>家具保养</li>
                    <li>空气净化</li>
                    <li>净水</li>
                </ul>
            </div>
            <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>
            <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>
            <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>
            <mt-tab-container v-model="active">
                <mt-tab-container-item id="tab-container1">
                    <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                    <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container3">
                    <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value_search:'',
            active:'tab-container1'
        }
    },
    methods:{
        search(){
            console.log(this.value_search);
        }
    }
}
</script>
<style scoped>
    .classification{
        font-size: .3rem;
    }
    .mint-search{
        height:auto;
    }
    .nav-left{
        
    }
</style>

