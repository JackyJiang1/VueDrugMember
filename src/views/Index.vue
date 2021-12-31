<template>
  <div class="aid-wrapper">
    <el-container>
      <el-aside width="240px">
        <img src="../assets/img/logo.jpg" alt="" class="logo">
        <div class="sidebar" >
          <el-menu 
            class="sidebar-el-menu" 
            background-color="#324157" 
            text-color="#bfcbd9" 
            active-text-color="#20a0ff" 
            unique-opened 
            :default-active="activeMenu"
            router>
            <template v-for="(item) in menuList">
                <template v-if="item.children && item.children.length">
                  <el-submenu :index="`/${item.text}`" :key="item.id">
                    <template slot="title">
                      <span slot="title">{{ item.text }}</span>
                    </template>
                    <el-menu-item v-for="(subItem) in item.children" :key="subItem.id" :index="`/${subItem.text}`">
                      {{ subItem.text }}
                    </el-menu-item>
                  </el-submenu>
                </template>
            </template>
          </el-menu>
      </div>
      </el-aside>
      <el-main>
        <el-header>
          <div class="fl">
            <navbar />
            <tags-view/>
          </div>
          <div class="fr">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-user-solid"></i> {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline" command="change">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          
        </el-header>
        <div class="inner-center" id="inner-center">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-main>
    </el-container>
    <changepsw :show="show" @setshow="show=false"></changepsw>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    components: {
      changepsw: () => import('@/components/ChangePsw'),
      Navbar: () => import('@/components/Navbar'),
      TagsView: () => import('@/components/TagsView'),
    },
    data() {
      return {
        username: sessionStorage.getItem('username'),
        activeMenu: '',
        show: false,
        navList: [
          {name:'Home'},
          {name:'Portal'},
          {name:'About'},
        ],
        activeName: 'Home',
        menuList: []
      }
    },
    created() {
    },
    mounted() {
      this.getMenu();
      const { path } = this.$route;
      this.activeMenu = path;
      // console.log(this.activeMenu,this.$route)
    },
    watch:{
    },
    methods: {
      handleCommand(type) {
        if (type == 'logout') {
          this.logout()
          
        } else {
          this.show = true
        }
      },
      getMenu() {
        //alert("111222");
        //获取菜单
        this.$http.get(`${this.$api.GetUserMenu}?username=${sessionStorage.getItem('username')}`)
        .then(menu=> {
          console.log(menu);
          if (menu.code == '0') {
            this.menuList = menu.rows[0].children
                        console.log(this.menuList);

          }
        })
      },
      handleClick() {

      },
      logout() {
        this.$confirm('确定退出吗？','信息')
        .then(_ => {
          this.$router.push('login')
        })
        .catch(_ => {});
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/base';
  .aid-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #F3F4F5;
    .el-header{
      height: 75px!important;
      overflow: hidden;
      position: relative;
      background: #fff;
      -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
      margin-bottom: 20px;
      .fr{
        // color: #fff;
        span{
          line-height: 60px;
          display: inline-block;
          &.change{
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      }
    }
    
    .el-aside {
      // border-top: 1px #fff solid;
      background-color:#081b34;
      color: #fff;
      text-align: center;
      min-height: 100vh;
      // padding-top: 30px;
      li{
        width: 240px;
        text-align: left;
      }
      .logo{
        display: block;
        width: 100%;
        margin:0 auto 10px;
      }
      /deep/.el-submenu__title{
        text-align: left;
        padding-left:15px!important;
        background-color:#081b34!important;
      }
    }
    
    .el-main {
      background-color: #fff;
      color: #333;
      padding: 0;
      overflow: hidden;
      // text-align: center;
      // line-height: 160px;
    }
  }
</style>
