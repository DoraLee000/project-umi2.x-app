import { fetchAllUsers, addReport, fetchReport, fetchInfo, updateReport, deleteReport } from '../services/reports';
export default {
  namespace: 'reports',
  state: {
    allUsersList: [],
    list: [],
    total: 0,
    page: 1,
    pageSize: 5,
    info: {
      content: "<p><br></p>"
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, allUsersList: payload }
    },
    setReports(state, { payload: { list, total, page } }) {
      return { ...state, list, total, page }
    },
    setInfo(state, { payload }) {
      return { ...state, info: payload }
    }
  },
  effects: {
    *getAllUsers({ payload }, { call, put }) {
      const res = yield call(fetchAllUsers);
      if (res && res.state == 'success') {
        yield put({ type: 'setData', payload: res.data });
      } else {
        yield put({ type: 'setData', payload: { allUsersList: [] } });
      }
    },
    *addReport({ payload }, { call }) {
      return yield call(addReport, payload)
    },
    *updateReport({ payload }, { call }) {
      return yield call(updateReport, payload)
    },
    *removeReport({ payload }, { call }) {
      return yield call(deleteReport, payload)
    },
    *fetchReports({ payload: { page } }, { call, put, select }) {
      const pageSize = yield select(state => state.reports.pageSize)
      const res = yield call(fetchReport, { page: page, pageSize: pageSize });
      if (res && res.state === 'success') {
        yield put({ type: 'setReports', payload: { ...res.data, page } });
      } else {
        yield put({ type: 'setReports', payload: { list: { list: [], total: 0, page: 1 } } });
      }
    },
    *fetchInfo({ payload }, { call, put }) {
      const res = yield call(fetchInfo, payload)
      if (res && res.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: res.data
        });
      } else {
        yield put({
          type: 'setInfo',
          payload: {}
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/reports') {
          dispatch({ type: 'fetchReports', payload: { page: 1 } })
        }
      })
    }
  }
}
