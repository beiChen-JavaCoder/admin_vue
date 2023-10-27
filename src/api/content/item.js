import request from '@/utils/request'

// 新增用户
export function addMerchant(form) {
  return request({
    url: '/merchant',
    method: 'post',
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


// 删除商户
export function delMerchant(merchantId) {
  return request({
    url: '/merchant/' + merchantId,
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
export function sellMerchant(from){
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
