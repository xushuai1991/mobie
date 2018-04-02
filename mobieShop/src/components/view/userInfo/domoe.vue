<template>
 <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
 <!--li数据遍历循环部分-->
 <li class="mui-table-view-cell" v-for="item in list">
  <a class="mui-navigate-right">
   <span class="mui-pull-left">{{item.shopname}}</span>
  </a>
 </li>
 <!--底部判断是加载图标还是提示“全部加载”-->
 <li class="more_loading" v-show="!queryLoading">
  <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
  <span v-show="allLoaded">已全部加载</span>
 </li>
</ul>
</template>

<script type="text/babel">
  export default {
  data() {
   return {
    //初始化无限加载相关参数
    queryLoading: false,
    moreLoading: false,
    allLoaded: false,
    totalNum: 0,
    pageSize: 20,
    pageNum: 1,
    list:[
                    // shop:[{'img': require('./../homepage/recommend/recommendImage/1.jpg')}],
                    {
                        id: 1,
                        shopname: '内蒙古原产牛奶',
                        shopselected: false,
                        listgoods: [{
                                id: 101,
                                name: '奶片',
                                price: 1.3,
                                count: 2,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 102,
                                name: '小辣椒',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 103,
                                name: '小辣椒22222',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            }
                        ]
                    },
                    {
                        id: 2,
                        shopname: '云端电子',
                        shopselected: false,
                        listgoods: [{
                                id: 201,
                                name: '三星',
                                price: 4000,
                                count: 2,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 202,
                                name: '华为1',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 203,
                                name: '华为2',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            },
                            {
                                id: 204,
                                name: '华为3',
                                price: 100,
                                count: 1,
                                selected: false,
                                'img': require('./../homepage/recommend/recommendImage/1.jpg')
                            }
                        ]
                    },
                    {
                        id: 3,
                        shopname: '小米官方商店',
                        shopselected: false,
                        listgoods: [{
                            id: 301,
                            name: '小米4',
                            price: 1.3,
                            count: 2,
                            selected: false,
                            'img': require('./../homepage/recommend/recommendImage/1.jpg')
                        }]
                    },
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                    { shopname: '云端电子'},
                ]
   }
  },
  computed: {
   params() {
    return{
     //这里先定义要传递给后台的数据
     //然后将每次请求20条的参数一起提交给后台
     pageSize: this.pageSize
     }
   }
  },
  methods: {
   //无限加载函数
   loadMore() {
    if(this.allLoaded){
     this.moreLoading = true;
     return;
    }
    if(this.queryLoading){
     return;
    }
    this.moreLoading = !this.queryLoading;
    this.pageNum++;
    // this.$http.post("请求后台数据的接口",Object.assign({pageNum:this.pageNum},this.params)).then((res) => {
    //  if(res.sData && res.sData.list){
    //   this.list = this.list.concat(res.sData.list);
    //   this.allLoaded = this.debtList.length==this.totalNum;
    //  }
    //  this.moreLoading = this.allLoaded;
    // });
   }
  },
 }
</script>