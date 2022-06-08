import indexTpl from '../views/index.art'
import signInTpl from '../views/signin.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersListPageTpl from '../views/users-pages.art'

const htmlIndex = indexTpl({})
const htmlSignIn = signInTpl({})
const pageSize = 10
let dataList = []
let currentPage = 1

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
            handleList(currentPage)
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
    setPageActive(currentPage)
}

const setPageActive = (index) => {
    $('#users-page #users-page-lst li:not(:first-child,:last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
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
        $('#users-list').on('click', '.remove', function () {
            $.ajax({
                url: '/api/users/delete',
                type: 'delete',
                data: {
                    id: $(this).data('id')
                },
                success() {
                    loadData()
                    const isLastPage = Math.ceil(dataList.length / pageSize) === currentPage
                    const restOne = dataList.length % pageSize === 1
                    const notFirstPage = currentPage > 0
                    if (isLastPage && restOne && notFirstPage) currentPage--
                }
            })
        })
        $('#users-page').on('click', '#users-page-list li:not(:first-child,:last-child)', function () {
            const index = $(this).index()
            handleList(index)
            currentPage = index
            setPageActive(index)
        })
        loadData()
        $('#users-save').on('click', handleSignUp)
    }
}

export {
    signIn,
    index
}