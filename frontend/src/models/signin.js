export const signin = (data) => {
    return new Promise((resolve) => {
        $.ajax({
            url: '/api/users/signin',
            type: 'POST',
            dataType: 'json',
            data,
            success(result, textStatus, jqXHR) {
                resolve({
                    result,
                    jqXHR
                })
            }
        })
    })
}