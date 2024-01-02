const router = require('express').Router()
const autMiddleware = require('../middlewares/auth.middleware')
const roleCheckMiddleware = require('../middlewares/roleCheck.middleware')

router.use('/auth',require('./auth.router'))
router.use('/admin',autMiddleware,roleCheckMiddleware('admin'),require('./admin'))

// memberikan akses public
router.use('/',require('./public'))

//memberikan akses customer
router.use('/auth',require('./auth.router'))
router.use('/customer',autMiddleware,roleCheckMiddleware('customer'),require('./customer'))


module.exports = router