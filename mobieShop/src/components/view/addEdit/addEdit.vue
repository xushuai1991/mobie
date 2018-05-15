<template>
    <div class='addEdit'>
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="手机号：" placeholder="请输入手机号" v-model="useriphone"></mt-field>
        <mt-field label="大区：" placeholder="请输入大区" v-model="largeAre" style='color:#000;' readonly="readonly"><span @click='LargeArea'>选择区域</span></mt-field>
        <mt-field label="省市区：" placeholder="请输入省市区" v-model="newCity" style='color:#000;' readonly="readonly">
            <!-- <span class="location" @click='getDetailedAddress'><i class='icon iconfont icon-dizhi1'></i> 定位</span>!--></mt-field>
        <mt-field label="街道：" placeholder="请输入街道" v-model="street" style='color:#000;' readonly="readonly"></mt-field>
        <mt-field label="详情地址：" placeholder="请输入详情地址" v-model="details"></mt-field>
        <mt-checklist title="" class="morz" v-model="value" align="right" :options="options">
        </mt-checklist>
        <mt-popup v-model="popupVisible" position="bottom" style='width:100%;'>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1" >大区</mt-tab-item>
                <mt-tab-item id="2" v-show='provinceIshow'>省份</mt-tab-item>
                <mt-tab-item id="3" v-show='cirtyIshwo'>城市</mt-tab-item>
                <mt-tab-item id="4" v-show='countyIshwo'>区县</mt-tab-item>
                <mt-tab-item id="5" v-show='streetIshow'>街道</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected ">
                <mt-tab-container-item id="1">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in largeAreArr' :class="{'active':item.id ==checkindex }" :key='index' v-text='item.regionName' @click="getlarge(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in proDisId' :class="{'active':item.id ==checkindex1 }" :key='index' v-text='item.regionName' @click="proDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in countyInfo' :class="{'active':item.id ==checkindex2 }" :key='index' v-text='item.regionName' @click="cityDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in streetInfo' :class="{'active':item.id ==checkindex3 }" :key='index' v-text='item.regionName' @click="countyDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                    <ul class='addStyle'>
                        <li v-for='(item,index) in streetInfos' :class="{'active':item.id ==checkindex4 }" :key='index' v-text='item.regionName' @click="streetDis(item)"></li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
            <div class='closeBtn button' @click="btnClose">关闭</div>
        </mt-popup>
        <baidu-map class="bm-view" style='display:none;'>
        </baidu-map>
        <mt-badge class='btnStyle button' @click.native='saveAddInfo' size="large" color="#26a2ff">保存</mt-badge>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'; 
    import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
    export default {
        data() {
            return {
                alertInfo: true,
                username: '',
                useriphone: '',
                largeAre: '', //大区
                largeAreArr: '',
                province: '', //省
                newCity: '',
                cirty: '', //城市
                cirty2: '',
                cirty3: '',
                county: '', //县
                street: '', //街道
                details: '', //详细地址
                selected: '1',
                checkindex: 0,
                checkindex1: 0,
                checkindex2: 0,
                checkindex3: 0,
                checkindex4: 0,
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
                proDisId: [],
                cityDisId: {},
                companyId:0,
                //
                popupVisible: false,
                value: [],

                options: [{
                    label: '默认地址：',
                    value: '1'
                }],
                // currentLnglat: {  
                //     lon: 116.331398,
                //       lat: 39.897445
                // }
            }
        },
        mounted(){
            this.companyId = sessionStorage.getItem('companyId');
            // this.LargeArea();
        },
        methods: {
            saveAddInfo() { //提交地址
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
            if(!myreg.test(this.useriphone)){
                Toast('请填写正确的手机号');
                return false;
            }
             let userId = localStorage.getItem("userinfo");
              let  userIds = JSON.parse(userId).id;
                let datainfo = {
                    "areaId": this.checkindex,
                    "provinceId": this.checkindex1,
                    "cityId": this.checkindex2,
                    "districtId": this.checkindex3,
                    "regionId": this.checkindex4,
                    "address": this.details,
                    "consigneeName": this.username,
                    "consigneeMobilePhone": this.useriphone,
                    "customerId": userIds
                }
                // let userifno = ;
                // console.log(JSON.parse(userId))
                //  let routerParams = this.$route.params;
                //  console.log(routerParams);
                // let userifno = JSON.parse(sessionStorage.getItem("addManagement")).val;
                  let userifno = JSON.parse(sessionStorage.getItem("addManagement")) ;
                  userifno==null?null:userifno.val
                //  userifno == null?null:userifno.val
                //  console.log(userifno.val)
               
            //    console.log(userifno)
                if (!this.username) {
                    this.$toast('用户不能为空');
                    return false
                }
                if (!this.checkindex) {
                    this.$toast('大区不能为空');
                    return false
                }
                if (!this.checkindex2) {
                    this.$toast('城市不能为空');
                    return false
                }
                if (!this.checkindex4) {
                    this.$toast('街道不能为空');
                    return false
                }
            //    console.log(routerParams.name =='addManagement')
            let addManagementGood = JSON.parse(sessionStorage.getItem("addManagement")) ;
                addManagementGood ==null?null:addManagementGood.goadd;
                if(addManagementGood){
                     let datainfo2 = {
                    "areaId": this.checkindex,
                    "provinceId": this.checkindex1,
                    "cityId": this.checkindex2,
                    "districtId": this.checkindex3,
                    "regionId": this.checkindex4,
                    "address": this.details,
                    "consigneeName": this.username,
                    "consigneeMobilePhone": this.useriphone,
                    "customerId": userifno.val.customerId,
                    'id':userifno.val.id
                }
                    let url = '/api/customer/address/update?useAsDefault=' + (this.value == true ? true : false);
                    this.$http({
                            url: url,
                            method: 'post',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/x-www-form-urlencoded'
                            // }
                            data:datainfo2
                        })
                        .then(response => {
                            if (response.data.msg = '修改成功') {
                                sessionStorage.removeItem("addManagement")
                                this.$toast(response.data.msg);
                                this.$router.push('./addManagement')
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }else{
                    let url = '/api/customer/address/insertOne?useAsDefault=' + (this.value == true ? true : false);
                    this.$http({
                            url: url,
                            method: 'post',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/x-www-form-urlencoded'
                            // }
                            data:datainfo
                        })
                        .then(response => {
                            if (response.data.info.msg = '新增成功') {
                                sessionStorage.removeItem("addManagement")
                                this.$toast(response.data.info.msg);
                                this.$router.push('./addManagement')
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                
            },
            LargeArea() { //大区
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
                    // let companyId = sessionStorage.getItem('companyId');
                    //
                    console.log(ResultJson.data.info)
                    if(ResultJson.data.info){
                        if(that.companyId-0 == 92){
                            ResultJson.data.info.forEach(item=>{
                            if(item.id-0 ==1){
                                that.largeAreArr = [item]
                                that.getlarge(item)
                            }
                        })
                        }else{
                             that.largeAreArr = ResultJson.data.info
                        }
                    }

                    // if (ResultJson.data.info == null) {
                    //     Toast(res.data.error)
                    // } else {
                    //     that.houseInfo = ResultJson.data.info; //大区
                    //     console.log(that.houseInfo)
                    //     (ResultJson.data.info).forEach(function(e, i) {
                    //         that.proInfoList = that.houseInfo[e.id - 1].sysRegionList; //省
                    //         that.bigDisId[e.id] = e.regionName;
                    //         that.proInfoList.forEach(function(e, i) {
                    //             that.proInfo.push(e);
                    //             that.cityInfoList = that.proInfoList[i].sysRegionList; //城市
                    //             that.cityInfoList.forEach(function(e, i) {
                    //                 that.cityInfo.push(e); //街道
                    //             });
                    //         });
                    //     });
                    // }
                    //通过拿到的数据渲染页面
                }).catch(function(ErrMsg) {
                    //获取数据失败时的处理逻辑
                })
            },
            getlarge(item) { //大区选择
                this.largeAre = item.regionName
                this.checkindex = item.id
                let that = this;
                that.cirtyIshwo = false;
                that.countyIshwo = false;
                that.streetIshow = false;
                // that.proDisId = {};
                that.selected = '2'
                that.provinceIshow = true;
                this.$http.get('/api/public/region/findParent?parentId=' + item.id)
                    .then(res => {
                        that.provinceIshow = true;
                        that.selected = '2';
                        if(this.companyId-0 ==92){
                            console.log()
                            res.data.info.forEach(item=>{
                                console.log(item.id)
                            if(item.id-0 ==100){
                                console.log(item)
                                that.proDisId = [item]
                                that.proDis(item)
                            }
                        })
                        }else{
                             this.proDisId = res.data.info
                        }
                       
                    }).catch(err => {
                        console.log(err)
                    });
                // that.proInfo.forEach(function(e, i) {
                //     if (e.parentCode == (item.id)) {
                //         that.proDisId[e.id] = e.regionName;
                //     }
                //     alert('..')
                // });
            },
            proDis(item) { //省选择
            console.log(item)
                this.cirty = item.regionName;
                this.checkindex1 = item.id
                let that = this;
                that.countyIshwo = false;
                that.streetIshow = false;
                this.$http.get('/api/public/region/findParent?parentId=' + item.id)
                    .then(res => {
                        that.cirtyIshwo = true;
                        that.selected = '3';
                        if(this.companyId-0 ==92){
                            console.log()
                            res.data.info.forEach(item=>{
                                // console.log(item)
                            if(item.id-0 ==101){
                                console.log(item)
                                that.countyInfo = [item]
                                that.cityDis(item)
                            }
                        })
                        }else{
                            this.countyInfo = res.data.info;
                        }
                        
                    }).catch(err => {
                        console.log(err)
                    });
            },
            cityDis(item) { //市选择
                this.cirty1 = ''
                this.cirty1 = item.regionName;
                this.checkindex2 = item.id
                let that = this;
                that.streetIshow = false;
                this.$http.get('/api/public/region/findParent?parentId=' + item.id)
                    .then(res => {
                        //console.log(res.data.info);
                        that.selected = '4'
                        that.countyIshwo = true;
                        if (res.data.info.length == 0) {
                            this.streetInfo = [{
                                regionName: '暂无地区',
                                id: 0
                            }]
                        } else {
                            this.streetInfo = res.data.info;
                        }
                    }).catch(err => {
                        console.log(err)
                    });
            },
            countyDis(item) { //区
                if (item.regionName == "其他区域") {
                    this.newCity = ''
                    this.newCity = this.cirty + this.cirty1 + this.cirty2;
                    this.btnClose();
                }
                if (item.regionName !== '暂无地区') {
                    this.cirty2 = '';
                    this.cirty2 = item.regionName;
                    this.newCity = ''
                    this.newCity = this.cirty + this.cirty1 + this.cirty2
                } else {
                    this.newCity = ''
                    this.newCity = this.cirty + this.cirty1 + this.cirty2
                }
                this.checkindex3 = item.id
                let that = this;
                if (item.id == 0) {
                    this.btnClose();
                    return false
                }
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
            streetDis(item) { //街道
                this.newCity = ''
                this.newCity = this.cirty + this.cirty1 + this.cirty2
                this.street = item.regionName;
                this.checkindex4 = item.id
                this.btnClose();
            },
            btnClose() { //关闭弹窗
                this.popupVisible = false;
            },
            getDetailedAddress() {   //定位
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
            }
        },
        created() {
            // let routerParams = this.$route.params;
            
            let userifno = JSON.parse(sessionStorage.getItem("addManagement")).val;

            if (userifno) {
                console.log(userifno)
                this.username = userifno.consigneeName
                this.useriphone = userifno.consigneeMobilePhone
                this.checkindex = userifno.areaId
                this.checkindex1 = userifno.provinceId
                this.checkindex2 = userifno.cityIdId
                this.checkindex3 = userifno.districtIdId
                this.checkindex4 = userifno.regionIdId
                this.LargeArea()
                this.getlarge(userifno.area)
                this.proDis(userifno.province)
                this.cityDis(userifno.city)
                this.countyDis(userifno.district)
                this.streetDis(userifno.region)
                this.provinceIshow = true;
                this.cirtyIshwo = true;
                this.countyIshwo = true;
                this.streetIshow = true;
                this.selected = '5'
                this.details = userifno.address
                this.value = userifno.isDefaultAddress
            }
        }
    }
</script>
<style lang="less">
    .btnStyle {
        margin-top: 0.5rem;
        margin-left: 45%;
        padding: 0.1rem 0.2rem !important;
        font-size: 0.3rem !important;
    }
    .addEdit .active {
        color: #26a2ff;
    }
    .closeBtn {
        line-height: 1rem;
        text-align: center;
        background: #26a2ff;
        color: #fff;
        font-size: 0.3rem;
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
        // margin-top: 0.8rem;
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
                left: -4.8rem;
            }
        }
    }
</style>