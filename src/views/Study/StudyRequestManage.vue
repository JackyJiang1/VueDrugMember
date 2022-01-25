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
            <el-form-item label="开口说标题" prop="studytitle">
              <el-input v-model="formInline.studytitle"></el-input>
            </el-form-item>
            <el-form-item label="开口说内容" prop="studyword">
              <el-input v-model="formInline.studyword"></el-input>
            </el-form-item>
            <el-form-item label="审核状态" prop="ststatus">
              <el-select v-model="formInline.ststatus">
                <el-option v-for="item in ststatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
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
      <el-table-column prop="mbname" label="店员姓名" width="120"></el-table-column>
      <el-table-column prop="phone_no" label="店员手机号" width="200"></el-table-column>
      <el-table-column prop="studytitle" label="开口说标题" width="200"></el-table-column>
      <el-table-column prop="studyword" label="开口说内容"></el-table-column>
      <!-- <el-table-column prop="soundsource" label="音频路径" width="100"></el-table-column> -->
      <el-table-column prop="ststatus" label="审核状态" width="150" :formatter="ststatusFormat"></el-table-column>
      <el-table-column prop="studymatcreateddate" label="朗读日期" width="200" :formatter="datetimeFormat"></el-table-column>
      <el-table-column
        width="150"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-row v-if="scope.row.ststatus=='PROC'">
            <el-button type="success" size="mini" @click="handleClick(scope.row,'show')"><i class="el-icon-tickets"></i>审核</el-button>
          </el-row>
          <!-- <el-button type="success" size="mini" @click="handleClick(scope.row,'approve')"><i class="el-icon-edit"></i>审核通过</el-button>
          <el-button type="danger" size="mini" @click="handleClick(scope.row,'reject')"><i class="el-icon-delete"></i>驳回</el-button> -->
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
      width="40%">
      <div>
        <el-form :inline="true" :model="formInline2" class="demo-form-inline" label-width="120px">
          <div>
            <el-form-item label="店员姓名">
              <el-input v-model="formInline2.mbname" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="店员手机号">
              <el-input v-model="formInline2.phone_no" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="开口说标题">
              <el-input v-model="formInline2.studytitle" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="开口说内容">
              <el-input v-model="formInline2.studyword" :disabled="showFlag" type="textarea"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="开口说音频">
              <!-- <el-input v-model="formInline2.soundsource" :disabled="showFlag"></el-input> -->
              <div class="right di main-wrap" v-loading="audio.waiting">
                <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
                <audio ref="audio" class="dn"
                :src="url" :preload="audio.preload"
                @play="onPlay"
                @error="onError"
                @waiting="onWaiting"
                @pause="onPause"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
                ></audio>
                <div class="w-full">
                  <div class="flex items-center w-10/12 mx-auto">
                    <!-- 当前时间 -->
                    <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag>
                    <!-- 滚动条 -->
                    <el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider_time"></el-slider>
                    <!-- 总时长 -->
                    <el-tag type="info">{{ audio.maxTime | formatSecond }}</el-tag>
                  </div>
                  <div class="mt-3 flex items-center w-1/2 mx-auto justify-around">
                    <!-- 播放/暂停 -->
                    <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
                    <!-- 快进 -->
                    <el-button v-show="!controlList.noSpeed" type="text" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button>
                    <!-- 静音 -->
                    <el-button v-show="!controlList.noMuted" type="text" @click="startMutedOrNot">{{audio.muted | transMutedOrNot}}</el-button>
                    <!-- 音量 -->
                    <div class="flex items-center">
                      <span class="mr-2 text-sm">音量</span>
                      <el-slider v-show="!controlList.noVolume" v-model="volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume" class="slider_voice"></el-slider>
                    </div>
                    <!-- 下载 -->
                    <a :href="url" rel="external nofollow"  v-show="!controlList.noDownload" target="_blank" class="download text-sm" download>下载</a>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="审核状态">
              <el-input v-model="formInline2.ststatus" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
          <div>
             <el-form-item label="朗读日期">
              <el-input v-model="formInline2.studymatcreateddate" :disabled="showFlag"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operater mb20 center">
        <el-button type="success" icon="el-icon-circle-check" @click="saveApprove">通过</el-button>
        <el-button type="danger" icon="el-icon-circle-close" @click="saveReject">驳回</el-button>
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
  name: 'voicetotext',
    props: {
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      theControlList: {
        type: String,
        default: ''
      }
    },
  data() {
    return {
      //播放音频相关
      url: 'https://wdd.js.org/element-audio/static/falling-star.mp3',
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: 'auto'
      },

      sliderTime: 0,
      volume: 100,
      speeds: this.theSpeeds,

      controlList: {
        // 不显示下载
        noDownload: false,
        // 不显示静音
        noMuted: false,
        // 不显示音量条
        noVolume: false,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false,
        // 不要快进按钮
        noSpeed: false
      },

      fileUploadBaseUrl:'http://schmeng510.com:8009/TTDemandUpload/upload/',
      showFlag : false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      formInline: {
        mbname: '',
        phone_no: '',
        studytitle:'',
        studyword:'',
        ststatus:''
      },
      ststatuss: [{
        value: 'NEW',
        label: '未完成'
      }, {
        value: 'PROC',
        label: '审核中'
      }, {
        value: 'COMP',
        label: '已审核'
      }, {
        value: 'REJ',
        label: '已驳回'
      }],
      formInline2: {
      },
      tableData: [],

      loading: false,
      username:sessionStorage.getItem('username'),

      dialogVisible: false,
      dialogTitle: "新增",
    }
  },
  mounted() {
    this.getInfo();
  },
  created () {
    this.setControlList()
  },
  //音频按钮
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second)
    },
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    },
    transMutedOrNot(value) {
      return value ? '放音' : '静音'
    },
    transSpeed(value) {
      return '快进: x' + value
    }
  },
  methods: {
    setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if(this.controlList[item] !== undefined){
            this.controlList[item] = true
          }
        })
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.pausePlay()
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
        console.log(res)
      },
      // 当音频开始播放
      onPlay (res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false
 
        if(!this.controlList.onlyOnePlaying){
          return
        }
 
        let target = res.target
 
        let audios = document.getElementsByTagName('audio');
 
        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      },
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
      studytitle: `${this.formInline.studytitle}`, 
      studyword: `${this.formInline.studyword}`, 
      ststatus: `${this.formInline.ststatus}`, 
      page: `${this.currentPage}`, 
      limit: `${this.pagesize}`, 
      sort: `+id` };
      this.$http.post(`${this.$api.GetDrugStudyMemberList}`, data)
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
    datetimeFormat:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD HH:MM:SS")
    },
    ststatusFormat:function(row,column){
        var ststatus = row[column.property];
        var ststatusF = '';
        if(ststatus == undefined){
          return ''
        }
        else {
          switch(ststatus){
            case "NEW":
              ststatusF = '未完成';
              break;
            case "PROC":
              ststatusF = '审核中';
              break;
            case "COMP":
              ststatusF = '已审核';
              break;
            case "REJ":
              ststatusF = '已驳回';
              break;
            default:
              break;
          }
        }
        return ststatusF    
    },



    handleClick(row, type) {
      this.title = type;
      if (type == 'show') {
        this.dialogTitle = "审批";
        this.formInline2 = row;
        //附上对应音频路径
        this.url =  this.fileUploadBaseUrl + row.soundsource;
        this.dialogVisible = true;
        this.showFlag = true;
      // } else if (type == 'approve') {
      //   this.$confirm('确定审核通过？','请确认')
      //   .then(_ => {
      //     let data = { scorereqid: `${row.id}`, appresult: 'AP', username: this.username, comments:'test'};
      //     console.log(JSON.stringify(data));
      //     this.$http.post(`${this.$api.ScoreApproveMemberInfo}`, data)
      //     .then(res=> {
      //       res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
      //       this.onSubmit();
      //     })
      //   })
      //   .catch(_ => {});
      // } else if (type == 'reject') {
      //   this.$confirm('确定驳回积分请求？','请确认')
      //   .then(_ => {
      //     let data = { scorereqid: `${row.id}`, appresult: 'RJ', username: this.username, comments:'test'};
      //     console.log(JSON.stringify(data));
      //     this.$http.post(`${this.$api.ScoreApproveMemberInfo}`, data)
      //     .then(res=> {
      //       res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
      //       this.onSubmit();
      //     })
      //   })
      //   .catch(_ => {});
      }
    },
    saveApprove() {
      console.log(this.formInline2)
        this.$confirm('确定开口说审核通过？','请确认')
        .then(_ => {
          let data = { id: this.formInline2.id, appresult: 'AP', appby: this.username};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.ApproveDrugStudyResult}`, data)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
            this.dialogVisible = false;
          })
        })
        .catch(_ => {});      
    },
    saveReject() {
      console.log(this.formInline2)
        this.$confirm('确定驳回用户开口说？','请确认')
        .then(_ => {
          let data = { id: this.formInline2.id, appresult: 'RJ', appby: this.username};
          console.log(JSON.stringify(data));
          this.$http.post(`${this.$api.ApproveDrugStudyResult}`, data)
          .then(res=> {
            res.code == '0' ? this.$message.success(res.message) : this.$message.error(res.message)
            this.getInfo();
            this.dialogVisible = false;
          })
        })
        .catch(_ => {});      
    }
  }
}

  // 将整数转换成 时：分：秒的格式
  function realFormatSecond(second) {
    var secondType = typeof second
 
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)
 
      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60
 
      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';
  
  .right{
     width: 100%;
     padding: 10px 15px;
     display: inline-block;
     .slider {
       display: inline-block;
       position: relative;
       top: 14px;
       margin-left: 15px;
     }
     .slider_time{
       width: 300px;
       margin: 0 10px;
     }
     .slider_voice{
       width: 80px;
     }
     .download {
       color: #409EFF;
       margin-left: 15px;
     }
 
     .dn{
       display: none;
     }
   }
 
</style>
