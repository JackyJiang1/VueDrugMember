<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <div>
            <el-form-item label="Supplier">
              <el-input v-model="formInline.Supplier"></el-input>
            </el-form-item>
            <el-form-item label="po">
              <el-input v-model="formInline.po"></el-input>
            </el-form-item>
            <el-form-item label="InvoiceNo">
              <el-select v-model="formInline.InvoiceNo">
                <!-- <el-option>1</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="Comments">
              <el-input v-model="formInline.Comments"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Start Date">
              <el-date-picker
                v-model="formInline.value1"
                value-format="yyyy-MM-dd"
                type="date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="End Date">
              <el-date-picker
                v-model="formInline.value2"
                value-format="yyyy-MM-dd"
                type="date">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo" icon="el-icon-search">Search</el-button>
              <el-button type="success" icon="el-icon-bottom">Export</el-button>
              <el-button type="success" @click="dialogVisibleUpload=true" icon="el-icon-top">Import</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      height="60vh"
      style="width: 100%;font-size:12px">
      <el-table-column prop="supplier" label="Supplier"></el-table-column>
      <el-table-column prop="letaxdate" label="Taxdate"></el-table-column>
      <el-table-column prop="periodid" label="Period"></el-table-column>
      <el-table-column prop="vouchertype" label="VoucherType" width="110"></el-table-column>
      <el-table-column prop="vouchernumber" label="VoucherNumber" width="110"></el-table-column>
      <el-table-column prop="description" label="Description" width="110"></el-table-column>
      <el-table-column prop="lecurcode" label="Currency"></el-table-column>
      <el-table-column prop="dcurrencyamount" label="OrignalCurrencyDebitor" width="180"></el-table-column>
      <el-table-column prop="jcurrencyamount" label="OriginalCurrencyCreditor" width="180"></el-table-column>
      <el-table-column prop="leuserid" label="Accountant"></el-table-column>
      <el-table-column
        width="90"
        fixed="right"
        label="operation">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>Show</el-button>
          <!-- <el-button type="primary" size="mini" @click="handleClick(scope.row,'Edit')"><i class="el-icon-edit"></i>Edit</el-button>
          <el-button type="danger" size="mini" @click="handleClick(scope.row,'Delete')"><i class="el-icon-delete"></i>Delete</el-button>
          <el-button type="warning" size="mini" @click="handleClick(scope.row,'Attach')"><i class="el-icon-folder-add"></i>Attach</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination> -->
    <el-dialog
      title="Detail Items"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="operater mb20">
        <el-button type="success" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>Export</el-button>
        <el-button type="primary" size="mini" @click="handleClick(scope.row,'edit')"><i class="el-icon-edit"></i>Save</el-button>
        <el-button type="danger" size="mini" @click="handleClick(scope.row,'delete')"><i class="el-icon-delete"></i>Delete</el-button>
      </div>
      <el-table
        v-loading="loading2"
        :data="childData"
        border
        max-height="500"
        style="width: 100%">
        <el-table-column prop="letaxdate" label="Taxdate"></el-table-column>
        <el-table-column prop="periodid" label="Period"></el-table-column>
        <el-table-column prop="vouchernumber" label="VoucherNumber"></el-table-column>
        <el-table-column prop="lecurcode" label="Currency"></el-table-column>
        <el-table-column prop="jcurrencyamount" label="OriginalCurrencyCreditor" width="200"></el-table-column>
        <el-table-column prop="leuserid" label="Accountant"></el-table-column>
      </el-table>
    </el-dialog>
    <upload :uploadUrl="uploadUrl" :dialogVisibleUpload="dialogVisibleUpload" @close="dialogVisibleUpload=false"></upload>
  </div>
</template>
<script>
export default {
  components:{
    'upload': ()=>import('@/components/Import')
  },
  data() {
    return {
      loading2: false,
      loading: false,
      childData: [],
      dialogVisible: false,
      uploadUrl: this.$api.UpdateAcknowledgementsByExcel,
      dialogVisibleUpload: false,
      fileList: [],
      currentPage: 1,
      formInline: {
        po: '',
        PartNo: '',
        value2:'',
        value1: ''
      },
      tableData: [],
      RegNo: sessionStorage.getItem('RegNo'),
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row,type) {
      this.loading2 = true;
      this.$http.post(`${this.$api.GetPaymentDetails}?regno=${this.RegNo}&vouchernum=${row.vouchernumber}`)
      .then(res=> {
        this.childData = res.data;
        this.loading2 = false;
        this.dialogVisible = true;
      })
    },
    querySearchAsync(queryString, cb) {
    },
    handleSelect(item) {
      console.log(item);
    },
    onSubmit() {

    },
    getInfo() {
      this.$http.post(`${this.$api.GetPayment}?invno=&startdate=${this.formInline.value1}&regno=${this.RegNo}&enddate=${this.formInline.value2}`)
      .then(res=> {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
