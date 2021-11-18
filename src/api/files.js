import request from '@/utils/request'

export function postFile(filename, md5, type, url) {
  const file = { filename, md5, type, url }
  return request({
    url: '/files',
    method: 'post',
    data: file
  })
}

