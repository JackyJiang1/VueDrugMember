<template>
  <div class="container inner-center">
    <el-dialog
      title="Register"
      :visible.sync="dialogVisible"
      width="30%">
      <span>please complete all required fields to create your account</span>
      <el-form ref="form" :model="form" label-width="180px" style="margin-top:20px">
        <el-form-item label="Register No">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
        <el-form-item label="User name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Friendly name">
          <el-input v-model="form.name2"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.Email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm password">
          <el-input v-model="form.password2"></el-input>
        </el-form-item>
        <el-form-item label="Security question">
          <el-select v-model="form.question">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Security answer">
          <el-input v-model="form.answer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Ok</el-button>
        <el-button type="info" @click="dialogVisible = false">Back to Login</el-button>
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
