<template>
  <div class="page-swipe">
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="./sofa.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="./sofa.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="./sofa.jpg">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        }
    };
</script>
<style>
 #templatePage .page-swipe {
        height: 3.56rem;
        margin-top: 0.2rem;
    }
</style>
