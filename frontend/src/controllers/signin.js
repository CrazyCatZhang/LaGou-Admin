import signInTpl from '../views/signin.art'
import {signin as signinModel} from '../models/signin'

const htmlSignIn = signInTpl({})

const handleSubmit = (router) => {
    return async e => {
        e.preventDefault()
        const data = $('#signin').serialize()
        const {result, jqXHR} = await signinModel(data)
        const token = jqXHR.getResponseHeader('X-Auth-Token')
        localStorage.setItem('lg-token', token)
        if (result.ret) {
            router.go('/index')
        }
    }
}

const signIn = (router) => {
    return (req, res, next) => {
        res.render(htmlSignIn)
        $('#signin').on('submit', handleSubmit(router))
    }
}

export default signIn