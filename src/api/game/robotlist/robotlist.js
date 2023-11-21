import request from '@/utils/request'



export function robotList(query) {

    return request({
        url: '/game/robot/list',
        method: 'get',
        params:query
    })

}
export function robotUpdate(robot){

    return request({
        url: '/game/robot/update',
        method: 'post',
        data:robot
    })
}
export function delRobot(robotId){

    return request({
        url: '/game/robot/list/'+robotId,
        method: 'delete',
    })

    


}
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