/*
 * @Descripttion: 权限 统一方法
 * @version: 
 * @Author: Lacy
 * @Date: 2020-05-13 10:21:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-13 19:04:32
 */

import router from '../../router'

/**
 * @description: 庞判断是否有权限 并做相应隐藏或显示
 * @param {string}  pageName 页面名称 
 * @param {string}  permissionName 权限名称 
 * @return: boolean 
 */
const permission = (pageName,permissionName) => {
  const allPermission = JSON.parse(sessionStorage.getItem('permission')); //用户项目的所有权限
  if (!allPermission) return router.replace({path: "/login"});
  if (!allPermission[pageName]) return false; //整个页面无权限
  if (permissionName) { //判断权限
    return !(allPermission[pageName].indexOf(permissionName) < 0)
  } else { //仅判断页面
    return true
  }
}

export default permission