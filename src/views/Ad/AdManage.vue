<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="广告标题" prop="title">
              <el-input v-model="formInline.title"></el-input>
            </el-form-item>
            <el-form-item label="广告描述" prop="description">
              <el-input v-model="formInline.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo(1)" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="reset()" icon="el-icon-refresh">重置</el-button>
              <el-button type="success" icon="el-icon-bottom" @click="exportList">导出</el-button>
              <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleClick('add')">新增</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <el-table
      highlight-current-row
      v-loading="loading"
      :data="tableData"
      height="60vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="title" label="广告标题" width="200"></el-table-column>
      <el-table-column prop="description" label="广告描述" width="300"></el-table-column>
      <el-table-column prop="createdby" label="创建人"></el-table-column>
      <el-table-column prop="createddate" label="创建日期" width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column
        width="400"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleClick1(scope.row,'show')"><i class="el-icon-tickets"></i>显示</el-button>
          <el-button type="primary" size="mini" @click="handleClick1(scope.row,'edit')"><i class="el-icon-edit"></i>修改</el-button>
          <el-button type="danger" size="mini" @click="handleClick1(scope.row,'delete')"><i class="el-icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total,prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="60%">
      <div>
        <el-form :inline="true" :model="formInline2" class="demo-form-inline" label-width="120px">
          <div>
            <el-form-item label="广告标题">
              <el-input v-model="formInline2.title" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="广告描述">
              <el-input v-model="formInline2.description" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="上传幻灯片">
              <el-upload
                class="img-uploader"
                :action="imgUploaderUrl"
                name="file"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="广告状态">
              <el-switch
                style="display: block"
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                :disabled="showFlag">
            </el-switch>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="序号">
              <el-input v-model="formInline2.sort" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operater mb20 center">
        <el-button type="primary" icon="el-icon-edit" @click="saveEdit" v-if="!showFlag">Save</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  // components:{
  //   'upload': ()=>import('@/components/Import')
  // },
  data() {
    return {
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        title: '',
        description: '',
      },
      formInline2: {},
      tableData: [],
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",
      imgUploaderUrl:'',
      header:'',
      //fileList:'',
      articalid:'',

    }

  },
  // components: {
  //   quillEditor
  // },
  mounted() {
    this.getInfo();
  },
  methods: {
    onEditorChange({editor, html, text}) {//内容改变事件
      console.log("---内容改变事件---")
      this.content = html
      console.log(html)
    },
    exportList() {
      let nowDate = new Date().getTime();
      this.$http.get(`${this.$api.ExportDrugArticalList}?title=${this.formInline.title}&description=${this.formInline.description}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Artical' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
      .then(res => {})
      .catch(error => {
        this.$message({type: 'error', showClose: true, message: 'export fail'})
      });
    },
    reset() {
      this.$refs['formInline'].resetFields();
      this.getInfo();
    },
    getInfo(isInit) {
      if (isInit === 1) {
        this.currentPage = 1;
      }
      this.loading = true;
      let data = { title: `${this.formInline.title}`, 
      description: `${this.formInline.description}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      this.$http.post(`${this.$api.GetDrugArticalList}`, data)
      .then(res=> {
        this.tableData = res.data;
        this.loading = false;
        this.total = res.totalrows
      })
      .catch(err=> {
        console.log(err)
      })
    },
    saveEdit() {
      console.log(this.$refs.myQuillEditor.value)
    },
    handleClick(type) {
      //if (type == 'add') {
        this.articalid = '';
        this.showFlag = false;
        this.dialogTitle = "新增";
        this.formInline2 = {};
        //需要产生一个主键id
        this.$http.post(`${this.$api.GetNewGuid}`)
          .then(res=> {
            this.articalid = res;
            this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + this.articalid + `&source_item=Artical`;
          })

        this.dialogVisible = true;
      //}
    },
    handleClick1(row, type) {
      this.title = type;
      if (type == 'show') {
        this.dialogTitle = "查看";
        this.formInline2 = row;
        this.dialogVisible = true;
        this.showFlag = true;
      } else if (type == 'delete') {
        this.$confirm('确定删除？','请确认')
        .then(_ => {
          this.$http.post(`${this.$api.DeleteDrugShop}?id=${row.id}`)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.msg) : this.$message.error(res.msg)
            this.onSubmit();
          })
        })
        .catch(_ => {});
      } else if (type == 'edit') {
        this.showFlag = false;
        this.dialogTitle = "修改";
        this.formInline2 = row;
        this.dialogVisible = true;
      } else {
        this.dialogTitleMA = "查看";
        this.dialogVisibleMA = true;
        this.getInfoMA(row);
      }
    },
    dateFormat:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD")
    },
    datetimeFormat:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD HH:MM:SS")
    },

    //  //图片上传个数限制
    // handleExceed(files, fileList) {
    //   this.$message.warning(`请最多上传 ${this.form.limit} 张图片。`);
    // },
    //图片上传的验证
    beforeUpload(file) {
      var testmsg = /^image\/(jpeg|png|jpg|bmp)$/.test(file.type);
      const isLt4M = file.size / 1024 / 1024 <= 4; //图片大小不超过2MB
      if (!testmsg) {
        this.$message.error("上传图片格式不对!");
        this.$refs.upload.clearFiles();
        return;
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4M!");
        return;
      }
      return testmsg && isLt4M;

      //const file = file.file; // 文件信息
      let formData = new FormData();
      formData.append("file", file);
    },
    handlePreview(file){
    },
    //删除上传了的图片
    handleRemove(file) {
      console.log(file, "delete");
      let arrPic = this.$refs.upload.uploadFiles;
      let index = arrPic.indexOf(file);
      this.picList.splice(index, 1);
      let num = 0;
      arrPic.map((item) => {
        if (item.uid == file.uid) {
          arrPic.splice(num, 1);
        }
        num++;
      });
      console.log(arrPic, "arrpic");
    },    
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
</style>
<style>
.ql-editor.ql-blank, .ql-editor {
height: 350px;
}

.dvquill .el-form-item__content{
width:80%;
}
</style>