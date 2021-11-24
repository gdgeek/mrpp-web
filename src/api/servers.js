import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/servers/menu',
    method: 'get'
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
  return request({
    url: '/servers/logout',
    method: 'get'
  })
}
export function sts() {
  return request({
    url: '/servers/sts',
    method: 'get'
  })
}
export function token() {
  return request({
    url: '/servers/token',
    method: 'get'
  })
}