import request from '@/utils/request'

export function listBlood(){
    return request({
        url: '/game/control/blood',
        method: 'get'
    })
}