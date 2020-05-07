import request from '@/utils/request';

export function fetchAllUsers(){
  //https://cjy-react-interface.herokuapp.com/api/users/all_users
  return request(`/api/users/all_users`)
}

/**
 * 
 * @param {*寫週報人id} params.createUserId 
 * @param {*寫週報人時間} params.createUserId 
 * @param {*週報標題} params.title 
 * @param {*週報內容} params.content 
 * @param {*週報接收人} params.username 
 */
export function addReport( params ){
  //https://cjy-react-interface.herokuapp.com/api/users/add_report/useId
  return request(`/api/users/add_report/${ localStorage.userId }`, {
    method: 'POST',
    body:JSON.stringify( params ),
  })
}


/**
 * 
 * @param {*頁碼} page
 * @param {*筆數} pageSize 
 * @param {*用戶id} userId 
 */
export function fetchReport( page, pageSize ){
  //https://cjy-react-interface.herokuapp.com/api/users/reports/${page}/${pageSize}/useId
  return request(`/api/users/reports/${ page }/${ pageSize }/${ localStorage.userId }`)
}
