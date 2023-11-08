import request from '@/utils/request'

export function listPtp(){
    return request({
        url: '/game/control/p2p',
        method: 'get'
    })
}
export function gameUserUpdate(userControl){
    return request({
        url: '/game/control/p2p',
        method: 'put',
        data: userControl
    })
}