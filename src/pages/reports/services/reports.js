import request from '@/utils/request';

export function fetchAllUsers(){
  //https://cjy-react-interface.herokuapp.com/api/users/all_users
  return request(`/api/users/all_users`)
}
