import usersTpl from '../../views/users.art'
import usersListTpl from '../../views/users-list.art'

import handlePagination from "../../components/pagination";
import page from "../../databus/page";
import {addUser} from './add-users'
import {usersList as usersListModel} from "../../models/users-list";
import {auth as authModel} from "../../models/auth";
import {remove as removeModel} from "../../models/remove";

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
    $('#users-list').on('click', '.remove', async function () {
        const result = await removeModel($(this).data('id'))
        if (result.ret) {
            loadData()
            const isLastPage = Math.ceil(dataList.length / pageSize) === page.currentPage
            const restOne = dataList.length % pageSize === 1
            const notFirstPage = page.currentPage > 0
            if (isLastPage && restOne && notFirstPage) {
                page.setCurrentPage(page.currentPage - 1)
            }
        }
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

const listUsers = (router) => {
    return async (req, res, next) => {
        let result = await authModel()
        if(result.ret) {
            next()
            res.render(usersTpl({}))

            $('#add-user-btn').on('click', addUser)
            await loadData()

            // // 页面事件绑定
            // remove({
            //     $box: $('#users-list'),
            //     state, // 传递一个引用类型的值state, 在删除组件里能实时获取数据条数
            //     url: '/api/users',
            //     loadData: loadData
            // })

            methods()

            subscribe()
        } else {
            router.go('/signin')
        }
    }
}

export default listUsers