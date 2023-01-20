import Api from '@/apis'
export default {
  namespace: 'user',
  state: {
    userInfo: {}
  },
  reducers: {},
  effects: {
    *login({payload}, {call, put, select}) {
      console.log(Api, payload)
      const {data, msg} = yield call(Api.userLogin, payload)
    }
  }
}