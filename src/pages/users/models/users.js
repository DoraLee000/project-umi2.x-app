import { fetch, add, edit, remove } from '../services/users';
export default {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 5
  },
  reducers: {
    setData(state, { payload: { total, list, page } }) {
      return { ...state, total, list, page }
    },
  },
  effects: {
    *userServices({ payload: { page } }, { call, put, select }) {
      const pageSize = yield select(state => state.users.pageSize)
      const res = yield call(fetch, { page: page, pageSize: pageSize });
      if (res && res.state === 'success') {
        yield put({ type: 'setData', payload: { ...res.data, page } });
      } else {
        yield put({ type: 'setData', payload: { data: { list: [], total: 0 } } });
      }
    },
    *addUser({ payload }, { call }) {
      return yield call(add, payload)
    },
    *editUser({ payload: { id, value } }, { call }) {
      return yield call(edit, id, value)
    },
    *removeUser({ payload }, { call }) {
      return yield call(remove, payload)
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'userServices', payload: { page: 1 } })
        }
      })
    }
  }
}
