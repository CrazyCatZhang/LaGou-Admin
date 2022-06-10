const positionsModel = require('../models/positions')
const moment = require("moment");

exports.add = async (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const result = positionsModel.add({
        ...req.body,
        createTime: moment().format('YYYY年MM月DD日 HH:mm')
    })
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '职位添加成功。'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '职位添加失败。'
            })
        })
    }
}

exports.list = async (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const result = positionsModel.list()
    if (result) {
        res.json(result)
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '获取数据失败。'
            })
        })
    }
}