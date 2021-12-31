/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 09:48:13
 * @LastEditTime: 2021-01-07 17:46:03
 * @LastEditors: Please set LastEditors
 */
// state
const state = {
  computing:false,//正在计算节点
  searchCondition: null, //搜索条件
  searchInfo: null, //搜索结果
  loadCollect: null, //加载收藏检索
  caseCount:null,//搜索出来的病例条数
  patientNumber:null,//总患者数
  dimension:1,//就诊维度 患者维度

  multiDimensionSearchSetType: null, // 是否是多维度检索，是：历史查询记录弹框， 否：高级检索和条件树弹框
  multiDimensionCodeCheckList: null, // 科研回顾检索数据

  shouldConditionTree:{//纳入标准
    occur: 'must',
    childrenQueryConditions: [],
    queryConditions: [],
    timestamp: null
  },
  mustNotConditionTree:{
    occur: 'mustNot',
    childrenQueryConditions:[],
    queryConditions: [],
    timestamp: null,
    searchConditionsQueries: []
  },//排除标准
  lastTreeMap: {},//存放最后一个组件
  kpiValueType: 'original',//检索范围
  casePage:1,//病历中心列表页码
  searchWay: 'datasource'
}

// getters
const getters = {

}

// actions
const actions = {
  updateSearchWay({commit}, data) {
    commit('updateSearchWay', data)
  },
  updateCurrentPage({commit}, index) {
    commit('updateCurrentPage', index)
  },
  setKpiValueType({commit}, data){
    console.log(data)
    commit('setKpiValueType', data);
  },
  setComputing({commit}, data){
    commit('setComputing', data);
  },
  setTreeConditionVuex({commit}, data){
      commit('setTreeConditionVuex', data);
  },
  setCondition({commit}, data){
      commit('setCondition', data);
  },
  setSearchInfo({commit}, data){
      commit('setSearchInfo', data);
  },
  updateCollect({commit}){
      commit('updateCollect');
  },
  setCaseCount({commit},data){
      commit('setCaseCount',data);
  },
  setPatientNumber({commit},data){
      commit('setPatientNumber',data);
  },
  setDimension({commit},data){
      commit('setDimension',data);
  },
  setTreeConditionMust({commit},data){
      commit('setTreeConditionMust',data);
  },
  setTreeConditionMustNo({commit},data){
      commit('setTreeConditionMustNo',data);
  },
  setTreeConditionMustSend({commit},data){
      commit('setTreeConditionMustSend',data);
  },
  setTreeConditionMustNoSend({commit},data){
      commit('setTreeConditionMustNoSend',data);
  },
  setLastTreeMap({commit},data){
      commit('setLastTreeMap',data);
  },
    setMultiDimensionSearchSetType({commit},data){
        commit('setMultiDimensionSearchSetType',data);
    },
    setMultiDimensionCodeCheckList({commit},data){
        commit('setMultiDimensionCodeCheckList',data);
    },
}

// mutations
const mutations = {
  updateSearchWay(state,data){
    state.searchWay = data;
  },
  updateCurrentPage(state, index) {
    state.casePage = index;
  },
  setKpiValueType(state,data){
    state.kpiValueType = data;
  },
  setComputing(state,data){
      state.computing = data;
  },
  setCondition(state,data){
      state.searchCondition = data;
  },
  setSearchInfo(state,data){
      state.searchInfo = data;
  },
  updateCollect(state,data){
      state.loadCollect = new Date().getTime();
  },
  setCaseCount(state,data){
      state.caseCount = data;
  },
  setPatientNumber(state,data){
      state.patientNumber = data;
  },
  setDimension(state,data){
      state.dimension = data;
  },
  setTreeConditionMust(state,data){
      state.shouldConditionTree = data;
  },
  setTreeConditionMustNo(state,data){
      state.mustNotConditionTree = data;
  },
  setTreeConditionMustSend(state,data){
      state.shouldConditionTreeSend = data;
  },
  setTreeConditionMustNoSend(state,data){
      state.mustNotConditionTreeSend = data;
  },
  setLastTreeMap(state,data){ //data = {key:'',value:''}
      state.lastTreeMap[data.key] = data.value;
      // //console.log()(state.lastTreeMap)
  },
    setMultiDimensionSearchSetType(state,data){
        state.multiDimensionSearchSetType = data;
    },
    setMultiDimensionCodeCheckList(state,data){
        state.multiDimensionCodeCheckList = data;
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
