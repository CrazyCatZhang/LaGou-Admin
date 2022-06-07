const express = require('express');
const router = express.Router();

const {signup, list, remove} = require('../controllers/users')

/* GET users listing. */
router.post('/signup', signup)
router.get('/list', list)
router.delete('/delete', remove)

module.exports = router;
