import { fetchAllUsers } from '../services/reports';
export default {
  namespace: 'reports',
  state: {
    allUsersList:[]
  },
  reducers: {
    setData(state , { payload }) { 
      return { ...state , allUsersList: payload } 
    },
  },
  effects: {
    *getAllUsers({ payload }, { call, put }) {
      const res = yield call( fetchAllUsers);
      if( res && res.state == 'success' ){
        yield put({ type: 'setData' , payload: res.data });
      }else{
        yield put({ type: 'setData' , payload: { allUsersList : [] }});
      }
    },
  },
  subscriptions: {}
}