<template>
  <div class="container">
    <div class="flex">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <div>
            <el-form-item label="门店id" prop="id">
              <el-input v-model="formInline.id"></el-input>
            </el-form-item>
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
      <el-table-column prop="id" label="门店id" width="150"></el-table-column>
      <el-table-column prop="shopname" label="店名" width="250"></el-table-column>
      <el-table-column prop="provinceid" label="省" width="150"></el-table-column>
      <el-table-column prop="cityid" label="市" width="150"></el-table-column>
      <el-table-column prop="areaid" label="区" width="150"></el-table-column>
      <el-table-column prop="addressstr" label="地址" width="250"></el-table-column>
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
            <el-form-item label="门店id">
              <el-input v-model="formInline2.id" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="店名">
              <el-input v-model="formInline2.shopname" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="省">
              <el-select v-model="formInline2.provinceid" placeholder="请选择省" @focus="getProvinces" @change="changeProvince" :disabled="showFlag">
                <el-option	
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="市">
              <el-select v-model="formInline2.cityid" placeholder="请选择市" @focus="getCities" @change="changeCity" :disabled="showFlag">
                <el-option	
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="区">
              <el-select v-model="formInline2.areaid" placeholder="请选择区、县" @focus="getAreas" @change="changeArea" :disabled="showFlag">
                <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
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
        id: '',
        shopname: '',
        addressstr: '',
      },
      formInline2: {
      },
      tableData: [],
      provinceList: [], // 省份列表
      cityList: [], // 城市列表
      areaList: [], // 区/县列表
      // provinceCode: '', // 省份编码
      // cityCode: '', // 城市编码
      // areaCode: '', // 区/县编码
      provinceFlag: false, // 避免重复请求的标志
      cityFlag: false,
      areaFlag: false,

      loading: false,
      dialogVisible: false,
      dialogTitle: "新增",
    }
  },
  mounted() {
    this.getInfo();
  },
  created () {
    this.getProvinces()
  },
  methods: {
    exportList() {
      let nowDate = new Date().getTime();
      let data = { shopname: `${this.formInline.shopname}`, 
      addressstr: `${this.formInline.addressstr}`};
      this.$http.post(`${this.$api.ExportDrugShopList}`, data, {responseType: 'blob'},'Shops' + moment(nowDate).format('YYYY-MM-DD') +'.xlsx')
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
        console.log(res);
        this.tableData = res.rows;
        this.loading = false;
        this.total = res.total
      })
      .catch(err=> {
        console.log(err)
      })
    },

    /**
     * 获取数据
     * @param {Array} array 列表
     * @param {String} url 请求url
     * @param {String} code 编码(上一级编码)
     */
    fetchData (array, url, parentid) {
      let data = { parent_id: parentid};
      // this.$http({
      //   method: 'post',
      //   url: url + '/' + code
      // })
      this.$http.post(url, data)
      .then(res => {
        if (res.code === 0) {
          let body = res.rows || []
          array.splice(0, array.length, ...body)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(res => {
      })
    },
    // 获取省份列表
    getProvinces () {
      if (this.provinceFlag) {
        return
      }
      this.fetchData(this.provinceList, `${this.$api.GetProvinceList}`, 0)
      //this.fetchData(this.provinceList, `${this.$api.GetSysDistrictList}`, 0)
      this.provinceFlag = true
    },
    // 省份修改，拉取对应城市列表
    changeProvince (val) {
      this.formInline2.provinceid = val;
      this.fetchData(this.cityList, `${this.$api.GetCityList}`, this.formInline2.provinceid)
      //this.fetchData(this.cityList, `${this.$api.GetSysDistrictList}`, this.formInline2.provinceid)
      this.cityFlag = true
      this.formInline2.cityid = '';
      this.formInline2.areaid = '';
      // this.cityCode = ''
      // this.areaCode = ''
      //this.$emit('addressSelect', val)
    },
    // 根据省份编码获取城市列表
    getCities () {
      if (this.cityFlag) {
        return
      }
      if (this.formInline2.provinceid) {
        this.fetchData(this.cityList, `${this.$api.GetCityList}`, this.formInline2.provinceid)
        //this.fetchData(this.cityList, `${this.$api.GetSysDistrictList}`, this.formInline2.provinceid)
        this.cityFlag = true
      }
    },
    // 城市修改，拉取对应区域列表
    changeCity (val) {
      this.formInline2.cityid = val;
      this.fetchData(this.areaList, `${this.$api.GetAreaList}`, this.formInline2.cityid)
      //this.fetchData(this.areaList, `${this.$api.GetSysDistrictList}`, this.formInline2.cityid)
      this.areaFlag = true
      this.formInline2.areaid = ''
      //this.$emit('addressSelect', val)
    },
    // 根据城市编码获取区域列表
    getAreas () {
      if (this.areaFlag) {
        return
      }
      if (this.formInline2.cityid) {
        this.fetchData(this.areaList, `${this.$api.GetAreaList}`, this.formInline2.cityid)
        //this.fetchData(this.areaList, `${this.$api.GetSysDistrictList}`, this.formInline2.cityid)
        this.areaFlag = true
      }
    },
    // 区域修改
    changeArea (val) {
      this.$forceUpdate();  //强制刷新控件，否则选不中
      this.formInline2.areaid = val
      //this.$emit('addressSelect', val)
    },
    // //这里是删除的时候清空所选中的Id
    // delProvince() {
    //   this.formInline2.provinceid = '';
    //   this.formInline2.cityid = '';
    //   this.formInline2.areaid = '';
    // },
    // delCity() {
    //   this.formInline2.cityid = '';
    //   this.formInline2.areaid = '';
    // },
    // delArea() {
    //   this.formInline2.areaid = '';
    // },

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
        this.getCities();
        this.getAreas();
        this.dialogVisible = true;
        this.showFlag = true;
      } else if (type == 'delete') {
        this.$confirm('确定删除？','请确认')
        .then(_ => {
          let data = { shopid: `${row.id}`};
          this.$http.post(`${this.$api.DeleteDrugShop}`, data)
          .then(res=> {
            res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
          })
        })
        .catch(_ => {});
      } else {
        this.showFlag = false;
        this.dialogTitle = "修改";
        this.formInline2 = row;
        this.getCities();
        this.getAreas();
        // this.formInline2.provinceid = row.provinceid;
        // this.formInline2.cityid = row.cityid;
        // this.formInline2.areaid = row.areaid;
        this.dialogVisible = true;
      }
    },
    saveEdit() {
      console.log(this.formInline2)
      let url = this.dialogTitle == "新增" ? `${this.$api.AddDrugShop}` : `${this.$api.UpdateDrugShop}`;
      // let data = { id: this.formInline2.id, 
      // shopname: this.formInline2.shopname, 
      // addressstr: this.formInline2.addressstr, 
      // provinceid: this.formInline2.provinceid + '' , 
      // cityid: this.formInline2.cityid + '', 
      // areasize: this.formInline2.areasize };
      // console.log(data)
      this.$http.post(url, this.formInline2)
      .then(res=> {
        res.code == 0 ? this.$message.success(res.message) : this.$message.error(res.message);
        this.reset();
        this.dialogVisible= false;
        // if (res.code == 0) {
        //   this.getInfo();
        //   this.dialogVisible = false;
        // } else {
        //   this.$message.error(res.message)
        // }
        // this.loading = false;
      })
      .catch(err=> {
        console.log(err);
        this.dialogVisible = false;
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
</style>
