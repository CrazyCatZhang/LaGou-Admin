import indexTpl from '../views/index.art'
import signInTpl from '../views/signin.art'
import usersTpl from '../views/users.art'

const htmlIndex = indexTpl({})
const htmlSignIn = signInTpl({})

const handleSubmit = (router)=>{
    return e => {
        e.preventDefault()
        router.go('/index')
    }
}

const signIn = (router)=>{
    return (req, res, next) => {
        res.render(htmlSignIn)
        $('#signin').on('submit', handleSubmit(router))
    }
}

const index = (router)=>{
    return (req, res, next) => {
        res.render(htmlIndex)
        $(window,'.wrapper').resize()
        $('#content').html(usersTpl({}))
    }
}

export {
    signIn,
    index
}