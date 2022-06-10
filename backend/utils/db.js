const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lagou-admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connect error:'))

const usersSchema = mongoose.Schema({
    username: String,
    password: String
})

const Users = mongoose.model('Users', usersSchema)

const positionsSchema = mongoose.Schema({
    companyLogo: String,
    companyName: String,
    positionName: String,
    city: String,
    createTime: String,
    salary: String
})

const Positions = mongoose.model('Positions', positionsSchema)

exports.Users = Users
exports.Positions = Positions