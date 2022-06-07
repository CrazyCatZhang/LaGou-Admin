import indexTpl from '../views/index.art'
import signInTpl from '../views/signin.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersListPageTpl from '../views/users-pages.art'

const htmlIndex = indexTpl({})
const htmlSignIn = signInTpl({})
const pageSize = 10
let dataList = []

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
        success() {
            loadData()
        }
    })
    btnClose.click()
}

const loadData = () => {
    return $.ajax({
        url: '/api/users/list',
        type: 'GET',
        success(result) {
            dataList = result.data
            handlePagination(dataList)
            handleList(1)
        }
    })
}

const handleList = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: dataList.slice(start, start + pageSize)
    }))
}

const handlePagination = (data) => {
    const total = data.length
    const pageCount = Math.ceil(total / pageSize)
    const pageArray = new Array(pageCount)
    const htmlPage = usersListPageTpl({
        pageArray
    })
    $('#users-page').html(htmlPage)
    $('#users-page-list li:nth-child(2)').addClass('active')
    $('#users-page-list li:not(:first-child,:last-child)').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        handleList($(this).index())
    })
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
        loadData()
        $('#users-save').on('click', handleSignUp)
    }
}

export {
    signIn,
    index
}