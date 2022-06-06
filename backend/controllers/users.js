const signup = (req, res, next) => {
    const {username, password} = req.body
    res.render('succ', {
        data: JSON.stringify({
            username,
            password
        })
    })
}

exports.signup = signup