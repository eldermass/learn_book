const router = require('koa-router')({
    prefix: '/weapp'
})

const wxmpcontrollers = require('../awxmpcontrollers')

router.get('/home', wxmpcontrollers.home)
router.get('/detail', wxmpcontrollers.detail)
router.get('/imggroup', wxmpcontrollers.imggroup)
router.get('/menus', wxmpcontrollers.menu.menus)
router.get('/menu', wxmpcontrollers.menu.menu)
router.get('/reserve', wxmpcontrollers.reserve)

module.exports = router