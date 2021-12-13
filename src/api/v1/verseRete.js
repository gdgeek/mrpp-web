import request from '@/utils/request'
export function postVerseRete(data) {
  return request({
    url: 'v1/verse-retes',
    method: 'post',
    data: data
  })
}

export function getVerseRete(verseId) {
  return request({
    url: 'v1/verse-retes/' + verseId,
    method: 'get'
  })
}
/*
export function getVerseRetes(sort, search = '', page = 0) {
  let url = 'v1/verse-retes?expand=image,author&sort=' + sort

  if (search !== '') {
    url += '&VerseReteSearch[name]=' + search
  }
  if (page > 1) {
    url += '&page=' + page
  }

  return request({
    url,
    method: 'get'
  })
}*/

export function putVerseRete(id, data) {
  return request({
    url: 'v1/verse-retes/' + id,
    method: 'put',
    data
  })
}
export function deleteVerseRete(id) {
  return request({
    url: 'v1/verse-retes/' + id,
    method: 'delete'
  })
}
