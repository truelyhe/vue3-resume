import request from './request'

export function getData(params) {
  return request({
    url: '/baseInfo/data',
    method: 'get',
    params
  })
}

export function updateData(id,data) {
  return request({
    url: `/baseInfo/updateData/${id}`,
    method: 'put',
    data
  })
}

export function getAllData(params) {
  return request({
    url: '/baseInfo/allData',
    method: 'get',
    params
  })
}

export function uploadData(params) {
  return request({
    url: '/baseInfo/upload',
    method: 'post',
    params
  })
}
