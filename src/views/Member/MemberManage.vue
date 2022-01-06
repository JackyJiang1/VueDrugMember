<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="门店编号" prop="shopid">
              <el-input v-model="formInline.shopid"></el-input>
            </el-form-item>
            <el-form-item label="店员名" prop="mbname">
              <el-input v-model="formInline.mbname"></el-input>
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
      height="70vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="id" label="编号" width="60"></el-table-column>
      <el-table-column prop="shopid" label="门店编号" width="120"></el-table-column>
      <el-table-column prop="mbname" label="店员姓名" width="120"></el-table-column>
      <el-table-column prop="wechat_no" label="微信" width="150"></el-table-column>
      <el-table-column prop="phone_no" label="电话" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="addressstr" label="地址" width="200"></el-table-column>
      <el-table-column prop="jobtitle" label="类型" width="90"></el-table-column>
      <el-table-column prop="createddate" label="录入时间" width="150" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="createdsource" label="录入来源" width="150"></el-table-column>
      <el-table-column prop="status_recruit" label="招募状态" width="150"></el-table-column>
      <el-table-column prop="status_act" label="激活状态" width="150"></el-table-column>
      <el-table-column prop="flag_favorit" label="喜好标签" width="150"></el-table-column>
      <el-table-column prop="flag_strength" label="能力标签" width="150"></el-table-column>
      <el-table-column prop="flag_knowhow" label="认知标签" width="150"></el-table-column>
      <el-table-column prop="reminder_commu" label="话术提醒" width="150" :formatter="reminderFormat"></el-table-column>
      <el-table-column prop="reminder_action" label="活动提醒" width="150" :formatter="reminderFormat"></el-table-column>
      <el-table-column
        width="270"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleClick1(scope.row,'show')"><i class="el-icon-tickets"></i>显示</el-button>
          <el-button type="primary" size="mini" @click="handleClick1(scope.row,'edit')"><i class="el-icon-edit"></i>修改</el-button>
          <el-button type="danger" size="mini" @click="handleClick1(scope.row,'delete')"><i class="el-icon-delete"></i>删除</el-button>
          <!-- <el-button type="warning" size="mini" @click="handleClick(scope.row,'Attach')"><i class="el-icon-folder-add"></i>Attach</el-button> -->
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
          <div style="display:none;">
            <el-form-item label="Id">
              <el-input v-model="formInline2.id" :disabled="showFlag"></el-input>
              <!-- <el-input v-model="formInline2.createdby" :disabled="showFlag"></el-input> -->
            </el-form-item>
          </div>
          <div>
            <el-form-item label="门店编号">
              <el-input v-model="formInline2.shopid" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="店员姓名">
              <el-input v-model="formInline2.mbname" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input v-model="formInline2.wechat_no" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="电话">
              <el-input v-model="formInline2.phone_no" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formInline2.email" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="formInline2.addressstr" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="类型">
              <el-input v-model="formInline2.jobtitle" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="录入来源">
              <el-input v-model="formInline2.createdsource" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="招募状态">
              <el-input v-model="formInline2.status_recruit" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="激活状态">
              <el-input v-model="formInline2.status_act" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="喜好标签">
              <el-input v-model="formInline2.flag_favorit" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="能力标签">
              <el-input v-model="formInline2.flag_strength" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="认知标签">
              <el-input v-model="formInline2.flag_knowhow" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="话术提醒">
              <el-input v-model="formInline2.reminder_commu" :disabled="showFlag"></el-input>
            </el-form-item>
            <el-form-item label="活动提醒">
              <el-input v-model="formInline2.reminder_action" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="当前积分">
              <el-input v-model="formInline2.creditscore" :disabled="showFlag"></el-input>
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
  components:{
    //'upload': ()=>import('@/components/Import')
    TagsView: () => import('@/components/TagsView'),
  },
  data() {
    return {
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        shopid: '',
        mbname: '',
      },
      formInline2: {},
      tableData: [],
      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",
      username:sessionStorage.getItem('username'),
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    exportList() {
      let nowDate = new Date().getTime();
      let data = { shopid: `${this.formInline.shopid}`, 
      mbname: `${this.formInline.mbname}`};
      this.$http.post(`${this.$api.ExportDrugMemberList}`, data, {responseType: 'blob'},'店员信息' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      let data = { shopid: `${this.formInline.shopid}`, 
      mbname: `${this.formInline.mbname}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      //this.$http.post(`${this.$api.GetDrugMemberList}?shopid=${this.formInline.shopid}&mbname=${this.formInline.mbname}&page=${this.currentPage}&limit=${this.pagesize}&sort=+id`)
      this.$http.post(`${this.$api.GetDrugMemberList}`, data)
      .then(res=> {
        this.tableData = res.rows;
        //this.tableData = res;
        this.loading = false;
        //this.total = 1;
        this.total = res.total
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
        // this.dialogTitle = "查看";
        // this.formInline2 = row;
        // this.dialogVisible = true;
        // this.showFlag = true;
        //this.$router.push('店员详情')
        // 带查询参数，变成/backend/order?selected=2
        this.$router.push({path: '店员详情', query: {id: row.id}});
      } else if (type == 'delete') {
        this.$confirm('确定删除？','请确认')
        .then(_ => {
          let data = { memberid: `${row.id}`};
          this.$http.post(`${this.$api.DeleteDrugMember}`, data)
          .then(res=> {
            res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message)
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
    },
    reminderFormat:function(row,column){
        var reminder = row[column.property];
        if(reminder == undefined){return ''};
        if(reminder == 1){
          return '是';
        }
        else{
          return '否';
        }
    },
    saveEdit() {
      // if(this.dialogTitle == '新增'){
      //   alert('新增');
      //   this.formInline2.id = '';
      // }
      // this.formInline2.createdby = this.username;
      // this.formInline2.createddate = '';
      // this.formInline2.modifiedby = this.username;
      // this.formInline2.modifieddate = '';
      //1111
      console.log(this.formInline2)
      console.log(JSON.stringify(this.formInline2));
      let url = '';
      url = this.dialogTitle == '新增'? this.$api.AddDrugMember : this.$api.UpdateDrugMember;
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



    // addTags() {
    //   const { name } = '/活动管理'
    //   if (name) {
    //     this.$store.dispatch('tagsView/addView', '/活动管理')
    //   }
    //   //console.log(this.visitedViews)
    //   return false
    // },


  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
