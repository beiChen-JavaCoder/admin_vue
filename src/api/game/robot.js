import request from '@/utils/request'


export function listGame(){
    return request({
        url: '/game/robot',
        method: 'get'
    })
}
export function upRobotScore(robotContrl) {
    console.log(robotContrl);
    return request({
        url: '/game/robot',
        method: 'put',
        data: robotContrl
    });
}