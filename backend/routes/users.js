const express = require('express');
const router = express.Router();

const {signup, list, remove, signin, logout, isAuth} = require('../controllers/users')
const {auth} = require("../middlewares/auth");

/* GET users listing. */
router.post('/signin', signin)
router.post('/signup', auth, signup)
router.get('/logout', auth, logout)

router.get('/list', auth, list)
router.delete('/delete', auth, remove)

router.get('/isAuth', auth, isAuth)

module.exports = router;
