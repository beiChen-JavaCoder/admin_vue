import request from '@/utils/request'

// 查询玩家列表
export function listRole(query) {
  return request({
    url: '/recharge/list',
    method: 'get',
    params: query
  })
}
// 充值金币
export function updategold(form) {

  return request({
    url: '/recharge/updateGold',
    method: 'post',
    data: form
  })
}