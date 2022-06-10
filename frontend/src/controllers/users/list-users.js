import usersTpl from '../../views/users.art'
import usersListTpl from '../../views/users-list.art'

import handlePagination from "../../components/pagination";
import page from "../../databus/page";
import {addUser} from './add-users'
import {usersList as usersListModel} from "../../models/users-list";
import {auth as authModel} from "../../models/auth";
import {remove} from "../common";

const pageSize = page.pageSize
let dataList = []
let state = {
    list: []
}

const loadData = async () => {
    const result = await usersListModel()
    state.list = result.data
    handlePagination(state.list)
    handleList(page.currentPage)
}

const handleList = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: state.list.slice(start, start + pageSize)
    }))
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
        if (result.ret) {
            next()
            res.render(usersTpl({}))

            $('#add-user-btn').on('click', addUser)
            await loadData()

            remove({
                $box: $('#users-list'),
                state, // 传递一个引用类型的值state, 在删除组件里能实时获取数据条数
                url: '/api/users/delete',
                loadData
            })

            subscribe()
        } else {
            router.go('/signin')
        }
    }
}

export default listUsers