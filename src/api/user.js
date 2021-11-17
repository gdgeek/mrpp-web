import request from '@/utils/request'

import { getToken } from '@/utils/auth' // get token from cookie
export function login(data) {
  return request({
    url: '/sites/login',
    method: 'post',
    data
  })
}
export function verifEmail(token){
  return request({
    url: '/sites/verify-email?token=' + token,
    method: 'get'
  })
}
export function signup(info){
  console.log(info)
  return request({
    url: '/sites/signup',
    method: 'post',
    data: {"SignupForm": info}
  })
}
export function requestPasswordReset(data){
  return request({
    url: '/sites/request-password-reset',
    method: 'post',
    data
  })

}
export function resendVerificationEmail(data){
  return request({
    url: '/sites/resend-verification-email',
    method: 'post',
    data
  })
}
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
  console.log(getToken())
  return request({
    url: '/servers/logout',
    method: 'get'
  })
}
