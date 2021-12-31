/*
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2021-02-19 10:23:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-13 17:08:58
 */
let baseUrl = window.aid.baseUrl;
// let baseUrl = '';

let api = {   
  // GetPayment: `${baseUrl}/TTExternalWebApi/VendorPortal/GetPayments`,
  // GetPOAcknowledgements: `${baseUrl}/TTExternalWebApi/VendorPortal/GetPOAcknowledgements`,
  // UpdateAcknowledgements: `${baseUrl}/TTExternalWebApi/VendorPortal/UpdateAcknowledgements`,
  // UpdateAcknowledgementsByExcel: `${baseUrl}/TTExternalWebApi/VendorPortal/UpdateAcknowledgementsByExcel`,
  // GetPaymentDetails: `${baseUrl}/TTExternalWebApi/VendorPortal/GetPaymentDetails`,
  // GetNewMROID: `${baseUrl}/TTExternalWebApi/VendorPortal/GetNewMROID`,
  // GetMRODetailList: `${baseUrl}/TTExternalWebApi/VendorPortal/GetMRODetailList`,
  // GetMROSuggestPriceList: `${baseUrl}/TTExternalWebApi/VendorPortal/GetMROSuggestPriceList`,
  // GetMROHeaderList: `${baseUrl}/TTExternalWebApi/VendorPortal/GetMROHeaderList`,
  // GetUserMenu: `${baseUrl}/TTExternalWebApi/Authorization/GetUserMenu`,
  // GetOpenOrders: `${baseUrl}/TTExternalWebApi/VendorPortal/GetOpenOrders`,
  // ExportPOAcknowledgements: `${baseUrl}/TTExternalWebApi/VendorPortal/ExportPOAcknowledgements`,
  // getCategory: `${baseUrl}/TTExternalWebApi/VendorPortal/GetMROCategoryForComboBox?q=`,
  // UpdateMROHeader:`${baseUrl}/TTExternalWebApi/VendorPortal/UpdateMROHeader`,
  // DeleteMROHeader:`${baseUrl}/TTExternalWebApi/VendorPortal/DeleteMROHeader`,
  // AddMROHeader:`${baseUrl}/TTExternalWebApi/VendorPortal/AddMROHeader`,

  // AddMRODetail:`${baseUrl}/TTExternalWebApi/VendorPortal/AddMRODetail`,
  // DeleteMRODetail:`${baseUrl}/TTExternalWebApi/VendorPortal/DeleteMRODetail`,
  // UpdateMRODetail:`${baseUrl}/TTExternalWebApi/VendorPortal/UpdateMRODetail`,

  // AddMROSuggest:`${baseUrl}/TTExternalWebApi/VendorPortal/AddMROSuggest`,
  // UpdateMROSuggest:`${baseUrl}/TTExternalWebApi/VendorPortal/UpdateMROSuggest`,
  // DeleteMROSuggest:`${baseUrl}/TTExternalWebApi/VendorPortal/DeleteMROSuggest`,




  GetUserMenu: `${baseUrl}/api/Auth/GetUserMenu`,
  //shop相关api
  GetDrugShopList: `${baseUrl}/api/Shop/GetDrugShopList`,
  ExportDrugShopList: `${baseUrl}/Shop/ExportDrugShopList`,
  //member相关api
  GetDrugMemberList: `${baseUrl}/api/Member/GetDrugMemberList`,
  AddDrugMember: `${baseUrl}/api/Member/AddDrugMember`,
  UpdateDrugMember: `${baseUrl}/api/Member/UpdateDrugMember`,
  DeleteDrugMember: `${baseUrl}/api/Member/DeleteDrugMember`,
  ExportDrugMemberList: `${baseUrl}/api/Member/ExportDrugMemberList`,
  
  GetDrugActivityList: `${baseUrl}/api/Activity/GetDrugActivityList`,
  ExportDrugActivityList: `${baseUrl}/api/Activity/ExportDrugActivityList`,
  GetDrugMemberScoreList: `${baseUrl}/Member/GetDrugMemberScoreList`,
  ExportDrugMemberScoreList: `${baseUrl}/Member/ExportDrugMemberScoreList`,
  GetDrugMemberActivityList: `${baseUrl}/Activity/GetDrugMemberActivityList`,
  ExportDrugMemberActivityList: `${baseUrl}/Activity/ExportDrugMemberActivityList`,


}

export default api