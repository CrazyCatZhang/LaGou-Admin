import GP21Router from 'gp21-router'
import index from '../controllers/index'
import signIn from "../controllers/signin";
import {auth as authModel} from "../models/auth"
import listPositions from "../controllers/positions/list-positions";
import listUsers from "../controllers/users/list-users";

const router = new GP21Router('root')

router.use(async (req) => {
    const result = await authModel()
    if (result.ret) {
        router.go(req.url)
    } else {
        router.go('/signin')
    }
})

router.route('/index', index(router))

router.route('/signin', signIn(router))

router.route('/index/users', listUsers(router))
router.route('/index/positions', listPositions(router))
router.route('*', (req, res, next) => {
    res.redirect('/index/users')
})

export default router
