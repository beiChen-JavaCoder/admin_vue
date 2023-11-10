import request from '@/utils/request'

export function listPtp(){
    return request({
        url: '/game/p2p',
        method: 'get'
    })
}
export function gameUserUpdate(userControl){
    return request({
        url: '/game/p2p',
        method: 'put',
        data: userControl
    })
}
export function addUserControl(userControl) {
    return request({
        url: '/game/p2p',
        method: 'post',
        data: userControl
    })
}