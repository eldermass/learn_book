const router = require('koa-router')({
    prefix: '/api'
})
const apicontrollers = require('../apicontrollers')

router.get('/navigator', apicontrollers.navigator.get)
router.get('/article', apicontrollers.article.one)
router.get('/articlelist', apicontrollers.article.list)
router.get('/image', apicontrollers.image.one)
router.get('/imagelist', apicontrollers.image.list)
router.get('/displayimage', apicontrollers.image.displayimage)

router.get('/qrcode', apicontrollers.infos.qrcode)
router.get('/footer', apicontrollers.infos.footer)
router.get('/homedata', apicontrollers.infos.homedata)
router.get('/contact', apicontrollers.infos.contact)
router.get('/background', apicontrollers.infos.background)
router.get('/music', apicontrollers.infos.music)

router.post('/message', apicontrollers.message)

module.exports = router
