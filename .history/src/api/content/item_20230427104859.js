import request from '@/utils/request'


// 查询问卷列表
export function listItem(query) {
  return request({
    url: '/item/list',
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
  //搜索栏
export function handleQuery(){
return request(
  {

  }
)
  }
}
