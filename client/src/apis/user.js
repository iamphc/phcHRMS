import http from '@/utils/http'

export const userLogin = params => http.post('/login', params)