const bcrypt = require('bcrypt')

exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
            resolve(result)
        })
    })
}