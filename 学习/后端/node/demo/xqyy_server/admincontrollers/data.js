const tools = require('../tools/tools')

// const testUrl = "http://localhost:8020"
// const testUrl = "http://39.108.218.157"
const testUrl = ''
exports.imgupload = async ctx => {
    let {files} = ctx.req
    let data = []
    files.forEach( async file => {
        let storeName
        if (file.originalname == 'blob') {
            storeName = '/upload/' + file.filename + file.mimetype.replace((/.+\//),'.')
        } else {
            storeName = '/upload/' + file.filename + file.originalname.replace((/.+(?=\..+$)/),'')
        }
        data.push(storeName)
        let newName = 'public' + storeName
        let oldName = file.path
        res = await tools.rename(newName, oldName)
    })

    // 测试不同域名使用
    data = data.map(item => {
        return testUrl + item
    })
    
    if (data.length == 1) {
        ctx.state.data = data[0]
    } else {
        ctx.body = {
            errno: 0,
            data
        }
    }
}
exports.editorupload = async ctx => {
    let {files} = ctx.req
    let data = []
    files.forEach( async file => {
        let storeName = '/upload/' + file.filename + file.originalname.replace((/.+(?=\..+$)/),'')
        data.push(storeName)
        let newName = 'public' + storeName
        let oldName = file.path
        res = await tools.rename(newName, oldName)
    })
    // 测试不同域名使用
    data = data.map(item => {
        return testUrl + item
    })
    ctx.body = {
        errno: 0,
        data
    }
}

exports.unlinkfile = async ctx => {
    let { filepath } = ctx.request.body
    // console.log(filepath)
    if (filepath) {
        // 测试不同域名使用
        let filename = 'public' + filepath.replace(testUrl, '')
        let res = await tools.unlink(filename)
        ctx.state.data = res
    }
}