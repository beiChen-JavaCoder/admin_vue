import request from '@/utils/request'

export function importData(formData) {
    console.log(formData);
    return request({
        url: '/game/robot',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    });
}
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