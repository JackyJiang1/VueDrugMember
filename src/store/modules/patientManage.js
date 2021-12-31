// state
const state = {
  activeTabName: null,//患者管理 tab值
  manageDetailTabName: 'healthy', // 患者计划
  patientDetailCurrentPlan: null, // 患者详情 当前计划
}

// actions
const actions = {
  updateTabName({commit}, name) {
    commit('updateTabName', name)
  },
  updateManageDetailTabName({commit}, name) {
    commit('updateManageDetailTabName', name)
  },
  updatePatientDetailCurrentPlan({commit}, name) {
    commit('updatePatientDetailCurrentPlan', name)
  }
}

// mutations
const mutations = {
  updateTabName(state, name) {
    state.activeTabName = name
  },
  updateManageDetailTabName(state, name) {
    state.manageDetailTabName = name
  },
  updatePatientDetailCurrentPlan(state, data) {
    state.patientDetailCurrentPlan = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
