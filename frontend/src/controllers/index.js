import indexTpl from '../views/index.art'
import signInTpl from '../views/signin.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersListPageTpl from '../views/users-pages.art'

const htmlIndex = indexTpl({})
const htmlSignIn = signInTpl({})

const handleSubmit = (router) => {
    return e => {
        e.preventDefault()
        router.go('/index')
    }
}

const handleSignUp = () => {
    const btnClose = $('#users-close')
    const data = $('#users-form').serialize()
    $.ajax({
        url: '/api/users/signup',
        type: 'POST',
        data,
        success(res) {
            handleList()
        }
    })
    btnClose.click()
}

const handleList = () => {
    $.ajax({
        url: '/api/users/list',
        type: 'GET',
        success(result) {
            $('#users-list').html(usersListTpl({
                data: result.data
            }))
            handlePagination(result.data)
        }
    })
}

const handlePagination = (data)=>{
    const pageSize = 10
    const total = data.length
    const pageCount = Math.ceil(total / pageSize)
    const htmlPage = usersListPageTpl({
        pageCount
    })
    $('#users-page').html(htmlPage)
}

const signIn = (router) => {
    return (req, res, next) => {
        res.render(htmlSignIn)
        $('#signin').on('submit', handleSubmit(router))
    }
}

const index = (router) => {
    return (req, res, next) => {
        res.render(htmlIndex)
        $(window, '.wrapper').resize()
        $('#content').html(usersTpl({}))
        handleList()
        $('#users-save').on('click', handleSignUp)
    }
}

export {
    signIn,
    index
}