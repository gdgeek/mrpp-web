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
    url: 'v1/verses/' + id + '?expand=metas',
    method: 'get'
  })
}

export function getVerses(sort, search = '', page = 0) {
  let url = 'v1/verses?expand=image,author&sort=' + sort

  if (search !== '') {
    url += '&VerseSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}

export function putVerse(id, data) {
  return request({
    url: 'v1/verses/' + id,
    method: 'put',
    data
  })
}
export function deleteVerse(id) {
  return request({
    url: 'v1/verses/' + id,
    method: 'delete'
  })
}
