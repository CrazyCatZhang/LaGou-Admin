const userModel = require('../models/users')
const {hash} = require('../utils/tools')

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

exports.signup = signup