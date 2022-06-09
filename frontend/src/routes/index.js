import SMERouter from 'sme-router'
import index from "../controllers/index";
import signIn from "../controllers/signin";
import {auth as authModel} from "../models/auth"

const router = new SMERouter('root')

router.use(async () => {
    const result = await authModel()
    if (result.ret) {
        router.go('/index')
    } else {
        router.go('/signin')
    }
})

router.route('/', () => {

})

router.route('/index', index(router))

router.route('/signin', signIn(router))

export default router
