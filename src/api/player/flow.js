import request from '@/utils/request'

export function flowList(data) {

    const params = {
        attributes: {
            rid: data.rid,
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            gameId: data.gameId,
        },
        objects: {
            sectionTime: data.sectionTime
        }
    };
    return request({
        url: "/player/flow",
        method: 'post',
        data: params
    })
}

