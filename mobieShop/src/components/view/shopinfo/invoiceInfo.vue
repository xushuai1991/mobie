
<template>
    <section class='CInvoice'>
        <div v-if='infoStatu==11'>
            <h1>个人普通发票</h1>
             <div class='ImgBox'><img :src='imgBox'/></div>
              <div class='downPdfs' >下载电子发票pdf文件</div>
             <div class='payEmails' >将发票发送至邮箱</div>
        </div>
        <div v-if='infoStatu==21'> 
            <h1>单位普通发票</h1>
             <div class='ImgBox'><img :src='imgBox'/></div>
             <div class='downPdfs' >下载电子发票pdf文件</div>
             <div class='payEmails' >将发票发送至邮箱</div>
        </div>
        <div v-if='infoStatu==22'> 
            <h1>单位专用发票</h1>
            <div class='ImgBox'><img :src='imgBox'/></div>
             <div class='downPdfs' @click='downPdf' ><a :href='this.pdfurl' download='1.pdf'>下载电子发票pdf文件</a></div>
             <div class='payEmails' @click='payEmail'>将发票发送至邮箱</div>
        </div>
    </section>
</template>
<script>

    export default {
        data() {
            return {
                infoStatu:"",
                imgBox:'',
                pdfurl:'',
            }
        },
        methods:{
            downPdf(){

            },
            payEmail(){

            }
        },
        created(){
            let info = JSON.parse(sessionStorage.getItem("invoiceInfo"))
            console.log(info.id)
            this.infoStatu = info.category
            let url = '/api/product/order/invoice/queryMapByIds '
            this.$http({
                url:url,
                method:'post',
                data:[info.id]
            }).then((res)=>{
               this.imgBox = res.data.info[0].taxpayerCertificate
               this.pdfurl = res.data.info[0].url
               console.log(this.pdfurl)

            }).catch((error)=>{
                console.log(error)
            })
        },
    }
</script>
<style lang="less" scoped>
    .CInvoice {
        font-size: 0.3rem;
        // margin-top:1rem;
        h1{
            line-height:0.8rem;
            font-size:0.4rem;
            color:#ff9207;
        }
        .ImgBox{
            width:100%;
            img{
                width:100%;
            }
        }
        .downPdfs,.payEmails{
            margin:auto;
            margin-top:0.8rem;
            line-height:0.8rem;
            background:#65cd328c;
            width:80%;
            color:#fff;
        }
    }

</style>