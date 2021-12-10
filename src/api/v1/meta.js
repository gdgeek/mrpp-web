import request from '@/utils/request'
export function postMeta(data) {
  return request({
    url: 'v1/metas',
    method: 'post',
    data: data
  })
}

export function getMeta(id) {
  return request({
    url: 'v1/metas/' + id,
    method: 'get'
  })
}

export function getMetas() {
  return request({
    url: 'v1/metas',
    method: 'get'
  })
}

export function putMeta(data) {
  return request({
    url: 'v1/metas',
    method: 'put',
    data: data
  })
}
export function deleteMeta(id) {
  return request({
    url: 'v1/metas/' + id,
    method: 'delete'
  })
}
