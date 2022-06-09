import indexTpl from '../views/index.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import handlePagination from "../components/pagination";
import page from "../databus/page";

const htmlIndex = indexTpl({})
const pageSize = page.pageSize
let dataList = []

const handleSignUp = () => {
    const btnClose = $('#users-close')
    const data = $('#users-form').serialize()
    $.ajax({
        url: '/api/users/signup',
        type: 'POST',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        data,
        success() {
            page.reset()
            loadData()
        }
    })
    btnClose.click()
}

const loadData = () => {
    return $.ajax({
        url: '/api/users/list',
        type: 'GET',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        success(result) {
            dataList = result.data
            handlePagination(dataList)
            handleList(page.currentPage)
        }
    })
}

const handleList = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: dataList.slice(start, start + pageSize)
    }))
}

const methods = () => {
    $('#users-list').on('click', '.remove', function () {
        $.ajax({
            url: '/api/users/delete',
            type: 'delete',
            headers: {
                'X-Auth-Token': localStorage.getItem('lg-token') || ''
            },
            data: {
                id: $(this).data('id')
            },
            success() {
                loadData()
                const isLastPage = Math.ceil(dataList.length / pageSize) === page.currentPage
                const restOne = dataList.length % pageSize === 1
                const notFirstPage = page.currentPage > 0
                if (isLastPage && restOne && notFirstPage) {
                    page.setCurrentPage(page.currentPage - 1)
                }
            }
        })
    })

    $('#users-signout').on('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('lg-token')
        location.reload()
    })

    $('#users-save').on('click', handleSignUp)
}

const subscribe = () => {
    $('body').on('changeCurrentPage', (e, index) => {
        handleList(index)
    })
}

const index = (router) => {
    const loadIndex = res => {
        res.render(htmlIndex)
        $(window, '.wrapper').resize()

        $('#content').html(usersTpl({}))
        loadData()

        methods()

        subscribe()
    }
    return (req, res, next) => {
        $.ajax({
            url: '/api/users/isAuth',
            dataType: 'json',
            headers: {
                'X-Auth-Token': localStorage.getItem('lg-token') || ''
            },
            success(result) {
                if (result.ret) {
                    loadIndex(res)
                } else {
                    router.go('/signin')
                }
            }
        })
    }
}

export default index