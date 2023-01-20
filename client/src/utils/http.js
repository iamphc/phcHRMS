import {qs} from 'qs'
import {message} from 'antd'
import {history} from 'umi'
const fetch = require('dva').fetch

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  message.error(`网络请求错误, ${res.status}`)
  throw new Error(res.statusText)
}

const judgeOkState = async res => {
  const cloneRes = await res.clone().json()
  if (cloneRes.code !== 0) {
    message.error(`${cloneRes.msg}${cloneRes.code}`)
    history.replace('/users/login')
    sessionStorage.clear()
  }
  return res
}

const handleError = err => {
  if (err instanceof TypeError) {
    message.error('请求错误')
  }
  return {
    code: -1,
    data: false
  }
}

class Http {
  static async staticFetch(url = '', options = {}) {
    url = '/api' + url
    const defaultOptions = {
      mode: 'cors',
      headers: {
        Authorization: sessionStorage.getItem('token') || null
      }
    }
    
    if (options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-type'] = 'application/json;charset=utf-8'
    }

    const newOptions = {...defaultOptions, ...options}

    return fetch(url, newOptions)
      .then(checkStatus)
      .then(judgeOkState)
      .then(res => {
        const token = res.headers.get('Authorization')
        token && sessionStorage.setItem('Authorization', token)
        return res.json()
      })
      .catch(handleError)
  }

  get (url, params = {}, option = {}) {
    const options = Object.assign({method: 'GET', option})
    Object.keys(options) && (url += '?' + qs.stringify(options))
    options.body = JSON.stringify(params)
    return Http.staticFetch(url, options)
  }
  post (url, params = {}, option = {}) {
    const options = Object.assign({method: 'POST', option})
    options.body = JSON.stringify(params)
    return Http.staticFetch(url, options)
  }
  put (url, params = {}, option = {}) {
    const options = Object.assign({method: 'PUT', option})
    options.body = JSON.stringify(params)
    return Http.staticFetch(url, options)
  }
  del (url, option = {}) {
    const options = Object.assign({method: 'DELETE', option})
    Object.keys(options) && (url += '?' + qs.stringify(options))
    options.body = JSON.stringify(params)
    return Http.staticFetch(url, options)
  }
}

export default new Http()