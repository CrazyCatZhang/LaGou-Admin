import http from '../utils/http'

export const remove = async (id) => {
    try {
        let {result} = await http({
            url: '/api/users/delete',
            type: 'delete',
            data: {
                id
            },
        })
        return result
    } catch (err) {
        console.log(err)
    }
}