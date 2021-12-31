<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="店名" prop="shopname">
              <el-input v-model="formInline.shopname"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="addressstr">
              <el-input v-model="formInline.addressstr"></el-input>
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
      <el-table-column prop="shopname" label="店名" width="250"></el-table-column>
      <el-table-column prop="provinceid" label="省" width="150"></el-table-column>
      <el-table-column prop="cityid" label="市" width="150"></el-table-column>
      <el-table-column prop="addressstr" label="地址"></el-table-column>
      <el-table-column prop="shopclass" label="门店类型" width="200"></el-table-column>
      <el-table-column prop="areasize" label="门店面积" width="150"></el-table-column>
      <el-table-column
        width="300"
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
            <el-form-item label="店名">
              <el-input v-model="formInline2.shopname" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="省">
              <el-input v-model="formInline2.provinceid" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="市">
              <el-input v-model="formInline2.cityid" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="地址">
              <el-input v-model="formInline2.addressstr" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="门店类型">
              <el-input v-model="formInline2.shopclass" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="门店面积">
              <el-input v-model="formInline2.areasize" :disabled="showFlag"></el-input>
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
        shopname: '',
        addressstr: '',
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
      this.$http.get(`${this.$api.ExportDrugShopList}?partid=${this.formInline.shopname}&po=${this.formInline.addressstr}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'Shops' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
      let data = { shopname: `${this.formInline.shopname}`, 
      addressstr: `${this.formInline.addressstr}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      //this.$http.post(`${this.$api.GetDrugShopList}?shopname=${this.formInline.shopname}&addressstr=${this.formInline.addressstr}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}&sort=+id`)
      this.$http.post(`${this.$api.GetDrugShopList}`, data)
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
