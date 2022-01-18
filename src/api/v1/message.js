import request from '@/utils/request'
export function postMessage(data) {
  return request({
    url: 'v1/messages',
    method: 'post',
    data: data
  })
}

export function getMessage(id) {
  return request({
    url: 'v1/messages/' + id,
    method: 'get'
  })
}
export function getMessages(sort = '-created_at', search = '', page = 0) {
  let url = 'v1/messages?expand=author&sort=' + sort

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

export function putMessage(id, data) {
  return request({
    url: 'v1/messages/' + id,
    method: 'put',
    data: data
  })
}
export function deleteMessage(id) {
  return request({
    url: 'v1/messages/' + id,
    method: 'delete'
  })
}
