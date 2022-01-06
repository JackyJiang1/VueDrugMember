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
      <el-table-column prop="studytitle" label="开口说标题" width="200"></el-table-column>
      <el-table-column prop="studyword" label="开口说内容" width="300"></el-table-column>
      <el-table-column prop="studystatus" label="开口说状态" width="200" :formatter="dateFormat"></el-table-column>
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
          <el-button type="info" size="mini" @click="handleClick1(scope.row,'showStudyMember')"><i class="el-icon-info"></i>查看用户开口说记录</el-button>
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
            <el-form-item label="开口说状态">
              <el-switch
                style="display: block"
                v-model="formInline2.studystatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                :disabled="showFlag">
            </el-switch>
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
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        studytitle: '',
        studyword: '',
      },
      formInline2: {},
      tableData: [],
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",

      currentPageStudyMember: 1,
      pagesizeStudyMember: 10,
      totalStudyMember: 0,
      tableDataStudyMember: [],
      dialogVisibleStudyMember: false,
      dialogTitleStudyMember: "查看活动人数",
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
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
      this.$http.post(`${this.$api.GetDrugStudyMaterialList}?activity_name=${this.formInline.studytitle}&activity_desc=${this.formInline.activity_desc}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}&sort=+id`)
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
          this.$http.post(`${this.$api.DeleteDrugStudy}?id=${row.id}`)
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
        this.dialogTitleStudyMember = "查看";
        this.dialogVisibleStudyMember = true;
        this.getInfoStudyMember(row);
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
    getInfoStudyMember(row, isInit) {
      if (isInit === 1) {
        this.currentPageStudyMember = 1;
      }
      this.loading = true;
      this.$http.post(`${this.$api.GetDrugStudyMemberList}?actid=${row.id}&page=${this.currentPageStudyMember}&limit=${this.pagesizeStudyMember}&sort=+createddate`)
      .then(res=> {
        this.tableDataStudyMember = res.data;
        this.loading = false;
        this.totalStudyMember = res.totalrows
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
