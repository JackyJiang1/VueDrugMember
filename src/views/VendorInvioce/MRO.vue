<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="Supplier">
            <el-select v-model="formInline.Supplier">
              <!-- <el-option value="1">1</el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="Part Id">
            <el-autocomplete
              v-model="formInline.PartNo"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="Category">
            <el-select v-model="formInline.Category" multiple>
               <el-option
                  v-for="item in selects"
                  :key="item.id"
                  :label="item.category"
                  :value="item.id">
                  <span style="float: left">{{ item.category }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.description }}</span>
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">Search</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="success" icon="el-icon-bottom">Export</el-button>
        <!-- <el-button>Import</el-button> -->
      </div>
    </div>
    <div class="flex wrapHeight">
      <div class="flex-1 mr20 bgf">
        <div style="margin: 10px auto 5px;height:30px">
          <el-button type="success" size="mini" @click="handleClick1('add')"><i class="el-icon-circle-plus-outline"></i>Add</el-button>
          <el-button type="primary" size="mini" @click="handleClick1('edit')" :disabled="currentItem1 == null"><i class="el-icon-edit"></i>Edit</el-button>
          <el-button type="danger" size="mini" @click="handleClick1('delete')" :disabled="currentItem1 == null"><i class="el-icon-delete"></i>Delete</el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData1"
          @row-click="select1"
          highlight-current-row
          border
          height="93%"
          style="width: 100%;font-size:12px;">
          <el-table-column prop="id" label="MRO Id"></el-table-column>
          <el-table-column prop="status" label="Status"></el-table-column>
          <el-table-column prop="apstatus" label="Ap Status"></el-table-column>
          <el-table-column prop="isconfirm" label="Is Confirm"></el-table-column>
          <el-table-column prop="createdby" label="Created By"></el-table-column>
          <el-table-column prop="createddate" label="Created Date"></el-table-column>
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
      </div>
      <div class="flex-1">
        <div class="topWrap bgf" style="height:50%">
          <div style="margin: 10px auto 5px;height:12%">
            <el-button type="success" size="mini" @click="handleClick2('add')" :disabled="currentItem2 == null"><i class="el-icon-circle-plus-outline"></i>Add</el-button>
            <el-button type="primary" size="mini" @click="handleClick2('edit')" :disabled="currentItem2 == null"><i class="el-icon-edit"></i>Edit</el-button>
            <el-button type="danger" size="mini" @click="handleClick2('delete')" :disabled="currentItem2 == null"><i class="el-icon-delete"></i>Delete</el-button>
          </div>
          <el-table
            height="88%"
            v-loading="loading2"
            :data="tableData2"
            @row-click="select2"
            highlight-current-row
            style="font-size:12px;width:44%"
            border>
            <el-table-column prop="mroid" label="MRO Id"></el-table-column>
            <el-table-column prop="itemnumber" label="Item Number" width="110"></el-table-column>
            <el-table-column prop="partid" label="Part Id"></el-table-column>
            <el-table-column prop="itemdesc" label="Item Desc"></el-table-column>
            <el-table-column prop="category" label="Category"></el-table-column>
            <el-table-column prop="description" label="Description" width="90"></el-table-column>
            <el-table-column prop="eau" label="EAU"></el-table-column>
            <el-table-column prop="safetystock" label="Safety Stock" width="90"></el-table-column>
            <el-table-column prop="uomid" label="UOM"></el-table-column>
            <el-table-column prop="createdby" label="Created By" width="90"></el-table-column>
            <el-table-column prop="createddate" label="Created Date" width="110"></el-table-column>
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
        </div>
        <div class="bottomWrap bgf" style="height:50%">
          <div style="margin: 10px auto 5px;height:12%">
            <el-button type="success" size="mini" @click="handleClick3('add')" :disabled="currentItem3 == null"><i class="el-icon-circle-plus-outline"></i>Add</el-button>
            <el-button type="primary" size="mini" @click="handleClick3('edit')" :disabled="currentItem3 == null"><i class="el-icon-edit"></i>Edit</el-button>
            <el-button type="danger" size="mini" @click="handleClick3('delete')" :disabled="currentItem3 == null"><i class="el-icon-delete"></i>Delete</el-button>
          </div>
          <el-table
            @row-click="select3"
            height="88%"
            v-loading="loading3"
            :data="tableData3"
            style="font-size:12px;width:44%"
            highlight-current-row
            border>
            <el-table-column prop="supplierid" label="Supplier Id"></el-table-column>
            <el-table-column prop="moq" label="MOQ"></el-table-column>
            <el-table-column prop="leadtime" label="Lead Time"></el-table-column>
            <el-table-column prop="origprice" label="Original Price" width="110"></el-table-column>
            <el-table-column prop="sourcingprice" label="Sourcing Price" width="110"></el-table-column>
            <el-table-column prop="ischosen" label="Is Chosen"></el-table-column>
            <el-table-column prop="mpn" label="MPN"></el-table-column>
            <el-table-column prop="manuf" label="MFN"></el-table-column>
            <el-table-column prop="coo" label="COO"></el-table-column>
            <el-table-column prop="freight" label="Freight"></el-table-column>
            <el-table-column prop="duty" label="Duty"></el-table-column>
            <el-table-column prop="createdby" label="Created Byd" width="110"></el-table-column>
            <el-table-column prop="createddate" label="Created Date" width="110"></el-table-column>
            <el-table-column prop="modifiedby" label="Modified By" width="110"></el-table-column>
            <el-table-column prop="modifieddate" label="Modified Date" width="110"></el-table-column>
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
        </div>
      </div>
    </div>
     <el-dialog
      :title="title"
      :visible.sync="dialogVisible1"
      width="40%">
      <el-form :model="formInline1" class="demo-form-inline" label-width="120px">
        <el-form-item label="Status">
          <el-input v-model="formInline1.status"></el-input>
        </el-form-item>
        <el-form-item label="Ap Statu">
          <el-input v-model="formInline1.apstatus"></el-input>
        </el-form-item>
        <el-form-item label="Is Confirm">
          <el-input v-model="formInline1.isconfirm"></el-input>
        </el-form-item>
        <el-form-item label="Created By">
          <el-input v-model="formInline1.createdby"></el-input>
        </el-form-item>
        <el-form-item label="Created Date">
          <el-input v-model="formInline1.createddate"></el-input>
        </el-form-item>
      </el-form>
      <div class="operater mb20 clearfix">
        <el-button type="primary" size="mini" @click="save(1,formInline1)" class="fr">Save</el-button>
      </div>
     </el-dialog>
     <el-dialog
      :title="title"
      :visible.sync="dialogVisible2"
      width="40%">
      <el-form :model="formInline2" class="demo-form-inline" label-width="120px">
        <el-form-item label="item number">
          <el-input v-model="formInline2.itemnumber"></el-input>
        </el-form-item>
        <el-form-item label="partid">
          <el-input v-model="formInline2.partid"></el-input>
        </el-form-item>
        <el-form-item label="item desc">
          <el-input v-model="formInline2.itemdesc"></el-input>
        </el-form-item>
        <el-form-item label="category">
          <el-input v-model="formInline2.category"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input v-model="formInline2.description"></el-input>
        </el-form-item>
        <el-form-item label="eau">
          <el-input v-model="formInline2.eau"></el-input>
        </el-form-item>
        <el-form-item label="safety stock">
          <el-input v-model="formInline2.safetystock"></el-input>
        </el-form-item>
        <el-form-item label="uomid">
          <el-input v-model="formInline2.uomid"></el-input>
        </el-form-item>
        <el-form-item label="created By">
          <el-input v-model="formInline2.createdby"></el-input>
        </el-form-item>
        <el-form-item label="created Date">
          <el-input v-model="formInline2.createddate"></el-input>
        </el-form-item>

      </el-form>
      <div class="operater mb20 clearfix">
        <el-button type="primary" size="mini" @click="save(2,formInline2)" class="fr">Save</el-button>
      </div>
     </el-dialog>
     <el-dialog
      :title="title"
      :visible.sync="dialogVisible3"
      width="40%">
      <el-form :model="formInline3" class="demo-form-inline" label-width="120px">
        <el-form-item label="moq">
          <el-input v-model="formInline3.moq"></el-input>
        </el-form-item>
        <el-form-item label="lead time">
          <el-input v-model="formInline3.leadtime"></el-input>
        </el-form-item>
        <el-form-item label="orig price">
          <el-input v-model="formInline3.origprice"></el-input>
        </el-form-item>
        <el-form-item label="sourcing price">
          <el-input v-model="formInline3.sourcingprice"></el-input>
        </el-form-item>
        <el-form-item label="is chosen">
          <el-input v-model="formInline3.ischosen"></el-input>
        </el-form-item>
        <el-form-item label="mpn">
          <el-input v-model="formInline3.mpn"></el-input>
        </el-form-item>
        <el-form-item label="manuf">
          <el-input v-model="formInline3.manuf"></el-input>
        </el-form-item>
        <el-form-item label="coo">
          <el-input v-model="formInline3.coo"></el-input>
        </el-form-item>
        <el-form-item label="freight">
          <el-input v-model="formInline3.freight"></el-input>
        </el-form-item>
        <el-form-item label="duty">
          <el-input v-model="formInline3.duty"></el-input>
        </el-form-item>
        <el-form-item label="created by">
          <el-input v-model="formInline3.createdby"></el-input>
        </el-form-item>
        <el-form-item label="created date">
          <el-input v-model="formInline3.createddate"></el-input>
        </el-form-item>
        <el-form-item label="modified by">
          <el-input v-model="formInline3.modifiedby"></el-input>
        </el-form-item>
        <el-form-item label="modified date">
          <el-input v-model="formInline3.modifieddate"></el-input>
        </el-form-item>
      </el-form>
      <div class="operater mb20 clearfix">
        <el-button type="primary" size="mini" @click="save(3,formInline3)" class="fr">Save</el-button>
      </div>
     </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'add',
      formInline1: {},
      formInline2: {},
      formInline3: {},
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      currentItem1: null,
      currentItem2: null,
      currentItem3: null,
      selects: [],
      loading: false,
      loading2: false,
      loading3: false,
      fileList: [],
      dialogVisible: false,
      currentPage: 1,
      formInline: {
        Supplier: '',
        PartNo: '',
        Category: ''
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
    }
  },
  mounted() {
    this.getSelect();
    this.onSubmit();
  },
  methods: {
    save(type,form) {
      let url = '';
      if (type === 1) {
        url = this.title == 'add'? this.$api.AddMROHeader : this.$api.UpdateMROHeader;
      } else if (type === 2) {
        url = this.title == 'add'? this.$api.AddMRODetail : this.$api.UpdateMRODetail;
      } else {
        url = this.title == 'add'? this.$api.AddMROSuggest : this.$api.UpdateMROSuggest;
      }
      this.$http.post({url: url,query: form})
      .then(res=> {
        res.code == '0' ? this.$message.success(res.msg) : this.$message.error(res.msg);
        this.onSubmit();
        this.dialogVisible1= false;
        this.dialogVisible2= false;
        this.dialogVisible3= false;
      })
    },
    handleClick1(type) {
      this.title = type;
      if (type == 'delete') {
        this.$confirm('confirm delete?','tips')
        .then(_ => {
          this.$http.post(`${this.$api.DeleteMROHeader}?id=${this.currentItem1.id}`)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.msg) : this.$message.error(res.msg)
            this.onSubmit();
          })
        })
        .catch(_ => {});
      } else if (type == 'add') {
        this.formInline1 = {};
        this.dialogVisible1 = true;
      } else {
        this.formInline1 = this.currentItem1;
        this.dialogVisible1 = true;
      }
    },
    handleClick2(type) {
      this.title = type;
      if (type == 'delete') {
        this.$confirm('confirm delete?','tips')
        .then(_ => {
          this.$http.post(`${this.$api.DeleteMRODetail}?mroid=${this.currentItem2.mroid}`)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.msg) : this.$message.error(res.msg)
            this.onSubmit();
          })
        })
        .catch(_ => {});
      } else if (type == 'add') {
        this.formInline2 = {};
        this.dialogVisible2 = true;
      } else {
        this.formInline2 = this.currentItem2;
        this.dialogVisible2 = true;
      }
    },
    handleClick3(type) {
      this.title = type;
      if (type == 'delete') {
        this.$confirm('confirm delete?','tips')
        .then(_ => {
          this.$http.post(`${this.$api.DeleteMROSuggest}?sugp_id=${this.currentItem3.sugp_id}`)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.msg) : this.$message.error(res.msg)
            this.onSubmit();
          })
        })
        .catch(_ => {});
      } else if (type == 'add') {
        this.formInline3 = {};
        this.dialogVisible3 = true;
      } else {
        this.formInline3 = this.currentItem3;
        this.dialogVisible3 = true;
      }
    },
    getSelect() {
      this.$http.get(`${this.$api.getCategory}`)
      .then(res=> {
        this.selects = res.data
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      console.log(row);
    },
    querySearchAsync(queryString, cb) {
    },
    handleSelect(item) {
      console.log(item);
    },
    onSubmit(isInit) {
      this.loading = true;
      if (isInit === 1) {
        this.currentPage = 1
      }
      this.$http.post(`${this.$api.GetMROHeaderList}?page=1&limit=15&sort=+createddate&category=${this.formInline.Category}&partid=${this.formInline.PartNo}&supplierid=${this.formInline.Supplier}`)
      .then(res=> {
        this.tableData1 = res.data;
        this.loading = false;
      }).catch(err=> {
        this.loading = false;
      })
    },
    select1(row) {
      this.currentItem1 = row;
      this.loading2 = true;
      this.$http.post(`${this.$api.GetMRODetailList}?page=1&limit=15&sort=+createddate&mroid=${row.id}&category=${this.formInline.Category}&partid=${this.formInline.PartNo}&supplierid=${this.formInline.Supplier}`)
      .then(res=> {
        this.tableData2 = res.data;
        this.loading2 = false;
      }).catch(err=> {
        this.loading2 = false;
      })
    },
    select2(row) {
      this.currentItem2 = row;
      this.loading3 = true;
      this.$http.post(`${this.$api.GetMROSuggestPriceList}?page=1&limit=15&sort=+createddate&mroid=${row.mroid}&mroitem=`)
      .then(res=> {
        this.tableData3 = res.data;
        this.loading3 = false;
      }).catch(err=> {
        this.loading3 = false;
      })
    },
    select3(row) {
      this.currentItem3 = row;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  .wrapHeight{
     height: calc(100vh - 180px);
  }
  // /deep/.el-table{
  //    height: calc(100vh - 240px); 
  // }
  // .topWrap,.bottomWrap{
  //   /deep/.el-table{
  //     height: calc(50vh - 130px); 
  //   }
  // }
</style>
