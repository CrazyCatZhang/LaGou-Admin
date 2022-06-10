const express = require('express');
const {add, list} = require("../controllers/positions");
const router = express.Router();

router.post('/add', add)
router.get('/list', list)

module.exports = router