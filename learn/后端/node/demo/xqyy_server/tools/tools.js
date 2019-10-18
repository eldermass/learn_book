const crypto = require('crypto')
const fs = require('fs')
const secretKey = 'asd@#$^&*TEGDFGQ%@^*^%&@#SDURTGFH撒娇客户' 

exports.getToken = function (ctx) {
    let { token } = ctx.request.query
    if (token) return token
    token = ctx.request.body.token
    if (token) return token
    token = ctx.cookies.get('token')
    if (token) return token
    else return false
}

exports.hasInArray = function (arr, one) {
    return arr.filter(item => {
        return item == one
    }).length
}
exports.md5 = function (str) {
    let obj = crypto.createHash('md5')
    obj.update(secretKey + str)
    return obj.digest('hex')
}

exports.rename = function (newName, oldName){
    return new Promise((resolve, reject) => {
        fs.rename(oldName, newName, err => {
            if(err)reject(err)
            resolve('ok')
        })
    })
}

exports.unlink = function (filepath){
    return new Promise((resolve,reject)=>{
        fs.unlink(filepath,err=>{
            if(err)reject(err)
            resolve('ok')
        })
    })
}

exports.readFile = function (filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}