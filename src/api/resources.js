import request from '@/utils/request'

export function postPolygen(name, file_id) {
  const polygen = { name, file_id, type: 'polygen' }
  return request({
    url: '/resources',
    method: 'post',
    data: polygen
  })
}

export function postPicture(name, file_id) {
  const picture = { name, file_id, type: 'picture' }
  return request({
    url: '/resources',
    method: 'post',
    data: picture
  })
}

export function postVideo(name, file_id) {
  const video = { name, file_id, type: 'video' }
  return request({
    url: '/resources',
    method: 'post',
    data: video
  })
}
