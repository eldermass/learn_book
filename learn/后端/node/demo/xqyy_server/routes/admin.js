const router = require('koa-router')({
    prefix: '/admin'
})
const multer = require('koa-multer')
const uploadMid = multer({dest: './public/upload'})

const admincontrollers = require('../admincontrollers')

router.post('/login', admincontrollers.user.login)
router.get('/logout', admincontrollers.user.logout)
// 统一拦截未登录 // 跨域没有cookie，之后解决 ctx.request.access 加入了权限 super_admin
router.use('/', require('../middleware/checklogin'))

router.get('/getuserinfo', admincontrollers.user.userinfo)
router.get('/users', admincontrollers.user.users)
router.post('/userdelete', admincontrollers.user.userdelete)
router.post('/usermodify', admincontrollers.user.usermodify)
router.post('/register', admincontrollers.user.register)

router.get('/message/unreadcount', admincontrollers.message.unreadcount)
router.get('/message/list', admincontrollers.message.messagelist)
router.get('/message/content', admincontrollers.message.messagecontent)
router.get('/message/hasread', admincontrollers.message.hasread)
router.get('/message/removereaded', admincontrollers.message.removereaded)
router.get('/message/restoretrash', admincontrollers.message.restoretrash)
router.get('/message/delete', admincontrollers.message.deletemsg)

router.get('/article/list', admincontrollers.articles.list)
router.get('/article/one', admincontrollers.articles.one)
router.get('/article/delete', admincontrollers.articles.delete)
router.post('/article/submit', admincontrollers.articles.submit)


router.get('/imageart/list', admincontrollers.imageart.list)
router.get('/imageart/one', admincontrollers.imageart.one)
router.get('/imageart/delete', admincontrollers.imageart.delete)
router.post('/imageart/submit', admincontrollers.imageart.submit)

router.post('/image/upload', uploadMid.any(), admincontrollers.data.imgupload)
router.post('/image/editorupload', uploadMid.any(), admincontrollers.data.editorupload)
router.post('/image/unlink', admincontrollers.data.unlinkfile)

router.get('/homedata', admincontrollers.homedata.get)
router.post('/homedata', admincontrollers.homedata.post)
router.post('/homedata/slider', admincontrollers.homedata.postslider)
router.post('/homedata/secbg', admincontrollers.homedata.secbg)

router.get('/homedata/footer', admincontrollers.homedata.getfooter)
router.post('/homedata/footer', admincontrollers.homedata.postfooter)
router.get('/homedata/qrcode', admincontrollers.homedata.getqrcode)
router.post('/homedata/qrcode', admincontrollers.homedata.postqrcode)
router.get('/homedata/music', admincontrollers.homedata.getmusic)
router.post('/homedata/music', admincontrollers.homedata.postmusic)
router.get('/homedata/contact', admincontrollers.homedata.getcontact)
router.post('/homedata/contact', admincontrollers.homedata.postcontact)
router.get('/homedata/background', admincontrollers.homedata.getbackground)
router.post('/homedata/background', admincontrollers.homedata.postbackground)

module.exports = router