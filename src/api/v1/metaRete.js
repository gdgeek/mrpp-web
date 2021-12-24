import request from '@/utils/request'
export function postMetaRete(data) {
  return request({
    url: 'v1/meta-retes',
    method: 'post',
    data: data
  })
}

export function getMetaRete(id) {
  return request({
    url: 'v1/meta-retes/' + id,
    method: 'get'
  })
}

export function putMetaRete(id, data) {
  return request({
    url: 'v1/meta-retes/' + id,
    method: 'put',
    data
  })
}
export function deleteMetaRete(id) {
  return request({
    url: 'v1/meta-retes/' + id,
    method: 'delete'
  })
}
