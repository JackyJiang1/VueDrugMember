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



  //公共api
  GetNewGuid: `${baseUrl}/api/Common/GetNewGuid`,
  UploadFile: `${baseUrl}/api/Common/UploadFile`,
  GetProvinceList: `${baseUrl}/api/DrugShop/GetProvinceList`,
  GetCityList: `${baseUrl}/api/DrugShop/GetCityList`,
  GetAreaList: `${baseUrl}/api/DrugShop/GetAreaList`,
  GetSysDistrictList: `${baseUrl}/api/DrugShop/GetSysDistrictList`,
  

  GetUserMenu: `${baseUrl}/api/Auth/GetUserMenu`,
  //shop相关api
  GetDrugShopList: `${baseUrl}/api/DrugShop/GetDrugShopList`,
  AddDrugShop: `${baseUrl}/api/DrugShop/AddDrugShop`,
  UpdateDrugShop: `${baseUrl}/api/DrugShop/UpdateDrugShop`,
  DeleteDrugShop: `${baseUrl}/api/DrugShop/DeleteDrugShop`,
  ExportDrugShopList: `${baseUrl}/Shop/ExportDrugShopList`,

  //member相关api
  GetDrugMemberList: `${baseUrl}/api/DrugMember/GetDrugMemberList`,
  AddDrugMember: `${baseUrl}/api/DrugMember/AddDrugMember`,
  UpdateDrugMember: `${baseUrl}/api/DrugMember/UpdateDrugMember`,
  DeleteDrugMember: `${baseUrl}/api/DrugMember/DeleteDrugMember`,
  ExportDrugMemberList: `${baseUrl}/api/DrugMember/ExportDrugMemberList`,

  //activity相关api
  GetDrugActivityList: `${baseUrl}/api/Activity/GetDrugActivityList`,
  AddDrugActivity: `${baseUrl}/api/Activity/AddDrugActivity`,
  UpdateDrugActivity: `${baseUrl}/api/Activity/UpdateDrugActivity`,
  DeleteDrugActivity: `${baseUrl}/api/Activity/DeleteDrugActivity`,
  ExportDrugActivityList: `${baseUrl}/api/Activity/ExportDrugActivityList`,

  //artical相关api
  GetDrugArticalList: `${baseUrl}/api/Artical/GetDrugArticalList`,
  AddDrugArtical: `${baseUrl}/api/Artical/AddDrugArtical`,
  UpdateDrugArtical: `${baseUrl}/api/Artical/UpdateDrugArtical`,
  DeleteDrugArtical: `${baseUrl}/api/Artical/DeleteDrugArtical`,
  ExportDrugArticalList: `${baseUrl}/api/Artical/ExportDrugArticalList`,

  //memberscore相关api
  GetDrugMemberScoreList: `${baseUrl}/api/Member/GetDrugMemberScoreList`,
  ExportDrugMemberScoreList: `${baseUrl}/api/Member/ExportDrugMemberScoreList`,
  //memberactivity相关api
  GetDrugMemberActivityList: `${baseUrl}/api/Activity/GetDrugMemberActivityList`,
  ExportDrugMemberActivityList: `${baseUrl}/api/Activity/ExportDrugMemberActivityList`,


}

export default api