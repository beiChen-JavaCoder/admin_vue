import request from '@/utils/request'

export function importData(fileData) {
    return request({
        url: '/game/robot',
        method: 'post',
        data: fileData
    })
}