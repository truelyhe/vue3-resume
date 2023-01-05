import request from './request'

export function getJobData(params) {
  return request({
    url: '/job/data',
    method: 'get',
    params
  })
}

export function updateJobData(id,data) {
  return request({
    url: `/job/updateData/${id}`,
    method: 'put',
    data
  })
}

export function addJobData(data) {
  return request({
    url: `/job/insetData`,
    method: 'post',
    data
  })
}
