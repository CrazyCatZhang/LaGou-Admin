import signInTpl from '../views/signin.art'

const htmlSignIn = signInTpl({})

const handleSubmit = (router) => {
    return e => {
        e.preventDefault()
        const data = $('#signin').serialize()
        $.ajax({
            url: '/api/users/signin',
            type: 'POST',
            dataType: 'json',
            data,
            success(result) {
                if (result.ret) {
                    router.go('/index')
                }
            }
        })
    }
}

const signIn = (router) => {
    return (req, res, next) => {
        res.render(htmlSignIn)
        $('#signin').on('submit', handleSubmit(router))
    }
}

export default signIn