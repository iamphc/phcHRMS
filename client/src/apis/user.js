import http from '@/utils/http'
// 用户登录
export const userLogin = params => http.post('/login', params)
// 发送验证码
export const sendSmCode = params => http.get('/getCode', params)
// 重置密码——验证码校验
export const checkSmCode = params => http.get('/checkSmCode', params)
// 重置密码——新密码设置
export const resetPassword = params => http.post('/resetPassword', params)