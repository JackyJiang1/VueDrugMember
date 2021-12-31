/*
 * @Author: your name
 * @Date: 2020-03-24 10:08:15
 * @LastEditTime: 2020-06-28 10:43:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tagsView,
    permission
  }
})

