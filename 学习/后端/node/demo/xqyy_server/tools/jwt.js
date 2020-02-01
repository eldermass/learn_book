const jwt = require('jsonwebtoken')

let secretKey = 'fuck you jimmy'

exports.sign = function (data = {}, exp = 3000) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + exp,
        data
    }, secretKey)
}

/**
 * @token     只有这个参数就返回解析后的结果
 * @onlydata  是否只接受data信息
 * */

exports.verify = function (token, onlydata) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, data) => {
            if (!err) {
                if (onlydata) {
                    resolve(data.data[0])
                } else {
                    resolve(data)
                }
            } else {
                reject(err.message)
            }
        })
    })
}
/**    
 * @token 只有这个参数就返回整个权限数组
 * @type  string，传入用户等级如admin， 就返回是否有权限
*/ 

exports.getAccess = function (token, type) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, res) => {
            if (!err) {
                let access = res.data[0].access
                if (typeof access == 'string') {
                    access = JSON.parse(access)
                }
                if (type) {
                    let cando = access.filter(item => {
                        return item == type
                    }).length
                    resolve(cando)
                } else {
                    resolve(access)
                }
            } else {
                reject(false)
            }
        })
    })
}