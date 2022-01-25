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

//let fileUploadBaseUrl = 'http://test.forier.cn:8009/TTDemandUpload/upload/';

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
  DeleteAttachment: `${baseUrl}/api/Common/DeleteAttachment`,
  DeleteAttachmentBySourceIdAndSourceItem: `${baseUrl}/api/Common/DeleteAttachmentBySourceIdAndSourceItem`,
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
  ActiveDrugMember: `${baseUrl}/api/DrugMember/ActiveDrugMember`,

  //activity相关api
  GetDrugActivityList: `${baseUrl}/api/DrugActivity/GetDrugActivityList`,
  AddDrugActivity: `${baseUrl}/api/DrugActivity/AddDrugActivity`,
  UpdateDrugActivity: `${baseUrl}/api/DrugActivity/UpdateDrugActivity`,
  DeleteDrugActivity: `${baseUrl}/api/DrugActivity/DeleteDrugActivity`,
  ExportDrugActivityList: `${baseUrl}/api/DrugActivity/ExportDrugActivityList`,

  //artical相关api
  GetDrugArticalList: `${baseUrl}/api/DrugPublishCategory/GetDrugArticalList`,
  AddDrugArtical: `${baseUrl}/api/DrugPublishCategory/AddDrugArtical`,
  UpdateDrugArtical: `${baseUrl}/api/DrugPublishCategory/UpdateDrugArtical`,
  DeleteDrugArtical: `${baseUrl}/api/DrugPublishCategory/DeleteDrugArtical`,
  ExportDrugArticalList: `${baseUrl}/api/DrugPublishCategory/ExportDrugArticalList`,

  //scoremall相关api
  GetDrugGiftList: `${baseUrl}/api/DrugScoreManage/GetDrugGiftList`,
  AddDrugGift: `${baseUrl}/api/DrugScoreManage/AddDrugGift`,
  UpdateDrugGift: `${baseUrl}/api/DrugScoreManage/updDrugGift`,
  DeleteDrugGift: `${baseUrl}/api/DrugScoreManage/delDrugGift`,
  ExportDrugGiftList: `${baseUrl}/api/DrugScoreManage/ExportDrugGiftList`,
  GetMemberScoreReq: `${baseUrl}/api/DrugScoreManage/GetMemberScoreReq`,
  ApproveMemberGiftReq: `${baseUrl}/api/DrugScoreManage/ApproveMemberGiftReq`,
  UpdateGiftFreightNo: `${baseUrl}/api/DrugScoreManage/UpdateGiftFreightNo`,

  //scorerequest相关api
  GetScoreReq: `${baseUrl}/api/DrugMember/GetScoreReq`,
  ScoreApproveMemberInfo: `${baseUrl}/api/DrugMember/ScoreApproveMemberInfo`,

  //开口说相关api
  GetDrugStudyMaterialList: `${baseUrl}/api/DrugPublishCategory/GetDrugStudyMaterialList`,
  AddDrugStudyMaterial: `${baseUrl}/api/DrugPublishCategory/AddDrugStudyMaterial`,
  UpdateDrugStudyMaterial: `${baseUrl}/api/DrugPublishCategory/UpdateDrugStudyMaterial`,
  DeleteDrugStudyMaterial: `${baseUrl}/api/DrugPublishCategory/DeleteDrugStudyMaterial`,
  GetDrugStudyMemberList: `${baseUrl}/api/DrugPublishCategory/GetDrugStudyMemberList`,
  ApproveDrugStudyResult: `${baseUrl}/api/DrugPublishCategory/ApproveDrugStudyResult`,

  //问卷调查相关api
  GetDrugQuestionList: `${baseUrl}/api/DrugPublishCategory/getQuestion`,
  AddDrugQuestion: `${baseUrl}/api/DrugPublishCategory/addQuestion`,
  UpdateDrugQuestion: `${baseUrl}/api/DrugPublishCategory/updateQuestion`,
  DeleteDrugQuestion: `${baseUrl}/api/DrugPublishCategory/DeleteQuestion`,

  //memberscore相关api
  GetDrugMemberScoreList: `${baseUrl}/api/DrugMember/GetDrugMemberScoreList`,
  ExportDrugMemberScoreList: `${baseUrl}/api/DrugMember/ExportDrugMemberScoreList`,
  //memberactivity相关api
  GetDrugMemberActivityList: `${baseUrl}/api/DrugActivity/GetDrugMemberActivityList`,
  ExportDrugMemberActivityList: `${baseUrl}/api/DrugActivity/ExportDrugMemberActivityList`,


}

export default api