export const remove = (id)=>{
    return $.ajax({
        url: '/api/users/delete',
        type: 'delete',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        data: {
            id
        },
        success(result) {
            return result
        }
    })
}