import request from '@/utils/request'

export function listBlood(){
    return request({
        url: '/game/control/blood',
        method: 'get'
    })
}
export function updateBolood(gameControlVo){
    return request({
        url: '/game/control/blood',
        method: 'put',
        data: gameControlVo
    })
}