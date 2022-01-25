<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="店员名" prop="mbname">
              <el-input v-model="formInline.mbname"></el-input>
            </el-form-item>
            <el-form-item label="店员手机号" prop="phone_no">
              <el-input v-model="formInline.phone_no"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="comments">
              <el-input v-model="formInline.comments"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo(1)" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="reset()" icon="el-icon-refresh">重置</el-button>
              <!-- <el-button type="success" icon="el-icon-bottom" @click="exportList">导出</el-button>
              <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleClick('add')">新增</el-button> -->
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
      <el-table-column prop="id" label="序号" width="100" v-if="false"></el-table-column>
      <el-table-column prop="mbname" label="店员姓名" width="200"></el-table-column>
      <el-table-column prop="phone_no" label="店员手机号" width="200"></el-table-column>
      <el-table-column prop="scorepoint" label="请求积分"></el-table-column>
      <el-table-column prop="scoresource" label="请求来源"></el-table-column>
      <el-table-column prop="scorestatus" label="请求状态" width="150"></el-table-column>
      <el-table-column prop="sourceid" label="来源id" width="150"></el-table-column>
      <el-table-column prop="comments" label="描述" width="250"></el-table-column>
      <el-table-column prop="createddate" label="日期" width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column
        width="300"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>显示</el-button>
          <el-button type="success" size="mini" @click="handleClick(scope.row,'approve')"><i class="el-icon-edit"></i>审核通过</el-button>
          <el-button type="danger" size="mini" @click="handleClick(scope.row,'reject')"><i class="el-icon-delete"></i>驳回</el-button>
          <!-- <el-button type="warning" size="mini" @click="handleClick(scope.row,'Attach')"><i class="el-icon-folder-add"></i>Attach</el-button> -->
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
            <el-form-item label="店员姓名">
              <el-input v-model="formInline2.mbname" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="店员手机号">
              <el-input v-model="formInline2.phone_no" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="请求积分">
              <el-input v-model="formInline2.scorepoint" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="请求来源">
              <el-input v-model="formInline2.scoresource" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="请求状态">
              <el-input v-model="formInline2.scorestatus" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="来源id">
              <el-input v-model="formInline2.sourceid" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="日期">
              <el-input v-model="formInline2.createddate" :disabled="showFlag"></el-input>
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
        mbname: '',
        phone_no: '',
        comments:''
      },
      formInline2: {
      },
      tableData: [],

      loading: false,
      username:sessionStorage.getItem('username'),

      dialogVisible: false,
      dialogTitle: "新增",
    }
  },
  mounted() {
    this.getInfo();
  },
  created () {
  },
  methods: {
    // exportList() {
    //   let nowDate = new Date().getTime();
    //   let data = { shopname: `${this.formInline.shopname}`, 
    //   addressstr: `${this.formInline.addressstr}`};
    //   this.$http.post(`${this.$api.ExportDrugShopList}`, data, {responseType: 'blob'},'Shops' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      let data = { mbname: `${this.formInline.mbname}`, 
      phone_no: `${this.formInline.phone_no}`, 
      comments: `${this.formInline.comments}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      this.$http.post(`${this.$api.GetScoreReq}`, data)
      .then(res=> {
        console.log(res);
        this.tableData = res.rows;
        this.loading = false;
        this.total = res.total
      })
      .catch(err=> {
        console.log(err)
      })
    },
    dateFormat:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD")
    },



    handleClick(row, type) {
      this.title = type;
      if (type == 'show') {
        this.dialogTitle = "查看";
        this.formInline2 = row;
        this.dialogVisible = true;
        this.showFlag = true;
      } else if (type == 'approve') {
        this.$confirm('确定审核通过？','请确认')
        .then(_ => {
          let data = { scorereqid: `${row.id}`, appresult: 'AP', username: this.username, comments:'test'};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.ScoreApproveMemberInfo}`, data)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.onSubmit();
          })
        })
        .catch(_ => {});
      } else if (type == 'reject') {
        this.$confirm('确定驳回积分请求？','请确认')
        .then(_ => {
          let data = { scorereqid: `${row.id}`, appresult: 'RJ', username: this.username, comments:'test'};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.ScoreApproveMemberInfo}`, data)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.onSubmit();
          })
        })
        .catch(_ => {});
      }
    },
    // saveEdit() {
    //   console.log(this.formInline2)
    //   let url = `${this.$api.ScoreApproveMemberInfo}`;
    //   let data = { scorereqid: this.formInline2.id, 
    //   ap: this.formInline2.shopname, 

    //   // addressstr: this.formInline2.addressstr, 
    //   // provinceid: this.formInline2.provinceid + '' , 
    //   // cityid: this.formInline2.cityid + '', 
    //   // areasize: this.formInline2.areasize };
    //   console.log(data)
    //   this.$http.post(url, this.formInline2)
    //   .then(res=> {
    //     res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message);
    //     this.reset();
    //     this.dialogVisible= false;
    //     // if (res.code == 0) {
    //     //   this.getInfo();
    //     //   this.dialogVisible = false;
    //     // } else {
    //     //   this.$message.error(res.message)
    //     // }
    //     // this.loading = false;
    //   })
    //   .catch(err=> {
    //     console.log(err);
    //     this.dialogVisible = false;
    //   })
      
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
