<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="formInline.title"></el-input>
            </el-form-item>
            <el-form-item label="文章关键词" prop="keywords">
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
      @row-click="selectCurrent"
      v-loading="loading"
      :data="tableData"
      height="60vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="title" label="文章标题" width="200"></el-table-column>
      <el-table-column prop="keywords" label="文章关键词" width="300"></el-table-column>
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
            <el-form-item label="文章标题">
              <el-input v-model="formInline2.title" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="文章关键词">
              <el-input v-model="formInline2.keywords" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="资讯内容">
              <!-- 富文本组件-->
              <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              >
              </quill-editor>
              <!-- 图片上传组件辅助-->
              <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              name="img"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
              </el-upload>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operater mb20 center">
        <el-button type="primary" icon="el-icon-edit" @click="saveEdit" v-if="!showFlag">Save</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="dialogTitleMA"
      :visible.sync="dialogVisibleMA"
      width="70%">
      <el-table
      highlight-current-row
      v-loading="loading"
      :data="tableDataMA"
      height="60vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="mbname" label="店员姓名" width="120"></el-table-column>
      <el-table-column prop="activity_name" label="名称" width="250"></el-table-column>
      <el-table-column prop="activestat" label="状态" width="100"></el-table-column>
      <el-table-column prop="createddate" label="参与时间" width="200" :formatter="datetimeFormat"></el-table-column>
      <el-table-column prop="flag_favorit" label="喜好标签" width="120"></el-table-column>
      <el-table-column prop="flag_strength" label="能力标签" width="120"></el-table-column>
      <el-table-column prop="flag_knowhow" label="认知标签" width="120"></el-table-column>
      <el-table-column prop="reminder_commu" label="话术提醒" width="120"></el-table-column>
      <el-table-column prop="reminder_action" label="活动提醒" width="120"></el-table-column>
    </el-table>
    <el-pagination
      class="page"
      @size-change="handleSizeChangeMA"
      @current-change="handleCurrentChangeMA"
      :current-page.sync="currentPageMA"
      :page-size="pagesizeMA"
      layout="total,prev, pager, next, jumper"
      :total="totalMA">
    </el-pagination>
    </el-dialog>

  </div>
</template>
<script>
import moment from 'moment'

//富文本组件工具栏
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{'header': 1}, {'header': 2}], // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
  [{'direction': 'rtl'}], // text direction
  [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}], // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image'],
  ['clean']
]

export default {
  // components:{
  //   'upload': ()=>import('@/components/Import')
  // },
  data() {
    return {
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
            'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                this.quill.format('image', false);
                }
              }
            },
            serverUrl: '/manager/common/imgUpload', // 这里写你要上传的图片服务器地址
            header: {
              token: sessionStorage.token
            } // 有的图片服务器要求请求头需要有token
          }
        }
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
      RegNo: sessionStorage.getItem('RegNo'),
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",

      currentPageMA: 1,
      pagesizeMA: 10,
      totalMA: 0,
      tableDataMA: [],
      dialogVisibleMA: false,
      dialogTitleMA: "查看活动人数",

      content: '',
      editorOption: {} 

    }

  },
  // components: {
  //   quillEditor
  // },
  mounted() {
    //this.getInfo();
  },
  methods: {
    onEditorChange({editor, html, text}) {//内容改变事件
      console.log("---内容改变事件---")
      this.content = html
      console.log(html)
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    },
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(res);
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code == 200 ) {
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片 res.url为服务器返回的图片地址
      quill.insertEmbed(length, 'image', res.url)
      // 调整光标到最后
      quill.setSelection(length + 1)
      } else {
      this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },


    exportList() {
      let nowDate = new Date().getTime();
      this.$http.get(`${this.$api.ExportDrugActivityList}?activity_name=${this.formInline.activity_name}&activity_desc=${this.formInline.activity_desc}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Shops' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      this.$http.post(`${this.$api.GetDrugActivityList}?activity_name=${this.formInline.activity_name}&activity_desc=${this.formInline.activity_desc}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}&sort=+id`)
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
        this.showFlag = false;
        this.dialogTitle = "新增";
        this.formInline2 = {};
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
    getInfoMA(row, isInit) {
      if (isInit === 1) {
        this.currentPageMA = 1;
      }
      this.loading = true;
      this.$http.post(`${this.$api.GetDrugMemberActivityList}?actid=${row.id}&regno=${this.RegNo}&page=${this.currentPageMA}&limit=${this.pagesizeMA}&sort=+createddate`)
      .then(res=> {
        this.tableDataMA = res.data;
        this.loading = false;
        this.totalMA = res.totalrows
      })
      .catch(err=> {
        console.log(err)
      })
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
</style>