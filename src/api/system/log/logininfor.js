import request from '@/utils/request'

// 查询操作日志列表
export function list(data) {

  const params = {
      attributes: {

          pageNum: data.pageNum,
          pageSize: data.pageSize,

      },
      objects: {
      }
  };
  return request({
      url: "/system/logininfor/list",
      method: 'post',
      data: params
  })
}