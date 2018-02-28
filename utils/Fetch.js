'use strict';
import 'isomorphic-fetch';
const serialize = require('./serialize.js');
//dataType:
module.exports = (options) => {
    let {url,type,data,dataType,success, error} = options;
    let fetchObj = {
      headers : createHeaders(),
      'credentials': 'include',
    };
    fetchObj.method = type;
    if(type.toUpperCase() === 'GET'){
      url = url + serialize(data);
    }else{
      fetchObj.body = serialize(data).substr(1);
    }
    return fetch(url,fetchObj)
    .then(status)
    .then(dataType === 'blob' ? toBlob : toJson)
    .then((res) => {
      //非流时做个判断
      if(dataType !== 'blob'){
        if(res.success){
          success? success(res) : null;
        }else{
          console.error('success is false',res.errorMessage);
          error? error(res) : null;
        }
      }
      return res;
    }).catch((err) => {
        console.error('js error:',err);
        error? error(err) : null;
    });
}

function status(response){
    if(response.ok){
      return response;
    }else{
      throw new Error('服务端异常或网络错误');
    }
}
//json转换
function toJson(response){
  return response.json();
}
//流对象
function toBlob(response){
  return response.blob();
}
//创建请求头
function createHeaders(){
  var header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
  };
  return header;
}
