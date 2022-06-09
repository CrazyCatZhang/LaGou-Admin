export const usersList = ()=>{
    return $.ajax({
        url: '/api/users/list',
        type: 'GET',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        success(result) {
            return result
        }
    })
}