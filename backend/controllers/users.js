const userModel = require('../models/users')
const {hash, compare, sign, verify} = require('../utils/tools')

const signin = async (req, res) => {
    const {username, password} = req.body
    let result = await userModel.findUser(username)
    if (result) {
        let {password: hashPassword} = result
        let compareResult = await compare(password, hashPassword)
        if (compareResult) {
            const token = sign(username)
            res.set('X-Auth-Token', token)
            res.render('succ', {
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

const signup = async (req, res) => {
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

const logout = async (req, res) => {
    req.session = null
    res.render('succ', {
        data: JSON.stringify({
            message: '成功退出登录...',
        })
    })
}

const list = async (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    const listResult = await userModel.findList()
    res.render('succ', {
        data: JSON.stringify(listResult)
    })
}

const remove = async (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    const {id} = req.body
    let removeResult = await userModel.removeUser(id)
    console.log(removeResult)
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

const isAuth = async (req, res) => {
    const token = req.get('X-Auth-Token')
    try {
        const result = verify(token)
        res.render('succ', {
            data: JSON.stringify({
                username: result.username
            })
        })
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录...',
            })
        })
    }
}

exports.signin = signin
exports.signup = signup
exports.logout = logout
exports.list = list
exports.remove = remove
exports.isAuth = isAuth