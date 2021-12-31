<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2021-02-22 16:58:11
 * @LastEditors: 
 * @LastEditTime: 2021-02-22 17:00:26
-->
<template>
  <div class="container inner-center">
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="20%">
      <el-form ref="form" :model="form" label-width="140px" style="margin-top:20px">
        <el-form-item label="User name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Old Password">
          <el-input v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="New password">
          <el-input v-model="form.password1"></el-input>
        </el-form-item>
        <el-form-item label="Confirm password">
          <el-input v-model="form.password2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data () {
    return {
      form: {
        no: '',
        name: '',
        name2: '',
        Email: '',
        password: '',
        password1: '',
        password2: '',
        question: '',
        answer: ''
      },
      dialogVisible: false
	  }
  },
  props: ['show'],
  mounted() {
  },
  methods: {
  },
  watch: {
    show(val) {
      val && (this.dialogVisible = val)
    },
    dialogVisible(val) {
      !val && (this.$emit('setshow',false))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
