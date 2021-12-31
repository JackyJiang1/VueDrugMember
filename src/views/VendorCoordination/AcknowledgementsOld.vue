<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="PO" prop="po">
              <el-input v-model="formInline.po"></el-input>
            </el-form-item>
            <el-form-item label="PartNo" prop="PartNo">
              <el-input v-model="formInline.PartNo"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getInfo(1)" icon="el-icon-search">Search</el-button>
              <el-button type="info" @click="reset()" icon="el-icon-refresh">Reset</el-button>
              <el-button type="success" icon="el-icon-bottom">Export</el-button>
              <el-button type="success" @click="dialogVisibleUpload=true" icon="el-icon-top">Import</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div style="text-align: center;margin: 10px auto 20px;" v-show="currentItem !== null">
      <el-button type="success" size="mini" @click="handleClick('show')"><i class="el-icon-tickets"></i>Show</el-button>
      <el-button type="primary" size="mini" @click="handleClick('edit')"><i class="el-icon-edit"></i>Edit</el-button>
      <el-button type="danger" size="mini" @click="handleClick('delete')"><i class="el-icon-delete"></i>Delete</el-button>
      <el-button type="warning" size="mini" @click="handleClick('attach')"><i class="el-icon-folder-add"></i>Attach</el-button>
    </div>
    <el-table
      highlight-current-row
      @row-click="selectCurrent"
      v-loading="loading"
      :data="tableData"
      height="60vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="PONumber" label="PONumber" width="90"></el-table-column>
      <el-table-column prop="POLine" label="POLine"></el-table-column>
      <el-table-column prop="PartNo" label="PartNo"></el-table-column>
      <el-table-column prop="SupplierPart" label="SupplierPart" width="90"></el-table-column>
      <el-table-column prop="POQty" label="POQty"></el-table-column>
      <el-table-column prop="SupplierQty" label="SupplierQty" width="90"></el-table-column>
      <el-table-column prop="RequestedDate" label="RequestedDate" width="110"></el-table-column>
      <el-table-column prop="CommitDate" label="CommitDate" width="110"></el-table-column>
      <el-table-column prop="Comments" label="Comments"></el-table-column>
      <el-table-column prop="Buyer" label="Buyer"></el-table-column>
      <el-table-column prop="UnitPrice" label="UnitPrice"></el-table-column>
      <el-table-column prop="Amount" label="Amount"></el-table-column>
      <el-table-column prop="Currency" label="Currency"></el-table-column>
      <el-table-column prop="DiscountValue" label="DiscountValue" width="110"></el-table-column>
      <el-table-column prop="SupplierUOM" label="SupplierUOM" width="110"></el-table-column>
      <el-table-column prop="TTUOM" label="TTUOM"></el-table-column>
      <el-table-column prop="Description" label="Description" width="110"></el-table-column>
      <el-table-column prop="DueDate" label="DueDate"></el-table-column>
      <el-table-column prop="LT" label="LT"></el-table-column>
      <el-table-column prop="MOQ" label="MOQ"></el-table-column>
      <el-table-column prop="MPQ" label="MPQ"></el-table-column>
      <el-table-column prop="Manufacture" label="Manufacture" width="110"></el-table-column>
      <el-table-column prop="MPN" label="MPN"></el-table-column>
      <el-table-column prop="Supplier" label="Supplier"></el-table-column>
      <el-table-column prop="SupplierName" label="SupplierName" width="110"></el-table-column>
      <el-table-column prop="OrderStatus" label="OrderStatus" width="110"></el-table-column>
      <el-table-column prop="VatPercentage" label="VatPercentage" width="110"></el-table-column>
      <!-- <el-table-column
        width="370"
        fixed="right"
        label="operation">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>Show</el-button>
          <el-button type="primary" size="mini" @click="handleClick(scope.row,'edit')"><i class="el-icon-edit"></i>Edit</el-button>
          <el-button type="danger" size="mini" @click="handleClick(scope.row,'delete')"><i class="el-icon-delete"></i>Delete</el-button>
          <el-button type="warning" size="mini" @click="handleClick(scope.row,'attach')"><i class="el-icon-folder-add"></i>Attach</el-button>
        </template>
      </el-table-column> -->
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
      title="Edit"
      :visible.sync="dialogVisible"
      width="70%">
      <div class="operater mb20">
        <el-button type="primary" size="mini" @click="saveEdit" v-if="!showFlag"><i class="el-icon-edit"></i>Save</el-button>
      </div>
      <el-form :inline="true" :model="formInline2" class="demo-form-inline" label-width="120px">
        <div>
          <el-form-item label="PONumber">
            <!-- <span v-if="showFlag">{{formInline2.PONumber}}</span> -->
            <el-input v-model="formInline2.PONumber" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="POLine">
            <!-- <span v-if="showFlag">{{formInline2.POLine}}</span> -->
            <el-input v-model="formInline2.POLine" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="VatPercentage">
            <!-- <span v-if="showFlag">{{formInline2.VatPercentage}}</span> -->
            <el-input v-model="formInline2.VatPercentage" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="PartNo">
            <!-- <span v-if="showFlag">{{formInline2.PartNo}}</span> -->
            <el-input v-model="formInline2.PartNo" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="SupplierPart">
            <!-- <span v-if="showFlag">{{formInline2.SupplierPart}}</span> -->
            <el-input v-model="formInline2.SupplierPart" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="POQty">
            <!-- <span v-if="showFlag">{{formInline2.POQty}}</span> -->
            <el-input v-model="formInline2.POQty" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="SupplierQty">
            <!-- <span v-if="showFlag">{{formInline2.SupplierQty}}</span> -->
            <el-input v-model="formInline2.SupplierQty" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="RequestedDate">
            <!-- <span v-if="showFlag">{{formInline2.RequestedDate}}</span> -->
            <el-input v-model="formInline2.RequestedDate" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="CommitDate">
            <!-- <span v-if="showFlag">{{formInline2.CommitDate}}</span> -->
            <el-input v-model="formInline2.CommitDate" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="Comments">
            <!-- <span v-if="showFlag">{{formInline2.Comments}}</span> -->
            <el-input v-model="formInline2.Comments" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="Buyer">
            <!-- <span v-if="showFlag">{{formInline2.Buyer}}</span> -->
            <el-input v-model="formInline2.Buyer" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="UnitPrice">
            <!-- <span v-if="showFlag">{{formInline2.UnitPrice}}</span> -->
            <el-input v-model="formInline2.UnitPrice" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="Amount">
            <!-- <span v-if="showFlag">{{formInline2.Amount}}</span> -->
            <el-input v-model="formInline2.Amount" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="Currency">
            <!-- <span v-if="showFlag">{{formInline2.Currency}}</span> -->
            <el-input v-model="formInline2.Currency" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="DiscountValue">
            <!-- <span v-if="showFlag">{{formInline2.DiscountValue}}</span> -->
            <el-input v-model="formInline2.DiscountValue" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="SupplierUOM">
            <!-- <span v-if="showFlag">{{formInline2.SupplierUOM}}</span> -->
            <el-input v-model="formInline2.SupplierUOM" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="TTUOM">
            <!-- <span v-if="showFlag">{{formInline2.TTUOM}}</span> -->
            <el-input v-model="formInline2.TTUOM" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <!-- <span v-if="showFlag">{{formInline2.Description}}</span> -->
            <el-input v-model="formInline2.Description" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="DueDate">
            <!-- <span v-if="showFlag">{{formInline2.DueDate}}</span> -->
            <el-input v-model="formInline2.DueDate" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="LT">
            <!-- <span v-if="showFlag">{{formInline2.LT}}</span> -->
            <el-input v-model="formInline2.LT" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="MOQ">
            <!-- <span v-if="showFlag">{{formInline2.MOQ}}</span> -->
            <el-input v-model="formInline2.MOQ" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="MPQ">
            <!-- <span v-if="showFlag">{{formInline2.MPQ}}</span> -->
            <el-input v-model="formInline2.MPQ" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="Manufacture">
            <!-- <span v-if="showFlag">{{formInline2.Manufacture}}</span> -->
            <el-input v-model="formInline2.Manufacture" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="MPN">
            <!-- <span v-if="showFlag">{{formInline2.MPN}}</span> -->
            <el-input v-model="formInline2.MPN" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="Supplier">
            <!-- <span v-if="showFlag">{{formInline2.Supplier}}</span> -->
            <el-input v-model="formInline2.Supplier" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="SupplierName">
            <!-- <span v-if="showFlag">{{formInline2.SupplierName}}</span> -->
            <el-input v-model="formInline2.SupplierName" :disabled="showFlag"></el-input>
          </el-form-item>
          <el-form-item label="OrderStatus">
            <!-- <span v-if="showFlag">{{formInline2.OrderStatus}}</span> -->
            <el-input v-model="formInline2.OrderStatus" :disabled="showFlag"></el-input>
          </el-form-item>
        </div>
        <!-- <div>
          <el-form-item label="VatPercentage">
            <el-input v-model="formInline2.VatPercentage"></el-input>
          </el-form-item>
        </div> -->
      </el-form>
    </el-dialog>
    <upload :uploadUrl="uploadUrl" :dialogVisibleUpload="dialogVisibleUpload" @close="close($event)"></upload>
  </div>
</template>
<script>
export default {
  components:{
    'upload': ()=>import('@/components/ImportPo')
  },
  data() {
    return {
      showFlag : false,
      currentItem: null,
      formInline2: {
        po: '',
        PartNo: '',
      },
      uploadUrl: '',
      dialogVisibleUpload: false,
      fileList: [],
      loading2: false,
      childData: null,
      dialogVisible: false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        po: '',
        PartNo: '',
      },
      tableData: [{PONumber:11,POLine:22}],
      RegNo: sessionStorage.getItem('RegNo'),
      loading: false,
    }
  },
  mounted() {
    this.getInfo();
    this.uploadUrl =  `${this.$api.UpdateAcknowledgementsByExcel}?regno=${this.RegNo}`
  },
  methods: {
    reset() {
      this.$refs['formInline'].resetFields();
      this.getInfo();
    },
    selectCurrent(item) {
      this.currentItem = item;
    },
    close(flag) {
      this.dialogVisibleUpload=false;
      if (flag) {
        this.getInfo();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInfo();
    },
    handleClick(type) {
      if (!this.currentItem) return false;
      this.formInline2 = this.currentItem;
      if (type == 'show' || type == 'edit') {
        this.dialogVisible = true;
      }
      if (type == 'show') {
        this.showFlag = true
      } else {
        this.showFlag = false
      }
    },
    querySearchAsync(queryString, cb) {
    },
    handleSelect(item) {
      console.log(item);
    },
    getInfo(isInit) {
      if (isInit === 1) {
        this.currentPage = 1;
      }
      this.loading = true;
      this.$http.post(`${this.$api.GetPOAcknowledgements}?partid=${this.formInline.PartNo}&po=${this.formInline.po}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}`)
      .then(res=> {
        this.tableData = res.data;
        this.loading = false;
      })
      .catch(err=> {
        console.log(err)
      })
    },
    saveEdit() {
      console.log(this.formInline2)
      this.$http.post(`${this.$api.UpdateAcknowledgements}?regno=${this.RegNo}`)
      .then(res=> {
        if (res.code == '0') {
          this.getInfo();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false;
      })
      .catch(err=> {
        console.log(err);
        this.dialogVisible = false;
      })
      
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  i{
    margin-right: 3px;
  }
</style>
