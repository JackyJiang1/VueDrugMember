<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2021-02-03 14:19:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-13 16:22:42
-->
<template>
    <el-dialog
      title="PO Commitment Import"
      :visible.sync="dialogVisibleUpload"
      :before-close="close"
      width="50%">
      <p class="demo">you temptate: <el-link type="primary">xxxx.csv</el-link></p>
      <!-- <p class="demo">you temptate: <el-link type="primary">xxxx.csv</el-link></p> -->
      <el-upload
        :disabled="uploadFinish"
        :headers="headers"
        class="upload-demo"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList">
        <el-button size="small" type="primary">check</el-button>
        <el-button size="small" type="primary">import</el-button>
      </el-upload>
      <div class="attachments">
        <h2>Error Information</h2>
        <el-table
          height="300"
          :data="fileList"
          border
          style="width: 100%">
          <el-table-column prop="errorTips" label="errorTips"></el-table-column>
          <el-table-column prop="fileName" label="fileName"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
</template>
<script>
export default {
  props: [
    'dialogVisibleUpload',
    'uploadUrl',
  ],
  data() {
    return {
      uploadFinish: false,
      fileList: [],
      headers: {Token: sessionStorage.getItem('token')},
    }
  },
  mounted() {
    this.uploadFinish = false;
  },
  methods: {
    beforeUpload() {
      this.uploadFinish = true;
      return true
    },
    close() {
      this.$emit('close',false)
    },
    //文件上传成功
    uploadSuccess(res, file) {
      this.uploadFinish = false;
      if (res.code == '0') {
        this.$emit('close',true)
      } else {
        this.$message.error(res.msg)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/mixin';
  .attachments{
    h2{
      font-size: 14px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 10px;
      color: $color-primary;
    }
    .errWrap{
      li{
        color: $color-danger;
        line-height: 1.8;
      }
    }
  }
  .demo{
      margin:10px 0 20px;
      font-size: 16px;
    }
</style>