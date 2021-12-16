import request from '@/utils/request'
export function putUserData(data) {
  return request({
    url: 'v1/users/set-data',
    method: 'put',
    data
  })
}
export function getUserData(token) {
  return request({
    url: 'v1/users/get-data',
    method: 'get',
    params: { token }
  })
}

