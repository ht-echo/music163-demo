import request from '@/utils/request'

export function getToplistInfo() {
  return request({
    url: '/toplist'
  })
}

export function getToplistDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}