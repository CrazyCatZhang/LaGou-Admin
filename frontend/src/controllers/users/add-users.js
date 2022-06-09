import usersAddTpl from '../../views/users-add.art'
import page from "../../databus/page";

export const addUser = () => {
    const html = usersAddTpl({})
    $('#users-list-box').after(html)
    const handleSignUp = () => {
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
                $('body').trigger('addUser')
            }
        })
        const btnClose = $('#users-close')
        btnClose.click()
    }
    $('#users-save').on('click', handleSignUp)
}