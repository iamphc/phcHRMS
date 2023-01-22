import Api from '@/apis'
import {message} from 'antd'
export default {
  namespace: 'user',
  state: {
    userInfo: sessionStorage.getItem("userProfile") ?? {}
  },
  reducers: {},
  effects: {
    *login({payload}, {call, put, select}) {
      const {data, msg} = yield call(Api.userLogin, payload)
      if (!data) {
        message.error(msg)
        return
      }
      sessionStorage.setItem('userProfile', JSON.stringify(data))
    }
  }
}