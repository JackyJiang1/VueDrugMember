/*
 * @Author: your name
 * @Date: 2020-03-24 10:08:15
 * @LastEditTime: 2020-12-23 14:20:38
 * @LastEditors: Please set LastEditors
 * @Description: 公用方法
 * @FilePath: \one\src\common\js\utils.js
 */


 //引⼊加密插件
 import { JSEncrypt } from 'jsencrypt'

 //截取字符串
export const sliceString = (str,start,length) => {
	if(!str) {
		return ''
	}
	if(start && !length){
		return str.substr(start)
	}
	return str.substr(start,length)
}


//字符串反转
export const reverseString = (str) => {
	return str ? str.split('').reverse().join('') : ''
}


//获取当前病种
export function getDisease() {
  return sessionStorage.getItem('sys'+window.aid.from)
}


 //数据加密⽅法
 export const EncryptData = (data) => {
  // 新建JSEncrypt对象
  let encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey('MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAi/52sB31O/1aBK72kQzcs9NskBDoJPgp1VVPHFn0BjyHRwNJ2V/MlmSO/WrsrtI+xqPCgTFd/h9BmXufQ4Q3AwIDAQABAkAY++DSrYYGnsBh9Zera1A4B5NoYpwLfP56RC9KMAOM2RwMqizZmAVmIdFl2gSYxkQxzn1T60kzJ1aq0KIN/zUBAiEA306hOO5Ky+xyELhYwKJtJrecVE3cWWc1K6ZrUHyxbjsCIQCgfVMmMsR6Obk+tvzuWecWIYf5h4sDOQww3j3nJVnl2QIgBGHAnCNg6Ft9aYKUi0MkrSvRL35Popl5259qX6vyt10CIAY3tL/3GYuOrvGSD0yAqSY/WFA/gxA15pYCFi3dUZVJAiEA127BTg/iYElzgIDzLJi32ZR/0/huE+nwCY9YwXrbW1w=')
   // 加密数据
   return encryptor.encrypt(data);
}


/**
 * @desc 对象暴力拷贝
 */
export const objectClone = (obj) =>{
	return JSON.parse(JSON.stringify(obj));
}


/**
 * @desc 日期格式化
 * @param str 时间字符串（留空则读取当前时间）
 * @param format 时间格式
 */
export const dateFormat = (str,format) => {
	if(str==='' || str===null || str===undefined){
		return ''
	}

	let dateStr = str=='now' ? new Date() : str
	let date = new Date(dateStr)
	if(date=='Invalid Date'){ //safari浏览器，转换 2020-07-03T01:43:17.000+0000 时间格式会出错
		let newDateStr = (dateStr.replace('T', ' ').replace(/-/g, '/'))
		date = new Date(newDateStr.substr(0,19))
		if(newDateStr.indexOf('.000+0000')>-1){ //时区偏差8个小时
			date.setHours(date.getHours() + 8)
		}
	}

	if(format=='timestamp'){	//时间戳
		return date.getTime()
	}

	let data = {
		yyyy : date.getFullYear(),	//年：4位
		yy: date.getFullYear().toString().substring(2),		//年：2位
	 	M: date.getMonth()+1,				//月：1位不补0
		d: date.getDate(),   				//日：1位不补0
		h: date.getHours(),  				//时
		m: date.getMinutes(), 			//分
		s: date.getSeconds() 				//秒
 	}

	data = {
		...data,
		MM: data.M <10 ? '0'+data.M : data.M,		//月：1位补0
		dd: data.d <10 ? '0'+data.d : data.d,		//日：1位补0
		hh: data.h <10 ? '0'+data.h : data.h,		//时：1位补0
		mm: data.m <10 ? '0'+data.m : data.m,		//分：1位补0
		ss: data.s <10 ? '0'+data.s : data.s,		//秒：1位补0
	}

 	format || (format = "yyyy-MM-dd hh:mm:ss");
 	return format.replace(/([a-z])(\1)*/ig,(m)=>{
		 return data[m]==undefined ? m : data[m]
		});
}


/**
 * @desc 获取随机uuid
 */
export const getUuid = () =>{
	let date = new Date().getTime();
	let uuid = 'xxxxxxxxxxxx9xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (date + Math.random() * 16) % 16 | 0;
		date = Math.floor(date / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}


/**
 * @desc 获取年龄（待完善）
 * @param strBirthday 出生日期
 */
export const getAge = (strBirthday)=> {
	if(!strBirthday){
		return ''
	}
	var returnAge;
	var strBirthdayArr = strBirthday.split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

	var d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();

	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {

			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge; //返回周岁年龄
}


/**
 * @desc 用于判断结束时间是否不小于开始时间
 * @param startDate 开始日期 yyyy-MM-dd
 * @param endDate  结束日期 yyyy-MM-dd
 * @param isNotQqual  不允许等于
 */
export const compareDate = (startDate, endDate, isNotQqual)=> {
	let _startDate = new Date(startDate).valueOf();
  let _endDate = new Date(endDate).valueOf();
  return isNotQqual ? _startDate < _endDate : _startDate <= _endDate
}


/**
 * @desc 正则校验
 * @param val 校验的值
 * @param reg 正则类型
 */
export const validate = (val,reg)=> {
	if(reg==undefined){
		return val != '' && val != undefined && val != null
	}
	let regs = {
		number: /^-?\d*\.?\d+$/,				//数字
		letter: /^[A-Za-z]+$/,					//字母
		chinese: /^[\u4e00-\u9fa5]+$/,	//中文
		mobile: /^1[3456789]\d{9}$/,		//手机
		idcard: /^\d{17}[0-9Xx]$/,			//身份证
		email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,	//邮箱
		positiveInteger: /(^[1-9]\d*$)/,	//正整数
		nonNegativeInteger: /^\d+$/,			//非负整数
	}

	if(!regs[reg]){
		return false
	}

	return regs[reg].test(val)
}


//获取上次选择的队列
export const getLastQueue = (obj)=> {
	if(sessionStorage.getItem('lastSelectedQueue')){
		return sessionStorage.getItem('lastSelectedQueue')
	}else{
		let queueId = ''
		if(obj && obj.length>0){
			queueId = obj[0].id
			sessionStorage.setItem('lastSelectedQueue',queueId);
		}
		return queueId
	}
  // if (!sessionStorage.getItem('lastSelectedQueue')) return obj[0].id;
  // let _lastSelectedQueue = sessionStorage.getItem('lastSelectedQueue');
  // for (let i = 0;i<obj.length;i++) {
  //   if (obj[i].id === _lastSelectedQueue) return obj[i].id;
  //   if (obj[i].children) {
  //     for (let j = 0;j<obj[i].children.length;j++) {
  //       if (obj[i].children[j].id === _lastSelectedQueue) {
  //         return _lastSelectedQueue
  //       }
  //     }
  //   }
  //   sessionStorage.setItem('lastSelectedQueue',obj[0].id);
  //   return obj[0].id
  // }
}


/**
 * @desc 获取性别
 */
export const getSex = (sex) =>{
  switch (sex) {
    case '男' : return '男';
    case '女' : return '女';
    case '1' : return '男';
    case '2' : return '女';
    case 1 : return '男';
    case 2 : return '女';
    default: return '未知'

  }
}


/**
 * @desc url根据key获取参数
 */
export const getURLValByKey = (url,key) => {
  let _url = url; //获取url中"?"符后的字串
  let value = ''
  if (_url && _url.indexOf("?") > -1) {
    let str = _url.split('?')[1];
    if (str && str.indexOf('&') > 0) {
      let strArr = str.split("&");
      for ( let i = 0; i < strArr.length; i++) {
        let _arr = strArr[i].split("=")
        if (_arr[0] == key) {
          value = _arr[1]
        }
      }
    } else if (str && str.indexOf('=') > 0) {
      let strArr = str.split("=");
      if (strArr[0] == key) {
        value = strArr[1]
      }
    }
  }
  return value;
}


/**
 * @desc 聊天根据url获取链接类型
 */
export const getChatUrlType = (url) => {
  let type = 2 // 默认 文字  // 消息类型 1-图片 2-文字 3-问卷 4-宣教 5-文件 6-医生名片
  if (url) {
    // 判断是否为图片
    let isPicture = false
    if (url.indexOf(".") > -1) {
      let strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|.svg|"
      let index = url.lastIndexOf(".");
      let strPostfix = url.substring(index,url.length) + '|';
      strPostfix = strPostfix.toLowerCase();
      if (strFilter.indexOf(strPostfix) > -1) {
        isPicture = true
      }
    }
    if (isPicture) {
      type = 1
    } else if (url.indexOf('fillQuestionnaire/')>-1 || url.indexOf('questionView?')>-1) {
      type = 3
    } else if (url.indexOf('/propagandaView')>-1) {
      type = 4
    } else {
      type = 5
    }
  }
  return type
}


/**
 * @desc 患者来源 文字
 */
export const getSourceText = (source) => {
  let text = source
  if (source) {
    if (String(source) == '1') {
      text = '单向问诊'
    } else if (String(source) == '2') {
      text = '扫码'
    }
  }
  return text
}

/**
 * @desc 患者计划状态 文字
 */
export const getPlanStatusText = (status) => {
  let text = status
  if (status) {
    if (String(status) == '0') {
      text = '无'
    } else if (String(status) == '1') {
      text = '已开始'
    }  else if (String(status) == '2') {
      text = '暂停'
    } else if (String(status) == '3') {
      text = '计划生成中'
    } else if (String(status) == '4') {
      text = '已完成'
    } else if (String(status) == '5') {
      text = '未开始'
    }
  }
  return text
}


/**
 * @desc 患者更多搜索 文字对应key
 */
export const getPatientKeyByText = (text) => {
  let key = text
  if (text) {
    if (text == '初始来源筛选') {
      key = 'sources'
    } else if (text == '医患关系') {
      key = 'relationships'
    } else if (text == '医生') {
      key = 'doctorIds'
    } else if (text == '归档计划') {
      key = 'closed'
    } else if (text == '标签') {
      key = 'tagNames'
    } else if (text == '计划状态') {
      key = 'planStatuses'
    } else if (text == '诊断') {
      key = 'diag'
    }
  }
  return key
}
/**
 * @desc 医患关系 文字
 */
export const getRelationshipText = (status) => {
  let text = status
  if (status) {
    if (String(status) == '1') {
      text = '已绑定'
    } else if (String(status) == '2') {
      text = '未绑定'
    } else if (String(status) == '3') {
      text = '已移除'
    }
  }
  return text
}
/**
 * @desc 弹框编辑、预览、新增标题
 */
export const getDialogEditTitle = (type,title) => {
  let str = title + '新增'
  if (type == 'edit') {
    str = title + '编辑'
  } else if (type == 'preview') {
    str = title + '详情'
  }
  return str
}


/**
 * @desc 获取文件真实地址（通过config配置文件服务地址，解决内外网访问不互通的问题）
 * @param url 文件地址（带服务地址和不带服务地址均可）
 */
export function getFileUrl(url) {
	let newUrl = url
	let fileUrl = ''
	if(window.aid && window.aid.fileUrl){
		fileUrl = window.aid.fileUrl
		if(fileUrl.charAt(fileUrl.length-1)!=='/'){
			fileUrl += '/'
		}
		if(url){
			let idx = url.indexOf('group')
			newUrl = url.indexOf('http')==0 ? fileUrl+url.substr(idx) : fileUrl+url
		}
	}
	return newUrl
}