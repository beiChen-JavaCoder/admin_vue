import request from '@/utils/request'


// 查询商户列表
export function listItem(query) {
  return request({
    url: '/item/list',
    method: 'post',
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
