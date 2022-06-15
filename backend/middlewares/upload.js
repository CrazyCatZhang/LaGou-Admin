const path = require('path')
const multer = require('multer')
const mime = require('mime')
const fs = require('fs')

// let filename = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = file.fieldname + '-' + uniqueSuffix + '.' + mime.getExtension(file.mimetype)
        cb(null, filename)
    }
})

const limits = {
    fileSize: 200000,
    files: 1
}

function fileFilter(req, file, cb) {

    // 如果有问题，你可以总是这样发送一个错误:
    const acceptType = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif'
    ]

    if (!acceptType.includes(file.mimetype)) {
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('文件类型必须是.png, .jpg, .gif'))
    } else {
        // 接受这个文件，使用`true`
        cb(null, true)
    }
}

const upload = multer({
    storage,
    limits,
    fileFilter
}).single('companyLogo')

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            res.render('fail', {
                data: JSON.stringify({
                    message: '文件超出200K。'
                })
            })
        } else if (err) {
            // 发生错误
            res.render('fail', {
                data: JSON.stringify({
                    message: err.message
                })
            })
        } else {
            const {companyLogo_old} = req.body
            if (req.file && companyLogo_old) {
                try {
                    fs.unlinkSync(path.join(__dirname, `../public/uploads/${companyLogo_old}`))
                    req.companyLogo = req.file.filename
                } catch (err) {
                    res.render('succ', {
                        data: JSON.stringify({
                            message: '删除文件失败。'
                        })
                    })
                }
            } else if (!req.file && companyLogo_old) {
                req.companyLogo = companyLogo_old
            } else {
                req.companyLogo = req.file.filename
            }

            next()
        }
    })
}

module.exports = uploadMiddleware