import request from '@/utils/request'

export function listRevenue() {

    return request({
        url: '/revenue',
        method: 'get'
    })
}



