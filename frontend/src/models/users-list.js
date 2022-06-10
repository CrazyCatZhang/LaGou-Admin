import http from '../utils/http'

export const usersList = async () => {
    try {
        let { result } = await http({
            url: '/api/users/list',
        })
        return result
    } catch (err) {
        console.log(err)
    }
}