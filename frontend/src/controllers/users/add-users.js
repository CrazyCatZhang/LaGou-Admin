import usersAddTpl from '../../views/users-add.art'
import page from "../../databus/page";
import {usersAdd as usersAddModel} from "../../models/users-add";

export const addUser = () => {
    const html = usersAddTpl({})
    $('#users-list-box').after(html)
    const handleSignUp = async () => {
        const data = $('#users-form').serialize()
        const result = await usersAddModel(data)
        if (result.ret) {
            page.reset()
            $('body').trigger('addUser')
        }
        const btnClose = $('#users-close')
        btnClose.click()
    }
    $('#users-save').on('click', handleSignUp)
}