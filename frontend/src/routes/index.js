import SMERouter from 'sme-router'
import {signIn, index} from "../controllers";

const router = new SMERouter('root')


router.route('/', signIn(router))

router.route('/index', index(router))

router.route('/signin', signIn(router))

export default router
