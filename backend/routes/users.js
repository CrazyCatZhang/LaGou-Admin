var express = require('express')
var router = express.Router()

const {signup, list, remove, signin, signout, isAuth} = require('../controllers/users')
const {auth} = require('../middlewares/auth')

router.get('/', auth, list)
router.delete('/', auth, remove)

router.post('/', auth, signup)
router.post('/signin', signin)
router.get('/signout', auth, signout)
router.get('/isAuth', isAuth)

module.exports = router
