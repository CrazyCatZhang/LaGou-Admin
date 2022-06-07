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

exports.Users = Users