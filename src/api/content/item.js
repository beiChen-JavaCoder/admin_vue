import request from '@/utils/request'


// 查询商户列表
export function listItem(query) {
  return request({
    url: '/merchantList',
    method: 'get',
    data: JSON.stringify(query)
  })
}


// 删除商户
export function delArticle(id) {
  return request(
  {
    url: '/content/item/' + id,
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
      url: '/updateMerchant',
      headers: {
        isToken: false
      },
      method: 'post',
      data: from
    }
  )


}
