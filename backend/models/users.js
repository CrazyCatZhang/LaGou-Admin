const {Users} = require('../utils/db')

const findUser = (username)=>{
    return Users.findOne({username})
}

const signup = ({username,password}) => {
    const users = new Users({
        username,
        password
    })
    return users.save()
}

exports.signup = signup
exports.findUser = findUser