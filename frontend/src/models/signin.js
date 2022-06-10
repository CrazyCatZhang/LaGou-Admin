import http from '../utils/http'

export const signin = async (data) => {
    try {
        let {result, jqXHR} = await http({
            url: '/api/users/signin',
            type: 'post',
            data
        })
        return {
            result,
            jqXHR
        }
    } catch (err) {
        console.log(err)
    }
}