export const usersAdd = (data) => {
    return $.ajax({
        url: '/api/users/signup',
        type: 'POST',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        data,
        success(result) {
            return result
        }
    })
}