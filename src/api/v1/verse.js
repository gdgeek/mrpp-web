import request from '@/utils/request'
export function postVerse(data) {
  return request({
    url: 'v1/verses',
    method: 'post',
    data: data
  })
}

export function getVerse(id) {
  return request({
    url: 'v1/verses/' + id,
    method: 'get'
  })
}

export function getVerses() {
  return request({
    url: 'v1/verses',
    method: 'get'
  })
}

export function putVerse(data) {
  return request({
    url: 'v1/verses',
    method: 'put',
    data: data
  })
}
export function deleteVerse(id) {
  return request({
    url: 'v1/verses/' + id,
    method: 'delete'
  })
}
