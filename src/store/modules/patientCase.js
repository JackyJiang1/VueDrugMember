/*
 * @Author: lacy
 * @Date: 2020-05-08 15:38:51
 * @LastEditTime: 2020-12-30 15:13:25
 * @LastEditors: Please set LastEditors
 * @Description: 病例中心数据共享
 */

// state
const state = {
  personId: null,//患者id
  tabIndex: 'hzxx',//全息 tab值
  patientInfo: {
    attrs: [],
    data: []
  }, //患者基本信息
  visitInfo:{
    attrs: [],
    data: []
  }, //患者就诊信息
  fileInfo: null,//附件列表
}

// actions
const actions = {
  updateTabIndex({commit}, index) {
    commit('updateTabIndex', index)
  },
  updatePersonId({commit}, index) {
    commit('updatePersonId', index)
  },
  updatePatientInfo({commit}, info) {
    commit('updatePatientInfo', info)
  },
  updateVisitInfo({commit}, info) {
    commit('updateVisitInfo', info)
  },
  updateFileInfo({commit}, info) {
    commit('updateFileInfo', info)
  },
}

// mutations
const mutations = {
  updateTabIndex(state, index) {
    state.tabIndex = index;
  },
  updatePersonId(state, id) {
    state.personId = id;
    window.sessionStorage.setItem('personId', id);
  },
  updatePatientInfo(state, info) {
    state.patientInfo = info;
  }, 
  updateVisitInfo(state, info) {
    state.visitInfo = info;
  },
  updateFileInfo(state, info) {
    state.fileInfo = info;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
