<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="资讯标题" prop="title">
              <el-input v-model="formInline.title"></el-input>
            </el-form-item>
            <el-form-item label="资讯关键词" prop="keywords">
              <el-input v-model="formInline.keywords"></el-input>
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
      <el-table-column prop="title" label="资讯标题" width="200"></el-table-column>
      <el-table-column prop="keywords" label="资讯关键词" width="300"></el-table-column>
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
            <el-form-item label="资讯标题">
              <el-input v-model="formInline2.title" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="资讯关键词">
              <el-input v-model="formInline2.keywords" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="上传缩略图">
              <!-- <el-upload
                class="img-uploader"
                :action="imgUploaderUrl"
                list-type="picture-card"
                :limit="form.limit"
                ref="upload"
                multiple
                :file-list="form.fileList"
                :on-exceed="handleExceed"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :http-request="httpRequest"
                :disabled="isDisabled"
                :on-error="uploadFailHandle"
                accept="image/jpeg, image/jpg, image/png, image/bmp">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->
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

          <div class="dvquill">
            <el-form-item label="资讯内容">
              <!-- 富文本组件-->
              <quill-editor
              class="quill-editor ql-editor"
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              >
              </quill-editor>
              <!-- 图片上传组件辅助-->
              <!-- <el-upload
              class="avatar-uploader"
              :action="quillUploaderUrl"
              :before-upload="quillBeforeUpload"
              name="file"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :file-list="fileList"
              >
              </el-upload> -->
              <!-- <quill-editor ref="myQuillEditor" v-model="content" class="myQuillEditor quill-editor ql-editor" :options="editorOption" /> -->
              <el-upload
                class="avatar-uploader"
                  :action="quillUploaderUrl"
                  name="file"
                  :before-upload="quillBeforeUpload"
                  :file-list="fileList"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  style="display:none"
                  >
              </el-upload>
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

// //富文本组件工具栏
// const toolbarOptions = [
//   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//   [{'header': 1}, {'header': 2}], // custom button values
//   [{'list': 'ordered'}, {'list': 'bullet'}],
//   [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
//   [{'direction': 'rtl'}], // text direction
//   [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
//   [{'header': [1, 2, 3, 4, 5, 6, false]}],
//   [{'color': []}, {'background': []}], // dropdown with defaults from theme
//   [{'font': []}],
//   [{'align': []}],
//   ['link', 'image'],
//   ['clean']
// ]

export default {
  // components:{
  //   'upload': ()=>import('@/components/Import')
  // },
  data() {
    return {
      // quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
       content: null,
      // fileList:[],//上传图片
      // editorOption: {
      //   placeholder: '',
      //   theme: 'snow', // or 'bubble'
      //   modules: {
      //     toolbar: {
      //       container: toolbarOptions,
      //       handlers: {
      //       'image': function (value) {
      //           if (value) {
      //             alert("11");
      //             // 触发input框选择图片文件
      //             document.querySelector('.avatar-uploader input').click()
      //           } else {
      //           this.quill.format('image', false);
      //           }
      //         }
      //       },
      //       quillUploaderUrl: `${this.$api.UploadFile}?source_id=` + this.articalid + `&source_item=Quill`, // 这里写你要上传的图片服务器地址
      //       header: {
      //         token: sessionStorage.token
      //       } // 有的图片服务器要求请求头需要有token
      //     }
      //   }
      // },
      fileList:[],//上传图片
       editorOption: {
         placeholder: '',//
          modules:{
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                ['blockquote', 'code-block'],     //引用，代码块
                [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                [{ 'direction': 'rtl' }],             // 文本方向
                [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                [{ 'font': [] }],     //字体
                [{ 'align': [] }],    //对齐方式
                ['clean'],    //清除字体样式
                ['image','video']    //上传图片、上传视频
              ],
              handlers: {
                  'image': function (value) {
                      if (value) {
                          // 触发input框选择图片文件
                          document.querySelector('.avatar-uploader input').click()
                      } else {
                          this.quill.format('image', false);
                      }
                  }
              }
            }
        },
        theme:'snow'
       },





      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        title: '',
        keywords: '',
      },
      formInline2: {},
      tableData: [],
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",
      imgUploaderUrl:'',
      quillUploaderUrl:'',
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
    // 富文本图片上传前
    quillBeforeUpload(file) {
      // 显示loading动画
      this.quillUpdateImg = true

      let formData = new FormData();
      formData.append("file", file);

    },
    // uploadSuccess(res, file) {
    //   // res为图片服务器返回的数据
    //   // 获取富文本组件实例
    //   console.log(res);
    //   let quill = this.$refs.myQuillEditor.quill
    //   // 如果上传成功
    //   if (res.code == 200 ) {
    //   // 获取光标所在位置
    //   let length = quill.getSelection().index;
    //   // 插入图片 res.url为服务器返回的图片地址
    //   quill.insertEmbed(length, 'image', res.url)
    //   // 调整光标到最后
    //   quill.setSelection(length + 1)
    //   } else {
    //   this.$message.error('图片插入失败')
    //   }
    //   // loading动画消失
    //   this.quillUpdateImg = false
    // },
    uploadSuccess(res, file) {
    console.log(res)
    console.log(file)
        let img = res;  //需要后台配置文件服务器
        let quill = this.$refs.myQuillEditor.quill
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', img)
        // 调整光标到最后
        quill.setSelection(length + 1)
    },
      // 富文本图片上传失败
    uploadError() {
        this.$message.error('图片插入失败')
    },
    // // 富文本图片上传失败
    // uploadError() {
    //   // loading动画消失
    //   this.quillUpdateImg = false
    //   this.$message.error('图片插入失败')
    // },


    exportList() {
      let nowDate = new Date().getTime();
      this.$http.get(`${this.$api.ExportDrugArticalList}?title=${this.formInline.title}&keywords=${this.formInline.keywords}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Artical' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      keywords: `${this.formInline.keywords}`, 
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
            this.quillUploaderUrl = `${this.$api.UploadFile}?source_id=` + this.articalid + `&source_item=Quill`; // 这里写你要上传的图片服务器地址
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
//     //图片上传
//     httpRequest(e) {
//       const file = e.file; // 文件信息
//       const formData = new FormData();
//       formData.append("file", file);
//       // uploadFile(formData).then(
//       //   (res) => {
//       //     /*    console.log(res, "pic"); */
//       //     this.picList.push(res.id);
//       //   },
//       //   (err) => {
//       //     this.$refs.upload.clearFiles();  //上传失败后清除当前上传的图片
//       //   }
//       // );
//     },
//     //判断当前是否上传了图片，必须上传了图片才能通过验证
//     handleChange1(res) {
//       if (res) {
//         this.isFile = true;
//       }
//     },
    
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