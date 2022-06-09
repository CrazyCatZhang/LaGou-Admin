import indexTpl from '../views/index.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'

import handlePagination from "../components/pagination";
import page from "../databus/page";
import {addUser} from './users/add-users'
import {usersList as usersListModel} from "../models/users-list";
import {auth as authModel} from "../models/auth";

const htmlIndex = indexTpl({})
const pageSize = page.pageSize
let dataList = []

const loadData = async () => {
    const result = await usersListModel()
    dataList = result.data
    handlePagination(dataList)
    handleList(page.currentPage)
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
}

const subscribe = () => {
    $('body').on('changeCurrentPage', (e, index) => {
        handleList(index)
    })
    $('body').on('addUser', (e) => {
        loadData()
    })
}

const index = (router) => {
    const loadIndex = res => {
        res.render(htmlIndex)
        $(window, '.wrapper').resize()

        $('#content').html(usersTpl({}))
        $('#add-user-btn').on('click', addUser)

        loadData()

        methods()

        subscribe()
    }
    return async (req, res, next) => {
        const result = await authModel()
        if (result.ret) {
            loadIndex(res)
        } else {
            router.go('/signin')
        }
    }
}

export default index