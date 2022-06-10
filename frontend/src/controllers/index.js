import indexTpl from "../views/index.art";
import {auth as authModel} from "../models/auth";
import pageHeader from '../components/pageheader'
import img from '../assets/user2-160x160.jpg'

const index = (router) => {
    return async (req, res, next) => {
        const result = await authModel()
        if (result.ret) {
            const html = indexTpl({
                subRouter: res.subRoute(),
                img
            })
            next(html)
            $(window, '.wrapper').resize()
            pageHeader()
            const $as = $('#sidebar-menu li:not(:first-child) a')
            let hash = location.hash
            $as
                .filter(`[href="${hash}"]`)
                .parent()
                .addClass('active')
                .siblings()
                .removeClass('active')
        } else {
            router.go('/signin')
        }
    }
}

export default index
