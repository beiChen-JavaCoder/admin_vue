import request from '@/utils/request'

// 新增用户
export function addMerchant(form) {
  return request({
    url: '/merchant',
    method: 'post',
    data: form
  })
}
//充值
export function charge(params) {

  return request({
    url: '/merchant',
    method: 'get',
    params: params
  })
}
//修改商户
export function updateMerchant(form) {
  return request({
    url: '/merchant',
    method: 'put',
    data: form
  })
}
// 查询商户列表
export function listItem(query) {
  return request({
    url: '/merchant/merchantList',
    method: 'get',
    params: query
  })
}
//获取税收百分比
export function merchantRatio() {
  return request({
    url: '/merchant/merchantRatio',
    method: 'get'
  })
}


// 删除商户
export function delMerchant(merchantIds) {
  return request({
    url: '/merchant/' + merchantIds,
    method: 'delete'
  })
}
//搜索栏
export function search(query) {
  return request(
    {
      url: '/item/search',
      method: 'get',
      params: query
    }
  )
}
export function sellMerchant(from) {
  return request(
    {
      url: '/insertMerchant',
      headers: {
        isToken: false
      },
      method: 'post',
      data: from
    }
  )


}
