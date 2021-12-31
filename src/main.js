/*
 * @Author: your name
 * @Date: 2020-03-24 10:08:15
 * @LastEditTime: 2021-02-22 09:29:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/scss/theme.scss'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import api from './common/api/index'
import http from './common/js/http'
import * as utils from "./common/js/utils"
import permission from "./common/js/permission"
import {Message} from 'element-ui';

//富文本组件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);
// import Chat from 'jwchat'

Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(Chat)
//挂载全局接口名称
Vue.prototype.$api = api;

//挂载封装的请求方法
Vue.prototype.$http = http;

//挂载全局通用方法
Vue.prototype.$util = utils;

// Vue.prototype.$x2js = new x2js();

//挂载全局权限方法
Vue.prototype.$permission = permission;


//页面进度条 & 登录认证
router.beforeEach((to,from,next) => {
  NProgress.start();
  let token = window.sessionStorage.getItem('token');
  if(to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path == '/login') {
    document.cookie = 'token=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    sessionStorage.clear();
    localStorage.clear();
    return next();
  }
  if (from.path == '/login') {
    return next();
  }
  if (!token && to.path != '/login') {
    next({ path: '/login' });
  }
  
  next();
})

router.afterEach(() => {
  NProgress.done();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
