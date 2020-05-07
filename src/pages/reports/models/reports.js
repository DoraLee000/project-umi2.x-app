import { fetchAllUsers, addReport, fetchReport } from '../services/reports';
export default {
  namespace: 'reports',
  state: {
    allUsersList: [],
    list: [], 
    total: 0,
    page: 1,
    pageSize: 5,
  },
  reducers: {
    setData(state , { payload }) { 
      return { ...state, allUsersList: payload } 
    },
    setReports(state , { payload: { list, total, page } }) { 
      return { ...state, list, total, page } 
    },
  },
  effects: {
    *getAllUsers({ payload }, { call, put }) {
      const res = yield call( fetchAllUsers );
      if( res && res.state == 'success' ){
        yield put({ type: 'setData' , payload: res.data });
      }else{
        yield put({ type: 'setData' , payload: { allUsersList : [] }});
      }
    },
    *addReport({ payload }, { call }) {
      return yield call( addReport, payload )
    },
    *fetchReports({ payload:{ page }}, { call, put, select }) {
      const pageSize = yield select( state => state.reports.pageSize )
      const res = yield call( fetchReport, { page: page , pageSize: pageSize });
      if( res && res.state === 'success' ){
        yield put({ type: 'setReports' , payload: { ...res.data , page }});
      }else{
        yield put({ type: 'setReports' , payload: { list: { list:[], total: 0, page:1 }}});
      }
    }
  },
  subscriptions: {
    setup({ dispatch , history }){
      return history.listen(({ pathname })=>{
        if (pathname === '/reports'){
          dispatch({ type: 'fetchReports' , payload: { page: 1 } })
        }
      })
    }
  }
}