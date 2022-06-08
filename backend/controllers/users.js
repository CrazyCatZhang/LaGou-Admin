const userModel = require('../models/users')
const {hash, compare} = require('../utils/tools')

const signin = async (req, res, next) => {
    const {username, password} = req.body
    let result = await userModel.findUser(username)
    if (result) {
        let {password: hashPassword} = result
        let compareResult = await compare(password, hashPassword)
        if (compareResult) {
            res.render('succ',{
                data: JSON.stringify({
                    username
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码错误...',
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码错误...',
            })
        })
    }
}

const signup = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    const {username, password} = req.body
    let findResult = await userModel.findUser(username)
    let hashPassword = await hash(password)

    if (findResult) {
        res.render('succ', {
            data: JSON.stringify({
                message: '用户名已存在...'
            })
        })
    } else {
        let result = await userModel.signup({
            username,
            password: hashPassword
        })

        res.render('succ', {
            data: JSON.stringify({
                message: '注册成功...'
            })
        })
    }
}

const list = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    const listResult = await userModel.findList()
    res.render('succ', {
        data: JSON.stringify(listResult)
    })
}

const remove = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    const {id} = req.body
    let removeResult = await userModel.removeUser(id)
    if (removeResult) {
        res.render('succ', {
            data: JSON.stringify({
                message: '用户删除成功...',
                data: removeResult
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户删除失败!',
            })
        })
    }
}

exports.signin = signin
exports.signup = signup
exports.list = list
exports.remove = remove