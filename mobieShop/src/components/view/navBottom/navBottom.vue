
<template>
  <div class="page-tabbar">
    <div class="page-wrap" style='-webkit-overflow-scrolling : touch;'>
      <!-- tabcontainer -->
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="首页">
          <div v-if='isTrue'>
            <!-- isTrue true的话 为模板首页 false为默认首页 -->
            <templatePages></templatePages>
          </div>
          <div v-else>
            <homepage></homepage>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <buttomNav></buttomNav>
  </div>
</template>
  
<script>
    import buttomNav from '@/components/common/buttomNav.vue'
    import homepage from '@/components/view/homepage/homepage.vue'
    import templatePages from '@/components/view/template/templatePages.vue'
    export default {
      name: 'page-tabbar',
      data() {
        return {
          selected: '首页',
          isTrue: true,
          templateUrl: ''
        };
      },
      created() {
        // 浏览状态（PC浏览）：根据'ID'和'商城模板类型'查询首页模板数据  。并将默认首页设置消失  isTrue = true
        let isBrowse;
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          isBrowse = false;
        } else {
          isBrowse = true;
        }
        if (isBrowse) {
          //alert('现在浏览状态')
          this.isTrue = true;
          let that = this;
          //从后台取要浏览的ID
          let id = this.getURLparms("id");
          this.$http.post('/api/product/mall/template/queryMap/mall', {
              'templateID': id,
              'templateType': 1
            })
            .then(function(response) {
              //console.log(response)
              let comlists = JSON.parse(response.data.info[0].comlist)
              // console.log(comlists)
              that.$store.commit('getTemplateData', comlists) //对应组件的标识
            })
            .catch(function(response) {
              console.log(response)
            })
        } else {
          // 非浏览状态(手机状态)：根据'启用中'和'商城模板类型'字段，查询首页模板数据。 启用中：查询启用中那一项 isTrue = true  ,  不启用：设置 isTrue = false
          let ids = this.getURLparms("id");
          let companyId = sessionStorage.getItem("companyId");
          if (!companyId) {
            companyId = this.getURLparms("company")
          }
          //alert(ids)
          if (ids == null) {
            //地址没有参数，直接查看手机端
            let that = this;
            this.$http.post('/api/product/mall/template/queryMap/mall', {
                'templateType': 1,
                'isEnabled': true,
                "companyId": companyId
              })
              .then(function(response) {
                // console.log(response)
                if (response.data.info.length == 0) {
                  that.isTrue = false
                } else {
                  if (response.data.info == "尚未登录") {
                    that.$router.push({
                      path: '/login'
                    })
                  }
                  let comlists = JSON.parse(response.data.info[0].comlist)
                  //  console.log(comlists)
                  that.$store.commit('getTemplateData', comlists) //对应组件的标识
                }
              })
              .catch(function(response) {
                console.log(response)
              })
          } else {
            // 后台复制地址，手机查看
            let that = this;
            that.$http.post('/api/product/mall/template/queryMap/mall', {
                'templateID': ids,
                'templateType': 1
              })
              .then(function(response) {
                if (response.data.info.length == 0) {
                  that.isTrue = false
                } else {
                  if (response.data.info == "尚未登录") {
                    that.$router.push({
                      path: '/login'
                    })
                  }
                  let comlists = JSON.parse(response.data.info[0].comlist)
                  //  console.log(comlists)
                  that.$store.commit('getTemplateData', comlists) //对应组件的标识
                }
              })
              .catch(function(response) {
                console.log(response)
              })
          }
        }
      },
      methods: {
        getURLparms(name) {
          let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          let r = location.search.substr(1).match(reg);
          if (r != null)
            return unescape(r[2]);
          return null;
        }
      },
      components: {
        homepage,
        templatePages,
        buttomNav
      },
    };
</script>
  
<style>
   li {
     list-style: none;
   }
   .disblock {
     display: block;
     margin-bottom: 0.2rem;
   }
   .page-tabbar {
     overflow: hidden;
     height: 94vh;
   }
   .page-wrap {
     overflow: auto;
     height: 100%;
     padding-bottom: 100px;
   }
</style>