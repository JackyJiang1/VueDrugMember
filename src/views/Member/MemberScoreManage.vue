<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="店员名" prop="mbname">
              <el-input v-model="formInline.mbname"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo(1)" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="reset()" icon="el-icon-refresh">重置</el-button>
              <el-button type="success" icon="el-icon-bottom" @click="exportList">导出</el-button>
              <!-- <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleClick('add')">新增</el-button> -->
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
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="mbname" label="店员姓名" width="200"></el-table-column>
      <el-table-column prop="transtype" label="操作类型"></el-table-column>
      <el-table-column prop="transsource" label="操作来源"></el-table-column>
      <el-table-column prop="scoreqty" label="积分增减" width="150"></el-table-column>
      <el-table-column prop="createddate" label="日期" width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column
        width="270"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleClick1(scope.row,'show')"><i class="el-icon-tickets"></i>显示</el-button>
          <!-- <el-button type="primary" size="mini" @click="handleClick1(scope.row,'edit')"><i class="el-icon-edit"></i>Edit</el-button>
          <el-button type="danger" size="mini" @click="handleClick1(scope.row,'delete')"><i class="el-icon-delete"></i>Delete</el-button> -->
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
            <el-form-item label="操作类型">
              <el-input v-model="formInline2.transtype" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="操作来源">
              <el-input v-model="formInline2.transsource" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="积分增减">
              <el-input v-model="formInline2.scoreqty" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="日期">
              <el-date-picker
                v-model="formInline2.createddate"
                value-format="yyyy-MM-dd"
                type="date" :disabled="showFlag">
              </el-date-picker>
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
      },
      formInline2: {},
      tableData: [],
      RegNo: sessionStorage.getItem('RegNo'),
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    exportList() {
      let nowDate = new Date().getTime();
      this.$http.get(`${this.$api.ExportDrugMemberScoreList}?mbname=${this.formInline.mbname}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Shops' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      this.$http.post(`${this.$api.GetDrugMemberScoreList}?mbname=${this.formInline.mbname}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}&sort=+id`)
      .then(res=> {
        this.tableData = res.data;
        this.loading = false;
        this.total = res.totalrows
      })
      .catch(err=> {
        console.log(err)
      })
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
      } else {
        this.showFlag = false;
        this.dialogTitle = "修改";
        this.formInline2 = row;
        this.dialogVisible = true;
      }
    },
    dateFormat:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD")
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
