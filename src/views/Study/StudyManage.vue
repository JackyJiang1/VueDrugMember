<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="开口说标题" prop="studytitle">
              <el-input v-model="formInline.studytitle"></el-input>
            </el-form-item>
            <el-form-item label="开口说内容" prop="studyword">
              <el-input v-model="formInline.studyword"></el-input>
            </el-form-item>
            <el-form-item label="开口说状态" prop="studystatus">
              <el-select v-model="formInline.studystatus">
                <el-option v-for="item in studystatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo(1)" icon="el-icon-search">搜索</el-button>
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
      @row-click="selectCurrent"
      v-loading="loading"
      :data="tableData"
      height="60vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="studytitle" label="开口说标题" width="200"></el-table-column>
      <el-table-column prop="studyword" label="开口说内容" width="300"></el-table-column>
      <el-table-column label="开口说图片" width="150">
        <template slot-scope="scope">
          <img :src="fileUploadBaseUrl + scope.row.studyImg" style="height:100px;width:100px" />
        </template>
      </el-table-column>
      <el-table-column prop="studystatus" label="开口说状态" width="200" :formatter="studystatusFormat"></el-table-column>
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
          <!-- <el-button type="info" size="mini" @click="handleClick1(scope.row,'showStudyMember')"><i class="el-icon-info"></i>查看用户开口说记录</el-button> -->
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
      width="30%">
      <div>
        <el-form :inline="true" :model="formInline2" class="demo-form-inline" label-width="120px">
          <div>
            <el-form-item label="开口说标题">
              <el-input v-model="formInline2.studytitle" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="开口说内容">
              <el-input v-model="formInline2.studyword" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="上传缩略图">
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
            <el-form-item label="开口说状态">
              <el-select v-model="formInline2.studystatus" @change="selectStudyStatusChanged">
                <el-option v-for="item in studystatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>

              <!-- <el-switch
                v-model="formInline2.studystatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value= "Enable"
                inactive-value= "Disable"
                active-text="启用"
                inactive-text="禁用"
                :disabled="showFlag">
              </el-switch> -->
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operater mb20 center">
        <el-button type="primary" icon="el-icon-edit" @click="saveEdit" v-if="!showFlag">Save</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="dialogTitleStudyMember"
      :visible.sync="dialogVisibleStudyMember"
      width="70%">
      <el-table
      highlight-current-row
      v-loading="loading"
      :data="tableDataStudyMember"
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
      @size-change="handleSizeChangeStudyMember"
      @current-change="handleCurrentChangeStudyMember"
      :current-page.sync="currentPageStudyMember"
      :page-size="pagesizeStudyMember"
      layout="total,prev, pager, next, jumper"
      :total="totalStudyMember">
    </el-pagination>
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
      fileUploadBaseUrl:'http://schmeng510.com:8009/TTDemandUpload/upload/',
      
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        studytitle: '',
        studyword: '',
      },
      studystatuss: [{
        value: 'Enable',
        label: '启用'
      }, {
        value: 'Disable',
        label: '禁用'
      }],

      formInline2: {},
      tableData: [],
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",

      imgUploaderUrl:'',
      studyid:'',
      fileList:[],

      username:sessionStorage.getItem('username'),
      // currentPageStudyMember: 1,
      // pagesizeStudyMember: 10,
      // totalStudyMember: 0,
      // tableDataStudyMember: [],
      // dialogVisibleStudyMember: false,
      // dialogTitleStudyMember: "查看活动人数",
    }
  },
  created() {
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    selectStudyStatusChanged(value){
        this.$forceUpdate();
    },
    exportList() {
      let nowDate = new Date().getTime();
      this.$http.get(`${this.$api.ExportDrugActivityList}?studytitle=${this.formInline.studytitle}&studyword=${this.formInline.studyword}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Shops' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      let data = { studytitle: `${this.formInline.studytitle}`, 
      studyword: `${this.formInline.studyword}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      this.$http.post(`${this.$api.GetDrugStudyMaterialList}`, data)
      .then(res=> {
        this.tableData = res.rows;
        this.loading = false;
        this.total = res.total
      })
      .catch(err=> {
        console.log(err)
      })
    },
    handleClick(type) {
      //if (type == 'add') {
        this.studyid = '';
        this.formInline2.id = '';
        this.fileList = [];
        this.showFlag = false;
        this.dialogTitle = "新增";
        this.formInline2 = {};
        this.formInline2.studystatus = this.studystatuss[0].value;
        //需要产生一个主键id
        this.$http.post(`${this.$api.GetNewGuid}`)
          .then(res=> {
            this.studyid = res;
            this.formInline2.id = res;
            this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + this.studyid + `&source_item=StudyImg`;
          })

        this.dialogVisible = true;
      //}
    },
    handleClick1(row, type) {
      this.title = type;
      if (type == 'show') {
        this.fileList = [];
        this.dialogTitle = "查看";
        this.formInline2 = row;
        this.studyid = row.id;
        this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=StudyImg`;
        //给fileList赋值
        if(row.studyImg != null && row.studyImg != ""){
          this.fileList.push({
            id:row.id,
            url:this.fileUploadBaseUrl + row.studyImg
          })
        }
        this.dialogVisible = true;
        this.showFlag = true;
      } else if (type == 'delete') {
        this.$confirm('确定删除？','请确认')
        .then(_ => {
          let data = { id: `${row.id}`};
            console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.DeleteDrugStudyMaterial}`, data)
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
        this.studyid = row.id;
        this.imgUploaderUrl = `${this.$api.UploadFile}?source_id=` + row.id + `&source_item=StudyImg`;
        //给fileList赋值
        if(row.studyImg != null && row.studyImg != ""){
          this.fileList.push({
            id:row.id,
            url:this.fileUploadBaseUrl + row.studyImg
          })
        }
        this.dialogVisible = true;
      // } else {
      //   this.dialogTitleStudyMember = "查看";
      //   this.dialogVisibleStudyMember = true;
      //   this.getInfoStudyMember(row);
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
    studystatusFormat:function(row,column){
        var studystatus = row[column.property];
        var studystatusF = '启用';
        if(studystatus == undefined){
          return ''
        }
        else {
          switch(studystatus){
            case "Enable":
              studystatusF = '启用';
              break;
            case "Disable":
              studystatusF = '禁用';
              break;
            default:
              break;
          }
        }
        return studystatusF    
    },
    //图片上传的验证
    beforeUpload(file) {
      // var testmsg = /^image\/(jpeg|png|jpg|bmp)$/.test(file.type);
      // const isLt4M = file.size / 1024 / 1024 <= 4; //图片大小不超过2MB
      // if (!testmsg) {
      //   this.$message.error("上传图片格式不对!");
      //   //this.$refs.upload.clearFiles();
      //   return;
      // }
      // if (!isLt4M) {
      //   this.$message.error("上传图片大小不能超过 4M!");
      //   return;
      // }
      // return testmsg && isLt4M;

      // 判断图片是否大于2M
      const isLt2M = file.size /1024/1024 < 2;
      // const fileType = file.name.substring(file.name.lastIndexOf('.')+1)
      // 判断图片的类型
      const isJpg = file.type ==  'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/gif'
      if(!isJpg){
          this.$message.error('只能上传jpg, jpeg, png, gif格式的图片！')
          return false
      }
      if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
          return false
      }
      //const file = file.file; // 文件信息
      let formData = new FormData();
      formData.append("file", file);
    },
    handlePreview(file){
    },
    // 上传成功时的钩子
    uploadSuccess(res,file,fileList){
      this.fileList.push({
          id:file.id,
          url:this.fileUploadBaseUrl + res
      })

      // if(res.code !== 200){
      //     return this.$message.error(res.msg)
      // }
      // this.fileList.push(res)
      // let formImgList = []
      // this.imageList.forEach(item => {
      //   formImgList.push({
      //     id:item.id,
      //     imageType:0
      //   })
      // })
      // this.form.listUploadId = formImgList
    },
    //删除上传了的图片
    fileRemove(file, fileList) {
      // console.log(file, "delete");
      // console.log(fileList, "delete1");
      console.log(JSON.stringify(file));
      console.log(JSON.stringify(fileList));

      //删除文件接口
      let data = { source_id: file.id, source_item: 'StudyImg'};
      this.$http.post(`${this.$api.DeleteAttachmentBySourceIdAndSourceItem}`, data)
      .then(res=> {
        // res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message)
        // this.getInfo();
      })

      // let arrPic = this.$refs.upload.uploadFiles;
      // let index = arrPic.indexOf(file);
      // this.picList.splice(index, 1);
      // let num = 0;
      // arrPic.map((item) => {
      //   if (item.uid == file.uid) {
      //     arrPic.splice(num, 1);
      //   }
      //   num++;
      // });

      //console.log(arrPic, "arrpic");
    },
    saveEdit() {
      // if(this.dialogTitle == '新增'){
      //   alert('新增');
      //   this.formInline2.id = '';
      // }
      this.formInline2.id = this.studyid;
      this.formInline2.createdby = this.username;
      // this.formInline2.createddate = '';
      this.formInline2.modifiedby = this.username;
      // this.formInline2.modifieddate = '';
      this.formInline2.assignto = "ALL";
      console.log(this.formInline2)
      console.log(JSON.stringify(this.formInline2));
      let url = '';
      url = this.dialogTitle == '新增'? this.$api.AddDrugStudyMaterial : this.$api.UpdateDrugStudyMaterial;
      this.$http.post(url, this.formInline2)
      .then(res=> {
        console.log(res);
        res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message);
        this.getInfo();
        this.dialogVisible= false;
      })
      .catch(err=> {
        console.log(err);
        this.dialogVisible = false;
      })
    }
    // getInfoStudyMember(row, isInit) {
    //   if (isInit === 1) {
    //     this.currentPageStudyMember = 1;
    //   }
    //   this.loading = true;
    //   this.$http.post(`${this.$api.GetDrugStudyMemberList}?actid=${row.id}&page=${this.currentPageStudyMember}&limit=${this.pagesizeStudyMember}&sort=+createddate`)
    //   .then(res=> {
    //     this.tableDataStudyMember = res.data;
    //     this.loading = false;
    //     this.totalStudyMember = res.totalrows
    //   })
    //   .catch(err=> {
    //     console.log(err)
    //   })
    // },
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
