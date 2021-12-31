/*
 * @Author: HHL
 * @Date: 2020-04-20 23:32:20
 * @LastEditTime: 2020-06-02 16:43:25
 * @Description: 问卷编辑数据
 */

// state
const state = {
  status: 0,            //0未触发 1保存中 2保存成功 3保存失败
  questionType: null,   //题目类型
  questionnaire: null,  //问卷信息
  questionList: [],     //问题列表
  focusObj: null,       //聚焦的问题
  optionObj: null,      //聚焦的选项
  tempQuestion: null,   //新增问题
  focusGroupIndex: -1,  //聚焦的问题组下标
  focusIndex: -1,       //聚焦的问题下标
  saveStatus: false,    //保存状态
  limit: false,         //是否允许操作
}

// getters
const getters = {
  sortList: function(state){
    return state.questionList.map(item=>{
      let list = []
      if(item.type=='group'){
        list = item.list.map(subItem=>{
          return {
            id: subItem.id,
            sort: subItem.sort
          }
        })
      }
      return {
        id: item.id,
        sort: item.sort,
        list: list
      }
    })
  }
}

// actions
const actions = {
  setStatus({commit}, data){
    commit('setStatus', data)
    if(data==2 || data==3){
      setTimeout(()=>{
        commit('setStatus', 0)
      },3000)
    }
  },
  setQuestionType({commit},data){
    commit('setQuestionType', data)
  },
  setQuestionnaire({commit}, data){
    commit('setQuestionnaire', data)
  },
  updateSort({commit}, data){
    commit('updateSort', data)
  },
  delQuestion({commit},data){
    commit('delQuestion', data)
  },
  updateQuestionId({commit},data){
    commit('updateQuestionId', data)
  },
  cloneQuestion({commit},data){
    commit('cloneQuestion', data)
  },
  setFocusObj({commit},data){
    commit('setFocusObj', data)
  },
  setTempQuestion({commit},data){
    commit('setTempQuestion', data)
  },
  updateQuestionIds({commit},data){
    commit('updateQuestionIds', data)
  },
  setSaveStatus({commit},data){
    commit('setSaveStatus', data)
  },
  setLimit({commit},data){
    commit('setLimit', data)
  },
}

// mutations
const mutations = {
  setStatus(state,data){
    state.status = data;
  },
  //基础问题类型
  setQuestionType(state,data){
    state.questionType = data;
  },
  setQuestionnaire(state,data){
    state.questionnaire = data;
    state.questionList = data.content ? data.content : []
  },
  //更新排序
  updateSort(state,data) {
    state.questionList.forEach((item,index)=>{
      item.sort = index
      item.groupId = '0'
      if(item.id=='' || item.id==undefined){
        state.tempQuestion = item
      }
      if(item.type=='group'){
        item.list.forEach((subItem,subIndex)=>{
          subItem.groupId = item.id
          subItem.sort = subIndex
          //data为true的时候，只记录到最外层
          if((subItem.id=='' || subItem.id==undefined) && data!=true){
            state.tempQuestion = subItem
          }
        })
      }
    })
  },
  //删除问题
  delQuestion(state,data){
    if(data[1]==-1){
      state.questionList.splice(data[0],1)
    }else{
      state.questionList[data[1]].list.splice(data[0],1)
    }
  },
  //更新问题ID
  updateQuestionId(state,data){
    if(data[1]==-1){
      state.questionList[data[0]].id = data[2]
    }else{
      state.questionList[data[1]].list[data[0]].id = data[2]
    }
  },
  //更新问题id（临时：待优化）
  updateQuestionIds(state,data) {
    // console.log(state.questionList)
    // console.log(data)
    state.questionList.forEach((item,index)=>{
      let idx = data.flagList.indexOf(item.timeFlag)
      if(idx>-1){//item.timeFlag==data.timeFlag
        item.id = data.questionList[idx].id
        if(item.type=='group'){
          item.list.forEach((subItem,subIndex)=>{
            subItem.id = data.questionList[idx].list[subIndex].id
          })
        }
      }
      if(item.type=='group'){
        item.list.forEach(subItem=>{
          let subIdx = data.flagList.indexOf(subItem.timeFlag)
          if(subIdx>-1){//subItem.timeFlag==data.timeFlag
            subItem.id = data.questionList[subIdx].id
          }
        })
      }
    })

  },
  //拷贝问题(组)
  cloneQuestion(state,data){
    //console.log(data.question)
    if(data.isTemplate){ //从模板引入
      state.questionList = state.questionList.concat(data.questionList)
    }else{  //普通拷贝
      if(data.groupIndex==-1){
        state.questionList.splice(data.index+1,0,data.questionList[0])
      }else{
        state.questionList[data.groupIndex].list.splice(data.index+1,0,data.questionList[0])
      }
    }
  },
  //设置
  setFocusObj(state,data) {
    if(!data){
      state.focusObj = null
      state.optionObj = null
      state.focusGroupIndex = -1
      state.focusIndex = -1
      state.optionIndex = -1
    }else{
      if(data.option){ //选项
        state.focusGroupIndex = data.groupIndex
        state.focusIndex = data.index
        state.focusObj = data.obj
        state.optionObj = data.option
        state.optionIndex = data.optionIndex
      }else{ //问题
        state.focusGroupIndex = data.groupIndex
        state.focusIndex = data.index
        state.focusObj = data.obj
        state.optionObj = null
        state.optionIndex = -1
      }
    }
  },
  //设置临时文件（后面跟排序合并）
  setTempQuestion({commit},data){
    state.questionList.forEach((item,index)=>{
      item.sort = index
      item.groupId = '0'
      if(item.id==data.id){
        state.tempQuestion = item
      }
      if(item.type=='group'){
        item.list.forEach((subItem,subIndex)=>{
          subItem.groupId = item.id
          subItem.sort = subIndex
          //data为true的时候，只记录到最外层
          if(subItem.id==data.id){
            state.tempQuestion = subItem
          }
        })
      }
    })
  },
  //更改保存状态
  setSaveStatus({commit},data){
    state.saveStatus = data ? true: false
  },
  //更改限制状态
  setLimit({commit},data){
    state.limit = data ? true: false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
