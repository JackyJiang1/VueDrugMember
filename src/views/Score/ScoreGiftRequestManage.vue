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
            <el-form-item label="商品名称" prop="giftstr">
              <el-input v-model="formInline.giftstr"></el-input>
            </el-form-item>
            <el-form-item label="审核状态" prop="gstatus">
              <el-select v-model="formInline.gstatus">
                <el-option v-for="item in gstatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
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
      <el-table-column prop="mbname" label="店员姓名" width="100"></el-table-column>
      <el-table-column prop="phone_no" label="店员手机号" width="150"></el-table-column>
      <el-table-column prop="memberaddress" label="详细地址" width="300"></el-table-column>
      <el-table-column prop="membercomments" label="用户备注" width="300"></el-table-column>
      <el-table-column prop="giftstr" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="giftdesc" label="商品描述" width="200"></el-table-column>
      <el-table-column label="商品图片" width="150">
        <template slot-scope="scope">
          <img :src="fileUploadBaseUrl + scope.row.giftImg" style="height:100px;width:100px" />
        </template>
      </el-table-column>
      <el-table-column prop="consumepoint" label="兑换积分" width="150"></el-table-column>
      <el-table-column prop="giftqty" label="兑换数量" width="150"></el-table-column>
      <el-table-column prop="createddate" label="兑换日期" width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="gstatus" label="审核状态" width="150" :formatter="gstatusFormat"></el-table-column>
      <el-table-column prop="approvercomments" label="审批备注" width="300"></el-table-column>
      <el-table-column
        width="150"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-row v-if="scope.row.gstatus=='NEW'">
          <!-- <el-button type="info" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>显示</el-button> -->
          <el-button type="success" size="mini" @click="handleClick(scope.row,'approve')"><i class="el-icon-edit"></i>审核通过</el-button><br />
            </el-row>
            <el-row v-if="scope.row.gstatus=='NEW'">
          <el-button type="danger" size="mini" @click="handleClick(scope.row,'reject')"><i class="el-icon-delete"></i>驳回</el-button>
            </el-row>
            <el-row v-if="scope.row.gstatus=='APP'">
          <el-button type="warning" size="mini" @click="handleClick(scope.row,'deliver')"><i class="el-icon-folder-add"></i>发货</el-button>
            </el-row>
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
            <el-form-item label="审批备注">
              <el-input v-model="formInline2.approvercomments" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operater mb20 center">
        <el-button type="primary" icon="el-icon-edit" @click="saveEdit" v-if="!showFlag">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="发货"
      :visible.sync="dialogVisibleDeliver"
      width="30%">
      <div>
        <el-form :inline="true" :model="formInline3" class="demo-form-inline" label-width="120px">
          <div>
            <el-form-item label="物流单号">
              <el-input v-model="formInline3.approvercomments" :disabled="showFlag1"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operater mb20 center">
        <el-button type="primary" icon="el-icon-edit" @click="saveEditDeliver" v-if="!showFlag1">提交</el-button>
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
      showFlag1 : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        mbname: '',
        phone_no: '',
        giftstr:'',
        gstatus:''
      },
      gstatuss: [{
        value: 'NEW',
        label: '未审核'
      }, {
        value: 'APP',
        label: '已审核'
      }, {
        value: 'TRN',
        label: '已发货'
      }, {
        value: 'COMP',
        label: '已收货'
      }, {
        value: 'CAN',
        label: '已取消'
      }, {
        value: 'REJ',
        label: '已驳回'
      }],

      formInline2: {
      },
      formInline3: {
      },
      tableData: [],

      loading: false,
      username:sessionStorage.getItem('username'),

      dialogVisible: false,
      dialogTitle: "新增",

      dialogVisibleDeliver: false,

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
      giftstr: `${this.formInline.giftstr}`, 
      gstatus: `${this.formInline.gstatus}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      this.$http.post(`${this.$api.GetMemberScoreReq}`, data)
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
    gstatusFormat:function(row,column){
        var gstatus = row[column.property];
        var gstatusF = '';
        if(gstatus == undefined){
          return ''
        }
        else {
          switch(gstatus){
            case "NEW":
              gstatusF = '未审核';
              break;
            case "APP":
              gstatusF = '已审核';
              break;
            case "TRN":
              gstatusF = '已发货';
              break;
            case "COMP":
              gstatusF = '已收货';
              break;
            case "CAN":
              gstatusF = '已取消';
              break;
            case "REJ":
              gstatusF = '已驳回';
              break;
            default:
              break;
          }
        }
        return gstatusF    
    },


    handleClick(row, type) {
      this.title = type;
      if (type == 'show') {
        this.dialogTitle = "查看";
        this.formInline2 = row;
        this.dialogVisible = true;
        this.showFlag = true;
      } else if (type == 'approve') {
        this.showFlag = false;
        this.dialogTitle = "审批";
        this.formInline2 = row;
        this.dialogVisible = true;
        // this.$confirm('确定积分兑换审核通过？','请确认')
        // .then(_ => {
        //   let data = { id: `${row.id}`, appresult: 'APP', username: this.username, approvercomments:'test'};
        //   console.log(JSON.stringify(data));
        //   this.$http.post(`${this.$api.ScoreApproveMemberInfo}`, data)
        //   .then(res=> {
        //     res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
        //     this.onSubmit();
        //   })
        // })
        // .catch(_ => {});
      } else if (type == 'reject') {
        this.showFlag = false;
        this.dialogTitle = "驳回";
        this.formInline2 = row;
        this.dialogVisible = true;
      } else if (type == 'deliver') {
        this.showFlag1 = false;
        this.formInline3 = row;
        this.dialogVisibleDeliver = true;
      }
    },
    saveEdit() {
      console.log(this.formInline2)
        this.$confirm('确定' + (this.dialogTitle == '审批' ? '积分兑换审核通过':'驳回积分兑换请求') + '？','请确认')
        .then(_ => {
          let data = { id: this.formInline2.id, appresult: this.dialogTitle == '审批' ? 'APP':'REJ', username: this.username, approvercomments:this.formInline2.approvercomments};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.ApproveMemberGiftReq}`, data)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
            this.dialogVisible = false;
          })
        })
        .catch(_ => {});      
    },
    saveEditDeliver() {
      console.log(this.formInline3)
        this.$confirm('确定物流单号无误？','请确认')
        .then(_ => {
          let data = { id: this.formInline3.id, username: this.username, freightnum:this.formInline3.approvercomments};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.UpdateGiftFreightNo}`, data)//UpdateGiftFreightNo
          .then(res=> {
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
            this.dialogVisibleDeliver = false;
          })
        })
        .catch(_ => {});      
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
  .el-row {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap
  }
</style>
