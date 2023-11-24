import request from '@/utils/request'

// 查询操作日志列表
export function list(data, dateRange) {

    const params = {
        attributes: {

            pageNum: data.pageNum,
            pageSize: data.pageSize,
            operIp: data.operIp,
            title: data.title,
            operName: data.operName,
            businessType: data.businessType,
            status: data.status,
        },
        objects: {
            dateRange: dateRange
        }

    };
    return request({
        url: "/system/operlog/list",
        method: 'post',
        data: params
    })
}
// 清空操作日志
export function cleanOperlog() {
    return request({
        url: '/system/operlog/clean',
        method: 'delete'
    })
}
// 删除操作日志
export function delOperlog(operId) {
    return request({
        url: '/system/operlog/' + operId,
        method: 'delete'
    })
}