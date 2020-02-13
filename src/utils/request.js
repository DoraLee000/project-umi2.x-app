import { fetch } from 'dva';
import { notification } from 'antd';
import router from 'umi/router';
/***
 * @param { 用戶名 } params.username
 * @param { 密碼 } params.password
 */

const codeMessage = {
  200:'伺服器成功返回請求的數據',
  201:'新建或修改數據成功',
  202:'請求已進入排程',
  204:'數據成功刪除',
  400:'發出請求錯誤，伺服器沒有進行新建或修改數據等操作',
  401:'用戶沒有權限',
  403:'用戶沒有授權',
  404:'伺服器沒有回應',
  406:'請求格式無法得取',
  410:'請求的資源不再可用',
  422:'請求格式正確，無法回應',
  500:'伺服器發生錯誤，請檢查伺服器',
  502:'錯誤網關',
  503:'伺服器維護',
  504:'網關超時',
}

export default async function request(url,options){
  return await fetch(url,{
    ...options,
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then(checkStatus)
  .catch(checkErrorStatus)
}

function checkStatus(response){
  if(response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const errorText = codeMessage[response.status] || response.statusText;
  notification.error({
    message:`請求錯誤 ${response.status}`,
    description:errorText
  });
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
}

function checkErrorStatus(error){
  if(error && error.response){
    const { status } = error.response
    if(status === 403) return router.push('/exception/403');
    if(status <= 504 && status >=500) return router.push('/exception/500');
    if(status >= 404 && status <=422) return router.push('/exception/404');
  }
}