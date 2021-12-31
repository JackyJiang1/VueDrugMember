<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2020-08-11 16:31:59
 * @LastEditors: 
 * @LastEditTime: 2020-09-03 14:08:47
-->
<template>
    <div class="nothing" :style="'height:'+height+'px'">
        <div class="inner">
            <img src="../assets/image/nothing@2x.png">
            <p>空空如也</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            height: {
                default: 200
            }
        }
    }
</script>
<style lang="scss" scoped>
    .nothing {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        .inner {
            text-align: center;
            img {
                width: 80px;
                height: 60px;
            }
            p {
                margin: 0;
                padding-top: 10px;
                font-size: 14px;
                color: #999;
            }
        }
    }
</style>


