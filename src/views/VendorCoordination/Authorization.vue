<template>
  <el-container>
    <el-aside style="width: 200px;">
      <ul>
        <li v-for="(r,index) in roleList" :key="index">
          <div :class="['liWrap',{'on':currentRole === index}]" @click="selectCurrentRole(r,index,$event)">
            <span>{{r.Name}}</span>
          </div>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <!-- <h3>功能权限</h3>    -->
      <div class="operationWrap pd20">
        <el-button type="primary" @click="checkAll('1')">Check All</el-button>
        <el-button type="info" @click="checkAll('2')">uncheck All</el-button>
        <el-button type="success">Save</el-button>
        <!-- <el-button type="success" plain>Add</el-button> -->
      </div>
      <article>
        <el-tree
          :data="data"
          ref="tree"
          show-checkbox
          default-expand-all
          node-key="id"
          :props="defaultProps">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <!-- <span>
              <i class="el-icon-circle-plus" @click="() => append(data)"></i>
              <i class="el-icon-delete-solid" @click="() => remove(node, data)"></i>
            </span> -->
          </span>
        </el-tree>
      </article>
    </el-main>
  </el-container>
</template>

<script>
    export default {
      data() {
        return {
          currentRole:0,//当前选中角色
          roleList: [],//左侧角色列表
          data: [],
          defaultProps: {
            children: 'children',
            label: 'text'
          },
          ids: [],//用于全选反选
        }
      },
      created() {
        this.getRoleList();
      },
      methods: {
        checkAll(type) {
          
          if (type === '1') {
            console.log(this.ids)
            this.$refs.tree.setCheckedKeys(this.ids)
          } else {
            this.$refs.tree.setCheckedKeys([])
          }
        },
        //获取左侧角色列表
        getRoleList(id) {
          this.$http.get(`${this.$api.GetRole}`)
          .then(res=> {
            if (res.code == '0') {
              this.roleList = res.rows;
              this.getTreeData()
            } else {
              this.$message({type: 'error', showClose: true, message: res.msg})
            }
          })
        },
        //获取树状结构
        getTreeData() {
          this.$http.get(`${this.$api.GetMenuLeaf}`)
          .then(res=> {
            if (res.code == '0') {
              this.data = res.rows;
              this.roleList.map(i=> {
                i.permissions = res.rows
              })
              res.rows.map(i=> {
                this.ids.push(i.id)
              })
            } else {
              this.$message({type: 'error', showClose: true, message: res.msg})
            }
          })
        },
        //切换角色获取对应权限
        selectCurrentRole(role,index,e) {
          this.currentRole = index;
        },
        append(data) {
          // const newChild = { id: id++, label: 'testtest', children: [] };
          // if (!data.children) {
          //   this.$set(data, 'children', []);
          // }
          // data.children.push(newChild);
        },

        remove(node, data) {
          // const parent = node.parent;
          // const children = parent.data.children || parent.data;
          // const index = children.findIndex(d => d.id === data.id);
          // children.splice(index, 1);
        },
        
        
        //删除角色
        delRole(item,index) {
          // if (item.id) {
          //   //判断是否能删除
          //    this.$http.get(`${this.$api.user.removeRoleNew}/${item.id}`)
          //     .then(res => {
          //       if (res.code === 0) {//可以删除
          //         if (this.currentRole === index) {
          //           this.currentRole = null
          //         }
          //         this.roleList.splice(index,1)
          //       } else {
          //         this.$message({type: 'error', showClose: true, message: '当前角色已有账号在使用，不可删除'})
          //       }
          //     })
          //     .catch(error => {
          //       console.error(error)
          //     })
          // } else {
          //   if (this.currentRole === index) {
          //     this.currentRole = null
          //   }
          //   this.roleList.splice(index,1)
          // }
        },
        //添加角色=
        addRole() {
          // if (this.newRole === '') return false;
          // let params = this.projectId ? {name: this.newRole,projectType:'1',projectId: this.projectId} : {name: this.newRole,projectType:'2',departmentId:this.departmentId};
          // this.$http.post(`${this.$api.user.createRoleNew}`,params)
          // .then(res=>{
          //   if (res.code === 0) {
          //     this.addShow = false;
          //     this.newRole = '';
          //     this.roleList.push(res.data);
          //   } else {
          //     this.$message({type: 'warning', showClose: true, message: res.msg})
          //     this.newRole = '';
          //     this.$nextTick(()=>{
          //       this.$refs.inputs.focus();
          //     })
          //   }
          // })
        },
        //编辑角色名
        editRoleName(item,index) {
          // if (item.isManager) return false;
          // if (item.name === '') {
          //   this.$message({type: 'warning', showClose: true, message: '角色名称不能为空'})
          //   this.$nextTick(()=>{
          //     this.$refs[`inputs${index}`][0].focus();
          //   })
          //   return false;
          // }
          // let params = this.projectId ? {name:item.name,projectType:'1',projectId: this.projectId,id:item.id} : {name:item.name,projectType:'2',id:item.id};
          // this.$http.post(`${this.$api.user.modifyRoleNew}`, params)
          // .then(res =>{ 
          //   if (res.code === 0) {
          //     this.$set(item,'showEdit',false)
          //   } else {
          //     this.$message({type: 'error', showClose: true, message: res.msg})
          //     this.$nextTick(()=>{
          //       this.$refs[`inputs${index}`][0].focus();
          //     })
          //   } 
          // }).catch(err =>{
          //   console.error(err)
          // })
        },
        //更新权限
        save() {
          // let items = [];
          // this.roleList[this.currentRole].permissions.map(i => {
          //   if (i.check) {
          //     items.push({permissionId: i.id,roleId:this.roleList[this.currentRole].id})
          //   }
          //   if (i.childPermission && i.childPermission.length) {
          //     i.childPermission.map(j => {
          //       if (j.check) {
          //         items.push({permissionId: j.id,roleId:this.roleList[this.currentRole].id})
          //       }
          //       if (j.childPermission && j.childPermission.length) {
          //         j.childPermission.map(k => {
          //           k.check && (items.push({permissionId: k.id,roleId:this.roleList[this.currentRole].id}))
          //         })
          //       }
          //     })
          //   }
          // })
          // let vm = this;
          // this.$http.post(`${this.$api.user.updatePermissionNew}/${this.roleList[this.currentRole].id}`,items)
          // .then(res =>{ 
          //   if (res.code === 0) {
          //     this.$message({type: 'success', showClose: true, message: '保存成功'})
          //     vm.$http.get(vm.$api.user.getUserPermissions)
          //     .then(res=>{
          //       if (res.code === 0) {
          //         sessionStorage.setItem('permission',JSON.stringify(res.data.permissions));
          //         vm.$router.go(0)
          //       } else {
          //         vm.$message({type: 'error', showClose: true, message: res.msg})
          //         vm.$router.replace({
          //           path: "/login",
          //           query: {
          //             redirect: router.currentRoute.fullPath
          //           } 
          //         })
          //       }
          //     })
          //   } else {
          //     this.$message({type: 'error', showClose: true, message: res.msg})
          //   }
          // }).catch(err =>{
          //   console.error(err)
          // })
        },
        //勾选
        check(flag,first,second,third) {
          // if (second === undefined) {
          //   first.childPermission.map(i=>{
          //     flag ? i.check = true : i.check = false;
          //     i.childPermission.map(j=>{
          //       flag ? j.check = true : j.check = false;
          //     })
          //   })
          // } else if (third === undefined) {
          //   if (flag === true) {
          //     //选中了二级菜单，一级菜单要选中，对应下面的所有权限不需要默认选中
          //     return first.check = true;
          //     //所二级菜单都选中 则一级菜单要选中
          //     // for (let i = 0;i<first.childPermission.length;i++) {
          //     //   if (first.childPermission[i].check === false) return first.check = false;
          //     //   if (i === first.childPermission.length) return  first.check = true;
          //     // }
          //   } else {
          //     //所有页面取消 模块取消
          //     let _length = 0
          //     first.childPermission.map(i=>{
          //       if (!i.check) {
          //         _length++
          //       }
          //     })
          //     if (_length === first.childPermission.length) {
          //       first.check = false
          //     }
          //   }
          //   //页面取消 下面权限全部取消
          //   second.childPermission.map(i=>{
          //     i.check = false;
          //   })
          // } else {
          //   //三级选中  一级二级均选择
          //   if (flag) {
          //     first.check = true;
          //     second.check = true;
          //   }
          // }
        },
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/base';
  .el-container{
    height:80vh
  }
  .el-aside {
    height: 100%;
    overflow-y: auto;
    background-color: #F4F4F4;
    ul{
      padding-top: 16px ;
      font-size: 12px;
      li{
        position: relative;
        width: 80%;
        margin: 0 auto 10px;
        color: #666666;
        .liWrap{
          padding: 10px 20px;
          background:rgba(255,255,255,1);
          border-radius:20px;
          cursor: pointer;
          &.on{
            background-color: #999;
            color: #fff;
          }
        }
        .el-icon-error{
          position: absolute;
          right: 0;
          top: 0;
          color: #FF4D4F;
        }
      }
    }
    .add{
      text-align: center;
      margin-top: 20px;
    }
  }
  .el-main {
    height: 100%;
    overflow-y: auto;
    background-color: #F8F8F8;
    color: #333;
    .dataWrap{
      border-bottom: 1px #E6E6E6 solid;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    h3{
      font-size: 16px;
      font-weight: bold;
    }
    header{
      font-size: 14px;
      color: #999;
      border-bottom:1px solid rgba(230,230,230,1);
      padding: 10px;
      white-space: nowrap;
      span{
        display: inline-block;
        width: 180px;
      }
    }
    .blockWrap{
      /deep/.el-checkbox{
        // margin-right: 20px;
        width: 180px;
        // height: 30px;
        // line-height: 30px;
        
      }
      .empty{
        text-align: center;
        padding: 20px 0;
      }
      ul.first{
        border-bottom: 1px#E6E6E6 solid;
        padding: 10px 0;
        
      }
      
      ul.third{
        display: inline-block;
        margin-left:200px;
        // width: 200px;
        // &>li{
        //   display: inline-block;
        // }
      }
      ul.second{
        display: inline-block;
        // width: 780px;
        white-space: nowrap;
        // overflow: auto;
        margin-left: 180px;
      }
    }
  }
  /deep/.el-tree{
    background: transparent!important;
  }
  .el-icon-circle-plus,.el-icon-delete-solid{
    margin-left:10px
  }
</style>
