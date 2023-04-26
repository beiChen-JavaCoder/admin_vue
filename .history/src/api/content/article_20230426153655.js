import request from '@/utils/request'


// 查询文章列表
export function listArticle(query) {
  return request({
    url: '/content/article/list',
    method: 'get',
    params: query
  })
}

// 删除问卷
export function delArticle(id) {
  return request({
    url: '/content/article/' + id,
    method: 'delete'
  })
}
