import request from '@/utils/request'

//关闭游戏
export function turnGame(gameId) {
    return request({
        url: '/system/game/' + gameId,
        method: 'get',
    })
}
//删除游戏
export function deletGame(gameId) {
    return request({
        url: '/system/game/' + gameId,
        method: 'delete',
    })
}
export function gameList(data) {

    
    const params = {
        attributes: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            gameName: data.gameName,
            active: data.active
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