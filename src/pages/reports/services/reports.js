import request from '@/utils/request';

export function fetchAllUsers() {
  //https://cjy-react-interface.herokuapp.com/api/users/all_users
  return request(`/api/users/all_users`)
}

/**
 * 新增週報內容
 * @param {*寫週報人id} params.createUserId
 * @param {*寫週報人時間} params.createUserId
 * @param {*週報標題} params.title
 * @param {*週報內容} params.content
 * @param {*週報接收人} params.username
 */
export function addReport(params) {
  //https://cjy-react-interface.herokuapp.com/api/users/add_report/userId
  return request(`/api/users/add_report/${localStorage.userId}`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * 取得所有週報
 * @param {*頁碼} page
 * @param {*筆數} pageSize
 * @param {*用戶id} userId
 */
export function fetchReport({ page, pageSize }) {
  //https://cjy-react-interface.herokuapp.com/api/users/reports/${page}/${pageSize}/userId
  return request(`/api/users/reports/${page}/${pageSize}/${localStorage.userId}`)
}

/**
 * 依據週報id獲取編輯之週報
 * @param {*週報id} id
 * @param {*撰寫週報的用戶id} userId
 */

export function fetchInfo(id) {
  //https://cjy-react-interface.herokuapp.com/api/users/report_detail/userId/id
  return request(`/api/users/report_detail/${localStorage.userId}/${id}`)
}

/**
 * 更新週報內容
 * @param {*更新週報人id} params.id
 * @param {*更新週報標題} params.title
 * @param {*更新週報內容} params.content
 * @param {*更新週報接收人} params.receiverName
 */
export function updateReport(params) {
  //https://cjy-react-interface.herokuapp.com/api/users/edit_report/userId/params.id
  return request(`/api/users/edit_report/${localStorage.userId}/${params.id}`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * 刪除指定週報
 * @param {*刪除週報id} id
 *  * @param {*撰寫週報的用戶id} userId
 */

export function deleteReport(id) {
  //https://cjy-react-interface.herokuapp.com/api/users/delete_report/userId/id
  return request(`/api/users/delete_report/${localStorage.userId}/${id}`, {
    method: 'DELETE',
  })
}
