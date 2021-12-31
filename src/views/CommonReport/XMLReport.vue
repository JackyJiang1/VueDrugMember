<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="Name" prop="name">
              <el-input v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getXMLReportList(1)" icon="el-icon-search">Search</el-button>
              <el-button type="info" @click="reset()" icon="el-icon-refresh">Reset</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- <div style="text-align: center;margin: 10px auto 20px;" v-show="currentItem !== null">
      <el-button type="success" size="mini" @click="handleClick('show')"><i class="el-icon-tickets"></i>Show</el-button>
      <el-button type="primary" size="mini" @click="handleClick('edit')"><i class="el-icon-edit"></i>Edit</el-button>
      <el-button type="danger" size="mini" @click="handleClick('delete')"><i class="el-icon-delete"></i>Delete</el-button>
      <el-button type="warning" size="mini" @click="handleClick('attach')"><i class="el-icon-folder-add"></i>Attach</el-button>
    </div> -->
    <el-table
      v-loading="loading"
      :data="tableData"
      height="60vh"
      border
      style="width: 100%;font-size:12px">
      <el-table-column prop="FileName" label="Report Name"></el-table-column>
      <el-table-column
        width="200"
        fixed="right"
        label="Operation">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>Show</el-button>
        </template>
      </el-table-column>
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
    <!-- <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total,prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->


<div style="margin-bottom: 20px;">
  <el-button
    size="small"
    @click="addTab(editableTabsValue)"
  >
    add tab
  </el-button>
</div>
<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
  <el-tab-pane
    v-for="(item, index) in editableTabs"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>


  </div>
</template>
<script>
import MettingAgenda from "./ViewXMLReport.vue"; // 会议议程组件，默认第一个
export default {
  components:{
    'upload': ()=>import('@/components/ImportPo')
  },
  data() {
    return {
      activeName: '1',
      showFlag : false,
      currentItem: null,
      // formInline2: {
      //   po: '',
      //   PartNo: '',
      // },
      // formInline3: {
      //   po: '',
      //   PartNo: '',
      // },
      // formInline4: {
      //   po: '',
      //   PartNo: '',
      // },
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
        name: '',
      },
      tableData: [{FileName:""}],
      RegNo: sessionStorage.getItem('RegNo'),
      loading: false,


    

      editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2

    }
  },
  mounted() {
    this.getXMLReportList();
    this.uploadUrl =  `${this.$api.UpdateAcknowledgementsByExcel}?regno=${this.RegNo}`
  },
  methods: {
    // exportList() {
    //   this.$http.get(`${this.$api.ExportPOAcknowledgements}?partid=${this.formInline.PartNo}&po=${this.formInline.po}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}`, {}, {responseType: 'blob'},'file')
    //   .then(res => {})
    //   .catch(error => {
    //     this.$message({type: 'error', showClose: true, message: 'export fail'})
    //   });
    // },
    reset() {
      this.$refs['formInline'].resetFields();
      this.getXMLReportList();
    },
    selectCurrent(item) {
      this.currentItem = item;
    },
    close(flag) {
      this.dialogVisibleUpload=false;
      if (flag) {
        this.getXMLReportList();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getXMLReportList();
    },
    handleClick(type) {
      //alert("123");
      //this.addTab('111222333');
      // if (!this.currentItem) return false;
      // // this.formInline2 = this.currentItem;
      // // this.formInline3 = this.currentItem;
      // // this.formInline4 = this.currentItem;
      // if (type == 'show' || type == 'edit') {
      //   this.dialogVisible = true;
      // }
      // if (type == 'show') {
      //   this.showFlag = true
      // } else {
      //   this.showFlag = false
      // }
    },
    querySearchAsync(queryString, cb) {
    },
    handleSelect(item) {
      console.log(item);
    },
    getXMLReportList(isInit) {
      if (isInit === 1) {
        this.currentPage = 1;
      }
      this.loading = true;
      this.$http.post(`${this.$api.GetXMLReportList}?name=${this.formInline.name}&page=${this.currentPage}&limit=${this.pagesize}`)
      .then(res=> {
        this.tableData = res.data;
        this.loading = false;
        this.total = res.totalrows
      })
      .catch(err=> {
        console.log(err)
      })
    },
    // getInfo(isInit) {
    //   if (isInit === 1) {
    //     this.currentPage = 1;
    //   }
    //   this.loading = true;
    //   this.$http.post(`${this.$api.GetPOAcknowledgements}?partid=${this.formInline.PartNo}&po=${this.formInline.po}&regno=${this.RegNo}&page=${this.currentPage}&limit=${this.pagesize}`)
    //   .then(res=> {
    //     this.tableData = res.data;
    //     this.loading = false;
    //     this.total = res.totalrows
    //   })
    //   .catch(err=> {
    //     console.log(err)
    //   })
    // },
    // saveEdit() {
    //   console.log(this.formInline2)
    //   let params = this.activeName == '1' ? this.formInline3 : this.formInline4;
    //   params.regno=this.RegNo;
    //   this.$http.post({url:this.$api.UpdateAcknowledgements,query:params})
    //   .then(res=> {
    //     if (res.code == '0') {
    //       this.getXMLReportList();
    //       this.dialogVisible = false;
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //     this.loading = false;
    //   })
    //   .catch(err=> {
    //     console.log(err);
    //     this.dialogVisible = false;
    //   })
      
    // },

    // addTags() {
    //   const { name } = this.$route
    //   if (name) {
    //     this.$store.dispatch('tagsView/addView', this.$route)
    //   }
    //   console.log(this.visitedViews)
    //   return false
    // },


  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  i{
    margin-right: 3px;
  }
</style>
