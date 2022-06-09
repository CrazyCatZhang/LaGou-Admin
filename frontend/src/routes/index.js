import SMERouter from 'sme-router'
import index from "../controllers/index";
import signIn from "../controllers/signin";

const router = new SMERouter('root')

router.use(() => {
    $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        headers: {
            'X-Auth-Token': localStorage.getItem('lg-token') || ''
        },
        success(result) {
            if (result.ret) {
                router.go('/index')
            } else {
                router.go('/signin')
            }
        }
    })
})

router.route('/', ()=>{

})

router.route('/index', index(router))

router.route('/signin', signIn(router))

export default router
