/*
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2020-10-19 16:38:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-03 12:15:24
 */
// state
const state = {
  departmentArr: [], // 科室
  isScrolling: false,//aid-main元素是否在滚动
}

// getters
const getters = {

}

// actions
const actions = {
  setDepartmentArr({commit}, data){
    commit('setDepartmentArr', data);
  },
  setIsScrolling({commit}, data){
    commit('setIsScrolling', data);
  },
}

// mutations
const mutations = {
  setDepartmentArr (state,data){
    state.departmentArr = data;
  },
  setIsScrolling (state,data){
    state.isScrolling = data;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
