/*
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2021-02-03 14:19:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-24 10:28:41
 */

let baseUrl = window.aid.baseUrl;
// let baseUrl = '';
let api = {   
  login: `${baseUrl}/api/Auth/Login`,
  //login: `${baseUrl}/Authorization/Login`,
  GetRole: `${baseUrl}/api/Auth/GetRole`,
  //GetPermissionRole: `${baseUrl}/Authorization/GetPermissionRole`,
  GetMenuLeaf: `${baseUrl}/api/Auth/GetMenuLeaf`,

}

export default api