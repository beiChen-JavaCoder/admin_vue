import request from '@/utils/request'


export function deleteDB() {
    return request({
        url: '/system/game',
        method: 'delete'
    })
}