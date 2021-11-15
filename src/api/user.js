import request from '@/utils/request'

import { getToken } from '@/utils/auth' // get token from cookie
export function login(data) {
  return request({
    url: '/sites/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/servers/user',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  console.log(getToken())
  return request({
    url: '/servers/logout',
    method: 'get'
  })
}
