<template>
  <div class="container">
    <el-header height="45vh">
      <div style="font-weight:bold; color:#6F6F6F; margin-bottom:20px;"><i class="el-icon-user-solid"></i> 基本信息</div>
      <table width="100%" style="margin-bottom:20px;">
        <tr>
          <td rowspan="2" id="tdAvatar" style="position:relative;">
            <el-avatar shape="square" :size="300" :fit="fit" :src="url"></el-avatar>
            <el-tag type="warning" effect="dark" style="position: absolute; bottom: 10px;display: block;left: 110px;">黄金会员</el-tag>
          </td>
        </tr>
        <tr>
          <td>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <div>
                  <el-form-item label="ID" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.id class="lbvalue">
                    </el-form-item>
                  <el-form-item label="职业" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.occupation class="lbvalue">
                    </el-form-item>
                </div>
                <div>
                  <el-form-item label="手机号码" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.phone_no class="lbvalue">
                    </el-form-item>
                  <el-form-item label="个性签名" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.sign class="lbvalue">
                    </el-form-item>
                </div>
                <div>
                  <el-form-item label="性别" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.sex class="lbvalue">
                    </el-form-item>
                  <el-form-item label="喜欢的分类" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.favorite class="lbvalue">
                    </el-form-item>
                </div>
                <div>
                  <el-form-item label="生日" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.birth class="lbvalue">
                    </el-form-item>
                  <el-form-item label="注册时间" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.createddate class="lbvalue">
                    </el-form-item>
                </div>
                <div>
                  <el-form-item label="城市" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.city class="lbvalue">
                    </el-form-item>
                  <el-form-item label="用户来源" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.from class="lbvalue">
                    </el-form-item>
                </div>
                <div>
                  <el-form-item label="所属门店" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.shop class="lbvalue">
                    </el-form-item>
                  <el-form-item label="标签" class="lbtitle">
                  </el-form-item>
                    <el-form-item :label=formInline.flag class="lbvalue">
                    </el-form-item>
                </div>
            </el-form>
          </td>
        </tr>
      </table>
      印象标签：
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :type="tag.type"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)" effect="dark" style="">
        {{ tag.label }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
    </el-header>
    <el-main>
      <div style="font-weight:bold; color:#6F6F6F; margin-bottom:20px;"><i class="el-icon-s-data"></i> 统计信息</div>
      <el-form :inline="true" :model="formInline1" class="demo-form-inline" label-width="180px">
          <div>
            <el-form-item label="学习次数" class="lbgrey">
            </el-form-item>
            <el-form-item label="学习时长（小时）" class="lbgrey">
            </el-form-item>
            <el-form-item label="可用积分" class="lbgrey">
            </el-form-item>
            <el-form-item label="成长值" class="lbgrey">
            </el-form-item>
            <el-form-item label="活动次数" class="lbgrey">
            </el-form-item>
            <el-form-item label="商品评价" class="lbgrey">
            </el-form-item>
            <el-form-item label="退货记录" class="lbgrey">
            </el-form-item>
            <el-form-item label="登录次数" class="lbgrey">
            </el-form-item>
          </div>
          <div>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
          </div>
          <div>
            <el-form-item label="关注" class="lbgrey">
            </el-form-item>
            <el-form-item label="粉丝" class="lbgrey">
            </el-form-item>
            <el-form-item label="收藏商品" class="lbgrey">
            </el-form-item>
            <el-form-item label="收藏专题" class="lbgrey">
            </el-form-item>
            <el-form-item label="收藏话题" class="lbgrey">
            </el-form-item>
            <el-form-item label="收藏评价" class="lbgrey">
            </el-form-item>
            <el-form-item label="邀请好友" class="lbgrey">
            </el-form-item>
            <el-form-item label="剩余抽奖次数" class="lbgrey">
            </el-form-item>
          </div>
          <div>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
              <el-form-item :label=formInline1.count>
              </el-form-item>
          </div>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:20px;">
        <el-tab-pane label="活动记录" name="first">
          <el-table
            highlight-current-row
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%;font-size:12px">
            <el-table-column prop="activity_name" label="活动名称" width="300"></el-table-column>
            <el-table-column prop="activity_desc" label="活动描述"></el-table-column>
            <el-table-column prop="active_date" label="活动日期" width="200" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="activestat" label="参与状态" width="200"></el-table-column>
            <el-table-column prop="createddate" label="参与日期" width="200" :formatter="dateFormat"></el-table-column>
          </el-table>
          <el-pagination
            class="page"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="积分记录" name="second">
          <el-table
            highlight-current-row
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%;font-size:12px">
            <el-table-column prop="transtype" label="收入/支出" width="300"></el-table-column>
            <el-table-column prop="transsource" label="积分来源" width="300"></el-table-column>
            <el-table-column prop="scoreqty" label="积分状态" width="200"></el-table-column>
            <el-table-column prop="createddate" label="记录日期" width="300" :formatter="dateFormat"></el-table-column>
          </el-table>
          <el-pagination
            class="page"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="联系记录" name="third">
          <el-table
            highlight-current-row
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%;font-size:12px">
            <el-table-column prop="contactdate" label="联系日期" width="300" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="contacttime_mins" label="联系时长" width="300"></el-table-column>
            <el-table-column prop="contactby" label="联系人" width="300"></el-table-column>
            <el-table-column prop="comments" label="备注"></el-table-column>
          </el-table>
          <el-pagination
            class="page"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>


    </el-main>
    

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
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      activeName: 'first',
      formInline: {
        id: 'Y214304329',
        occupation: '药剂师',
        phone_no: '18888888888',
        sign: '无',
        sex: '男',
        favorite: '游泳健身',
        birth: '1970年1月1日',
        createddate: '2021-12-15',
        city: '苏州',
        from: '话术',
        shop: '工业园区健力宝药房',
        flag: '严谨，沟通少，民间高手',
      },
      formInline1: {
        count: 108,
      },
      dynamicTags: [
          { type: '', label: '标签一' },
          { type: 'success', label: '标签二' },
          { type: 'info', label: '标签三' },
          { type: 'danger', label: '标签四' },
          { type: 'warning', label: '标签五' }
        ],
      inputVisible: false,
      inputValue: '',
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
    },
    //操作标签相关
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          //this.dynamicTags.push(inputValue);
          //此处需要随机颜色
          this.dynamicTags.push({ type: 'info', label: inputValue });
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .el-form-item {
     margin-bottom: 0px;
     margin-right: 0px;
     border: 1px solid #EDEDED;
    }

    .lbtitle{
      width:150px;
      background-color:#F9F9F9;
      text-align: right;
    }
    .lbvalue{
      width:350px;
      text-align: right;
    }
    
    .lbgrey{
      background-color:#F9F9F9;
    }
    
</style>
