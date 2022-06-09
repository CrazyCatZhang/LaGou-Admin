export const auth = () => {
    return $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        success(result) {
            return result
        }
    })
}