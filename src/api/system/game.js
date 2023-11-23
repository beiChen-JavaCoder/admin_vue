import request from '@/utils/request'


export function downlineGame(gameIds) {
    return request({
        url: '/system/game/'+gameIds,
        method: 'get',
    })
}
export function gameList(data) {

    const params = {
        attributes: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
        },
        objects: {
        }
    };
    return request({
        url: '/system/game',
        method: 'post',
        data: params

})

}