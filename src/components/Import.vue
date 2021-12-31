<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2021-02-03 14:19:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-13 16:32:01
-->
<template>
    <el-dialog
      title="upload attachment"
      :visible.sync="dialogVisibleUpload"
      :before-close="close"
      width="50%">
      <el-upload
        :disabled="uploadFinish"
        :headers="headers"
        class="upload-demo"
        :action="uploadUrl"
        :show-file-list="true"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList">
        <el-button size="small" type="primary">upload</el-button>
      </el-upload>
      <!-- <div class="attachments">
        <h2>Attachments</h2>
        <el-table
          :data="fileList"
          border
          style="width: 100%">
          <el-table-column prop="PONumber" label="PONumber"></el-table-column>
          <el-table-column prop="POLine" label="POLine"></el-table-column>
          <el-table-column prop="PartNo" label="PartNo"></el-table-column>
        </el-table>
        <h2>Error Information</h2>
        <ul class="errWrap">
          <li>err!!ction="https://jsonplaceholder.typicode.com/posts/"</li>
          <li>err!!ction="https://jsonplaceholder.typicode.com/posts/"</li>
        </ul>
      </div> -->
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
</style>