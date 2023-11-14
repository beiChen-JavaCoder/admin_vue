import request from '@/utils/request'

//订单列表
export function orderList(query) {
    return request({
      url: '/order/list',
      method: 'get',
      params: query
    })



}
export function updateOrder(data) {
  return request({
    url: '/order',
    method: 'put',
    data: data
  })



}