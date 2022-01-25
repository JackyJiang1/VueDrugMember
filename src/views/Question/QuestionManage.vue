<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="问题" prop="question">
              <el-input v-model="formInline.question"></el-input>
            </el-form-item>
            <el-form-item label="问题状态" prop="qstatus">
              <el-select v-model="formInline.qstatus">
                <el-option v-for="item in qstatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
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
      <el-table-column prop="question" label="问题" width="250"></el-table-column>
      <el-table-column prop="qtype" label="问题类型"></el-table-column>
      <el-table-column prop="option_a" label="选项A" width="150"></el-table-column>
      <el-table-column prop="option_b" label="选项B" width="150"></el-table-column>
      <el-table-column prop="option_c" label="选项C" width="150"></el-table-column>
      <el-table-column prop="option_d" label="选项D" width="150"></el-table-column>
      <el-table-column prop="qstatus" label="问题状态" width="150" :formatter="qstatusFormat"></el-table-column>
      <el-table-column prop="createdby" label="创建人" width="150"></el-table-column>
      <el-table-column prop="createddate" label="创建日期" width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column
        width="300"
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
            <el-form-item label="问题">
              <el-input v-model="formInline2.question" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="问题类型">
              <el-select v-model="formInline2.qtype" @change="selectQTypeChanged" :disabled="showFlag">
                <el-option v-for="item in qtypes" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="选项A">
              <el-input v-model="formInline2.option_a" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="选项B">
              <el-input v-model="formInline2.option_b" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="选项C">
              <el-input v-model="formInline2.option_c" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="选项D">
              <el-input v-model="formInline2.option_d" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="问题状态">
              <el-select v-model="formInline2.qstatus" @change="selectQStatusChanged" :disabled="showFlag">
                <el-option v-for="item in qstatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
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
      fileUploadBaseUrl:'http://schmeng510.com:8009/TTDemandUpload/upload/',
      
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        question: '',
        qstatus: '',
      },
      qtypes: [{
        value: 'Single',
        label: '单选'
      }, {
        value: 'Multiple',
        label: '多选'
      }],

      qstatuss: [{
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

    //   imgUploaderUrl:'',
       questionid:'',
    //   fileList:[],

      username:sessionStorage.getItem('username'),
    }
  },
  created() {
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    selectQTypeChanged(value){
        this.$forceUpdate();
    },

    selectQStatusChanged(value){
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
      let data = { question: `${this.formInline.question}`, 
      qstatus: `${this.formInline.qstatus}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      this.$http.post(`${this.$api.GetDrugQuestionList}`, data)
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
        //this.questionid = '';
        this.formInline2.id = '';
        this.showFlag = false;
        this.dialogTitle = "新增";
        this.formInline2 = {};
        this.formInline2.qtype = this.qtypes[0].value;
        this.formInline2.qstatus = this.qstatuss[0].value;
        //需要产生一个主键id
        this.$http.post(`${this.$api.GetNewGuid}`)
          .then(res=> {
            this.questionid = res;
            this.formInline2.id = res;
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
          let data = { id: `${row.id}`};
            console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.DeleteDrugQuestion}`, data)
          .then(res=> {
            console.log(JSON.stringify(res));
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
          })
        })
        .catch(_ => {});
      } else if (type == 'edit') {
        this.showFlag = false;
        this.dialogTitle = "修改";
        this.formInline2 = row;
        this.questionid = row.id;
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
    qstatusFormat:function(row,column){
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
    saveEdit() {
      // if(this.dialogTitle == '新增'){
      //   alert('新增');
      //   this.formInline2.id = '';
      // }
      //this.formInline2.id = this.questionid;
      this.formInline2.createdby = this.username;
      // this.formInline2.createddate = '';
      this.formInline2.modifiedby = this.username;
      // this.formInline2.modifieddate = '';
      this.formInline2.assignto = "ALL";
      console.log(this.formInline2)
      console.log(JSON.stringify(this.formInline2));
      let url = '';
      url = this.dialogTitle == '新增'? this.$api.AddDrugQuestion : this.$api.UpdateDrugQuestion;
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
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
