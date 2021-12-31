export default {
  //生成uuid
  getUuid() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  //获取字节长度
  GetLength: function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0,
      len = str.length,
      charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128)
        realLength += 1;
      else
        realLength += 2;
    }
    return realLength;
  },
  /*
   * param str 要截取的字符串
   * param L 要截取的字节长度，注意是字节不是字符，一个汉字两个字节
   * return 截取后的字符串
   */
  cutStr(str, L) {
    var result = '',
      strlen = str.length, // 字符串长度
      chrlen = str.replace(/[^\x00-\xff]/g, '**').length; // 字节长度

    if (chrlen <= L) {
      return str;
    }

    for (var i = 0, j = 0; i < strlen; i++) {
      var chr = str.charAt(i);
      if (/[\x00-\xff]/.test(chr)) {
        j++; // ascii码为0-255，一个字符就是一个字节的长度
      } else {
        j += 2; // ascii码为0-255以外，一个字符就是两个字节的长度
      }
      if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
        result += chr;
      } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
        return result;
      }
    }
  },
  date2str: function (data, type) {
    data = data || new Date();

    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (type == '1') {
      return "" + year + '年' + month + '月' + day + '日';
    }

    return "" + year + '-' + month + '-' + day;
  },
  dateFormate(data, type) {
    data = new Date(data);
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (type == '1') {
      return "" + month + '月' + day + '日';
    } else if (type === '2') {
      return "" + year + '年' + month + '月' + day + '日';
    }
    return "" + year + '-' + month + '-' + day;
  },
  formatDateToString: function (date) {
    if (date == null) {
      date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return "" + year + month + day;
  },
  formateDateAndTimeToString: function (date) {
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var msecs = date.getMilliseconds();
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    if (msecs < 10) secs = "0" + msecs;
    return this.formatDateToString(date) + "" + hours + mins + secs + msecs;
  },
  //滚动条偏移量
  scrollTopToDom(scrollDom, firstDom, scrollToDom) {
    var topOffsetPx = firstDom.offsetTop;
    var domOffsetPx = scrollToDom.offsetTop;
    // 目标元素相对于文档偏移量 - 第一个元素相对于文档偏移量 就是滚动条要滚动的距离
    var scrollTopPx = domOffsetPx - topOffsetPx;
    scrollDom.scrollTop = scrollTopPx; // 如果不用动画，也可以用这个进行直接定位
  },
  //对象或数组深度克隆
  deepClone(origin, target) {

    var toStr = Object.prototype.toString,
      arrStr = '[object Array]',
      objStr = '[object Object]';
    if (!target) {
      if (toStr.call(origin) == arrStr) {
        target = [];
      } else if (toStr.call(origin) == objStr) {
        target = {};
      }
    }
    for (var prop in origin) {
      if (origin.hasOwnProperty(prop)) {
        if (origin[prop] !== null && typeof origin[prop] == 'object') {
          target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
          this.deepClone(origin[prop], target[prop])
        } else {
          target[prop] = origin[prop];
        }
      }
    }

    return target;

  },

  //根据出生日期算出年龄
  jsGetAge(strBirthday) {
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
    // returnAge=returnAge==0?1:returnAge;
    return returnAge; //返回周岁年龄

  },
  //封装过期控制代码
  set(key, value, ) {
    var curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({
      data: value,
      time: curTime
    }));
  },
  //exp n 小时
  getstr(key, exp) {
    // var exp = 60 * 60 * 24; // 一天的秒数
    // 4时(h)=14400000毫秒(ms)
    // 14400000
    exp = exp * 60 * 60 * 1000; //毫秒数
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    //毫秒数之差大于设置的时间则过期
    if (!dataObj || new Date().getTime() - dataObj.time > exp) {
      return null
    } else {
      var dataObjDatatoJson = dataObj.data
      return dataObjDatatoJson;
    }
  },
  //比较第一个函数是否大于第二个函数时间
  compare2Date(startDate, endDate) {

    var startDate = new Date(startDate).valueOf();
    var endDate = new Date(endDate).valueOf();

    if (startDate <= endDate) {
      return true;
    } else {
      return false;
    }
  },
  //比较时间是否大于当前时间
  compareDate(value) {

    var myDate = new Date();
    var now = myDate.valueOf();
    var time = new Date(value).valueOf();
    if (now > time) {
      return true;
    } else {
      return false;
    }
  },
  //比较时间是否大于当前时间
  compareGtDate(value) {

    var myDate = new Date(new Date().toLocaleDateString()).getTime();
    var now = myDate.valueOf();
    var time = new Date(value).valueOf();
    if (now <= time) {
      return true;
    } else {
      return false;
    }
  },
  //判断时候是url校验返回true,false
  isURL(str_url) {
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
      '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
      +
      '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
      +
      '|' // 允许IP和DOMAIN（域名） 
      +
      '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
      +
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
      +
      '[a-z]{2,6})' // first level domain- .com or .museum 
      +
      '(:[0-9]{1,4})?' // 端口- :80 
      +
      '((/?)|' // a slash isn't required if there is no file name 
      +
      '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
    var re = new RegExp(strRegex);
    if (re.test(str_url) && str_url != "string" && str_url != "number" && str_url != "trim") {
      return true;
    } else {
      return false;
    }
  },
  //获取当前时间的前n个月的时间
  getMonthDate(n) {

    var d = new Date();
    var currentdate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    d.setMonth(d.getMonth() - n);
    var yy1 = d.getFullYear();
    var mm1 = d.getMonth() + 1; //因为getMonth（）返回值是 0（一月） 到 11（十二月） 之间的一个整数。所以要给其加1
    var dd1 = d.getDate();
    if (mm1 < 10) {
      mm1 = '0' + mm1;
    }
    if (dd1 < 10) {
      dd1 = '0' + dd1;
    }
    var enddate = yy1 + '-' + mm1 + '-' + dd1

    return currentdate + ',' + enddate

  },
  //根据两个日期计算月数
  getMonths(date1, date2) {
    //用-分成数组
    date1 = date1.split("-");
    date2 = date2.split("-");
    //获取年,月数
    var year1 = parseInt(date1[0]),
      month1 = parseInt(date1[1]),
      year2 = parseInt(date2[0]),
      month2 = parseInt(date2[1]),
      //通过年,月差计算月份差
      months = (year2 - year1) * 12 + (month2 - month1);
    return months;
  },
  // 用于下载文件 文档流下载
  downLoad(data, fileName) {
    const blob = new Blob([data], {
      type: "application/x-msdownload"
    });
    if ("download" in document.createElement("a")) {
      const downloadElement = document.createElement("a");
      let href = "";
      if (window.URL) href = window.URL.createObjectURL(blob);
      else href = window.webkitURL.createObjectURL(blob);
      downloadElement.href = href;
      downloadElement.download = fileName;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      if (window.URL) window.URL.revokeObjectURL(href);
      else window.webkitURL.revokeObjectURL(href);
      document.body.removeChild(downloadElement);
    } else {
      navigator.msSaveBlob(blob, fileName);
    }
  },
  downLoad2base(data, fileName) {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    if ("download" in document.createElement("a")) {
      const downloadElement = document.createElement("a");
      let href = "";
      if (window.URL) href = window.URL.createObjectURL(blob);
      else href = window.webkitURL.createObjectURL(blob);
      downloadElement.href = href;
      downloadElement.download = fileName;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      if (window.URL) window.URL.revokeObjectURL(href);
      else window.webkitURL.revokeObjectURL(href);
      document.body.removeChild(downloadElement);
    } else {
      navigator.msSaveBlob(blob, fileName);
    }
  },
  changeDate(active) {
    let startDate,
      endDate = this.dateFormate(new Date());
    switch (active) {
      case "today":
        startDate = this.dateFormate(new Date());
        break;
      case "week":
        startDate = this.getDay(-7);
        console.log(startDate);
        break;
      case "mounth":
        startDate = this.getDay(-30);
        console.log(startDate);
        break;
      case "all":
        startDate = "";
        endDate = "";
        console.log(endDate)
        break;
      default:
        startDate = "";
        endDate = "";
        break;
    }
    console.log('common')
    console.log({
      startDate,
      endDate
    })
    return {
      startDate,
      endDate
    };
  },
  getDay(day) {

    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  },
  getWeek(date) {
    var arys1 = new Array();
    arys1 = date.split('-'); //日期为输入日期，格式为 2013-3-10
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    var week1 = String(ssdate.getDay()).replace("0", "日").replace("1", "一").replace("2", "二").replace("3", "三").replace("4", "四").replace("5", "五").replace("6", "六") //就是你要的星期几
    var week = "星期" + week1; //就是你要的星期几
    return week
  },
  doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  },
  isToday(str) {
    var d = new Date(str.replace(/-/g, "/"));
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  },
  // return false开始时间大于结束时间
  compare2Time(startTime, endTime, type) {
    if (type == '时:分') { // 时:分
      let startArr = startTime.split(":");
      let endArr = endTime.split(":");
      if(startArr[0]> endArr[0]){
          return false;
      }else if(startArr[1]> endArr[1]){
          return false;
      }
      return true;
    }
  },
   autoSize(Img, maxWidth, maxHeight) {
    var image = new Image();
    //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
    image.src = Img.src;  
    // 当图片比图片框小时不做任何改变 
    if (image.width < maxWidth&& image.height < maxHeight) {
        Img.width = image.width;
        Img.height = image.height;
    }
    else //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
    {
        if (maxWidth/ maxHeight  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
        {
            Img.width = maxWidth;   //以框的宽度为标准
            Img.height = maxWidth* (image.height / image.width);
        } 
        else {   //原图片宽高比例 小于 图片框宽高比例
            Img.width = maxHeight  * (image.width / image.height);
            Img.height = maxHeight  ;   //以框的高度为标准
        }
    }

}







}
