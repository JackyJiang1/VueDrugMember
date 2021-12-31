/*
 * @Author: HHL
 * @Date: 2020-05-11 19:43:23
 * @LastEditTime: 2020-07-21 10:31:37
 * @Description: 问题填写
 */

// state
const state = {
  showCheckbox: false,  //是否显示选择题目复选框
  checkIdList: [],      //选择的题目id
  questionList: [],     //题目列表
  errorList: [],
  focusQuestion: {},
  copyVal: '', //全息引用值
  editStatus: true, //编辑状态
}

// getters
const getters = {
  
}

// actions
const actions = {
  toggleShow({commit},data){
    commit('toggleShow', data)
  },
  toggleCheck({commit},data){
    commit('toggleCheck', data)
  },
  setQuestionList({commit},data){
    commit('setQuestionList', data)
  },
  delError({commit},data){
    commit('delError', data)
  },
  addError({commit},data){
    commit('addError', data)
  },
  setQuestion({commit},data){
    commit('setQuestion', data)
  },
  setCopyVal({commit},data){
    commit('setCopyVal', data)
  },
  setEditStatus({commit},data){
    commit('setEditStatus', data)
  }
}

// mutations
const mutations = {
  toggleShow(state,data){
    state.showCheckbox = data
  },
  toggleCheck(state,data){
    console.log(data)
    // let idx = state.checkIdList.indexOf(data)
    // if(idx>-1){
    //   state.checkIdList.splice(idx,1)
    // }else{
    //   state.checkIdList.push(data)
    // }
  },
  setQuestionList(state,data){
    state.questionList = data
  },
  delError(state,data){
    if(data){
      let idx = state.errorList.findIndex(item=>item.id==data)
      state.errorList.splice(idx,1)
    }else{
      state.errorList = []
    }
  },
  addError(state,data){
    if(data && data.id){
      state.errorList.push(data)
    }
  },
  setQuestion(state,data){
    state.focusQuestion = data ? data : {}
  },
  //设置全息引用值
  setCopyVal(state,data){
    state.copyVal = data ? data : ''
  },
  //设置问卷编辑状态
  setEditStatus(state,data) {
    state.editStatus = data ? true : false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
