const router = require('express').Router()
const autMiddleware = require('../middlewares/auth.middleware')

router.use('/auth',require('./auth.router'))
router.use('/admin',autMiddleware,require('./admin'))

// mencoba memakai aksses admin
// router.use('/users',require('./admin/users.router.js'))

// router.use('/products',require('./admin/products.router.js'))
// router.use('/productSizes',require('./productSizes.router'))
// router.use('/productVariants',require('./productVariants.router'))

// router.use('/tags',require('./tags.router'))
// router.use('/productTags',require('./productTags.router'))
// router.use('/productRatings',require('./productRatings.router'))

// router.use('/categories',require('./categories.router.js'))
// router.use('/productCategories',require('./productCategories.router.js'))
// router.use('/promos',require('./promos.route.js'))

// router.use('/orders',require('./orders.router.js'))
// router.use('/orderDetails',require('./orderDetails.router.js'))

// router.use('/messages',require('./messages.router.js'))

module.exports = router