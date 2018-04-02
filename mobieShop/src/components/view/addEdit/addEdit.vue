<template>
    <div class='addEdit'>
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="手机号：" placeholder="请输入手机号" v-model="username"></mt-field>
        <mt-field label="大区：" placeholder="请输入大区" v-model="username"><span @click='LargeArea'>选择区域</span></mt-field>
        <mt-field label="省市区：" placeholder="请输入省市区" v-model="cirty"> <span class="location" @click='getDetailedAddress'><i class='icon iconfont icon-dizhi1'></i> 定位</span> </mt-field>
        <mt-field label="街道：" placeholder="请输入街道" v-model="street"></mt-field>
        <mt-field label="详情地址：" placeholder="请输入详情地址" v-model="details"></mt-field>
        <mt-checklist title="" class="morz" v-model="value" align="right" :options="options" @change="checkon">
        </mt-checklist>
        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;'>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">大区</mt-tab-item>
                <mt-tab-item id="2">省份</mt-tab-item>
                <mt-tab-item id="3">城市</mt-tab-item>
                <mt-tab-item id="4">区县</mt-tab-item>
                <mt-tab-item id="5">街道</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <ul class='addStyle'>
                        <li>华东</li>
                        <li>华东</li>
                        <li>华东</li>
                        <li>华东</li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <ul class='addStyle'>
                        <li>华东</li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <ul class='addStyle'>
                        <li>华东</li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <ul class='addStyle'>
                        <li>华东</li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                    <ul class='addStyle'>
                        <li>华东</li>
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
                province: '', //省
                cirty: '', //城市
                county: '', //县
                street: '', //街道
                details: '', //详细地址
                selected: '1',
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
                //获取地区的
                this.popupVisible = true;
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
    .addStyle {
        font-size: 0.25rem;
        max-height: 5rem;
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