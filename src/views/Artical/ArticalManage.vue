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
            <el-form-item label="资讯类型" prop="artype">
              <el-select v-model="formInline.artype">
                <el-option v-for="item in artypes" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo()" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="reset()" icon="el-icon-refresh">重置</el-button>
              <!-- <el-button type="success" icon="el-icon-bottom" @click="exportList">导出</el-button> -->
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
      <el-table-column prop="title" label="资讯标题" width="300"></el-table-column>
      <el-table-column prop="keywords" label="资讯关键词" width="300"></el-table-column>
      <el-table-column prop="artype" label="资讯类型" width="150" :formatter="artypeFormat"></el-table-column>
      <el-table-column label="资讯图片" width="150">
        <template slot-scope="scope">
          <img :src="fileUploadBaseUrl + scope.row.articalImg" style="height:100px;width:100px" />
        </template>
      </el-table-column>
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
            <el-form-item label="资讯类型">
              <el-select v-model="formInline2.artype" :disabled="showFlag">
                <el-option v-for="item in artypes" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
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
                :on-remove="fileRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </div>
          <div>
            <!-- <el-form-item label="上传视频" prop="videoPath" style="margin-top:20px">
              <el-input v-model="formInline2.videoPath" type='text' style='display:none'></el-input>
              <el-upload
              ref="upload"
              :headers="headers"
              :action="videoUploaderUrl"
              :before-upload="onBeforeUpload"
              :on-success="uploadSuccessVideo"
              :on-remove="handleRemoveVideo"
              :on-progress="handProgress"
              :file-list="fileListVideo"
              :show-file-list="false"
              :auto-upload="true"
              :accept="'.mp4'"
              :limit="2">
              <el-button slot="trigger" size="small" type="primary" plain>上传视频</el-button>
              <el-button size="small" type="danger" @click="clearUpload">移除</el-button>
              </el-upload>
              <video
              v-if='formInline2.videoPath' 
              ref="videoBox"
              id="testVideo" 
              class="video-js" 
              height="300px"
              preload="auto"
              controls="" 
              :src="formInline2.videoPath">
              </video>
              <el-progress :text-inside="true" :stroke-width="16" :percentage="uploadProgress" v-show='uploadProgress'></el-progress>
            </el-form-item> -->
            <el-form-item label="视频上传" prop="Video">
              <!-- action必选参数, 上传的地址 -->
                <el-upload class="avatar-uploader el-upload--text" :action="videoUploaderUrl" :show-file-list="false" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">
                    <video v-if="videoForm.Video !='' && videoFlag == false" :src="videoForm.Video" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i v-else-if="videoForm.Video =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
                    <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                </el-upload>
                <P class="text">请保证视频格式正确，且不超过10M</P>
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
                class="avatar-uploader quill-uploader"
                  :action="quillUploaderUrl"
                  name="file"
                  :before-upload="quillBeforeUpload"
                  :file-list="fileListQuill"
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
                          document.querySelector('.quill-uploader input').click()
                      } else {
                          this.quill.format('image', false);
                      }
                  }
              }
            }
        },
        theme:'snow'
       },




      fileUploadBaseUrl:'http://schmeng510.com:8009/TTDemandUpload/upload/',
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        title: '',
        keywords: '',
        artype: ''
      },

      artypes: [{
        value: 'AD',
        label: '广告'
      }, {
        value: 'ART',
        label: '文章'
      }],

      formInline2: {},
      tableData: [],
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",
      imgUploaderUrl:'',
      quillUploaderUrl:'',
      videoUploaderUrl:'',
      header:'',
      //fileList:'',
      fileListQuill:[],
      articalid:'',

      // preventSumit:false,
      // progressFactor:0.96,
      // uploadProgress:0,
      // headers: {},
      // fileListVideo:[]
        videoFlag: false,
        //是否显示进度条
        videoUploadPercent: "",
        //进度条的进度，
        isShowUploadVideo: false,
        //显示上传按钮
        videoForm: {
            Video:'',
            showVideoPath: ''
        },


      username:sessionStorage.getItem('username'),

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
        quill.insertEmbed(length, 'image', this.fileUploadBaseUrl + img)
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


    // exportList() {
    //   let nowDate = new Date().getTime();
    //   this.$http.get(`${this.$api.ExportDrugArticalList}?title=${this.formInline.title}&keywords=${this.formInline.keywords}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Artical' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
    //   .then(res => {})
    //   .catch(error => {
    //     this.$message({type: 'error', showClose: true, message: 'export fail'})
    //   });
    // },
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
        //console.log(JSON.stringify(res.rows));
        this.tableData = res.rows;
        this.loading = false;
        this.total = res.total
      })
      .catch(err=> {
        console.log(err)
      })
    },
    saveEdit() {
      console.log(this.$refs.myQuillEditor.value)
      this.formInline2.id = this.articalid;
      this.formInline2.content = this.$refs.myQuillEditor.value;
      this.formInline2.createdby = this.username;
      this.formInline2.assignto = "ALL";
      console.log(JSON.stringify(this.formInline2))
      let url = '';
      url = this.dialogTitle == '新增'? this.$api.AddDrugArtical : this.$api.UpdateDrugArtical;
      this.$http.post(url, this.formInline2)
      .then(res=> {
        console.log(res);
        res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message);
        this.reset();
        this.dialogVisible= false;
      })
      .catch(err=> {
        console.log(err);
        this.dialogVisible = false;
      })

    },
    handleClick(type) {
      //if (type == 'add') {
        this.articalid = '';
        this.showFlag = false;
        this.dialogTitle = "新增";
        this.formInline2 = {};
        this.fileList = [];
        this.fileListQuill = [];
        //需要产生一个主键id
        this.$http.post(`${this.$api.GetNewGuid}`)
          .then(res=> {
            this.articalid = res;
            this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + this.articalid + `&source_item=ArticalImg`;
            this.quillUploaderUrl = `${this.$api.UploadFile}?source_id=` + this.articalid + `&source_item=Quill`; // 这里写你要上传的图片服务器地址
            this.videoUploaderUrl = `${this.$api.UploadFile}?source_id=` + this.articalid + `&source_item=ArticalVideo`;
          })
        //清空富文本
        setTimeout(()=>{
          let quill = this.$refs.myQuillEditor.quill;
          quill.pasteHTML("")},100
        )

        this.dialogVisible = true;
      //}
    },
    handleClick1(row, type) {
      this.title = type;
      if (type == 'show') {
        this.fileList = [];
        this.dialogTitle = "查看";
        this.formInline2 = row;
        this.articalid = row.id;
        this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=ArticalImg`;
        this.quillUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=Quill`; // 这里写你要上传的图片服务器地址
        this.videoUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=ArticalVideo`;
        //给fileList赋值
        if(row.articalImg != null && row.articalImg != ""){
          this.fileList.push({
            id:row.id,
            url:this.fileUploadBaseUrl + row.articalImg
          })
        }
        //给fileList赋值
        if(row.videoPath != null && row.videoPath != ""){
          this.fileListVideo.push({
            id:row.id,
            url:this.fileUploadBaseUrl + row.videoPath
          })
        }
        this.dialogVisible = true;
        this.showFlag = true;
        //回显富文本
        setTimeout(()=>{
          let quill = this.$refs.myQuillEditor.quill;
          quill.pasteHTML(row.content)},1000
        )
      } else if (type == 'delete') {
        this.$confirm('确定删除？','请确认')
        .then(_ => {
          let data = { id: `${row.id}`};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.DeleteDrugArtical}`, data)
          .then(res=> {
            console.log(JSON.stringify(res));
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
          })
        })
        .catch(_ => {});
      } else if (type == 'edit') {
        this.fileList = [];
        this.showFlag = false;
        this.dialogTitle = "修改";
        this.formInline2 = row;
        this.articalid = row.id;
        this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=ArticalImg`;
        this.quillUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=Quill`; // 这里写你要上传的图片服务器地址
        this.videoUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=ArticalVideo`;
        //给fileList赋值
        if(row.articalImg != null && row.articalImg != ""){
          this.fileList.push({
            id:row.id,
            url:this.fileUploadBaseUrl + row.articalImg
          })
        }
        //给fileList赋值
        if(row.videoPath != null && row.videoPath != ""){
          this.fileListVideo.push({
            id:row.id,
            url:this.fileUploadBaseUrl + row.videoPath
          })
        }
        this.dialogVisible = true;
        //回显富文本
        setTimeout(()=>{
          let quill = this.$refs.myQuillEditor.quill;
          quill.pasteHTML(row.content)},1000
        )
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
    artypeFormat:function(row,column){
        var artype = row[column.property];
        var artypeF = '';
        if(artype == undefined){
          return ''
        }
        else {
          switch(artype){
            case "ART":
              artypeF = '文章';
              break;
            case "AD":
              artypeF = '广告';
              break;
            default:
              break;
          }
        }
        return artypeF
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
    fileRemove(file, fileList) {
      // console.log(file, "delete");
      // console.log(fileList, "delete1");
      console.log(JSON.stringify(file));
      console.log(JSON.stringify(fileList));

      //删除文件接口
      let data = { source_id: file.id, source_item: 'ArticalImg'};
      this.$http.post(`${this.$api.DeleteAttachmentBySourceIdAndSourceItem}`, data)
      .then(res=> {
        // res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message)
        // this.getInfo();
      })
    },

    // handleRemove(file) {
    //   console.log(file, "delete");
    //   let arrPic = this.$refs.upload.uploadFiles;
    //   let index = arrPic.indexOf(file);
    //   this.picList.splice(index, 1);
    //   let num = 0;
    //   arrPic.map((item) => {
    //     if (item.uid == file.uid) {
    //       arrPic.splice(num, 1);
    //     }
    //     num++;
    //   });
    //   console.log(arrPic, "arrpic");
    // },

    beforeUploadVideo(file) {
        const isLt10M = file.size / 1024 / 1024  < 10;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
            this.$message.error('请上传正确的视频格式');
            return false;
        }
        if (!isLt10M) {
            this.$message.error('上传视频大小不能超过10MB哦!');
            return false;
        }
    },
    uploadVideoProcess(event, file, fileList){
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res, file) {      
      console.log(res);                         //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if(res.code == 0){
          this.videoForm.videoUploadId = res.data.uploadId;
          this.videoForm.Video = res.data.uploadUrl;
      }else{
          this.$message.error('视频上传失败，请重新上传！');
      }
    },

    
    // //上传视频
    // onBeforeUpload(file){
    //   this.progressFactor = Math.random(1)
    //   this.preventSumit = true
    // },
    // uploadSuccessVideo(response, file, fileListVideo) {
    //   let { code , data:{picUrlList}, message } = response;
    //   if(code == 0){
    //   this.fileListVideo=[{name:picUrlList[0],url:picUrlList[0]}];
    //   this.uploadProgress = 100
    //   this.preventSumit = false
    //   this.formInline2.videoPath = this.fileListVideo[0].url
    //   setTimeout(()=>{this.uploadProgress=0},1000)
    //   }else{
    //   this.$refs.upload.clearFiles();
    //   this.$notify({
    //   title: '失败',
    //   message: message,
    //   type: 'error',
    //   duration: 3000
    //   });
    //   this.preventSumit = false
    //   } 
    // },
    // handleRemoveVideo (file) { 
    //   this.$refs.upload.clearFiles()
    //   this.fileListVideo = []
    //   this.formInline2.videoPath = ''
    // },
    // handProgress (file) {
    //   this.uploadProgress = parseInt(file.percent*this.progressFactor)
    // },
    // clearUpload() {
    //   if (!this.fileListVideo.length) return false;
    //   this.$refs.upload.clearFiles() 
    //   this.fileListVideo = []
    //   this.formInline2.videoPath = ''
    //   console.log(JSON.stringify(fileListVideo));
    //   //删除文件接口
    //   let data = { source_id: this.articalid, source_item: 'ArticalVideo'};
    //   this.$http.post(`${this.$api.DeleteAttachmentBySourceIdAndSourceItem}`, data)
    //   .then(res=> {
    //     // res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message)
    //     // this.getInfo();
    //   })

    // }


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