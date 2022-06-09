import SMERouter from 'sme-router'
import index from "../controllers/index";
import signIn from "../controllers/signin";

const router = new SMERouter('root')

router.use(() => {
    $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        success(result) {
            if (result.ret) {
                router.go('/index')
            } else {
                router.go('/signin')
            }
        }
    })
})

router.route('/', signIn(router))

router.route('/index', index(router))

router.route('/signin', signIn(router))

export default router
