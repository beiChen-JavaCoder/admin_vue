import request from '@/utils/request'

export function listPlayer(data) {
    return request({
        url: '/player/list',
        method: 'post',
        data: data
    })
}