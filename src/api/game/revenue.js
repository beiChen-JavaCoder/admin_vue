import request from '@/utils/request'

export function listRevenue(data) {

    return request({
        url: '/player/revenue',
        method: 'post',
        data: data
    })
}



