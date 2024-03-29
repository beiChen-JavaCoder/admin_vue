import request from '@/utils/request'

export function listBlood(){
    return request({
        url: '/game/blood',
        method: 'get'
    })
}
export function updateBolood(gameControlVo){
    return request({
        url: '/game/blood',
        method: 'put',
        data: gameControlVo
    })
}
export function refreshScore(){
    return request({
        url: '/game/blood/refresh',
        method: 'get'
    })
}