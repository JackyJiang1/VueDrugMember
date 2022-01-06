import axios from 'axios';
import router from '../../router'
import Qs from 'qs'
import {Message} from 'element-ui';
import $api from '../../common/api/index'
import $http from '../../common/js/http'
import user from '../api/user';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.timeout = 500000;
//axios.defaults.withCredentials = true;

const defaultConfig = {
    baseURL: '',
    mode: 'cors',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=utf-8"
    },
    responseType: 'json'
}

let name = '';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        //alert(sessionStorage.getItem('token'));
        if (sessionStorage.getItem('token')) {
            config.headers.Token = sessionStorage.getItem('token')
        }
        //alert(sessionStorage.getItem('token'));
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    (response) => {
        // console.log(response)
      /***
       * 1.  
       * 2.  
       * 3. 9001 token过期
       * 4. 
       */
      // if (response.data.code === 9999) {
      //   return Promise.reject(response.data.msg)
      // }

        //token即将过期会产生一个新的token
        if(response.data.newToken){
            sessionStorage.setItem('token',response.data.newToken)
        }
        if (response.code && (response.code == '9001' || response.message.indexOf('token')>-1)) {
            router.replace({
                path: "/login",
                query: {
                  redirect: router.currentRoute.fullPath
                } 
            })
        }
        

        //文件下载
        if (response.config && response.config.responseType == 'blob') {
            const blob = new Blob([response.data], {
                type: response.config.type ? response.config.type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'//application/x-msdownload
            });
            //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet //这里表示xlsx类型
            // let filename = `${name}.xlsx`;
            let filename = `${name}`;
            if ('download' in document.createElement('a')) {
                const downloadElement = document.createElement('a');
                let href = '';

                if (window.URL) {
                    href = window.URL.createObjectURL(blob);
                }else{
                    href = window.webkitURL.createObjectURL(blob);
                }
                downloadElement.href = href;
                downloadElement.download = filename;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                
                if (window.URL) {
                    window.URL.revokeObjectURL(href);
                }else {
                    window.webkitURL.revokeObjectURL(href); 
                }
                document.body.removeChild(downloadElement);
            } else {
                navigator.msSaveBlob(blob, filename);
            }
            Message({type: 'success', showClose: true, message: '文件下载成功'})
            return Promise.resolve(response.data);
        }
        return response;
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)


function getUrl(url){
    let newUrl = '';
    if(typeof(url)=='string'){
        newUrl = url;
    }else{
        if(url.url){
            newUrl = url.url
            if(url.query){
                newUrl = newUrl + '?' +Qs.stringify(url.query);
            }   
        }else{
            Message({type: 'error', showClose: true, message: '请求地址有误！'})
        }
    }
    return newUrl;
}

/**
 * get请求
 * @param url
 * @param data
 * @param config
 * @param fileName
 * @return {Promise}
 */
const get = (url, data = {}, config = {}, fileName = '文件') => {
    let newUrl = getUrl(url);    
    return new Promise((resolve, reject) => {
        if (!config.responseType) {
            axios.get(newUrl, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error) 
                })
        } else {
            name = fileName;
            axios.get(newUrl, Object.assign({params: data}, defaultConfig, config))
        }
    })
}


/**
 * post请求
 * @param url
 * @param data
 * @param config
 * @param fileName
 * @return {Promise}
 */
const post = (url, data = {}, config = {headers:{Token: 'xyz'}}, fileName = '文件') => {
    let newUrl = getUrl(url);
    return new Promise((resolve, reject) => {
        if (!config.responseType) {
            axios.post(newUrl, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            name = fileName
            axios.post(newUrl, data, Object.assign({}, defaultConfig, config))
        }
    })
};

/**
 * put请求
 * @param url
 * @param data
 * @param config
 */
const put = (url, data = {}, config = {}) => {
    let newUrl = getUrl(url);
    return new Promise((resolve, reject) => {
        axios.put(newUrl, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
};

/**
 * delete请求
 * @param url
 * @param data
 */
const del = (url, data = {}) => {
    let newUrl = getUrl(url);
    return new Promise((resolve, reject) => {
        axios.delete(newUrl, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
};

export default {
    get,
    post,
    put,
    del
}