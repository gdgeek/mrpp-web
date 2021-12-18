import request from '@/utils/request'
export function postMetaRete(data) {
  return request({
    url: 'v1/meta-retes',
    method: 'post',
    data: data
  })
}

export function getVerseRete(id) {
  return request({
    url: 'v1/meta-retes/' + id,
    method: 'get'
  })
}

export function putVerseRete(id, data) {
  return request({
    url: 'v1/meta-retes/' + id,
    method: 'put',
    data
  })
}
export function deleteVerseRete(id) {
  return request({
    url: 'v1/meta-retes/' + id,
    method: 'delete'
  })
}
