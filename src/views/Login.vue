<template>
  <div class="container inner-center">
  <!-- <img src="../assets/img/drugbg.jpg" alt="" class="logo"> -->
    <div class="main">
	    <div class="login">
        <div class="logo">
        </div>
	    	<div class="flex">
          <div class="flex-1">
            <div class="input-box">
              <!-- <div :class="['input-item']">
                <input type="text" v-model.trim="IdNo" placeholder="RegisterNo" maxlength="20">
                <i class="icon-prefix el-icon-info"></i>
                <i class="icon-clear" @click="clearInput('IdNo')" v-if="IdNo!=''"></i>
              </div> -->
              <div :class="['input-item']">
                <input type="text" v-model.trim="username" placeholder="User Name" maxlength="20">
                <i class="icon-prefix el-icon-user"></i>
                <i class="icon-clear" @click="clearInput('username')" v-if="username!=''"></i>
              </div>
              <div :class="['input-item']">
                <input type="password" v-model.trim="password" placeholder="Password" maxlength="120">
                <i class="icon-prefix el-icon-suitcase"></i>
                <i class="icon-clear" @click="clearInput('password')" v-if="password!=''"></i>
              </div>
              <div class="input-item">
                <div class="check-slider" :class="checkStatus ? 'success': ''" >
                  <div class="slider-bg" :style="{width: disX+'px'}"></div>
                    <i id="controller" @mousedown="sliderMove" :class="checkStatus ? 'el-icon-success' : 'el-icon-d-arrow-right'"></i>
                    {{checkStatus? '验证成功' : '请按住滑块，拖动到最右边'}}
                  </div>
              </div>
            </div>
            <div class="tip" v-if="overtime">timeout</div>
            <div class="submit">
              <el-button type="confirm" @click="login" v-if="!loading">登录</el-button>
              <el-button type="primary" :loading="true" v-else>正在登录...</el-button>
              <el-button type="info" @click="show=true">注册</el-button>
            </div>
          </div>
        </div>
      </div>
      <register :show="show" @setshow="show=false"></register>
	  </div>
    
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      show: false,
      IdNo: 'AEROE001',
      loading: false,
	    focusIndex: -1,
	    username: 'admin',
	    password: '123456',
	    mobile: '',
      captcha: '',
      code: '',
      src: '',
	    remainder: false,
	    space: 60,
	    remember: false,
      disabled: false,
      disX : 0,
      checkStatus: false,
      showSlider: true,
      overtime: false,
      bodyBgImage: 'url(' + require('../assets/img/drugbg.jpg') + ')'
	  }
  },
  components: {
    Register: () => import('@/views/Register')
  },
  mounted() {
    document.addEventListener('keyup', this.keyupEnter, false);
    // 进来的时候调用添加
    this.setBodyBackGround();
  },
  methods: {
    // 添加body图片
    setBodyBackGround () {
      document.body.style.height = '100%'
      document.body.style.backgroundSize = '100%'
      document.body.style.backgroundImage = this.bodyBgImage
    },
    // 清除背景图
    clearBodyBackGround () {
      document.body.style.backgroundImage = ''
    },
    clearInput(field){
      this[field] = '';
    },
    //密码登录
    login() {
      // if(this.IdNo==''){
      //   this.$message({type: 'error', showClose: true, message: 'RegisterNo required'})
      //   return false;
      // }
      if(this.username==''){
        this.$message({type: 'error', showClose: true, message: 'username required'})
        return false;
      }
      if(this.password==''){
        this.$message({type: 'error', showClose: true, message: 'password required'})
        return false;
      }
      // if(this.showSlider && !this.checkStatus){
      //   this.$message({type: 'error', showClose: true, message: 'Slider no pass'})
      //   return false;
      // }
      this.loading = true;
      let pwd = window.aid && window.aid.encrypt ? this.$util.EncryptData(this.password) : this.password;
      // let pwd = this.password;
       //alert(pwd);
      // alert(`${this.$api.login}?username=${this.username}&password=${pwd}&regno=${this.IdNo}`);
      let data = { username: `${this.username}`, password: `${pwd}` };
      this.$http.post(`${this.$api.login}`, data)
        .then(res => {
          console.log(res);
          this.loading = false;
          if(document.getElementById('controller')){
            this.disX = 0
            this.checkStatus = false;
            document.getElementById('controller').style.transform = 'translateX(0)'
          }
          this.$message.closeAll();
          //if (res.code == '0') {
          if (res.success) {
            //alert(res.data[0].token);
            sessionStorage.setItem('token',res.rows[0].auth_token);
            //sessionStorage.setItem('RegNo',this.IdNo);
            sessionStorage.setItem('username',this.username);
            this.$router.push('/')
          } else {
            this.$message({type: 'error', showClose: true, message: res.message})
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        });
    },
    //按回车键
    keyupEnter(event) {
      let ev = event || window.event; 
      let code = ev.keyCode || ev.which || ev.charCode;
      if(code === 13) {
        this.login();
      }
    },
    sliderMove(e){
      if(this.checkStatus){
        return false;
      }
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth =  ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX
        if(this.disX<=0){
            this.disX = 0
        }
        if(this.disX>=MaxX-eleWidth){
            this.disX = MaxX
        }
        ele.style.transition = '.1s all'
        ele.style.transform = 'translateX('+this.disX+'px)'
        e.preventDefault();
      }
      document.onmouseup = ()=> {
        if(this.disX !== MaxX){
          ele.style.transition = '.5s all'
          ele.style.transform = 'translateX(0)'
        }else{
          this.checkStatus = true
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  destroyed() {
    document.removeEventListener('keyup', this.keyupEnter, false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



.main {
  position: relative;
  margin: 80px auto;
  width: 600px;
  height: 400px;
  border-radius:20px;
  // background:url('../assets/img/drugbg.jpg') no-repeat; 
  // background-size: 100% 100%; 
}

.login {
  position: relative;
	width: 600px;
  height: 400px;
	background: #FFF;
	border:1px solid #E7F1F2;
	border-radius:20px;
  box-sizing: border-box;
  .flex{
    margin: 60px 130px;
    .flex-1{
      .img {
        margin-top: 60px;
      }
      &.sp {
        padding-left: 60px;
        height: 380px;
        position: relative;
        border-left: 1px solid #EFEFEF;
        .system {
          font-size: 24px;
          margin-top: 10px;
          padding-bottom: 30px;
        }
        .copyright {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          font-size: 14px;
          color: #999;
          text-align: center;
        }
      }
    }
  }
}

.tab {
	padding: 40px 0 20px;
	display: flex;
	height: 26px;
	line-height: 26px;
}

.tab .item {
	padding-right: 42px;
	color: #999;
	font-size: 16px;
	cursor: pointer;
}

.tab .item.active {
	color: #376DEF;
	font-size: 20px;
}

.input-item {
	position: relative;
	display: flex;
	margin-top: 20px;
	// border-bottom: #CCCCCC 1px solid;
}

.input-item.focus {
	border-bottom-color: #376DEF;
}

.input-item input {
	width: 100%;
	height: 40px;
	padding-left: 25px;
	line-height: 40px;
	outline: none;
	border: none;
	font-size: 14px;
  box-sizing: border-box;
  border-bottom: 1px #eee solid;
}

.error {
	margin: 0;
	padding: 3px 0 3px 10px;
	width: 200px;
	color: #FF4D4F;
	font-size: 12px;
	white-space: nowrap;
}

.input-item .captcha.disabled {
	color: #999;
	cursor: not-allowed;
}

.input-item .button {
	width: 100px;
	height: 45px;
	line-height: 45px;
	color: #376DEF;
	font-size: 14px;
	background: #F7F7F7;
	cursor: pointer;
	text-align: center;
}

.input-item .button.disabled {
	color: #999;
	cursor: not-allowed;
}

.input-item .icon-prefix {
	display: inline-block;
	position: absolute;
	top: 11px;
	left: 5px;
	width: 12px;
	height: 16px;
}

.input-item .icon-username {
	background: url("../assets/svg/login/username.svg") no-repeat center / 12px 13px;
}

.input-item.focus .icon-username {
	background: url("../assets/svg/login/username_hover.svg") no-repeat center / 12px 13px;
}

.input-item .icon-password {
	background: url("../assets/svg/login/password.svg") no-repeat center / 12px 16px;
}

.input-item.focus .icon-password {
	background: url("../assets/svg/login/password_hover.svg") no-repeat center / 12px 16px;
}

.input-item:hover .icon-clear {
	display: none;
	position: absolute;
	top: 11px;
	right: 0;
	width: 20px;
	height: 20px;
	background: url("../assets/svg/login/clear.svg") no-repeat center / 20px 20px;
	cursor: pointer;
	&:hover {
		background: url("../assets/svg/login/clear_hover.svg") no-repeat center / 20px 20px;
	}
}

.input-item.sp:hover .icon-clear {
	right: 90px;
}

.input-item:hover .icon-clear {
	display: inline-block;
}

.input-item.focus input {
	border-color: #376DEF;
	background: #FFF;
}

.reset {
	margin-top: 20px;
	color: #376DEF;
	font-size: 20px;
}

.remember {
	padding-top: 20px;
	color: #666;
	font-size: 14px;
}

.remember .checkbox{
	line-height: 1;
    position: relative;
    display: inline-block;
    margin: 0 10px 5px 0;
    box-sizing: border-box;
}

.remember .checkbox label { 
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.remember .checkbox span {
	padding-left: 2px;
}

.remember .checkbox input[type=checkbox] {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    width: 14px;
    height: 14px;
    cursor: pointer;
    vertical-align: center;
    background: #fff;
    border: 1px solid #ccc;
    position: relative;
    border-radius: 2px;
}

.remember .checkbox input[type=checkbox]:checked::after {
    content: '\2713';
    display: block;
    position: absolute;
    top: -1px;
    left: -1px;
    right: 0;
    bottom: 0;
    width: 8px;
    height: 12px;
    padding: 0 2px;
    line-height: 12px;
    color: #FFF;
    font-size: 12px;
    border-radius: 2px;
    border:  #376DEF 1px solid;
    background: #376DEF;
}

.tip {
  font-size: 14px;
  margin-top: 20px;
  color: #FF4D4F;
}

.submit {
  margin: 30px auto 0;
  width: 200px;
}

.submit button {
	width: 45%;
  // height: 36px;
  // line-height: 36px;
	text-align: center;
	font-size: 14px;
	color: #FFF;
	outline: none;
	border: 0;
	// background: #376DEF;
	cursor: pointer;
	border-radius: 10px;
}

.submit button:hover {
	opacity: .9;
}

.forget {
	text-align: right;
	margin-top: 30px;
}

.forget a {
	text-decoration: none;
	color: #999;
	font-size: 14px;
}

.check-slider {
  display: flex;
  width: 100%;
  height: 40px;
  position: relative;
  transition: 1s all;
  user-select: none;
  color: #585858;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
  .slider-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 40px;
    background: rgba(#999,.2);
  }
  &.success{
    background: #28BF7E;
    color: #fff;
    i {
      color: #28BF7E;
    }
  }
  i {
    display: flex;
    position: absolute;
    left: 0;
    width: 40px;
    height: 100%;
    color: #999;
    background: #fff;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    font-size: 22px;
    justify-content: center;
    align-items: center;
    cursor: grab;
  }
}
</style>
