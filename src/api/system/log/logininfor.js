import request from '@/utils/request'

// 查询操作日志列表
export function list(data,dateRange) {

    const params = {
        attributes: {

            pageNum: data.pageNum,
            pageSize: data.pageSize,
            ipaddr: data.ipaddr,
            userName: data.userName,
            status: data.status
        },
        objects: {
            dateRange: dateRange
        }
    };
    return request({
        url: "/system/logininfor/list",
        method: 'post',
        data: params
    })
}
// 清空操作日志
export function cleanLogininfor() {
    return request({
        url: '/system/logininfor/clean',
        method: 'delete'
    })
}
// 删除操作日志
export function delLogininfor(operId) {
    return request({
        url: '/system/logininfor/' + operId,
        method: 'delete'
    })
}
// 解锁用户登录状态
export function unlockLogininfor(userName) {
    return request({
      url: '/system/logininfor/unlock/' + userName,
      method: 'get'
    })
  }
