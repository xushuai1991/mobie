<template>
    <div class='addEdit'>
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="手机号：" placeholder="请输入手机号" v-model="username"></mt-field>
        <mt-field label="大区：" placeholder="请输入大区" v-model="username"><span @click='LargeArea'>选择区域</span></mt-field>
        <mt-field label="省市区：" placeholder="请输入省市区" v-model="cirty">
            <!-- <span class="location" @click='getDetailedAddress'><i class='icon iconfont icon-dizhi1'></i> 定位</span>!--></mt-field>
        <mt-field label="街道：" placeholder="请输入街道" v-model="street"></mt-field>
        <mt-field label="详情地址：" placeholder="请输入详情地址" v-model="details"></mt-field>
        <mt-checklist title="" class="morz" v-model="value" align="right" :options="options" @change="checkon">
        </mt-checklist>
        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;'>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">大区</mt-tab-item>
                <mt-tab-item id="2" v-show='provinceIshow'>省份</mt-tab-item>
                <mt-tab-item id="3" v-show='cirtyIshwo'>城市</mt-tab-item>
                <mt-tab-item id="4" v-show='countyIshwo'>区县</mt-tab-item>
                <mt-tab-item id="5" v-show='streetIshow'>街道</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected ">
                <mt-tab-container-item id="1">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in largeAreArr' :key='index' v-text='item.regionName' @click="getlarge(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in proDisId' :key='index' v-text='item' @click="proDis(index)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in countyInfo' :key='index' v-text='item.regionName' @click="cityDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in streetInfo' :key='index' v-text='item.regionName' @click="countyDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in streetInfos' :key='index' v-text='item.regionName' @click="streetDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
            <div class='closeBtn' @click="btnClose">关闭</div>
        </mt-popup>
        <baidu-map class="bm-view" style='display:none;'>
        </baidu-map>
    </div>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
    export default {
        data() {
            return {
                username: '',
                largeAre: '', //大区
                largeAreArr: '',
                province: '', //省
                cirty: '', //城市
                county: '', //县
                street: '', //街道
                details: '', //详细地址
                selected: '1',
                provinceIshow: false,
                cirtyIshwo: false,
                countyIshwo: false,
                streetIshow: false,
                //
                smallDisInfo: [],
                smallDisInfos: {},
                houseInfo: [],
                proInfoList: [],
                proInfo: [],
                cityInfoList: [],
                cityInfo: [],
                countyInfo: [],
                streetInfo: [],
                streetInfos: [],
                bigDisId: {},
                proDisId: {},
                cityDisId: {},
                //
                popupVisible: false,
                value: [],
                options: [{
                    label: '默认地址：',
                    value: 'A'
                }],
                // currentLnglat: {  
                //     lon: 116.331398,
                //       lat: 39.897445
                // }
            }
        },
        methods: {
            LargeArea() {
                let that = this;
                //获取地区的
                this.popupVisible = true;
                //创建一个Promise实例，获取数据。并把数据传递给处理函数resolve和reject。需要注意的是Promise在声明的时候就执行了。
                var getUserInfo = new Promise(function(resolve, reject) {
                    let url = '/api/public/region/findParent?parentId=0&levels=3';
                    that.$http({
                            url: url,
                            method: 'get',
                            // 请求体重发送的数据
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(response => {
                            resolve(response)
                        })
                        .catch(error => {
                            reject(data.ErrMsg)
                        })
                })
                //另一个ajax Promise对象，
                //Promise的方法then,catch方法
                getUserInfo.then(function(ResultJson) {
                    that.largeAreArr = ResultJson.data.info
                    if (ResultJson.data.info == null) {
                        alert(res.data.error)
                    } else {
                        that.houseInfo = ResultJson.data.info; //大区
                        (ResultJson.data.info).forEach(function(e, i) {
                            that.proInfoList = that.houseInfo[e.id - 1].sysRegionList; //省
                            that.bigDisId[e.id] = e.regionName;
                            that.proInfoList.forEach(function(e, i) {
                                that.proInfo.push(e);
                                that.cityInfoList = that.proInfoList[i].sysRegionList; //城市
                                that.cityInfoList.forEach(function(e, i) {
                                    that.cityInfo.push(e); //街道
                                });
                            });
                        });
                    }
                    //通过拿到的数据渲染页面
                }).catch(function(ErrMsg) {
                    //获取数据失败时的处理逻辑
                })
            },
            getlarge(item) { //大区选择
                let that = this;
                that.cirtyIshwo = false;
                that.countyIshwo = false;
                that.streetIshow = false;
                that.proDisId = {};
                that.selected = '2'
                that.provinceIshow = true;
                    that.proInfo.forEach(function(e, i) {
                        if (e.parentCode == (item.id)) {
                            that.proDisId[e.id] = e.regionName;
                            console.log(that.proDisId)
                        }
                    });
            },
            proDis(item) { //省选择
                console.log(item)
                let that = this;
                that.countyIshwo = false;
                that.streetIshow = false;
                this.$http.get('/api/public/region/findParent?parentId=' + item)
                    .then(res => {
                        that.cirtyIshwo = true;
                        that.selected = '3';
                        this.countyInfo = res.data.info;
                    }).catch(err => {
                        console.log(err)
                    });
            },
            cityDis(item) { //市选择
                let that = this;
                that.streetIshow = false;
                this.$http.get('/api/public/region/findParent?parentId=' + item.id)
                    .then(res => {
                        //console.log(res.data.info);
                        that.selected = '4'
                        that.countyIshwo = true;
                        this.streetInfo = res.data.info;
                    }).catch(err => {
                        console.log(err)
                    });
            },
            countyDis(item) {
                let that = this;
                this.$http.get('/api/public/region/findParent?parentId=' + item.id)
                    .then(res => {
                        //console.log(res.data.info);
                        that.selected = '5'
                        that.streetIshow = true;
                        this.streetInfos = res.data.info;
                    }).catch(err => {
                        console.log(err)
                    });
            },
            streetDis(item) {
                console.log(item)
            },
            btnClose() {
                this.popupVisible = false;
            },
            getDetailedAddress() {  
                let that = this;
                var geolocation = new BMap.Geolocation();  
                geolocation.getCurrentPosition(function(r) {    
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {      
                        var mk = new BMap.Marker(r.point);             // map.panTo(r.point);
                        // that.currentLnglat.lon = r.point.lng;      
                        // that.currentLnglat.lat = r.point.lat;       //搜索位置或当前位置
                        // let point1 = new BMap.Point(that.currentLnglat.lon, that.currentLnglat.lat); 
                        var geoc = new BMap.Geocoder();      
                        var pt = r.point;   
                        geoc.getLocation(pt, function(rs) {        
                            var addComp = rs.addressComponents;  
                            that.cirty =  addComp.province + addComp.city + addComp.district;
                            that.street = addComp.street;        //申请省市区code
                            that.details = addComp.streetNumber;
                        });    
                    } else {      
                        alertTip('failed' + this.getStatus());    
                    }      
                }, {
                    enableHighAccuracy: true
                })
            },
            checkon() {
                console.log('checkon')
            }
        }
    }
</script>
<style lang="less">
    .closeBtn{
        line-height:1rem;
        text-align:center;
        background:#26a2ff;
        color:#fff;
        font-size:0.3rem;
    }
    .addStyle {
        font-size: 0.3rem;
        max-height: 4rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        li {
            line-height: 0.8rem;
            text-indent: 0.46rem;
        }
    }
    .bm-view {
        width: 100%;
        height: 300px;
    }
    .location {
        color: #f38650;
    }
    .addEdit {
        margin-top: 0.8rem;
        font-size: 0.2rem;
        text-align: left;
        .mint-checklist-label {
            padding: 0 !important;
        }
        .morz {
            .mint-checklist-title {
                display: none;
            }
            .mint-cell-wrapper {
                // padding: 0 4.8rem 0 0.08rem;
            }
            .mint-checkbox-core {
                left: -4.5rem;
            }
        }
    }
</style>