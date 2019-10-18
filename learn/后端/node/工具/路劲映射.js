const _ = require('lodash')
const fs = require('fs')
const path = require('path')

/**
 * 映射 d 文件夹下的所有文件为模块
 */
const mapDir = d => {
    const tree = {}
    // console.log(d)
    // 获得当前文件夹下的所有的文件夹和文件
    const [dirs, files] = _(fs.readdirSync(d)).partition(p => fs.statSync(path.join(d, p)).isDirectory())
    
    // const [dirs, files] = _(fs.readdirSync(d)).partition(p => {
    //     // d当前运行路径， p当前循环的文件名
    //     // console.log(fs.readdirSync(d))   //数组读取所有文件及文件夹
    //     // console.log(_(fs.readdirSync(d)))  //数组变为lodash对象
    //     // console.log(fs.statSync(path.join(d, p)).isDirectory()) //是否是文件夹
    //     return fs.statSync(path.join(d, p)).isDirectory()
    // })

    // console.log(dirs, files)
    // console.log(dirs)
    // 映射文件夹
    dirs.forEach(dir => {
        tree[dir] = mapDir(path.join(d, dir))
    })

    // 映射js文件
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            tree[path.basename(file, '.js')] = require(path.join(d, file))
            // console.log(path.basename(file, '.js')) // 文件名  去除 .js
            // console.log(path.join(d, file))  // 完整路径
        }
    })

    return tree
}

// 默认导出当前文件夹下的映射
// module.exports = mapDir(path.join(__dirname))

let test = mapDir(path.join(__dirname))
// console.log(test)
// console.log(test[1]())
// console.log(__dirname)
// console.log(path.join(__dirname,'./yes'))