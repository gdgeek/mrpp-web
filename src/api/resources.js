import request from '@/utils/request'
function postResources(name, file_id, type) {
  const resources = { name, file_id, type }
  return request({
    url: '/resources',
    method: 'post',
    data: resources
  })
}
export function postPolygen(name, file_id) {
  return postResources(name, file_id, 'polygen')
}

export function postPicture(name, file_id) {
  return postResources(name, file_id, 'picture')
}

export function postVideo(name, file_id) {
  return postResources(name, file_id, 'video')
}
function deleteResources(id) {
  return request({
    url: '/resources/' + id,
    method: 'delete'
  })
}
export function deletePolygen(id) {
  return deleteResources(id)
}

export function deletePicture(id) {
  return deleteResources(id)
}
export function deleteVideo(id) {
  return deleteResources(id)
}
function putResources(id, resource) {
  return request({
    url: '/resources/' + id,
    method: 'put',
    resource
  })
}

export function putPolygen(id, polygen) {
  return putResources(id, polygen)
}
export function putPicture(id, picture) {
  return putResources(id, picture)
}
export function putVideo(id, video) {
  return putResources(id, video)
}

function getResources(type, sort, search = '', page = 0) {
  let url = '/resources?expand=image,author&type=' + type + '&sort=' + sort

  if (search !== '') {
    url += '&ResourceSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function getPolygen(sort, search = '', page = 0) {
  return getResources('polygen', sort, search, page)
}
export function getPicture(sort, search = '', page = 0) {
  return getResources('picture', sort, search, page)
}
export function getVideo(sort, search = '', page = 0) {
  return getResources('video', sort, search, page)
}
