import request from '@/utils/request'



export function robotList(query) {

    return request({
        url: '/game/robot/list',
        method: 'get',
        params:query
    })

}