/*
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2020-06-19 10:14:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-15 18:26:16
 */ 
// state
const state = {
  assessNeed: null,//是否需要评估问卷
  assessList: [],//已选的评估问卷
  signNeed: 0,//是否需要签署知情同意书
  signHtml: null,//知情同意书内容
  templateId: '',//知情同意书模板id
}

// getters
const getters = {
    
}

// actions
const actions = {
  setassessNeed({commit},data){
    commit('setassessNeed', data)
  },
  setassessList({commit},data){
    commit('setassessList', data)
  },
  setsignNeed({commit},data){
    commit('setsignNeed', data)
  },
  setsignHtml({commit},data){
    commit('setsignHtml', data)
  },
  setTemplateId({commit},data){
    commit('setTemplateId', data)
  },
}

// mutations
const mutations = {
  setassessNeed(state,data){
    state.assessNeed = data
  },
  setassessList(state,data){
    state.assessList = data
  },
  setsignNeed(state,data){
    state.signNeed = data
  },
  setsignHtml(state,data){
    state.signHtml = data
  },
  setTemplateId(state,data){
    state.templateId = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
