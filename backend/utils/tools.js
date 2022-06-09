const bcrypt = require('bcrypt')
const path = require("path");
const fs = require("fs")
const jwt = require('jsonwebtoken')

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

exports.sign = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    return jwt.sign({username}, privateKey, {algorithm: 'RS256'}, null)
}

exports.verify = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'))
    return jwt.verify(token, publicKey, {algorithm: ['RS256']}, null)
}