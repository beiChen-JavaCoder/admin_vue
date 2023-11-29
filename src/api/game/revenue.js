import request from '@/utils/request'

export function listRevenue(query) {

    const data = {
        pageNum: query.pageNum,
        pageSize: query.pageSize,
        
        searchTime: {
            searchTime: query.searchTime
        }
    }



    return request({
        url: '/player/revenue',
        method: 'post',
        data: data
    })
}



